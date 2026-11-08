import React from 'react';
import { Search, X, Filter, Sparkles, Building, Bookmark, Stethoscope, AlertCircle, HeartPulse } from 'lucide-react';

export function TopSearchBar({
  searchQuery,
  setSearchQuery,
  selectedTrack,
  setSelectedTrack,
  selectedBuildingFilter,
  setSelectedBuildingFilter,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  onClearFilters,
  resultCount,
  activeFilterCount
}) {
  const isHealthActive = selectedTrack === 'saude';
  const isNerdActive = selectedBuildingFilter === 18;

  return (
    <section 
      aria-label="Barra de busca e filtros de saúde" 
      className="bg-white border-b-2 border-slate-200 shadow-sm sticky top-[73px] z-20 px-4 py-2 max-w-md mx-auto w-full transition-all"
    >
      {/* Campo de Busca Principal em Saúde */}
      <div className="relative">
        <label htmlFor="top-search-input" className="sr-only">
          Buscar em saúde: temas, SUS, IA médica, MV, Zyloq, AnGV, Ti.Saúde ou palestrantes
        </label>
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-emerald-700 absolute left-3.5 pointer-events-none shrink-0" aria-hidden="true" />
          <input
            id="top-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar em Saúde: SUS, IA Médica, MV, AnGV..."
            className="w-full min-h-[48px] pl-11 pr-12 rounded-xl bg-slate-50 border-2 border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              aria-label="Limpar texto digitado"
              className="absolute right-1 w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-800 rounded-lg active:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Botões de Filtro Focados no Público de Saúde */}
      <div className="flex items-center space-x-2 mt-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Botão Trilha Saúde */}
        <button
          onClick={() => {
            if (isHealthActive) {
              setSelectedTrack('all');
            } else {
              setSelectedTrack('saude');
            }
          }}
          aria-pressed={isHealthActive}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${
            isHealthActive
              ? 'bg-emerald-700 text-white border-emerald-800 shadow-md shadow-emerald-700/25'
              : 'bg-emerald-50 text-emerald-950 border-emerald-300 hover:bg-emerald-100'
          }`}
        >
          <Stethoscope className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>Trilha Saúde</span>
        </button>

        {/* Botão Edifício NERD (Prédio 18 - Startups e Healthtechs) */}
        <button
          onClick={() => {
            if (isNerdActive) {
              setSelectedBuildingFilter(null);
            } else {
              setSelectedBuildingFilter(18);
            }
          }}
          aria-pressed={isNerdActive}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${
            isNerdActive
              ? 'bg-orange-600 text-white border-orange-700 shadow-md shadow-orange-600/25'
              : 'bg-orange-50 text-orange-950 border-orange-300 hover:bg-orange-100'
          }`}
        >
          <Building className="w-4 h-4 shrink-0 text-orange-600" />
          <span>Healthtechs NERD (18)</span>
        </button>

        {/* Botão Salvos / Roteiro */}
        <button
          onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
          aria-pressed={showOnlyBookmarks}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${
            showOnlyBookmarks
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Bookmark className="w-4 h-4 shrink-0 text-amber-500" />
          <span>Meu Roteiro</span>
        </button>

        {/* Botão Limpar Filtros */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            aria-label="Limpar filtros ativos"
            className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold text-emerald-800 bg-emerald-50 border-2 border-emerald-200 hover:bg-emerald-100 whitespace-nowrap active:scale-95 transition-all"
          >
            Limpar ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Linha Informativa Exclusiva do Dia 11 e Contador */}
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 pt-1.5 px-0.5 border-t border-slate-100 mt-1" aria-live="polite">
        <span className="text-emerald-900 flex items-center space-x-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Programação <strong>Exclusiva do Dia 11/11</strong> ({resultCount} itens)</span>
        </span>
        {(searchQuery || isHealthActive || isNerdActive || showOnlyBookmarks) && (
          <span className="text-emerald-700 font-extrabold text-[10px] truncate max-w-[140px]">
            {isHealthActive && 'Saúde '}{isNerdActive && 'NERD 18 '}{searchQuery && `"${searchQuery}"`}
          </span>
        )}
      </div>
    </section>
  );
}
