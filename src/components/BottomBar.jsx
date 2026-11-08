import React from 'react';
import { Search, RotateCcw, Calendar, Building, MapPin, FileText } from 'lucide-react';

export function BottomBar({
  activeTab,
  setActiveTab,
  onOpenFilter,
  onClearFilters,
  hasActiveFilters,
  activeFilterCount
}) {
  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-slate-200 shadow-nav-bar safe-bottom" aria-label="Navegação Principal do Aplicativo">
      <div className="max-w-md mx-auto px-3 pt-2 pb-2">
        {/* Linha 1: Botões Principais de Ação Acessíveis [ BUSCAR / FILTRAR ] e [ LIMPAR ] */}
        <div className="flex items-center space-x-2 mb-2">
          {/* Botão BUSCAR / FILTRAR com 48px de altura mínima */}
          <button
            onClick={onOpenFilter}
            aria-label="Abrir busca detalhada e filtros"
            className="flex-1 min-h-[48px] px-4 rounded-xl bg-purple-700 hover:bg-purple-800 active:scale-[0.98] text-white text-xs font-black flex items-center justify-center space-x-2 shadow-md shadow-purple-700/25 transition-all"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>BUSCAR / FILTRAR</span>
            {hasActiveFilters && (
              <span className="w-5 h-5 rounded-full bg-orange-500 text-white text-[10px] font-black flex items-center justify-center ml-1 shrink-0">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Botão LIMPAR com 48px de altura mínima */}
          <button
            onClick={onClearFilters}
            aria-label="Limpar todos os filtros aplicados"
            disabled={!hasActiveFilters}
            className={`min-h-[48px] px-4 rounded-xl text-xs font-extrabold flex items-center justify-center space-x-1.5 transition-all active:scale-[0.98] ${
              hasActiveFilters
                ? 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-2 border-slate-300'
                : 'bg-slate-50 text-slate-400 border border-slate-200 cursor-not-allowed opacity-60'
            }`}
          >
            <RotateCcw className="w-4 h-4 shrink-0" />
            <span>LIMPAR</span>
          </button>
        </div>

        {/* Linha 2: Abas de Navegação Mobile com 48px de altura mínima */}
        <div className="grid grid-cols-4 gap-1 pt-1.5 border-t border-slate-200 text-[11px] font-bold">
          {/* Aba Programação */}
          <button
            onClick={() => setActiveTab('programacao')}
            aria-label="Ver Programação do dia 11"
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'programacao'
                ? 'text-purple-800 bg-purple-100/90 font-black border border-purple-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span>Programação</span>
          </button>

          {/* Aba Startups NERD */}
          <button
            onClick={() => setActiveTab('startups')}
            aria-label="Ver Startups no Prédio 18 NERD"
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'startups'
                ? 'text-orange-700 bg-orange-100/90 font-black border border-orange-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-5 h-5 mb-0.5" />
            <span>Startups NERD</span>
          </button>

          {/* Aba Mapa Oficial */}
          <button
            onClick={() => setActiveTab('mapa')}
            aria-label="Ver Mapa Interativo e Rotas"
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'mapa'
                ? 'text-purple-800 bg-purple-100/90 font-black border border-purple-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-5 h-5 mb-0.5" />
            <span>Mapa Geral</span>
          </button>

          {/* Aba Docs / Base de Dados */}
          <button
            onClick={() => setActiveTab('docs')}
            aria-label="Ver Documentação e Referências"
            className={`flex flex-col items-center justify-center min-h-[48px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'docs'
                ? 'text-indigo-800 bg-indigo-100/90 font-black border border-indigo-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-5 h-5 mb-0.5" />
            <span>Base Docs</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

