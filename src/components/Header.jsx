import React from 'react';
import { MapPin, Calendar, FileText, ChevronUp, ChevronDown, Sparkles, AlertTriangle } from 'lucide-react';

export function Header({ activeTab, setActiveTab, isMapCollapsed, setIsMapCollapsed, activeFilterCount }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Faixa de Disclaimer: Comunicação Não Oficial com Transparência */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-3 py-1">
        <div className="max-w-md mx-auto flex items-center justify-between text-[10px] text-amber-900 font-medium">
          <div className="flex items-center space-x-1.5 truncate">
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">
              <strong>Guia Independente:</strong> Não é canal de comunicação oficial do REC'n'Play.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('docs')}
            className="text-[10px] text-amber-800 underline font-bold shrink-0 ml-1.5"
          >
            Saiba mais
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo / Título do Evento */}
        <div className="flex items-center space-x-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-purple-600/20 font-black text-sm tracking-wider">
            R'P
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 leading-none">
                REC'n'Play <span className="text-purple-600">2026</span>
              </h1>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200 uppercase tracking-wide">
                11/NOV
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-tight mt-0.5">
              Guia Saúde, Gestão e Negócios
            </p>
          </div>
        </div>

        {/* Botões do Topo */}
        <div className="flex items-center space-x-1.5">
          {/* Botão de Documentação / Base de Dados */}
          <button
            onClick={() => setActiveTab(activeTab === 'docs' ? 'programacao' : 'docs')}
            aria-label="Base de Dados e Documentação"
            className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${
              activeTab === 'docs'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
            }`}
            title="Consultar Documentos e Base de Dados .md"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Docs</span>
          </button>

          {/* Toggle de Recolher Mapa (se não estiver na aba docs) */}
          {activeTab !== 'docs' && activeTab !== 'mapa' && (
            <button
              onClick={() => setIsMapCollapsed(!isMapCollapsed)}
              className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200/80 text-slate-700 transition-all flex items-center justify-center"
              title={isMapCollapsed ? "Expandir Mapa" : "Recolher Mapa"}
              aria-label={isMapCollapsed ? "Expandir Mapa" : "Recolher Mapa"}
            >
              {isMapCollapsed ? (
                <div className="flex items-center space-x-1 text-xs font-medium text-purple-700">
                  <MapPin className="w-3.5 h-3.5 text-purple-600" />
                  <ChevronDown className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="flex items-center space-x-1 text-xs font-medium text-slate-600">
                  <ChevronUp className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
