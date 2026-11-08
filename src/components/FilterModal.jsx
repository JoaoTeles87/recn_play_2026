import React from 'react';
import { Search, X, Filter, RotateCcw, Check, Building, Sparkles } from 'lucide-react';
import { BUILDINGS } from '../data/mockData';

export function FilterModal({
  isOpen,
  onClose,
  searchQuery,
  setSearchQuery,
  selectedTrack,
  setSelectedTrack,
  selectedBuildingFilter,
  setSelectedBuildingFilter,
  showOnlyBookmarks,
  setShowOnlyBookmarks,
  onClearFilters,
  resultCount
}) {
  if (!isOpen) return null;

  const tracks = [
    { id: 'all', label: 'Todas as Trilhas' },
    { id: 'saude', label: '🏥 Saúde e Bem-Estar' },
    { id: 'tech', label: '💻 Inteligência Artificial e Tech' },
    { id: 'negocios', label: '📈 Negócios e Gestão' }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-md bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col animate-in slide-in-from-bottom duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Barra superior de arrasto e título */}
        <div className="pt-3 pb-2 px-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
              <Filter className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 leading-none">
                Filtrar Programação e Startups
              </h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {resultCount} {resultCount === 1 ? 'resultado encontrado' : 'resultados encontrados'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
            aria-label="Fechar filtros"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conteúdo rolável */}
        <div className="p-5 space-y-4 overflow-y-auto flex-1">
          {/* Campo de Busca Textual */}
          <div>
            <label className="block text-xs font-bold text-slate-800 mb-1.5">
              Buscar por Palavra-chave, Palestrante ou Startup
            </label>
              <div className="relative flex items-center">
                <Search className="w-5 h-5 text-slate-400 absolute left-3.5 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Busque por IA, empresas..."
                  className="w-full min-h-[48px] pl-11 pr-11 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs font-semibold text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    aria-label="Limpar termo de busca"
                    className="absolute right-1 w-11 h-11 flex items-center justify-center text-slate-400 hover:text-slate-600 rounded-lg active:bg-slate-200"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Filtro por Trilha Temática */}
            <div>
              <label className="block text-xs font-bold text-slate-800 mb-1.5">
                Trilha Temática
              </label>
                <div className="grid grid-cols-2 gap-2">
                  {tracks.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setSelectedTrack(t.id)}
                      className={`min-h-[44px] py-2 px-3 rounded-xl text-xs font-bold text-left border-2 transition-all flex items-center justify-between active:scale-95 ${selectedTrack === t.id
                          ? 'bg-purple-700 text-white border-purple-800 shadow-sm'
                          : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-purple-50'
                        }`}
                    >
                      <span className="truncate">{t.label}</span>
                      {selectedTrack === t.id && <Check className="w-4 h-4 shrink-0 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filtro por Prédio / Polo */}
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1.5">
                  Localização / Prédio do Evento
                </label>
                <select
                  value={selectedBuildingFilter || ''}
                  onChange={(e) => setSelectedBuildingFilter(e.target.value ? Number(e.target.value) : null)}
                  className="w-full min-h-[48px] px-3.5 rounded-xl bg-slate-50 border-2 border-slate-300 text-xs text-slate-800 font-semibold focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                >
                  <option value="">Todos os Prédios e Polos</option>
                  <option value="18">Prédio 18 – Arena de Negócios / Edifício NERD (Startups)</option>
                  <option value="7">Prédio 07 – Ti.Saúde</option>
                  <option value="8">Prédio 08 – E.T.E Porto Digital</option>
                  <option value="14">Prédio 14 – CESAR School</option>
                  <option value="26">Prédio 26 – Moinho Recife (TDC Stage)</option>
                  <option value="28">Prédio 28 – Accenture Innovation Center</option>
                  <option value="16">Prédio 16 – Moeda 50</option>
                  <option value="13">Prédio 13 – Senac</option>
                  <option value="1">Prédio 01 – Livraria Jaqueira</option>
                  <option value="9">Prédio 09 – Ponto BB</option>
                </select>
              </div>

              {/* Filtro Somente Favoritos */}
              <div className="pt-1">
                  <label className="flex items-center space-x-3 cursor-pointer min-h-[48px] px-3 py-2 rounded-xl bg-slate-50 border-2 border-slate-200 hover:bg-purple-50 transition-colors">
                    <input
                      type="checkbox"
                      checked={showOnlyBookmarks}
                      onChange={(e) => setShowOnlyBookmarks(e.target.checked)}
                      className="w-5 h-5 rounded text-purple-600 focus:ring-purple-500 border-slate-300"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      ⭐ Mostrar apenas atividades salvas (Meu Roteiro)
                    </span>
                  </label>
              </div>
            </div>

              {/* Rodapé de Ações: Aplicar e Limpar com 48px de altura */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center space-x-2.5">
                <button
                  onClick={onClearFilters}
                  className="flex-1 min-h-[48px] px-3 rounded-xl bg-white border-2 border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-black flex items-center justify-center space-x-1.5 transition-all active:scale-95 shadow-sm"
                >
                  <RotateCcw className="w-4 h-4 text-slate-500" />
                  <span>LIMPAR FILTROS</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 min-h-[48px] px-3 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-black flex items-center justify-center space-x-1.5 shadow-md shadow-purple-700/20 transition-all active:scale-95"
                >
                  <span>VER RESULTADOS ({resultCount})</span>
                </button>
              </div>
            </div>
          </div>
          );
}

