import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { MapView } from './components/MapView';
import { EventCard } from './components/EventCard';
import { StartupCard } from './components/StartupCard';
import { BottomBar } from './components/BottomBar';
import { FilterModal } from './components/FilterModal';
import { DocsView } from './components/DocsView';
import { RoutePlanner } from './components/RoutePlanner';
import { EVENTS, STARTUPS_NERD, BUILDINGS } from './data/mockData';
import { Calendar, Building, Sparkles, AlertCircle, Bookmark, CheckCircle2, MapPin, ChevronRight, Footprints, AlertTriangle, Compass } from 'lucide-react';

export function App() {
  // Aba ativa: 'programacao' | 'startups' | 'mapa' | 'docs'
  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash.replace('#', '');
      if (['programacao', 'startups', 'mapa', 'docs'].includes(hash)) {
        return hash;
      }
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab');
      if (tabParam && ['programacao', 'startups', 'mapa', 'docs'].includes(tabParam)) {
        return tabParam;
      }
    }
    return 'programacao';
  });

  // Atualiza hash da URL ao mudar de aba para permitir links diretos (ex: /#docs)
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Estados do Mapa
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

  // Estados de Origem e Destino para Navegação
  const [originId, setOriginId] = useState('18'); // Padrão: Prédio 18 - Edifício NERD
  const [destinationId, setDestinationId] = useState('26'); // Padrão: Prédio 26 - Moinho Recife

  // Estados de Filtro
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all' | 'saude' | 'tech' | 'negocios'
  const [selectedPeriod, setSelectedPeriod] = useState('all'); // 'all' | 'manha' | 'tarde' | 'noite'
  const [selectedBuildingFilter, setSelectedBuildingFilter] = useState(null);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  // Subfiltro para Startups (Dia 11 vs Todos os dias)
  const [startupDayFilter, setStartupDayFilter] = useState('11'); // '11' | 'all'

  // Favoritos salvos no localStorage
  const [bookmarkedEventIds, setBookmarkedEventIds] = useState(() => {
    try {
      const saved = localStorage.getItem('recnplay_bookmarks_2026');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('recnplay_bookmarks_2026', JSON.stringify(bookmarkedEventIds));
    } catch (e) {
      console.warn('Erro ao salvar favoritos no localStorage', e);
    }
  }, [bookmarkedEventIds]);

  const toggleBookmark = (eventId) => {
    setBookmarkedEventIds(prev => 
      prev.includes(eventId) ? prev.filter(id => id !== eventId) : [...prev, eventId]
    );
  };

  // Limpeza de filtros
  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedTrack('all');
    setSelectedPeriod('all');
    setSelectedBuildingFilter(null);
    setShowOnlyBookmarks(false);
    setSelectedBuildingId(null);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedTrack !== 'all' ||
    selectedPeriod !== 'all' ||
    selectedBuildingFilter !== null ||
    showOnlyBookmarks
  );

  const activeFilterCount = (searchQuery ? 1 : 0) +
    (selectedTrack !== 'all' ? 1 : 0) +
    (selectedPeriod !== 'all' ? 1 : 0) +
    (selectedBuildingFilter !== null ? 1 : 0) +
    (showOnlyBookmarks ? 1 : 0);

  // Compartilhamento do Roteiro no WhatsApp / Clipboard
  const handleShareBookmarks = () => {
    const bookmarkedEvents = EVENTS.filter(e => bookmarkedEventIds.includes(e.id));
    if (bookmarkedEvents.length === 0) return;

    let text = `🚀 *Meu Roteiro no REC'n'Play 2026 (11/11)*\n_Guia Saúde, Gestão e Negócios_\n\n`;
    bookmarkedEvents.forEach(e => {
      text += `⏰ *${e.time}* - ${e.title}\n📍 ${e.location}\n\n`;
    });
    text += `🔗 Acesse o panfleto interativo: ${window.location.origin}`;

    if (navigator.share) {
      navigator.share({
        title: "Meu Roteiro REC'n'Play 2026",
        text: text
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopiedShare(true);
      setTimeout(() => setCopiedShare(false), 2500);
      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    }
  };

  // Filtro de Eventos
  const filteredEvents = useMemo(() => {
    return EVENTS.filter(event => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = event.title.toLowerCase().includes(q);
        const matchesLocation = event.location.toLowerCase().includes(q);
        const matchesDesc = (event.description || '').toLowerCase().includes(q);
        const matchesSpeakers = (event.speakers || []).some(s => s.toLowerCase().includes(q));
        const matchesTags = (event.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesLocation && !matchesDesc && !matchesSpeakers && !matchesTags) {
          return false;
        }
      }

      if (selectedTrack !== 'all' && event.track !== selectedTrack) {
        return false;
      }

      if (selectedPeriod !== 'all') {
        const startHour = parseInt(event.time.split(':')[0], 10);
        if (selectedPeriod === 'manha' && startHour >= 12) return false;
        if (selectedPeriod === 'tarde' && (startHour < 12 || startHour >= 18)) return false;
        if (selectedPeriod === 'noite' && startHour < 18) return false;
      }

      if (selectedBuildingFilter !== null && event.buildingId !== selectedBuildingFilter) {
        return false;
      }

      if (showOnlyBookmarks && !bookmarkedEventIds.includes(event.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTrack, selectedPeriod, selectedBuildingFilter, showOnlyBookmarks, bookmarkedEventIds]);

  // Filtro de Startups do NERD
  const filteredStartups = useMemo(() => {
    return STARTUPS_NERD.filter(st => {
      if (startupDayFilter !== 'all' && st.dayCode !== startupDayFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = st.name.toLowerCase().includes(q);
        const matchesSlot = st.slot.toLowerCase().includes(q);
        const matchesSegment = st.segment.toLowerCase().includes(q);
        const matchesDesc = st.description.toLowerCase().includes(q);
        const matchesTags = (st.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSlot && !matchesSegment && !matchesDesc && !matchesTags) {
          return false;
        }
      }

      if (selectedBuildingFilter !== null && selectedBuildingFilter !== 18) {
        return false;
      }

      return true;
    });
  }, [startupDayFilter, searchQuery, selectedBuildingFilter]);

  const totalResultsCount = activeTab === 'startups' ? filteredStartups.length : filteredEvents.length;

  // Localizar prédio no mapa e abrir visualização
  const handleLocateOnMap = (buildingId) => {
    setSelectedBuildingId(buildingId);
    setDestinationId(String(buildingId));
    setIsMapCollapsed(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtrar diretamente a partir do clique no mapa
  const handleFilterByBuildingFromMap = (buildingId, targetTab = 'programacao') => {
    setSelectedBuildingFilter(buildingId);
    if (targetTab === 'startups') {
      setActiveTab('startups');
    } else {
      setActiveTab('programacao');
    }
    setTimeout(() => {
      const listEl = document.getElementById('content-list-section');
      if (listEl) {
        listEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans">
      {/* Topo Institucional Mobile-First com Disclaimer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMapCollapsed={isMapCollapsed}
        setIsMapCollapsed={setIsMapCollapsed}
        activeFilterCount={activeFilterCount}
      />

      {/* Área Central: Mapa Interativo com Arrastar, Zoom e Traçado de Rotas a Pé */}
      {activeTab !== 'docs' && (
        <section aria-label="Mapa Interativo e Rotas de Deslocamento">
          <MapView
            selectedBuildingId={selectedBuildingId}
            onSelectBuilding={setSelectedBuildingId}
            onFilterByBuilding={handleFilterByBuildingFromMap}
            isCollapsed={activeTab !== 'mapa' && isMapCollapsed}
            originId={originId}
            destinationId={destinationId}
            onSetAsOrigin={(id) => setOriginId(id)}
            onSetAsDestination={(id) => setDestinationId(id)}
          />
        </section>
      )}

      {/* Conteúdo Principal Abaixo do Mapa */}
      <main id="content-list-section" className="flex-1 w-full max-w-md mx-auto px-4 pt-3 pb-28">
        {/* Banner de Roteiro e Filtros Ativos (se houver filtros) */}
        {hasActiveFilters && (
          <div className="mb-3 p-3 bg-purple-50 border border-purple-200 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in">
            <div className="flex items-center space-x-2 text-xs text-purple-900">
              <span className="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
              <span className="font-semibold">
                Filtros ativos ({activeFilterCount}):{' '}
                {selectedBuildingFilter && `Prédio ${selectedBuildingFilter} `}
                {selectedTrack !== 'all' && `• ${selectedTrack} `}
                {searchQuery && `• "${searchQuery}"`}
              </span>
            </div>
            <button
              onClick={handleClearFilters}
              className="text-[11px] font-bold text-purple-700 hover:text-purple-900 underline ml-2 shrink-0"
            >
              Limpar
            </button>
          </div>
        )}

        {/* Planejador de Rotas de Origem e Destino (Visível na aba de Mapa ou através de botão) */}
        {(activeTab === 'mapa' || activeTab === 'programacao') && (
          <RoutePlanner
            originId={originId}
            setOriginId={setOriginId}
            destinationId={destinationId}
            setDestinationId={setDestinationId}
            onShowOnMap={() => {
              setIsMapCollapsed(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {/* ============================================================== */}
        {/* ABA 1: PROGRAMAÇÃO DO DIA 11 */}
        {/* ============================================================== */}
        {activeTab === 'programacao' && (
          <div className="space-y-3">
            {/* Header da Seção com Chips Rápidos de Trilha */}
            <div className="flex items-center justify-between pb-1">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900 tracking-tight flex items-center space-x-1.5">
                  <Calendar className="w-4 h-4 text-purple-700" />
                  <span>Programação do Dia 11/11</span>
                </h2>
                <p className="text-[11px] text-slate-500">
                  Painéis estratégicos em Saúde, IA e Negócios
                </p>
              </div>
              <span className="text-[11px] font-bold bg-slate-200/80 text-slate-700 px-2 py-0.5 rounded-full">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'atividade' : 'atividades'}
              </span>
            </div>

            {/* Chips de Seleção Rápida de Trilha e Filtro de Turno */}
            <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
              {[
                { id: 'all', label: 'Todos' },
                { id: 'saude', label: '🏥 Saúde e SUS' },
                { id: 'tech', label: '🤖 IA e Deep Tech' },
                { id: 'negocios', label: '📈 Negócios e Gestão' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setSelectedTrack(t.id)}
                  className={`px-3 py-1.5 rounded-xl text-[11px] font-bold whitespace-nowrap border transition-all ${
                    selectedTrack === t.id
                      ? 'bg-purple-700 text-white border-purple-700 shadow-sm'
                      : 'bg-white text-slate-700 border-slate-200/90 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Linha de Filtro por Turno (Manhã / Tarde / Noite) + Toggle Meu Roteiro */}
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center space-x-1 bg-white p-1 rounded-xl border border-slate-200/80 text-[10px] font-bold">
                {[
                  { id: 'all', label: 'Dia Todo' },
                  { id: 'manha', label: 'Manhã' },
                  { id: 'tarde', label: 'Tarde' },
                  { id: 'noite', label: 'Noite' }
                ].map(p => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPeriod(p.id)}
                    className={`px-2 py-0.5 rounded-lg transition-all ${
                      selectedPeriod === p.id
                        ? 'bg-purple-100 text-purple-900 font-extrabold'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              {/* Botão Rápido Meu Roteiro */}
              <button
                onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
                className={`px-2.5 py-1 rounded-xl text-[11px] font-bold flex items-center space-x-1 border transition-all ${
                  showOnlyBookmarks
                    ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200/90 hover:bg-amber-50'
                }`}
              >
                <Bookmark className="w-3 h-3" />
                <span>Salvos ({bookmarkedEventIds.length})</span>
              </button>
            </div>

            {/* Banner de Compartilhamento se estiver no modo "Meu Roteiro" e houver itens */}
            {showOnlyBookmarks && bookmarkedEventIds.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in">
                <div>
                  <p className="text-xs font-bold text-amber-950">Seu Roteiro Personalizado</p>
                  <p className="text-[10px] text-amber-800">{bookmarkedEventIds.length} atividades selecionadas para o dia 11</p>
                </div>
                <button
                  onClick={handleShareBookmarks}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-[11px] font-extrabold flex items-center space-x-1 shadow-sm transition-all"
                >
                  <span>WhatsApp</span>
                </button>
              </div>
            )}

            {/* Card Destaque para Edifício NERD (Prédio 18 - Canto Inferior Esquerdo) */}
            {!selectedBuildingFilter && selectedTrack === 'all' && (
              <div 
                onClick={() => handleLocateOnMap(18)}
                className="cursor-pointer bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between hover:brightness-105 transition-all"
              >
                <div className="flex items-center space-x-2.5">
                  <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center font-black text-sm">
                    18
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-orange-200">
                      Ponto Central (Canto Inferior Esquerdo)
                    </p>
                    <p className="text-xs font-bold leading-tight">
                      Arena de Negócios – Edifício NERD
                    </p>
                    <p className="text-[11px] text-orange-100 mt-0.5">
                      Palcos Asa Branca, Carcará e estandes das HealthTechs
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-white/80 shrink-0" />
              </div>
            )}

            {/* Listagem de Cards de Eventos */}
            {filteredEvents.length > 0 ? (
              <div className="space-y-3">
                {filteredEvents.map(event => (
                  <EventCard
                    key={event.id}
                    event={event}
                    onLocateOnMap={handleLocateOnMap}
                    isBookmarked={bookmarkedEventIds.includes(event.id)}
                    onToggleBookmark={toggleBookmark}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Nenhuma palestra encontrada</h3>
                <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                  Tente alterar seus termos de busca ou limpar os filtros para ver toda a programação.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-3 px-4 py-2 rounded-xl bg-purple-700 text-white text-xs font-bold shadow-sm"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 2: STARTUPS NO NERD (PRÉDIO 18) */}
        {/* ============================================================== */}
        {activeTab === 'startups' && (
          <div className="space-y-3">
            {/* Header da Seção */}
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-orange-600 uppercase tracking-wide">
                <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                <span>Prédio 18 • Arena Pernambuco de Negócios (NERD)</span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900 mt-0.5">
                Startups de Saúde, Biotech e Vet
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Expositores mapeados no Edifício NERD (canto inferior esquerdo do mapa). No dia 11/11, as healthtechs e biotechs estarão reunidas nos slots de exposição.
              </p>

              {/* Seletor de Dia das Startups */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600">Exposição:</span>
                <div className="flex space-x-1">
                  <button
                    onClick={() => setStartupDayFilter('11')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      startupDayFilter === '11'
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Dia 11 (Principal)
                  </button>
                  <button
                    onClick={() => setStartupDayFilter('all')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      startupDayFilter === 'all'
                        ? 'bg-slate-800 text-white shadow-sm'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    Ver Todos os Dias
                  </button>
                </div>
              </div>
            </div>

            {/* Listagem das Startups */}
            {filteredStartups.length > 0 ? (
              <div className="space-y-3">
                {filteredStartups.map(startup => (
                  <StartupCard
                    key={startup.id}
                    startup={startup}
                    onLocateOnMap={handleLocateOnMap}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10 px-4 bg-white rounded-2xl border border-slate-200">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h3 className="text-sm font-bold text-slate-800">Nenhuma startup encontrada</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Verifique a busca ou limpe os filtros para visualizar a lista completa.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-3 px-4 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-sm"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 3: MAPA COMPLETO / POLOS E DISTÂNCIAS */}
        {/* ============================================================== */}
        {activeTab === 'mapa' && (
          <div className="space-y-3">
            <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
              <h2 className="text-sm font-extrabold text-slate-900 flex items-center space-x-1.5">
                <MapPin className="w-4 h-4 text-purple-700" />
                <span>Navegação e Distâncias a Pé no Bairro</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Utilize o seletor acima para traçar a rota entre quaisquer dois locais do evento, ou toque em um polo abaixo para traçar a rota a partir da sua origem:
              </p>
            </div>

            {/* Lista dos Prédios Mapeados */}
            <div className="space-y-2">
              {BUILDINGS.map(b => (
                <div
                  key={b.id}
                  onClick={() => {
                    setDestinationId(String(b.id));
                    handleLocateOnMap(b.id);
                  }}
                  className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    selectedBuildingId === b.id
                      ? 'bg-purple-50 border-purple-400 shadow-sm'
                      : 'bg-white border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 ${
                      b.id === 18 
                        ? 'bg-orange-500 shadow-sm shadow-orange-500/30' 
                        : b.id === 26 
                        ? 'bg-purple-800' 
                        : 'bg-purple-700'
                    }`}>
                      {b.code}
                    </span>
                    <div>
                      <div className="flex items-center space-x-1.5">
                        <h3 className="text-xs font-extrabold text-slate-900 leading-tight">
                          {b.name}
                        </h3>
                        {b.id === 18 && (
                          <span className="text-[9px] bg-orange-100 text-orange-800 font-bold px-1 rounded">
                            NERD
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{b.address}</p>
                      <p className="text-[10px] text-cyan-600 font-bold mt-1 flex items-center">
                        <Footprints className="w-3 h-3 mr-1" />
                        {b.walkTimeFromNerd} ({b.walkDist})
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* ABA 4: BASE DE DADOS E DOCUMENTAÇÃO */}
        {/* ============================================================== */}
        {activeTab === 'docs' && <DocsView />}
      </main>

      {/* Barra Inferior Fixa (Bottom Navigation) com [ BUSCAR / FILTRAR ] e [ LIMPAR ] */}
      <BottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenFilter={() => setIsFilterModalOpen(true)}
        onClearFilters={handleClearFilters}
        hasActiveFilters={hasActiveFilters}
        activeFilterCount={activeFilterCount}
      />

      {/* Modal / Sheet de Filtros e Busca */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTrack={selectedTrack}
        setSelectedTrack={setSelectedTrack}
        selectedBuildingFilter={selectedBuildingFilter}
        setSelectedBuildingFilter={setSelectedBuildingFilter}
        showOnlyBookmarks={showOnlyBookmarks}
        setShowOnlyBookmarks={setShowOnlyBookmarks}
        onClearFilters={handleClearFilters}
        resultCount={totalResultsCount}
      />
    </div>
  );
}

export default App;
