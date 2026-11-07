import React from 'react';
import { Search, RotateCcw, Calendar, Building, MapPin, FileText, Filter } from 'lucide-react';

export function BottomBar({
  activeTab,
  setActiveTab,
  onOpenFilter,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount
}) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-nav-bar safe-bottom">
      <div className="max-w-md mx-auto px-3 pt-2 pb-2">
        {/* Linha 1: Botões Principais de Ação Requisitados [ BUSCAR / FILTRAR ] e [ LIMPAR ] */}
        <div className="flex items-center space-x-2 mb-2">
          {/* Botão BUSCAR / FILTRAR */}
          <button
            onClick={onOpenFilter}
            aria-label="Abrir busca e filtros"
            className="flex-1 py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white text-xs font-black flex items-center justify-center space-x-2 shadow-md shadow-purple-700/25 transition-all"
          >
            <Search className="w-3.5 h-3.5" />
            <span>BUSCAR / FILTRAR</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center ml-1">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Botão LIMPAR */}
          <button
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros"
            disabled={!hasActiveFilters}
            className={`py-2 px-3.5 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98] ${
              hasActiveFilters
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300'
                : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed opacity-70'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>LIMPAR</span>
          </button>
        </div>

        {/* Linha 2: Abas de Conteúdo Mobile */}
        <div className="grid grid-cols-4 gap-1 pt-1 border-t border-slate-100 text-[10px] font-bold">
          {/* Aba Programação */}
          <button
            onClick={() => setActiveTab('programacao')}
            className={`flex flex-col items-center py-1 rounded-lg transition-all ${
              activeTab === 'programacao'
                ? 'text-purple-700 bg-purple-50/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-4 h-4 mb-0.5" />
            <span>Programação</span>
          </button>

          {/* Aba Startups NERD */}
          <button
            onClick={() => setActiveTab('startups')}
            className={`flex flex-col items-center py-1 rounded-lg transition-all ${
              activeTab === 'startups'
                ? 'text-orange-600 bg-orange-50/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Building className="w-4 h-4 mb-0.5" />
            <span>Startups NERD</span>
          </button>

          {/* Aba Mapa Oficial */}
          <button
            onClick={() => setActiveTab('mapa')}
            className={`flex flex-col items-center py-1 rounded-lg transition-all ${
              activeTab === 'mapa'
                ? 'text-purple-700 bg-purple-50/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MapPin className="w-4 h-4 mb-0.5" />
            <span>Mapa Geral</span>
          </button>

          {/* Aba Docs / Base de Dados */}
          <button
            onClick={() => setActiveTab('docs')}
            className={`flex flex-col items-center py-1 rounded-lg transition-all ${
              activeTab === 'docs'
                ? 'text-indigo-700 bg-indigo-50/80 font-black'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <FileText className="w-4 h-4 mb-0.5" />
            <span>Base Docs</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

