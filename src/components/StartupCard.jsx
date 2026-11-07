import React from 'react';
import { Building, MapPin, Tag, Calendar, ExternalLink } from 'lucide-react';

export function StartupCard({ startup, onLocateOnMap }) {
  return (
    <article className="bg-white rounded-2xl p-3.5 border border-slate-200/90 shadow-mobile-card hover:shadow-md transition-all relative overflow-hidden group">
      {/* Faixa indicadora do Edifício NERD */}
      <div className="absolute top-0 left-0 bottom-0 w-1 bg-orange-500" />

      {/* Linha superior: Slot em destaque e Data */}
      <div className="flex items-center justify-between pl-1 mb-1.5">
        <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-orange-600 text-white text-xs font-black tracking-wide shadow-sm">
          {startup.slot}
        </span>

        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 border border-slate-200">
          <Calendar className="w-2.5 h-2.5 mr-1 text-slate-400" />
          {startup.date}
        </span>
      </div>

      {/* Nome da Startup e Segmento */}
      <div className="pl-1 mt-1">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-slate-900 group-hover:text-purple-900 transition-colors">
            {startup.name}
          </h3>
          <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
            {startup.segment}
          </span>
        </div>
      </div>

      {/* Rodapé: Localização na Arena de Negócios / Edifício NERD */}
      <div className="mt-2.5 pt-2 border-t border-slate-100 pl-1 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 text-xs text-slate-600">
          <span className="w-5 h-5 rounded bg-orange-500 text-white flex items-center justify-center text-[10px] font-black shrink-0">
            18
          </span>
          <span className="text-[11px] font-medium text-slate-700 truncate">
            Edifício NERD • Estande de Negócios
          </span>
        </div>

        <button
          onClick={() => onLocateOnMap(18)}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-900 text-[11px] font-bold flex items-center space-x-1 border border-orange-200 transition-all active:scale-95"
          title="Ver localização do Edifício NERD no mapa"
        >
          <MapPin className="w-3 h-3 text-orange-600" />
          <span>Ver Prédio 18</span>
        </button>
      </div>

      {/* Tags */}
      {startup.tags && (
        <div className="mt-2 pl-1 flex flex-wrap gap-1">
          {startup.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-slate-500 bg-slate-50 px-1.5 py-0.2 rounded border border-slate-100 font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
