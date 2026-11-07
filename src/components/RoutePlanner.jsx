import React from 'react';
import { ALL_LOCATIONS, calculateCustomRoute } from '../data/mockData';
import { Navigation, ArrowUpDown, Footprints, MapPin, Compass, CheckCircle2, Zap } from 'lucide-react';

export function RoutePlanner({
  originId,
  setOriginId,
  destinationId,
  setDestinationId,
  onShowOnMap
}) {
  const route = calculateCustomRoute(originId, destinationId);

  const handleSwap = () => {
    const temp = originId;
    setOriginId(destinationId);
    setDestinationId(temp);
  };

  const quickRoutes = [
    { name: 'NERD (18) ➔ Moinho (26)', from: '18', to: '26' },
    { name: 'Marco Zero ➔ NERD (18)', from: 'marco-zero', to: '18' },
    { name: 'NERD (18) ➔ Ti.Saúde (07)', from: '18', to: '7' },
    { name: 'NERD (18) ➔ CESAR School (14)', from: '18', to: '14' },
    { name: 'NERD (18) ➔ Posto Médico Sul (PS)', from: '18', to: 'ps-sul' }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-mobile-card mb-4">
      {/* Cabeçalho do Planejador */}
      <div className="flex items-center justify-between pb-2 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <Compass className="w-4 h-4 text-cyan-700" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900 leading-tight">
              Traçar Rota a Pé no Bairro
            </h3>
            <p className="text-[10px] text-slate-500">
              Escolha sua origem e destino no festival
            </p>
          </div>
        </div>

        <button
          onClick={handleSwap}
          className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center space-x-1 transition-all active:scale-95"
          title="Inverter origem e destino"
        >
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-600" />
          <span className="hidden sm:inline">Inverter</span>
        </button>
      </div>

      {/* Formulário com Selects Otimizados para Smartphone */}
      <div className="space-y-2.5">
        {/* Campo Origem */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block mr-1.5"></span>
            Ponto de Partida (Origem)
          </label>
          <div className="relative">
            <select
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none pr-8 transition-all"
            >
              {ALL_LOCATIONS.map((loc) => (
                <option key={`orig-${loc.id}`} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <MapPin className="w-4 h-4 text-emerald-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Campo Destino */}
        <div>
          <label className="block text-[10px] font-extrabold uppercase tracking-wider text-slate-500 mb-1 flex items-center">
            <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block mr-1.5"></span>
            Para onde você vai (Destino)
          </label>
          <div className="relative">
            <select
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none pr-8 transition-all"
            >
              {ALL_LOCATIONS.map((loc) => (
                <option key={`dest-${loc.id}`} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <Navigation className="w-4 h-4 text-cyan-600 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cartão de Resumo da Rota Calculada */}
      <div className="mt-3 p-3 rounded-xl bg-gradient-to-r from-cyan-950 to-slate-900 text-white flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Footprints className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black text-white">
                {route.walkingMinutes === 0 ? 'Mesmo local' : `${route.walkingMinutes} min de caminhada`}
              </span>
              {route.distanceMeters > 0 && (
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-cyan-500/30 text-cyan-200 border border-cyan-400/30">
                  {route.distanceMeters}m
                </span>
              )}
            </div>
            <p className="text-[10px] text-slate-300 leading-tight mt-0.5">
              Traçado ativo em ciano no mapa
            </p>
          </div>
        </div>

        <button
          onClick={onShowOnMap}
          className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 text-[11px] font-black transition-all shadow-md shadow-cyan-500/20 shrink-0"
        >
          Ver Trajeto
        </button>
      </div>

      {/* Atalhos Rápidos com um Toque */}
      <div className="mt-3 pt-2.5 border-t border-slate-100">
        <p className="text-[10px] font-bold text-slate-500 mb-1.5 flex items-center">
          <Zap className="w-3 h-3 text-amber-500 mr-1" />
          Rotas Rápidas Mais Procuradas no Dia 11:
        </p>
        <div className="flex space-x-1.5 overflow-x-auto pb-1 scrollbar-none">
          {quickRoutes.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOriginId(qr.from);
                setDestinationId(qr.to);
                onShowOnMap();
              }}
              className="px-2.5 py-1 rounded-lg bg-slate-50 hover:bg-cyan-50 border border-slate-200 hover:border-cyan-200 text-slate-700 text-[10px] font-bold whitespace-nowrap transition-all shrink-0"
            >
              {qr.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

