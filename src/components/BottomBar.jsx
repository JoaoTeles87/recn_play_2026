import React from 'react';
import { Calendar, Building, MapPin, FileText } from 'lucide-react';

export function BottomBar({
  activeTab,
  setActiveTab
}) {
  return (
    <nav 
      className="fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-lg border-t-2 border-slate-200 shadow-nav-bar safe-bottom" 
      aria-label="Navegação Principal do Aplicativo"
    >
      <div className="max-w-md mx-auto px-2 py-1.5">
        {/* Abas de Navegação Mobile Acessíveis com altura mínima de 48px */}
        <div className="grid grid-cols-4 gap-1 text-[11px] font-bold">
          {/* Aba Programação */}
          <button
            onClick={() => setActiveTab('programacao')}
            aria-label="Ver Programação de Saúde do dia 11"
            className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'programacao'
                ? 'text-emerald-800 bg-emerald-100/90 font-black border border-emerald-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-5 h-5 mb-0.5" />
            <span>Programação</span>
          </button>

          {/* Aba Startups NERD */}
          <button
            onClick={() => setActiveTab('startups')}
            aria-label="Ver Healthtechs e Startups no Prédio 18 NERD"
            className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'startups'
                ? 'text-orange-700 bg-orange-100/90 font-black border border-orange-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Building className="w-5 h-5 mb-0.5" />
            <span>Startups NERD</span>
          </button>

          {/* Aba Mapa e Rotas */}
          <button
            onClick={() => setActiveTab('mapa')}
            aria-label="Ver Mapa Interativo e Rotas a pé"
            className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'mapa'
                ? 'text-purple-800 bg-purple-100/90 font-black border border-purple-300 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <MapPin className="w-5 h-5 mb-0.5" />
            <span>Mapa e Rotas</span>
          </button>

          {/* Aba Docs / Base de Dados */}
          <button
            onClick={() => setActiveTab('docs')}
            aria-label="Consultar Documentação e Base de Dados .md"
            className={`flex flex-col items-center justify-center min-h-[50px] py-1 px-1 rounded-xl transition-all active:scale-95 ${
              activeTab === 'docs'
                ? 'text-indigo-800 bg-indigo-100/90 font-black border border-indigo-300 shadow-sm'
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
