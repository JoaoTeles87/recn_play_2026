import React from 'react';
import { ALL_LOCATIONS, calculateCustomRoute } from '../data/mockData';
import { Navigation, ArrowUpDown, Footprints, MapPin, Compass, Zap } from 'lucide-react';

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
    { name: 'NERD (18) ➔ CESAR (14)', from: '18', to: '14' },
    { name: 'NERD (18) ➔ Posto Médico Sul', from: '18', to: 'ps-sul' }
  ];

  return (
    <div className="bg-white rounded-2xl p-4 border-2 border-slate-200/90 shadow-sm mb-4">
      {/* Cabeçalho do Planejador */}
      <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-slate-100">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
            <Compass className="w-5 h-5 text-cyan-700" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 leading-tight">
              Traçar Rota a Pé no Bairro
            </h3>
            <p className="text-[11px] text-slate-500">
              Selecione o ponto de partida e o destino
            </p>
          </div>
        </div>

        {/* Botão de Inverter Acessível (44x44px) */}
        <button
          onClick={handleSwap}
          className="min-h-[44px] min-w-[44px] px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center justify-center space-x-1.5 transition-all active:scale-95 border border-slate-300"
          title="Inverter ponto de origem e destino"
          aria-label="Inverter origem e destino"
        >
          <ArrowUpDown className="w-4 h-4 text-slate-700" />
          <span>Inverter</span>
        </button>
      </div>

      {/* Formulário com Selects Otimizados para Smartphone e Dedos Largos */}
      <div className="space-y-3">
        {/* Campo Origem */}
        <div>
          <label htmlFor="route-origin-select" className="block text-xs font-black text-slate-800 mb-1 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block mr-1.5"></span>
            Ponto de Partida (Origem)
          </label>
          <div className="relative">
            <select
              id="route-origin-select"
              value={originId}
              onChange={(e) => setOriginId(e.target.value)}
              className="w-full min-h-[48px] py-3 pl-3 pr-10 rounded-xl bg-slate-50 border-2 border-slate-300 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-600 appearance-none transition-all cursor-pointer"
            >
              {ALL_LOCATIONS.map((loc) => (
                <option key={`orig-${loc.id}`} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <MapPin className="w-5 h-5 text-emerald-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>

        {/* Campo Destino */}
        <div>
          <label htmlFor="route-dest-select" className="block text-xs font-black text-slate-800 mb-1 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block mr-1.5"></span>
            Para onde você vai (Destino)
          </label>
          <div className="relative">
            <select
              id="route-dest-select"
              value={destinationId}
              onChange={(e) => setDestinationId(e.target.value)}
              className="w-full min-h-[48px] py-3 pl-3 pr-10 rounded-xl bg-slate-50 border-2 border-slate-300 text-sm font-bold text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-cyan-600 appearance-none transition-all cursor-pointer"
            >
              {ALL_LOCATIONS.map((loc) => (
                <option key={`dest-${loc.id}`} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
            <Navigation className="w-5 h-5 text-cyan-600 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Cartão de Resumo da Rota Calculada */}
      <div className="mt-3.5 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950 to-slate-900 text-white flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center shrink-0">
            <Footprints className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-black text-white">
                {route.walkingMinutes === 0 ? 'Mesmo local' : `${route.walkingMinutes} min a pé`}
              </span>
              {route.distanceMeters > 0 && (
                <span className="text-xs font-black px-2 py-0.5 rounded bg-cyan-500/30 text-cyan-200 border border-cyan-400/40">
                  {route.distanceMeters}m
                </span>
              )}
            </div>
            <p className="text-[11px] text-slate-300 leading-tight mt-0.5">
              Caminho desenhado no mapa oficial
            </p>
          </div>
        </div>

        <button
          onClick={onShowOnMap}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-slate-950 text-xs font-black transition-all shadow-md shadow-cyan-500/25 shrink-0"
        >
          Ver no Mapa
        </button>
      </div>

      {/* Atalhos Rápidos com Altura de Toque Acessível (44px) */}
      <div className="mt-3.5 pt-3 border-t border-slate-100">
        <p className="text-xs font-black text-slate-700 mb-2 flex items-center">
          <Zap className="w-3.5 h-3.5 text-amber-500 mr-1.5" />
          Rotas Rápidas no Dia 11:
        </p>
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {quickRoutes.map((qr, idx) => (
            <button
              key={idx}
              onClick={() => {
                setOriginId(qr.from);
                setDestinationId(qr.to);
                onShowOnMap();
              }}
              className="min-h-[44px] px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-cyan-50 border-2 border-slate-200 hover:border-cyan-300 text-slate-800 text-xs font-black whitespace-nowrap transition-all shrink-0 active:scale-95"
            >
              {qr.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
