import React, { useRef, useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { ZoomIn, ZoomOut, RotateCcw, Target, MapPin, X, ArrowRight, Layers, Navigation, Footprints, ArrowRightLeft, Compass } from 'lucide-react';
import { BUILDINGS, SUPPORT_POINTS, ALL_LOCATIONS, calculateCustomRoute, MAP_DIMENSIONS } from '../data/mockData';

export function MapView({
  selectedBuildingId,
  onSelectBuilding,
  onFilterByBuilding,
  isCollapsed,
  originId = 'marco-zero',
  destinationId = '18',
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

  const handleSwapRoute = () => {
    const currentOrigin = originId;
    onSetAsOrigin(destinationId);
    onSetAsDestination(currentOrigin);
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
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 text-white rounded-xl p-3 flex items-center justify-between shadow-sm hover:brightness-105 transition-all min-h-[48px]">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <p className="text-xs font-bold leading-tight">Mapa Oficial e Rotas de Deslocamento</p>
              <p className="text-[11px] text-purple-200">Toque para expandir e navegar no Recife Antigo</p>
            </div>
          </div>
          <span className="text-xs font-bold bg-white/20 px-3 py-1.5 rounded-lg">
            Expandir
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto bg-slate-950 overflow-hidden shadow-inner border-y border-slate-200/50 select-none">
      {/* ============================================================== */}
      {/* BARRA SUPERIOR DE CONTROLE RÁPIDO: ONDE VOCÊ ESTÁ ➔ ONDE QUER IR */}
      {/* ============================================================== */}
      <div className="bg-slate-900/95 border-b border-slate-800 p-2.5 text-white backdrop-blur-md">
        <div className="flex items-center space-x-1.5">
          {/* Seletor de Origem */}
          <div className="flex-1">
            <label htmlFor="map-origin-selector" className="block text-[10px] font-black text-emerald-400 mb-1 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>ONDE VOCÊ ESTÁ (ORIGEM):</span>
            </label>
            <div className="relative">
              <select
                id="map-origin-selector"
                value={originId}
                onChange={(e) => onSetAsOrigin(e.target.value)}
                className="w-full min-h-[42px] pl-2 pr-6 py-1.5 rounded-xl bg-slate-800 border-2 border-emerald-500/50 text-xs font-black text-white focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 appearance-none truncate cursor-pointer"
              >
                <optgroup label="Entradas e Pontos de Encontro">
                  <option value="marco-zero">📍 Marco Zero (Praça Rio Branco)</option>
                  <option value="food-f6">🍔 Praça do Arsenal (Alimentação F6)</option>
                  <option value="ps-sul">🏥 Posto Médico Sul (Próx. NERD)</option>
                  <option value="ps-norte">🏥 Posto Médico Norte (Torre Malakoff)</option>
                </optgroup>
                <optgroup label="Prédios de Destaque">
                  <option value="18">Prédio 18 - Arena NERD (Startups)</option>
                  <option value="26">Prédio 26 - Moinho Recife (TDC Stage)</option>
                  <option value="7">Prédio 07 - Ti.Saúde</option>
                  <option value="14">Prédio 14 - CESAR School</option>
                  <option value="8">Prédio 08 - E.T.E Porto Digital</option>
                  <option value="28">Prédio 28 - Accenture Center</option>
                </optgroup>
                <optgroup label="Demais Prédios">
                  {BUILDINGS.filter(b => ![18, 26, 7, 14, 8, 28].includes(b.id)).map(b => (
                    <option key={`orig-sel-${b.id}`} value={String(b.id)}>
                      Prédio {b.code} - {b.shortName}
                    </option>
                  ))}
                </optgroup>
              </select>
              <MapPin className="w-4 h-4 text-emerald-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          {/* Botão de Inverter Origem e Destino */}
          <button
            onClick={handleSwapRoute}
            title="Inverter Origem e Destino"
            aria-label="Inverter Origem e Destino"
            className="w-10 h-10 mt-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 flex items-center justify-center border border-slate-700 active:scale-95 shrink-0 transition-all shadow-sm"
          >
            <ArrowRightLeft className="w-4 h-4" />
          </button>

          {/* Seletor de Destino */}
          <div className="flex-1">
            <label htmlFor="map-dest-selector" className="block text-[10px] font-black text-cyan-400 mb-1 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block animate-pulse"></span>
              <span>ONDE QUER IR (DESTINO):</span>
            </label>
            <div className="relative">
              <select
                id="map-dest-selector"
                value={destinationId}
                onChange={(e) => onSetAsDestination(e.target.value)}
                className="w-full min-h-[42px] pl-2 pr-6 py-1.5 rounded-xl bg-slate-800 border-2 border-cyan-500/50 text-xs font-black text-white focus:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400 appearance-none truncate cursor-pointer"
              >
                <optgroup label="Polos de Destaque">
                  <option value="18">Prédio 18 - Arena NERD (Startups)</option>
                  <option value="26">Prédio 26 - Moinho Recife (TDC Stage)</option>
                  <option value="7">Prédio 07 - Ti.Saúde</option>
                  <option value="14">Prédio 14 - CESAR School</option>
                  <option value="8">Prédio 08 - E.T.E Porto Digital</option>
                  <option value="28">Prédio 28 - Accenture Center</option>
                </optgroup>
                <optgroup label="Demais Prédios">
                  {BUILDINGS.filter(b => ![18, 26, 7, 14, 8, 28].includes(b.id)).map(b => (
                    <option key={`dest-sel-${b.id}`} value={String(b.id)}>
                      Prédio {b.code} - {b.shortName}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Pontos de Apoio">
                  <option value="marco-zero">📍 Marco Zero</option>
                  <option value="food-f6">🍔 Praça do Arsenal</option>
                </optgroup>
              </select>
              <Navigation className="w-4 h-4 text-cyan-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Resumo da Rota Calculada */}
        <div className="mt-2 pt-1.5 border-t border-slate-800 flex items-center justify-between text-[11px]">
          <div className="flex items-center space-x-1.5 text-slate-300 truncate">
            <Footprints className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span className="truncate">
              {originLocation?.code || 'Origem'} ➔ {destinationLocation?.code || 'Destino'}:
            </span>
            <span className="font-extrabold text-white">{route.distanceMeters} metros</span>
          </div>
          <span className="bg-cyan-500/20 text-cyan-300 px-2 py-0.5 rounded font-black border border-cyan-500/40 shrink-0 ml-2">
            ~ {route.walkingMinutes} min a pé
          </span>
        </div>
      </div>

      {/* Botões de Controle Flutuantes no Canto Direito - Áreas de Toque Acessíveis de 44x44px */}
      <div className="absolute top-[88px] right-3 z-20 flex flex-col space-y-2">
        <button
          onClick={() => transformComponentRef.current?.zoomIn()}
          aria-label="Aumentar Zoom no Mapa"
          className="w-11 h-11 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all active:scale-95 border border-slate-300"
          title="Aproximar (+)"
        >
          <ZoomIn className="w-5 h-5 text-slate-800" />
        </button>
        <button
          onClick={() => transformComponentRef.current?.zoomOut()}
          aria-label="Diminuir Zoom no Mapa"
          className="w-11 h-11 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all active:scale-95 border border-slate-300"
          title="Afastar (-)"
        >
          <ZoomOut className="w-5 h-5 text-slate-800" />
        </button>
        <button
          onClick={() => transformComponentRef.current?.resetTransform()}
          aria-label="Restaurar visualização geral do mapa"
          className="w-11 h-11 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg flex items-center justify-center backdrop-blur-sm transition-all active:scale-95 border border-slate-300"
          title="Visão Geral"
        >
          <RotateCcw className="w-5 h-5 text-slate-800" />
        </button>
        <button
          onClick={handleCenterNerd}
          aria-label="Centralizar na Arena NERD (Prédio 18)"
          className="w-11 h-11 rounded-xl bg-orange-500 hover:bg-orange-600 text-white shadow-lg flex items-center justify-center transition-all active:scale-95 border border-orange-400"
          title="Focar no Edifício NERD (Prédio 18 - Canto Inferior Esquerdo)"
        >
          <Target className="w-5 h-5" />
        </button>
      </div>

      {/* Botões do Canto Esquerdo: Legenda e Toggle de Rota Tracejada (Touch-friendly 44px) */}
      <div className="absolute top-[88px] left-3 z-20 flex items-center space-x-2">
        <button
          onClick={() => setShowLegend(!showLegend)}
          className="min-h-[44px] px-3.5 py-2 rounded-xl bg-white/95 hover:bg-white text-slate-900 shadow-lg text-xs font-black flex items-center space-x-1.5 backdrop-blur-sm transition-all active:scale-95 border border-slate-300"
        >
          <Layers className="w-4 h-4 text-purple-700" />
          <span>Polos</span>
        </button>

        {/* Toggle da Rota Estilo HospitalMed */}
        <button
          onClick={() => setShowWalkingPath(!showWalkingPath)}
          className={`min-h-[44px] px-3.5 py-2 rounded-xl shadow-lg text-xs font-black flex items-center space-x-1.5 backdrop-blur-sm transition-all active:scale-95 border ${
            showWalkingPath
              ? 'bg-cyan-500 text-slate-950 border-cyan-300'
              : 'bg-white/95 text-slate-900 border-slate-300'
          }`}
          title="Alternar rota de deslocamento a pé pelas ruas"
        >
          <Footprints className="w-4 h-4" />
          <span>{showWalkingPath ? 'Rota Ativa' : 'Ver Rota'}</span>
        </button>
      </div>

      {/* Modal/Drawer de Legenda Rápida */}
      {showLegend && (
        <div className="absolute inset-x-3 top-[88px] z-30 bg-white/98 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-slate-300 text-xs animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 mb-2.5">
            <span className="font-extrabold text-slate-900 text-sm flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-600 inline-block"></span>
              <span>Polos Chave (Saúde e Negócios)</span>
            </span>
            <button 
              onClick={() => setShowLegend(false)}
              className="w-11 h-11 flex items-center justify-center text-slate-500 hover:text-slate-900 rounded-lg"
              aria-label="Fechar lista de polos"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto pr-1">
            {BUILDINGS.map(b => (
              <button
                key={b.id}
                onClick={() => {
                  setActivePin(b);
                  onSelectBuilding(b.id);
                  setShowLegend(false);
                }}
                className={`text-left p-2 rounded-xl border-2 transition-all min-h-[44px] flex items-center ${
                  b.id === 18 
                    ? 'bg-orange-50 border-orange-400 text-orange-950 font-black' 
                    : b.id === 26
                    ? 'bg-purple-50 border-purple-400 text-purple-950 font-black'
                    : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-purple-50 font-bold'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-black ${
                    b.id === 18 ? 'bg-orange-500 text-white' : b.id === 26 ? 'bg-purple-800 text-white' : 'bg-purple-600 text-white'
                  }`}>
                    {b.code}
                  </span>
                  <span className="truncate text-xs">{b.shortName}</span>
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
          wrapperStyle={{ width: '100%', height: '270px', background: '#0b1120' }}
          contentStyle={{ width: '100%', height: '100%', position: 'relative' }}
        >
          <div className="relative w-full h-[270px] flex items-center justify-center">
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
                  strokeDasharray="8 6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#route-glow)"
                  className="animate-dash"
                />

                {/* Linha base para contraste */}
                <path
                  d={pathData}
                  fill="none"
                  stroke="#082f49"
                  strokeWidth="8"
                  strokeOpacity="0.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Marcador do Ponto de Origem */}
                {originLocation && (
                  <circle cx={originLocation.pxX} cy={originLocation.pxY} r="8" fill="#10b981" stroke="#ffffff" strokeWidth="3" />
                )}

                {/* Marcador do Ponto de Destino */}
                {destinationLocation && (
                  <circle cx={destinationLocation.pxX} cy={destinationLocation.pxY} r="8" fill="#06b6d4" stroke="#ffffff" strokeWidth="3" />
                )}
              </svg>
            )}

            {/* Marcadores de Serviços Essenciais (Postos Médicos e Marco Zero) com área de toque aumentada */}
            {SUPPORT_POINTS.map((sp) => {
              const isOrigin = String(originId) === sp.id;
              const isDest = String(destinationId) === sp.id;

              return (
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
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 p-2.5 transition-transform active:scale-125"
                  title={sp.name}
                >
                  <div className="flex flex-col items-center">
                    <div className={`flex items-center justify-center rounded-full font-black shadow-md border-2 border-white text-[10px] ${
                      isOrigin
                        ? 'w-7 h-7 bg-emerald-500 text-white ring-2 ring-emerald-300'
                        : isDest
                        ? 'w-7 h-7 bg-cyan-500 text-slate-950 ring-2 ring-cyan-300'
                        : sp.type === 'saude' 
                        ? 'w-6 h-6 bg-emerald-500 text-white' 
                        : 'w-5 h-5 bg-amber-400 text-amber-950'
                    }`}>
                      {sp.code}
                    </div>
                    {isOrigin && (
                      <span className="text-[7px] font-black px-1 rounded bg-emerald-600 text-white mt-0.5 whitespace-nowrap shadow">
                        VOCÊ
                      </span>
                    )}
                    {isDest && (
                      <span className="text-[7px] font-black px-1 rounded bg-cyan-600 text-white mt-0.5 whitespace-nowrap shadow">
                        DESTINO
                      </span>
                    )}
                    {!isOrigin && !isDest && (
                      <span className="text-[8px] font-bold px-1.5 rounded bg-black/80 text-white mt-0.5 whitespace-nowrap">
                        {sp.name.split(' ')[0]}
                      </span>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Marcadores / PINS Calibrados nas Posições Reais dos Prédios com área de clique confortável */}
            {BUILDINGS.map((b) => {
              const isSelected = activePin?.id === b.id;
              const isNerd = b.id === 18;
              const isMoinho = b.id === 26;
              const isOrigin = String(originId) === String(b.id);
              const isDest = String(destinationId) === String(b.id);

              return (
                <div
                  key={b.id}
                  id={`pin-${b.id}`}
                  style={{ left: `${b.x}%`, top: `${b.y}%` }}
                  onClick={(e) => handlePinClick(b, e)}
                  className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 p-2.5 transition-transform active:scale-125"
                >
                  <div className="relative group flex flex-col items-center">
                    {(isOrigin || isDest || isNerd || isSelected || isMoinho) && (
                      <span className={`absolute -inset-1.5 rounded-full animate-ping opacity-75 ${
                        isOrigin ? 'bg-emerald-400' : isDest ? 'bg-cyan-400' : isNerd ? 'bg-orange-500' : isMoinho ? 'bg-purple-600' : 'bg-cyan-400'
                      }`} />
                    )}

                    <div
                      className={`relative flex items-center justify-center rounded-full font-black shadow-lg transition-all ${
                        isOrigin
                          ? 'w-8 h-8 bg-emerald-500 text-white border-2 border-white ring-2 ring-emerald-300 scale-125'
                          : isDest
                          ? 'w-8 h-8 bg-cyan-500 text-slate-950 border-2 border-white ring-2 ring-cyan-300 scale-125'
                          : isSelected
                          ? 'w-8 h-8 bg-white text-purple-950 border-3 border-cyan-400 scale-125 shadow-cyan-500/50'
                          : isNerd
                          ? 'w-7 h-7 bg-orange-500 text-white border-2 border-white text-xs'
                          : isMoinho
                          ? 'w-7 h-7 bg-purple-700 text-white border-2 border-white text-xs'
                          : 'w-6 h-6 bg-purple-900/95 text-white border border-white text-[11px]'
                      }`}
                    >
                      <span className="text-[11px] font-black">{b.code}</span>
                    </div>

                    {/* Badge do Nome ou Status de Origem/Destino */}
                    <div className={`mt-0.5 px-1.5 py-0.5 rounded text-[8px] font-black whitespace-nowrap shadow-md pointer-events-none ${
                      isOrigin
                        ? 'bg-emerald-600 text-white font-extrabold ring-1 ring-white'
                        : isDest
                        ? 'bg-cyan-600 text-white font-extrabold ring-1 ring-white'
                        : isNerd 
                        ? 'bg-orange-600 text-white' 
                        : isMoinho
                        ? 'bg-purple-900 text-white'
                        : isSelected
                        ? 'bg-slate-900 text-cyan-300 border border-cyan-400'
                        : 'bg-black/85 text-white/95'
                    }`}>
                      {isOrigin ? `📍 ESTOU AQUI (${b.code})` : isDest ? `🏁 DESTINO (${b.code})` : b.shortName}
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
        <div className="p-4 bg-[#111318] text-white border-t border-slate-800 animate-in slide-in-from-bottom duration-200 shadow-2xl">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="shrink-0">
                <span className="inline-block text-[9px] font-black tracking-wider uppercase px-2 py-0.5 rounded bg-pink-300 text-purple-950 mb-1">
                  PRÉDIOS
                </span>
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm text-white ${
                  activePin.id === 18 ? 'bg-orange-500 shadow-orange-500/40' : 'bg-purple-600'
                }`}>
                  {activePin.code}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-black text-white leading-tight">
                  <span className="text-pink-400 font-bold mr-1">{activePin.code}</span>
                  {activePin.name}
                </h4>
                <p className="text-xs text-slate-400 mt-1 flex items-center">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 mr-1 shrink-0" />
                  {activePin.address}
                </p>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {activePin.description}
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setActivePin(null);
                onSelectBuilding(null);
              }}
              className="w-11 h-11 flex items-center justify-center text-slate-400 hover:text-white rounded-lg shrink-0"
              aria-label="Fechar detalhe do polo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Botões de Ação Imediatos: Definir Origem ou Destino com 48px de Altura */}
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => onSetAsOrigin(String(activePin.id))}
              className={`min-h-[48px] py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95 ${
                String(originId) === String(activePin.id)
                  ? 'bg-emerald-500 text-white ring-2 ring-white'
                  : 'bg-emerald-700 hover:bg-emerald-600 text-white'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span>{String(originId) === String(activePin.id) ? '✓ Você está aqui' : '📍 Estou aqui (Origem)'}</span>
            </button>
            <button
              onClick={() => onSetAsDestination(String(activePin.id))}
              className={`min-h-[48px] py-2 px-3 rounded-xl text-xs font-black flex items-center justify-center space-x-1.5 transition-all shadow-md active:scale-95 ${
                String(destinationId) === String(activePin.id)
                  ? 'bg-cyan-400 text-slate-950 ring-2 ring-white'
                  : 'bg-cyan-600 hover:bg-cyan-500 text-white'
              }`}
            >
              <Navigation className="w-4 h-4" />
              <span>{String(destinationId) === String(activePin.id) ? '✓ É seu destino' : '🏁 Quero ir (Destino)'}</span>
            </button>
          </div>

          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center space-x-2">
            <button
              onClick={() => onFilterByBuilding(activePin.id)}
              className="flex-1 min-h-[44px] py-2 px-3 rounded-xl bg-purple-700 hover:bg-purple-600 active:scale-95 text-white text-xs font-black flex items-center justify-center space-x-2 shadow-sm transition-all"
            >
              <span>Ver Atividades neste Prédio</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            {activePin.id === 18 && (
              <button
                onClick={() => onFilterByBuilding(18, 'startups')}
                className="min-h-[44px] py-2 px-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white text-xs font-black transition-all text-center"
              >
                Ver Startups
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
