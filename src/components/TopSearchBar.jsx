import React from 'react';
import { Search, X, Filter, Sparkles, Building, Bookmark, Stethoscope, Layers } from 'lucide-react';

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
      aria-label="Barra de busca e filtros acessíveis"
      className="bg-white border-b border-slate-200/90 shadow-sm sticky top-[73px] z-20 px-4 py-2.5 max-w-md mx-auto w-full transition-all"
    >
      {/* Campo de Busca Principal - Altura Acessível de 48px para Toque Confortável */}
      <div className="relative">
        <label htmlFor="top-search-input" className="sr-only">
          Buscar palestras, startups de saúde, palestrantes ou temas
        </label>
        <div className="relative flex items-center">
          <Search className="w-5 h-5 text-purple-700 absolute left-3.5 pointer-events-none shrink-0" aria-hidden="true" />
          <input
            id="top-search-input"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar saúde, palestrante..."
            className="w-full min-h-[48px] pl-11 pr-12 rounded-xl bg-slate-50 border-2 border-slate-300 text-sm font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-purple-600 transition-all"
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

      {/* Botões Rápidos e Acessíveis com Foco no que o Visitante de Saúde Procura */}
      <div className="flex items-center space-x-2 mt-2 overflow-x-auto pb-1 scrollbar-none">
        {/* Botão Foco em Saúde (Destaque Principal) */}
        <button
          onClick={() => {
            if (isHealthActive) {
              setSelectedTrack('all');
            } else {
              setSelectedTrack('saude');
            }
          }}
          aria-pressed={isHealthActive}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${isHealthActive
              ? 'bg-emerald-600 text-white border-emerald-700 shadow-md shadow-emerald-600/25'
              : 'bg-emerald-50 text-emerald-900 border-emerald-300 hover:bg-emerald-100'
            }`}
        >
          <Stethoscope className="w-4 h-4 shrink-0" />
          <span>Foco Saúde</span>
        </button>

        {/* Botão Edifício NERD (Prédio 18 - Arena de Negócios e Startups) */}
        <button
          onClick={() => {
            if (isNerdActive) {
              setSelectedBuildingFilter(null);
            } else {
              setSelectedBuildingFilter(18);
            }
          }}
          aria-pressed={isNerdActive}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${isNerdActive
              ? 'bg-orange-600 text-white border-orange-700 shadow-md shadow-orange-600/25'
              : 'bg-orange-50 text-orange-950 border-orange-300 hover:bg-orange-100'
            }`}
        >
          <Building className="w-4 h-4 shrink-0" />
          <span>Edifício NERD (18)</span>
        </button>

        {/* Botão Salvos / Favoritos */}
        <button
          onClick={() => setShowOnlyBookmarks(!showOnlyBookmarks)}
          aria-pressed={showOnlyBookmarks}
          className={`min-h-[44px] px-3 py-2 rounded-xl text-xs font-black flex items-center space-x-1.5 whitespace-nowrap transition-all border-2 active:scale-95 ${showOnlyBookmarks
              ? 'bg-amber-500 text-white border-amber-600 shadow-md'
              : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
            }`}
        >
          <Bookmark className="w-4 h-4 shrink-0" />
          <span>Salvos</span>
        </button>

        {/* Botão Limpar Tudo (aparece se houver algum filtro ativo) */}
        {activeFilterCount > 0 && (
          <button
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros ativos"
            className="min-h-[44px] px-3 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 border-2 border-purple-200 hover:bg-purple-100 whitespace-nowrap active:scale-95 transition-all"
          >
            Limpar ({activeFilterCount})
          </button>
        )}
      </div>

      {/* Indicador de Resultados em Texto Acessível para Leitores de Tela */}
      <div className="flex items-center justify-between text-[11px] font-bold text-slate-600 pt-1 px-0.5" aria-live="polite">
        <span>
          {resultCount} {resultCount === 1 ? 'resultado disponível' : 'resultados disponíveis'}
        </span>
        {(searchQuery || isHealthActive || isNerdActive || showOnlyBookmarks) && (
          <span className="text-purple-700 font-extrabold text-[10px]">
            Filtrando: {isHealthActive && 'Saúde '}{isNerdActive && 'Prédio 18 '}{searchQuery && `"${searchQuery}"`}
          </span>
        )}
      </div>
    </section>
  );
}

