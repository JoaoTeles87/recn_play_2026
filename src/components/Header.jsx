import React from 'react';
import { MapPin, Calendar, FileText, ChevronUp, ChevronDown, Sparkles, AlertTriangle, Stethoscope } from 'lucide-react';

export function Header({ activeTab, setActiveTab, isMapCollapsed, setIsMapCollapsed, activeFilterCount }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      {/* Faixa de Destaque: Guia de Saúde Exclusivo do Dia 11/11 */}
      <div className="bg-emerald-700 text-white px-3 py-1.5 shadow-inner">
        <div className="max-w-md mx-auto flex items-center justify-between text-[11px] font-bold">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse shrink-0"></span>
            <span className="truncate">
              <strong>GUIA DE SAÚDE:</strong> Exclusivo do Dia 11 de Novembro (11/11)
            </span>
          </div>
          <span className="text-[10px] bg-emerald-800 text-emerald-100 px-2 py-0.5 rounded-full border border-emerald-600 font-extrabold uppercase shrink-0 ml-1.5">
            Dia Único
          </span>
        </div>
      </div>

      {/* Faixa de Disclaimer: Comunicação Independente */}
      <div className="bg-amber-50 border-b border-amber-200/80 px-3 py-1">
        <div className="max-w-md mx-auto flex items-center justify-between text-[10px] text-amber-900 font-medium">
          <div className="flex items-center space-x-1.5 truncate">
            <AlertTriangle className="w-3 h-3 text-amber-600 shrink-0" />
            <span className="truncate">
              <strong>Guia Independente:</strong> Focado no ecossistema de Saúde do REC'n'Play.
            </span>
          </div>
          <button
            onClick={() => setActiveTab('docs')}
            className="text-[10px] text-amber-800 underline font-bold shrink-0 ml-1.5"
          >
            Base .md
          </button>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-2 flex items-center justify-between">
        {/* Logo / Título do Evento Especializado em Saúde */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-purple-700 flex items-center justify-center text-white shadow-md shadow-emerald-700/25 shrink-0">
            <Stethoscope className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h1 className="text-base font-black tracking-tight text-slate-900 leading-none">
                REC'n'Play <span className="text-emerald-600 font-extrabold">para Saúde</span>
              </h1>
              <span className="text-[10px] font-black px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                11/NOV
              </span>
            </div>
            <p className="text-[11px] font-bold text-slate-600 leading-tight mt-0.5">
              Guia de Saúde, Inovação e Healthtechs
            </p>
          </div>
        </div>

        {/* Botões do Topo */}
        <div className="flex items-center space-x-1.5">
          {/* Botão de Documentação / Base de Dados */}
          <button
            onClick={() => setActiveTab(activeTab === 'docs' ? 'programacao' : 'docs')}
            aria-label="Base de Dados e Documentação de Saúde"
            className={`p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 transition-all ${activeTab === 'docs'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/80'
              }`}
            title="Consultar Documentos e Base de Dados .md"
          >
            <FileText className="w-4 h-4" />
            <span className="hidden sm:inline text-xs font-bold">Docs</span>
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
                <div className="flex items-center space-x-1 text-xs font-medium text-emerald-700">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600" />
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
