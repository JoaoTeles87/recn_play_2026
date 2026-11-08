import React from 'react';
import { MapPin, Calendar } from 'lucide-react';

export function StartupCard({ startup, onLocateOnMap }) {
  return (
    <article className="bg-white rounded-2xl p-4 border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Faixa indicadora do Edifício NERD */}
      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-orange-500" />

      {/* Linha superior: Slot em destaque e Data */}
      <div className="flex items-center justify-between pl-1 mb-2">
        <span className="inline-flex items-center px-3 py-1 rounded-xl bg-orange-600 text-white text-xs font-black tracking-wide shadow-sm">
          {startup.slot}
        </span>

        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-300">
          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-500" />
          {startup.date}
        </span>
      </div>

      {/* Nome da Startup e Segmento */}
      <div className="pl-1 mt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-black text-slate-900 group-hover:text-purple-900 transition-colors">
            {startup.name}
          </h3>
          <span className="text-xs font-bold text-purple-900 bg-purple-50 px-2.5 py-1 rounded-lg border border-purple-200">
            {startup.segment}
          </span>
        </div>
      </div>

      {/* Rodapé: Localização na Arena de Negócios / Edifício NERD com botão de 44px */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 pl-1 flex items-center justify-between">
        <div className="flex items-center space-x-2 text-xs text-slate-700">
          <span className="w-6 h-6 rounded-md bg-orange-500 text-white flex items-center justify-center text-xs font-black shrink-0">
            18
          </span>
          <span className="text-xs font-bold text-slate-800 truncate">
            Edifício NERD • Estande
          </span>
        </div>

        <button
          onClick={() => onLocateOnMap(18)}
          className="shrink-0 min-h-[44px] px-3.5 py-2 rounded-xl bg-orange-100 hover:bg-orange-200 text-orange-950 text-xs font-black flex items-center space-x-1.5 border-2 border-orange-300 transition-all active:scale-95"
          title="Ver localização do Edifício NERD no mapa"
        >
          <MapPin className="w-4 h-4 text-orange-700" />
          <span>Ver Prédio 18</span>
        </button>
      </div>

      {/* Tags */}
      {startup.tags && (
        <div className="mt-2 pl-1 flex flex-wrap gap-1.5">
          {startup.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-slate-700 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200 font-bold">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
