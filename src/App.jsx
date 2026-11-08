import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { TopSearchBar } from './components/TopSearchBar';
import { MapView } from './components/MapView';
import { EventCard } from './components/EventCard';
import { StartupCard } from './components/StartupCard';
import { BottomBar } from './components/BottomBar';
import { FilterModal } from './components/FilterModal';
import { DocsView } from './components/DocsView';
import { RoutePlanner } from './components/RoutePlanner';
import { EVENTS, STARTUPS_NERD, BUILDINGS } from './data/mockData';
import { Calendar, Building, AlertCircle, Bookmark, MapPin, ChevronRight, Footprints, Stethoscope, Compass } from 'lucide-react';

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

  // Atualiza hash da URL ao mudar de aba
  useEffect(() => {
    window.location.hash = activeTab;
  }, [activeTab]);

  // Estados do Mapa
  const [selectedBuildingId, setSelectedBuildingId] = useState(null);
  const [isMapCollapsed, setIsMapCollapsed] = useState(false);

  // Estados de Origem e Destino para Navegação
  const [originId, setOriginId] = useState('marco-zero'); // Padrão: Marco Zero (Ponto de chegada natural no Bairro)
  const [destinationId, setDestinationId] = useState('18'); // Padrão: Prédio 18 - Edifício NERD (Healthtechs)

  // Estados de Filtro Simplificados e Focados em Saúde
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('all'); // 'all' | 'saude' | 'tech' | 'negocios'
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
    setSelectedBuildingFilter(null);
    setShowOnlyBookmarks(false);
    setSelectedBuildingId(null);
  };

  const hasActiveFilters = Boolean(
    searchQuery ||
    selectedTrack !== 'all' ||
    selectedBuildingFilter !== null ||
    showOnlyBookmarks
  );

  const activeFilterCount = (searchQuery ? 1 : 0) +
    (selectedTrack !== 'all' ? 1 : 0) +
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

  // Filtro de Eventos focado em acessibilidade e busca
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

      if (selectedBuildingFilter !== null && event.buildingId !== selectedBuildingFilter) {
        return false;
      }

      if (showOnlyBookmarks && !bookmarkedEventIds.includes(event.id)) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedTrack, selectedBuildingFilter, showOnlyBookmarks, bookmarkedEventIds]);

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
        const matchesTags = (st.tags || []).some(t => t.toLowerCase().includes(q));
        if (!matchesName && !matchesSlot && !matchesSegment && !matchesTags) {
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
    <div className="min-h-screen bg-slate-100 flex flex-col font-sans text-slate-900">
      {/* Topo Institucional Mobile-First com Disclaimer */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMapCollapsed={isMapCollapsed}
        setIsMapCollapsed={setIsMapCollapsed}
        activeFilterCount={activeFilterCount}
      />

      {/* PROPOSTA: Filtro e Busca em cima de tudo com alto padrão de acessibilidade */}
      {activeTab !== 'docs' && (
        <TopSearchBar
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
          activeFilterCount={activeFilterCount}
        />
      )}

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
      <main id="content-list-section" className="flex-1 w-full max-w-md mx-auto px-4 pt-3 pb-20">
        {/* Banner de Aviso de Foco Exclusivo em Saúde e Apenas Dia 11/11 */}
        {activeTab !== 'docs' && (
          <div className="bg-emerald-50 border-2 border-emerald-400/80 rounded-2xl p-3.5 mb-3 shadow-sm flex items-start space-x-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 text-xs">
              <div className="flex items-center space-x-1.5 flex-wrap">
                <span className="font-black text-emerald-950 uppercase tracking-wide text-[11px]">
                  Guia do Visitante de Saúde
                </span>
                <span className="bg-emerald-200 text-emerald-950 font-black text-[10px] px-2 py-0.5 rounded-full border border-emerald-300">
                  Apenas Dia 11/11
                </span>
              </div>
              <p className="text-emerald-900 text-xs mt-1 leading-relaxed">
                Este panfleto virtual reúne <strong>exclusivamente as palestras, painéis e startups de Saúde e Gestão do dia 11 de Novembro</strong>. Não contempla a programação dos outros dias do festival.
              </p>
            </div>
          </div>
        )}

        {/* Planejador de Rotas de Origem e Destino (Visível na aba de Mapa) */}
        {activeTab === 'mapa' && (
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
        {/* ABA 1: PROGRAMAÇÃO DO DIA 11 (Foco em Saúde e Acessibilidade) */}
        {/* ============================================================== */}
        {activeTab === 'programacao' && (
          <div className="space-y-3">
            {/* Cabeçalho da Seção */}
            <div className="flex items-center justify-between pb-1 pt-1">
              <div>
                <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-1.5">
                  <Calendar className="w-5 h-5 text-emerald-700" />
                  <span>Palestras de Saúde (11/11)</span>
                </h2>
                <p className="text-xs text-slate-600 font-medium mt-0.5">
                  Programação exclusiva do dia 11: SUS, IA Médica e Gestão
                </p>
              </div>
              <span className="text-xs font-black bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-200">
                {filteredEvents.length} {filteredEvents.length === 1 ? 'atividade' : 'atividades'}
              </span>
            </div>

            {/* Banner de Roteiro Salvo com Botão Grande de Compartilhar no WhatsApp */}
            {showOnlyBookmarks && bookmarkedEventIds.length > 0 && (
              <div className="p-4 bg-amber-50 border-2 border-amber-300 rounded-2xl flex items-center justify-between shadow-sm animate-in fade-in">
                <div>
                  <p className="text-sm font-black text-amber-950">Seu Roteiro Salvo</p>
                  <p className="text-xs text-amber-900 mt-0.5">{bookmarkedEventIds.length} atividades salvas para o dia 11</p>
                </div>
                <button
                  onClick={handleShareBookmarks}
                  className="min-h-[44px] px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-black flex items-center space-x-1.5 shadow-md shadow-emerald-600/30 transition-all"
                >
                  <span>WhatsApp</span>
                </button>
              </div>
            )}

            {/* Card Destaque Acessível para Edifício NERD (Prédio 18 - Canto Inferior Esquerdo) */}
            {!selectedBuildingFilter && (
              <div 
                onClick={() => handleLocateOnMap(18)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleLocateOnMap(18)}
                className="cursor-pointer bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white p-4 rounded-2xl shadow-md flex items-center justify-between hover:brightness-105 active:scale-[0.99] transition-all min-h-[56px]"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-base shrink-0">
                    18
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-wider text-orange-200">
                      Ponto Central das HealthTechs
                    </p>
                    <p className="text-sm font-black leading-tight">
                      Arena de Negócios – Edifício NERD
                    </p>
                    <p className="text-xs text-orange-100 mt-0.5">
                      Palcos Asa Branca, Carcará e estandes das startups
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-6 h-6 text-white shrink-0 ml-2" />
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
              <div className="text-center py-10 px-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-base font-black text-slate-900">Nenhuma palestra encontrada</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-xs mx-auto">
                  Tente alterar seus termos de busca ou clique no botão abaixo para restaurar todos os eventos de saúde.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 min-h-[48px] px-6 py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black shadow-md active:scale-95 transition-all"
                >
                  Ver Todos os Eventos
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
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm">
              <div className="flex items-center space-x-2 text-xs font-extrabold text-orange-600 uppercase tracking-wide">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>
                <span>Prédio 18 • Arena Pernambuco de Negócios (NERD)</span>
              </div>
              <h2 className="text-base font-black text-slate-900 mt-1">
                Startups de Saúde, Biotech e Vet (Dia 11/11)
              </h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                Expositores de saúde humana, animal, diagnósticos e biotecnologia mapeados na Arena NERD (canto inferior esquerdo do mapa). No <strong>dia 11/11</strong>, essas startups estarão ativas nos seus respectivos slots de exposição.
              </p>

              {/* Seletor de Dia com Botões Acessíveis (Touch-friendly 44px) */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-black text-slate-700">Exposição:</span>
                <div className="flex space-x-1.5">
                  <button
                    onClick={() => setStartupDayFilter('11')}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
                      startupDayFilter === '11'
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
                    }`}
                  >
                    Dia 11 (Principal)
                  </button>
                  <button
                    onClick={() => setStartupDayFilter('all')}
                    className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black transition-all active:scale-95 ${
                      startupDayFilter === 'all'
                        ? 'bg-slate-800 text-white shadow-md'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-300'
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
              <div className="text-center py-10 px-4 bg-white rounded-2xl border-2 border-slate-200 shadow-sm">
                <AlertCircle className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                <h3 className="text-base font-black text-slate-900">Nenhuma startup encontrada</h3>
                <p className="text-xs text-slate-600 mt-1">
                  Verifique a busca ou limpe os filtros para visualizar a lista completa.
                </p>
                <button
                  onClick={handleClearFilters}
                  className="mt-4 min-h-[48px] px-6 py-2.5 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black shadow-md active:scale-95 transition-all"
                >
                  Ver Todas as Startups
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
            <div className="bg-white rounded-2xl p-4 border-2 border-slate-200 shadow-sm">
              <h2 className="text-base font-black text-slate-900 flex items-center space-x-1.5">
                <MapPin className="w-5 h-5 text-purple-700" />
                <span>Navegação e Distâncias a Pé no Bairro</span>
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Utilize o seletor acima para traçar a rota a pé entre quaisquer dois locais do evento, ou toque em um polo abaixo para traçar a rota:
              </p>
            </div>

            {/* Lista dos Prédios Mapeados */}
            <div className="space-y-2.5">
              {BUILDINGS.map(b => (
                <div
                  key={b.id}
                  onClick={() => {
                    setDestinationId(String(b.id));
                    handleLocateOnMap(b.id);
                  }}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleLocateOnMap(b.id)}
                  className={`p-3.5 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between min-h-[54px] ${
                    selectedBuildingId === b.id
                      ? 'bg-purple-50 border-purple-500 shadow-sm'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <span className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs text-white shrink-0 ${
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
                        <h3 className="text-xs font-black text-slate-900 leading-tight">
                          {b.name}
                        </h3>
                        {b.id === 18 && (
                          <span className="text-[10px] bg-orange-100 text-orange-900 font-extrabold px-1.5 py-0.2 rounded">
                            NERD
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{b.address}</p>
                      <p className="text-[11px] text-cyan-700 font-extrabold mt-1 flex items-center">
                        <Footprints className="w-3.5 h-3.5 mr-1" />
                        {b.walkTimeFromNerd} ({b.walkDist})
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-slate-400 shrink-0 ml-2" />
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

      {/* Barra Inferior Fixa (Bottom Navigation) Limpa e Focada em Abas */}
      <BottomBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
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
