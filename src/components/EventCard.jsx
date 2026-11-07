import React from 'react';
import { Clock, MapPin, Users, Bookmark, BookmarkCheck, Sparkles, Building2 } from 'lucide-react';
import { BUILDINGS } from '../data/mockData';

export function EventCard({ event, onLocateOnMap, isBookmarked, onToggleBookmark }) {
  const building = BUILDINGS.find(b => b.id === event.buildingId);

  // Cores dinâmicas para a tag da trilha
  const getTrackBadgeStyle = (track) => {
    switch (track) {
      case 'saude':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'tech':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'negocios':
        return 'bg-orange-50 text-orange-800 border-orange-200';
      default:
        return 'bg-slate-50 text-slate-800 border-slate-200';
    }
  };

  return (
    <article className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-mobile-card hover:shadow-md transition-all relative overflow-hidden group">
      {/* Faixa lateral indicadora sutil */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-1 ${
          event.buildingId === 18 
            ? 'bg-orange-500' 
            : event.track === 'saude' 
            ? 'bg-emerald-500' 
            : 'bg-purple-600'
        }`} 
      />

      {/* Cabeçalho do Card: Horário, Trilha e Favorito */}
      <div className="flex items-center justify-between pl-1 mb-2">
        <div className="flex items-center space-x-2">
          {/* Badge Horário */}
          <span className="inline-flex items-center px-2 py-0.5 rounded-lg bg-slate-900 text-white text-[11px] font-bold tracking-tight">
            <Clock className="w-3 h-3 mr-1 text-orange-400" />
            {event.time}
          </span>

          {/* Badge Trilha */}
          <span className={`inline-flex items-center px-2 py-0.5 rounded-lg text-[10px] font-bold border ${getTrackBadgeStyle(event.track)}`}>
            {event.trackLabel}
          </span>
        </div>

        {/* Botão de Favoritar */}
        <button
          onClick={() => onToggleBookmark(event.id)}
          aria-label={isBookmarked ? "Remover dos favoritos" : "Salvar palestra nos favoritos"}
          className={`p-1.5 rounded-lg transition-all ${
            isBookmarked
              ? 'text-orange-500 bg-orange-50 hover:bg-orange-100'
              : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'
          }`}
          title={isBookmarked ? "Salvo em meu roteiro" : "Salvar em meu roteiro"}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-4 h-4 fill-orange-500" />
          ) : (
            <Bookmark className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* Título do Evento */}
      <h3 className="text-sm font-bold text-slate-900 pl-1 leading-snug group-hover:text-purple-900 transition-colors">
        {event.title}
      </h3>

      {/* Palestrantes / Participantes */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="mt-2 pl-1 flex items-start space-x-1.5 text-xs text-slate-700">
          <Users className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {event.speakers.map((spk, idx) => (
              <span 
                key={idx}
                className="inline-block bg-slate-100 text-slate-700 text-[11px] px-1.5 py-0.5 rounded font-medium"
              >
                {spk}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Descrição resumida */}
      {event.description && (
        <p className="mt-2 pl-1 text-[11px] text-slate-600 leading-relaxed line-clamp-2">
          {event.description}
        </p>
      )}

      {/* Rodapé: Local e Ação "Ver no Mapa" */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 pl-1 flex items-center justify-between">
        <div className="flex items-center space-x-1.5 min-w-0 pr-2">
          <span className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-black text-white shrink-0 ${
            event.buildingId === 18 ? 'bg-orange-500' : 'bg-purple-700'
          }`}>
            {building?.code || 'P'}
          </span>
          <span className="text-[11px] font-medium text-slate-700 truncate" title={event.location}>
            {event.location}
          </span>
        </div>

        <button
          onClick={() => onLocateOnMap(event.buildingId)}
          className="shrink-0 px-2.5 py-1 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-800 text-[11px] font-bold flex items-center space-x-1 border border-purple-200 transition-all active:scale-95"
          title="Localizar prédio no mapa"
        >
          <MapPin className="w-3 h-3 text-purple-600" />
          <span>Ver no Mapa</span>
        </button>
      </div>

      {/* Tags de Apoio */}
      {event.tags && (
        <div className="mt-2 pl-1 flex flex-wrap gap-1">
          {event.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-slate-500 font-medium bg-slate-50 px-1.5 py-0.2 rounded border border-slate-100">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}

