import React, { useRef, useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Target, MapPin, X, ArrowRight, Layers, Navigation, Footprints, Compass } from 'lucide-react';
import { BUILDINGS, SUPPORT_POINTS, ALL_LOCATIONS, calculateCustomRoute, MAP_DIMENSIONS } from '../data/mockData';

export function MapView({
  selectedBuildingId,
  onSelectBuilding,
  onFilterByBuilding,
  isCollapsed,
  originId = '18',
  destinationId = '26',
  onSetAsOrigin,
  onSetAsDestination
}) {
  const transformComponentRef = useRef(null);
  const [activePin, setActivePin] = useState(null);
  const [showLegend, setShowLegend] = useState(false);
  const [showWalkingPath, setShowWalkingPath] = useState(true);

  // Calcula a rota dinâmica entre a Origem e Destino selecionados
  const route = calculateCustomRoute(originId, destinationId);

  // Efeito ao selecionar prédio externamente
  useEffect(() => {
    if (selectedBuildingId) {
      const b = BUILDINGS.find(item => item.id === selectedBuildingId);
      if (b) {
        setActivePin(b);
        if (transformComponentRef.current) {
          const { zoomToElement } = transformComponentRef.current;
          const element = document.getElementById(`pin-${b.id}`);
          if (element && zoomToElement) {
            zoomToElement(element, 2.2, 500);
          }
        }
      }
    }
  }, [selectedBuildingId]);

  const handlePinClick = (building, e) => {
    e.stopPropagation();
    setActivePin(building);
    onSelectBuilding(building.id);
  };

  const handleCenterNerd = () => {
    const nerd = BUILDINGS.find(b => b.id === 18);
    if (nerd) {
      setActivePin(nerd);
      onSelectBuilding(18);
      const element = document.getElementById('pin-18');
      if (element && transformComponentRef.current?.zoomToElement) {
        transformComponentRef.current.zoomToElement(element, 2.3, 500);
      }
    }
  };

  // Traçado SVG a partir dos pontos da rota calculada
  const pathData = route.points.reduce((acc, point, index) => {
    return `${acc} ${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`;
  }, '');

  const originLocation = ALL_LOCATIONS.find(l => l.id === String(originId));
  const destinationLocation = ALL_LOCATIONS.find(l => l.id === String(destinationId));

  if (isCollapsed) {
    return (
      <div 
        onClick={() => onSelectBuilding(null)}
        className="max-w-md mx-auto px-4 py-2 cursor-pointer"
      >
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-3 flex items-center justify-between shadow-sm hover:brightness-105 transition-all">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-orange-400" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Mapa Oficial e Rotas de Deslocamento</p>
              <p className="text-[11px] text-purple-200">Toque para expandir e ver o mapa do Recife Antigo</p>
            </div>
          </div>
          <span className="text-[11px] font-semibold bg-white/20 px-2.5 py-1 rounded-lg">
            Expandir
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-950 overflow-hidden shadow-inner border-y border-slate-200/50 select-none">
      {/* Botões de Controle Flutuantes no Canto Direito */}
      <div className="absolute top-3 right-3 z-20 flex flex-col space-y-1.5">
        <button
          onClick={() => transformComponentRef.current?.zoomIn()}
          aria-label="Aumentar Zoom"
          className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
          title="Aproximar (+)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => transformComponentRef.current?.zoomOut()}
          aria-label="Diminuir Zoom"
          className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
          title="Afastar (-)"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={() => transformComponentRef.current?.resetTransform()}
          aria-label="Restaurar visualização"
          className="w-8 h-8 rounded-lg bg-white/95 hover:bg-white text-slate-800 shadow-md flex items-center justify-center backdrop-blur-sm transition-all active:scale-95"
          title="Visão Geral"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={handleCenterNerd}
          aria-label="Centralizar na Arena NERD (Prédio 18)"
          className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-600 text-white shadow-md flex items-center justify-center transition-all active:scale-95"
          title="Focar no Edifício NERD (Prédio 18 - Canto Inferior Esquerdo)"
        >
          <Target className="w-4 h-4" />
        </button>
      </div>

      {/* Botões do Canto Esquerdo: Legenda e Toggle de Rota Tracejada */}
      <div className="absolute top-3 left-3 z-20 flex items-center space-x-1.5">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="px-2.5 py-1.5 rounded-lg bg-white/95 hover:bg-white text-slate-800 shadow-md text-[11px] font-bold flex items-center space-x-1.5 backdrop-blur-sm transition-all active:scale-95"
        >
          <Layers className="w-3.5 h-3.5 text-purple-700" />
          <span>Polos</span>
        </button>

        {/* Toggle da Rota Estilo HospitalMed */}
        <button
          onClick={() => setShowWalkingPath(!showWalkingPath)}
          className={`px-2.5 py-1.5 rounded-lg shadow-md text-[11px] font-bold flex items-center space-x-1.5 backdrop-blur-sm transition-all active:scale-95 ${
            showWalkingPath
              ? 'bg-cyan-500 text-slate-950 border border-cyan-300'
              : 'bg-white/90 text-slate-700'
          }`}
          title="Alternar rota de deslocamento a pé pelas ruas"
        >
          <Footprints className="w-3.5 h-3.5" />
          <span>{showWalkingPath ? 'Rota Ativa' : 'Ver Trajeto'}</span>
        </button>
      </div>

      {/* Indicador Flutuante no Topo com a Rota Atual Selecionada */}
      {showWalkingPath && originLocation && destinationLocation && originId !== destinationId && (
        <div className="absolute top-12 left-3 right-14 z-20 bg-slate-900/90 backdrop-blur-sm text-white px-2.5 py-1.5 rounded-xl border border-cyan-500/40 text-[10px] flex items-center justify-between shadow-md">
          <div className="flex items-center space-x-1.5 truncate">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"></span>
            <span className="truncate">{originLocation.code}</span>
            <span className="text-cyan-400 font-bold">➔</span>
            <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0"></span>
            <span className="truncate">{destinationLocation.code}</span>
          </div>
          <span className="text-cyan-300 font-extrabold shrink-0 ml-1.5">
            {route.walkingMinutes} min ({route.distanceMeters}m)
          </span>
        </div>
      )}

      {/* Modal/Drawer de Legenda Rápida */}
      {showLegend && (
        <div className="absolute inset-x-3 top-12 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-3.5 shadow-2xl border border-slate-200 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-2">
            <span className="font-bold text-slate-900 text-xs flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-purple-600 inline-block"></span>
              <span>Polos Chave (Saúde e Negócios)</span>
            </span>
            <button 
              onClick={() => setShowLegend(false)}
              className="p-1 rounded-full text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {BUILDINGS.map(b => (
              <button
                key={b.id}
                onClick={() => {
                  setActivePin(b);
                  onSelectBuilding(b.id);
                  setShowLegend(false);
                }}
                className={`text-left p-1.5 rounded-lg border transition-all ${
                  b.id === 18 
                    ? 'bg-orange-50/80 border-orange-300 text-orange-950 font-bold' 
                    : b.id === 26
                    ? 'bg-purple-50/80 border-purple-300 text-purple-950 font-bold'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center space-x-1.5">
                  <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-extrabold ${
                    b.id === 18 ? 'bg-orange-500 text-white' : b.id === 26 ? 'bg-purple-800 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {b.code}
                  </span>
                  <span className="truncate text-[11px]">{b.shortName}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Container de Arrastar e Zoom */}
      <TransformWrapper
        ref={transformComponentRef}
        initialScale={1}
        minScale={0.8}
        maxScale={4.5}
        centerOnInit={true}
        wheel={{ step: 0.15 }}
        doubleClick={{ mode: 'zoomIn' }}
        panning={{ velocityDisabled: false }}
      >
        <TransformComponent
          wrapperStyle={{ width: '100%', height: '260px', background: '#0b1120' }}
          contentStyle={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <div className="relative w-full h-[260px] flex items-center justify-center">
            {/* Imagem Real Oficial do Mapa (1024x576) */}
            <img
              src="/mapa-recnplay-2026.webp"
              onError={(e) => {
                e.currentTarget.src = "/mapa-recnplay-2026.jpg";
              }}
              alt="Mapa Oficial REC'n'Play 2026"
              className="w-full h-full object-contain pointer-events-none"
            />

            {/* CAMADA SVG SOBREPOSTA: Rotas de Deslocamento a Pé (Estilo HospitalMed) */}
            {showWalkingPath && (
              <svg
                viewBox={`0 0 ${MAP_DIMENSIONS.width} ${MAP_DIMENSIONS.height}`}
                className="absolute inset-0 w-full h-full pointer-events-none z-10"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="route-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#06b6d4" floodOpacity="0.8" />
                  </filter>
                </defs>

                {/* Traçado de Rota Pontilhada Animada pelas Ruas */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#06b6d4"
                  strokeWidth="5"
                  strokeDasharray="10 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#route-glow)"
                  className="animate-route-flow"
                />

                {/* Marcador do Ponto de Origem */}
                {originLocation && (
                  <circle cx={originLocation.pxX} cy={originLocation.pxY} r="7" fill="#10b981" stroke="#ffffff" strokeWidth="2.5" />
                )}

                {/* Marcador do Ponto de Destino */}
                {destinationLocation && (
                  <circle cx={destinationLocation.pxX} cy={destinationLocation.pxY} r="7" fill="#06b6d4" stroke="#ffffff" strokeWidth="2.5" />
                )}
              </svg>
            )}

            {/* Marcadores de Serviços Essenciais (Postos Médicos e Marco Zero) */}
            {SUPPORT_POINTS.map((sp) => (
              <div
                key={sp.id}
                style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePin({
                    id: sp.id,
                    code: sp.code,
                    name: sp.name,
                    shortName: sp.name,
                    address: sp.description,
                    description: sp.description,
                    walkTimeFromNerd: '2 min a pé',
                    walkDist: '120m'
                  });
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform active:scale-125"
                title={sp.name}
              >
                <div className="flex flex-col items-center">
                  <div className={`flex items-center justify-center rounded-full font-black shadow-md border border-white text-[9px] ${
                    sp.type === 'saude' 
                      ? 'w-5 h-5 bg-emerald-500 text-white' 
                      : 'w-4 h-4 bg-amber-400 text-amber-950'
                  }`}>
                    {sp.code}
                  </div>
                  <span className="text-[7px] font-bold px-1 rounded bg-black/70 text-white mt-0.5 whitespace-nowrap">
                    {sp.name.split(' ')[0]}
                  </span>
                </div>
              </div>
            ))}

            {/* Marcadores / PINS Calibrados nas Posições Reais dos Prédios */}
            {BUILDINGS.map((b) => {
              const isSelected = activePin?.id === b.id;
              const isNerd = b.id === 18;
              const isMoinho = b.id === 26;

              return (
                <div
                  key={b.id}
                  id={`pin-${b.id}`}
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  onClick={(e) => handlePinClick(b, e)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-transform active:scale-125"
                >
                  <div className="relative group flex flex-col items-center">
                    {(isNerd || isSelected || isMoinho) && (
                      <span className={`absolute -inset-2 rounded-full animate-ping opacity-75 ${
                        isNerd ? 'bg-orange-500' : isMoinho ? 'bg-purple-600' : 'bg-cyan-400'
                      }`} />
                    )}

                    <div
                      className={`relative flex items-center justify-center rounded-full font-black shadow-lg transition-all ${
                        isSelected
                          ? 'w-7 h-7 bg-white text-purple-950 border-2 border-cyan-400 scale-125 shadow-cyan-500/50'
                          : isNerd
                          ? 'w-6 h-6 bg-orange-500 text-white border-2 border-white text-xs'
                          : isMoinho
                          ? 'w-6 h-6 bg-purple-700 text-white border-2 border-white text-xs'
                          : 'w-5 h-5 bg-purple-900/90 text-white border border-white text-[10px]'
                      }`}
                    >
                      <span className="text-[10px] font-black">{b.code}</span>
                    </div>

                    <div className={`mt-0.5 px-1 py-0.2 rounded text-[8px] font-extrabold whitespace-nowrap shadow-md pointer-events-none ${
                      isNerd 
                        ? 'bg-orange-600 text-white' 
                        : isMoinho
                        ? 'bg-purple-900 text-white'
                        : isSelected
                        ? 'bg-slate-900 text-cyan-300 border border-cyan-400'
                        : 'bg-black/80 text-white/95'
                    }`}>
                      {b.shortName}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </TransformComponent>
      </TransformWrapper>

      {/* POPUP / BALÃO DE DETALHES (Estilo Exato da Imagem 2 da Referência) */}
      {activePin && (
        <div className="p-3 bg-[#111318] text-white border-t border-slate-800 animate-in slide-in-from-bottom duration-200 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-2.5">
              <div className="shrink-0">
                <span className="inline-block text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded bg-pink-300 text-purple-950 mb-1">
                  PRÉDIOS
                </span>
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-sm text-white ${
                  activePin.id === 18 ? 'bg-orange-500 shadow-orange-500/40' : 'bg-purple-600'
                }`}>
                  {activePin.code}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-black text-white leading-tight">
                  <span className="text-pink-400 font-bold mr-1">{activePin.code}</span>
                  {activePin.name}
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5 flex items-center">
                  <MapPin className="w-3 h-3 text-slate-500 mr-1 shrink-0" />
                  {activePin.address}
                </p>
                <p className="text-[11px] text-slate-300 mt-1 line-clamp-1">
                  {activePin.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePin(null);
                onSelectBuilding(null);
              }}
              className="text-slate-400 hover:text-white p-1 rounded-full shrink-0"
              aria-label="Fechar detalhe do polo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-1.5">
            <button
              onClick={() => onSetAsOrigin(String(activePin.id))}
              className="py-1.5 px-2 rounded-lg bg-emerald-600/90 hover:bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center space-x-1"
            >
              <MapPin className="w-3 h-3" />
              <span>Partir daqui (Origem)</span>
            </button>
            <button
              onClick={() => onSetAsDestination(String(activePin.id))}
              className="py-1.5 px-2 rounded-lg bg-cyan-600/90 hover:bg-cyan-600 text-white text-[10px] font-bold flex items-center justify-center space-x-1"
            >
              <Navigation className="w-3 h-3" />
              <span>Ir para cá (Destino)</span>
            </button>
          </div>

          <div className="mt-2 pt-2 border-t border-slate-800 flex items-center space-x-2">
            <button
              onClick={() => onFilterByBuilding(activePin.id)}
              className="flex-1 py-1.5 px-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-[11px] font-bold flex items-center justify-center space-x-1.5 shadow-sm transition-all"
            >
              <span>Ver Atividades neste Prédio</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
            {activePin.id === 18 && (
              <button
                onClick={() => onFilterByBuilding(18, 'startups')}
                className="py-1.5 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white text-[11px] font-black transition-all text-center"
              >
                Ver 10 Startups
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
