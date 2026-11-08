import React from 'react';
import { Clock, MapPin, Users, Bookmark, BookmarkCheck } from 'lucide-react';
import { BUILDINGS } from '../data/mockData';

export function EventCard({ event, onLocateOnMap, isBookmarked, onToggleBookmark }) {
  const building = BUILDINGS.find(b => b.id === event.buildingId);

  // Cores dinâmicas com alto contraste acessível
  const getTrackBadgeStyle = (track) => {
    switch (track) {
      case 'saude':
        return 'bg-emerald-100 text-emerald-950 border-emerald-300';
      case 'tech':
        return 'bg-purple-100 text-purple-950 border-purple-300';
      case 'negocios':
        return 'bg-orange-100 text-orange-950 border-orange-300';
      default:
        return 'bg-slate-100 text-slate-900 border-slate-300';
    }
  };

  return (
    <article className="bg-white rounded-2xl p-4 border-2 border-slate-200/90 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
      {/* Faixa lateral indicadora sutil */}
      <div 
        className={`absolute top-0 left-0 bottom-0 w-1.5 ${
          event.buildingId === 18 
            ? 'bg-orange-500' 
            : event.track === 'saude' 
            ? 'bg-emerald-600' 
            : 'bg-purple-700'
        }`} 
      />

      {/* Cabeçalho do Card: Horário, Trilha e Favorito com Área Acessível de 44px */}
      <div className="flex items-center justify-between pl-1 mb-2">
        <div className="flex items-center space-x-2">
          {/* Badge Horário */}
          <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-black tracking-tight">
            <Clock className="w-3.5 h-3.5 mr-1 text-orange-400" />
            {event.time}
          </span>

          {/* Badge Trilha */}
          <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-black border ${getTrackBadgeStyle(event.track)}`}>
            {event.trackLabel}
          </span>
        </div>

        {/* Botão de Favoritar Touch-Friendly (44x44px) */}
        <button
          onClick={() => onToggleBookmark(event.id)}
          aria-label={isBookmarked ? "Remover dos favoritos" : "Salvar palestra nos favoritos"}
          className={`w-11 h-11 rounded-xl flex items-center justify-center transition-all active:scale-95 border ${
            isBookmarked
              ? 'text-orange-600 bg-orange-50 border-orange-300 shadow-sm'
              : 'text-slate-400 hover:text-slate-700 bg-slate-50 border-slate-200 hover:bg-slate-100'
          }`}
          title={isBookmarked ? "Salvo em meu roteiro" : "Salvar em meu roteiro"}
        >
          {isBookmarked ? (
            <BookmarkCheck className="w-5 h-5 fill-orange-500" />
          ) : (
            <Bookmark className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Título do Evento */}
      <h3 className="text-sm font-black text-slate-900 pl-1 leading-snug group-hover:text-purple-900 transition-colors">
        {event.title}
      </h3>

      {/* Palestrantes / Participantes */}
      {event.speakers && event.speakers.length > 0 && (
        <div className="mt-2 pl-1 flex items-start space-x-1.5 text-xs text-slate-800">
          <Users className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
          <div className="flex flex-wrap gap-1">
            {event.speakers.map((spk, idx) => (
              <span 
                key={idx}
                className="inline-block bg-slate-100 text-slate-800 text-xs px-2 py-0.5 rounded-md font-bold border border-slate-200"
              >
                {spk}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Descrição resumida com contraste melhorado */}
      {event.description && (
        <p className="mt-2 pl-1 text-xs text-slate-600 leading-relaxed">
          {event.description}
        </p>
      )}

      {/* Rodapé: Local e Ação "Ver no Mapa" com Área Touch-Friendly de 44px */}
      <div className="mt-3.5 pt-2.5 border-t border-slate-100 pl-1 flex items-center justify-between">
        <div className="flex items-center space-x-2 min-w-0 pr-2">
          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-black text-white shrink-0 ${
            event.buildingId === 18 ? 'bg-orange-500' : 'bg-purple-700'
          }`}>
            {building?.code || 'P'}
          </span>
          <span className="text-xs font-bold text-slate-800 truncate" title={event.location}>
            {event.location}
          </span>
        </div>

        <button
          onClick={() => onLocateOnMap(event.buildingId)}
          className="shrink-0 min-h-[44px] px-3.5 py-2 rounded-xl bg-purple-100 hover:bg-purple-200 text-purple-950 text-xs font-black flex items-center space-x-1.5 border-2 border-purple-300 transition-all active:scale-95"
          title="Localizar prédio no mapa"
        >
          <MapPin className="w-4 h-4 text-purple-700" />
          <span>Ver no Mapa</span>
        </button>
      </div>

      {/* Tags de Apoio */}
      {event.tags && (
        <div className="mt-2 pl-1 flex flex-wrap gap-1">
          {event.tags.map((tag, i) => (
            <span key={i} className="text-[10px] text-slate-600 font-bold bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
              #{tag}
            </span>
          ))}
        </div>
      )}
    </article>
  );
}
