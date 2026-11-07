// Base de dados estruturada do REC'n'Play 2026 - Guia Independente de Saúde, Gestão e Negócios
// Data Principal de Foco: 11 de Novembro de 2026
// Coordenadas calculadas rigorosamente sobre a arte oficial do mapa (1024 x 576 px)

export const MAP_DIMENSIONS = {
  width: 1024,
  height: 576
};

export const BUILDINGS = [
  {
    id: 18,
    code: '18',
    name: 'Arena Pernambuco de Negócios – NERD',
    shortName: 'Edifício NERD',
    address: 'Rua do Bom Jesus / Bairro do Recife (Polo Central de Startups)',
    description: 'Polo principal de exposição de HealthTechs (AnGV, Zyloq, etc.) e palcos Asa Branca e Carcará.',
    category: 'negocios',
    x: 27.2, // Canto inferior esquerdo (próximo a A15, A16 e 19)
    y: 64.8,
    pxX: 278,
    pxY: 373,
    walkTimeFromNerd: '0 min (Você está aqui)',
    walkDist: '0m'
  },
  {
    id: 26,
    code: '26',
    name: 'Moinho Recife (Cesar / TDC Stage)',
    shortName: 'Moinho Recife',
    address: 'Av. Alfredo Lisboa (Canto inferior a direita)',
    description: 'TDC Stage - IA no SUS (Absens / Beyond Co.), Governança de IA e Work-Based Learning.',
    category: 'tech',
    x: 91.5, // Canto inferior direito
    y: 53.0,
    pxX: 937,
    pxY: 305,
    walkTimeFromNerd: '8 min a pé',
    walkDist: '650m'
  },
  {
    id: 28,
    code: '28',
    name: 'Accenture Innovation Center',
    shortName: 'Accenture Center',
    address: 'Armazém do Porto (Rodapé centro-esquerdo)',
    description: 'Carreiras, inclusão e interoperabilidade pública no Conecta Gov.br / Conecta+.',
    category: 'negocios',
    x: 28.5, // Rodapé centro-esquerdo
    y: 78.5,
    pxX: 292,
    pxY: 452,
    walkTimeFromNerd: '2 min a pé',
    walkDist: '160m'
  },
  {
    id: 7,
    code: '07',
    name: 'Ti.Saúde',
    shortName: 'Prédio Ti.Saúde',
    address: 'R. Mariz e Barros, 311 (Parte superior esquerda)',
    description: 'Painéis sobre Saúde Mental no Trabalho, burnout, bem-estar e gestão de equipes com hiperconectividade.',
    category: 'saude',
    x: 32.2, // Superior-esquerda, abaixo do 06
    y: 35.0,
    pxX: 330,
    pxY: 202,
    walkTimeFromNerd: '4 min a pé',
    walkDist: '320m'
  },
  {
    id: 8,
    code: '08',
    name: 'ETE Porto Digital',
    shortName: 'E.T.E. Porto Digital',
    address: 'Av. Rio Branco / Bairro do Recife',
    description: 'Deep techs, ciência transformando pesquisa em negócios de saúde e sustentabilidade.',
    category: 'tech',
    x: 36.5, // Superior centro-esquerda
    y: 31.0,
    pxX: 374,
    pxY: 179,
    walkTimeFromNerd: '5 min a pé',
    walkDist: '380m'
  },
  {
    id: 14,
    code: '14',
    name: 'CESAR School',
    shortName: 'CESAR School',
    address: 'Cais do Apolo (Topo centro-direita)',
    description: 'IA e saúde para pessoas idosas (60+), data science, AX e liderança de times híbridos.',
    category: 'educacao',
    x: 69.5, // Topo centro-direita
    y: 22.8,
    pxX: 712,
    pxY: 131,
    walkTimeFromNerd: '6 min a pé',
    walkDist: '500m'
  },
  {
    id: 15,
    code: '15',
    name: 'Arena de Educação CESAR School',
    shortName: 'Arena CESAR School',
    address: 'Cais do Apolo (Topo extrema-direita)',
    description: 'Do problema ao produto: validação ágil de hipóteses de inovação com IA.',
    category: 'educacao',
    x: 83.8, // Topo extrema-direita
    y: 17.5,
    pxX: 858,
    pxY: 101,
    walkTimeFromNerd: '7 min a pé',
    walkDist: '580m'
  },
  {
    id: 16,
    code: '16',
    name: 'Moeda 50',
    shortName: 'Moeda 50',
    address: 'Rua da Moeda, 50 (Inferior esquerdo)',
    description: 'Novos modelos de moradia para longevidade, Cohousing e saúde da terceira idade.',
    category: 'saude',
    x: 22.3, // Canto inferior esquerdo, perto de P3 e PS
    y: 63.5,
    pxX: 228,
    pxY: 366,
    walkTimeFromNerd: '1 min a pé',
    walkDist: '90m'
  },
  {
    id: 13,
    code: '13',
    name: 'Senac',
    shortName: 'Senac',
    address: 'Av. Visconde de Suassuna (Topo centro)',
    description: 'Comércio exterior, dinâmicas de capacitação e gestão.',
    category: 'negocios',
    x: 61.8, // Centro-topo
    y: 28.5,
    pxX: 633,
    pxY: 164,
    walkTimeFromNerd: '5 min a pé',
    walkDist: '420m'
  },
  {
    id: 1,
    code: '01',
    name: 'Livraria Jaqueira',
    shortName: 'Livraria Jaqueira',
    address: 'R. Madre de Deus, 110 (Extrema esquerda)',
    description: 'Liderança feminina em posições estratégicas de tecnologia e negócios.',
    category: 'cultura',
    x: 5.2, // Extrema esquerda
    y: 51.5,
    pxX: 53,
    pxY: 297,
    walkTimeFromNerd: '4 min a pé',
    walkDist: '350m'
  },
  {
    id: 9,
    code: '09',
    name: 'Ponto BB',
    shortName: 'Ponto BB',
    address: 'Av. Rio Branco (Topo centro-esquerda)',
    description: 'Palco BBDW - Reinvenção corporativa com Inteligência Artificial e governança.',
    category: 'negocios',
    x: 39.5, // Topo centro-esquerda
    y: 23.5,
    pxX: 404,
    pxY: 135,
    walkTimeFromNerd: '5 min a pé',
    walkDist: '400m'
  },
  {
    id: 25,
    code: '25',
    name: 'Torre Malakoff',
    shortName: 'Torre Malakoff',
    address: 'Praça do Arsenal',
    description: 'Polo cultural histórico e ponto de referência no Bairro.',
    category: 'cultura',
    x: 70.0,
    y: 60.5,
    pxX: 717,
    pxY: 348,
    walkTimeFromNerd: '5 min a pé',
    walkDist: '430m'
  },
  {
    id: 27,
    code: '27',
    name: 'Cais do Sertão – Arena Gamer BB',
    shortName: 'Cais do Sertão',
    address: 'Av. Alfredo Lisboa (Rodapé direito)',
    description: 'Museu Cais do Sertão e Arena de Inovação e Games.',
    category: 'cultura',
    x: 70.8,
    y: 68.2,
    pxX: 725,
    pxY: 393,
    walkTimeFromNerd: '4 min a pé',
    walkDist: '360m'
  }
];

// Pontos de apoio e serviços essenciais (Postos Médicos e Mobilidade de info_mapa.md)
export const SUPPORT_POINTS = [
  {
    id: 'ps-sul',
    code: 'PS',
    name: 'Posto Médico Sul',
    shortName: 'Posto Médico Sul',
    type: 'saude',
    x: 21.0,
    y: 69.0,
    pxX: 215,
    pxY: 398,
    description: 'Atendimento de primeiros socorros e suporte emergencial de saúde (próximo à Moeda e NERD).'
  },
  {
    id: 'ps-norte',
    code: 'PS',
    name: 'Posto Médico Norte',
    shortName: 'Posto Médico Norte',
    type: 'saude',
    x: 66.5,
    y: 63.5,
    pxX: 681,
    pxY: 366,
    description: 'Atendimento médico e primeiros socorros na região da Praça do Arsenal / Torre Malakoff.'
  },
  {
    id: 'marco-zero',
    code: 'MZ',
    name: 'Marco Zero (Praça Rio Branco)',
    shortName: 'Marco Zero',
    type: 'turismo',
    x: 41.5,
    y: 76.0,
    pxX: 425,
    pxY: 438,
    description: 'Principal ponto de encontro ao ar livre no Bairro do Recife.'
  }
];

// Lista unificada para seleção de Origem e Destino
export const ALL_LOCATIONS = [
  ...BUILDINGS.map(b => ({
    id: String(b.id),
    name: `Prédio ${b.code} - ${b.shortName}`,
    fullName: b.name,
    code: b.code,
    pxX: b.pxX,
    pxY: b.pxY,
    type: 'building'
  })),
  {
    id: 'marco-zero',
    name: 'Marco Zero (Praça Rio Branco)',
    fullName: 'Marco Zero (Praça Rio Branco)',
    code: 'MZ',
    pxX: 425,
    pxY: 438,
    type: 'spot'
  },
  {
    id: 'ps-sul',
    name: 'Posto Médico Sul (Próx. NERD)',
    fullName: 'Posto Médico Sul',
    code: 'PS',
    pxX: 215,
    pxY: 398,
    type: 'medical'
  },
  {
    id: 'ps-norte',
    name: 'Posto Médico Norte (Malakoff)',
    fullName: 'Posto Médico Norte',
    code: 'PS',
    pxX: 681,
    pxY: 366,
    type: 'medical'
  },
  {
    id: 'food-f6',
    name: 'Praça de Alimentação F6 (Arsenal)',
    fullName: 'Alimentação e Bebidas F6',
    code: 'F6',
    pxX: 655,
    pxY: 314,
    type: 'food'
  },
  {
    id: 'cafe-a27',
    name: 'Clandestino Café (A27)',
    fullName: 'Clandestino Café (Praça do Arsenal)',
    code: 'A27',
    pxX: 640,
    pxY: 311,
    type: 'food'
  }
];

// Pontos de interseção das ruas do Recife Antigo para traçado de rotas realistas
const WAYPOINTS = {
  cornerBomJesusMoeda: { x: 290, y: 395 },
  cornerAlfredoLisboaSul: { x: 335, y: 375 },
  marcoZero: { x: 425, y: 438 },
  caisApoloNorte: { x: 620, y: 190 },
  pracaArsenal: { x: 717, y: 348 },
  alfredoLisboaNorte: { x: 820, y: 340 }
};

// Função para calcular rota a pé realista entre qualquer Origem e Destino
export function calculateCustomRoute(originId, destinationId) {
  const origin = ALL_LOCATIONS.find(l => l.id === String(originId)) || ALL_LOCATIONS[0];
  const dest = ALL_LOCATIONS.find(l => l.id === String(destinationId)) || ALL_LOCATIONS[1];

  if (origin.id === dest.id) {
    return {
      points: [{ x: origin.pxX, y: origin.pxY }],
      distanceMeters: 0,
      walkingMinutes: 0,
      instructions: 'Você já está no local selecionado.'
    };
  }

  const points = [{ x: origin.pxX, y: origin.pxY }];

  // Se a rota passa entre a parte sul (NERD/Moeda) e a parte leste/norte (Moinho/CESAR)
  const isOriginSouth = origin.pxX < 350;
  const isDestEast = dest.pxX > 650;
  const isDestNorth = dest.pxY < 250;

  if (isOriginSouth && isDestEast) {
    points.push(WAYPOINTS.cornerBomJesusMoeda);
    points.push(WAYPOINTS.marcoZero);
    points.push(WAYPOINTS.pracaArsenal);
    if (dest.pxX > 850) {
      points.push(WAYPOINTS.alfredoLisboaNorte);
    }
  } else if (!isOriginSouth && dest.pxX < 350) {
    if (origin.pxX > 850) {
      points.push(WAYPOINTS.alfredoLisboaNorte);
    }
    points.push(WAYPOINTS.pracaArsenal);
    points.push(WAYPOINTS.marcoZero);
    points.push(WAYPOINTS.cornerBomJesusMoeda);
  } else if (isDestNorth && origin.pxY > 300) {
    points.push({ x: 380, y: 310 });
    points.push({ x: 500, y: 240 });
  }

  points.push({ x: dest.pxX, y: dest.pxY });

  // Cálculo da distância total euclidiana ponderada para escala real em metros
  let totalPixels = 0;
  for (let i = 0; i < points.length - 1; i++) {
    const dx = points[i + 1].x - points[i].x;
    const dy = points[i + 1].y - points[i].y;
    totalPixels += Math.sqrt(dx * dx + dy * dy);
  }

  // 1 pixel no mapa ~ 0.9 metros
  const distanceMeters = Math.max(50, Math.round(totalPixels * 0.9));
  // Velocidade média de caminhada ~ 80 metros por minuto
  const walkingMinutes = Math.max(1, Math.round(distanceMeters / 80));

  let instructions = `Caminhe cerca de ${distanceMeters}m (${walkingMinutes} min) pelas vias históricas do Recife Antigo até ${dest.name}.`;

  return {
    points,
    distanceMeters,
    walkingMinutes,
    instructions
  };
}

// Caminhos pré-definidos para o circuito geral
export const WALKING_PATHS = {
  strategicLoop: [
    { x: 278, y: 373 }, // Prédio 18 (NERD)
    { x: 290, y: 395 }, // Esquina Rua da Moeda / Bom Jesus
    { x: 335, y: 375 }, // Av. Alfredo Lisboa
    { x: 330, y: 202 }, // Prédio 07 (Ti.Saúde)
    { x: 374, y: 179 }, // Prédio 08 (ETE Porto Digital)
    { x: 404, y: 135 }, // Prédio 09 (Ponto BB)
    { x: 550, y: 145 }, // Cais do Apolo (via norte)
    { x: 712, y: 131 }, // Prédio 14 (CESAR School)
    { x: 858, y: 101 }, // Prédio 15 (Arena CESAR)
    { x: 840, y: 220 }, // Conexão via leste
    { x: 937, y: 305 }  // Prédio 26 (Moinho Recife)
  ]
};

export const EVENTS = [
  // --- ARENA DE NEGÓCIOS (NERD - PRÉDIO 18) ---
  {
    id: 'evt-1',
    title: 'Como transformar IA em Diferencial Estratégico',
    time: '10:00 - 11:00',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD 2º andar - Palco Asa Branca',
    speakers: ['André Petenussi', 'Helder Lins', 'Henrique Rabenhorst', 'Ascânio França'],
    description: 'Estratégias práticas para aplicar IA no core dos negócios corporativos gerando vantagem competitiva real.',
    track: 'negocios',
    trackLabel: 'Negócios e IA',
    tags: ['IA', 'Estratégia', 'Competitividade', 'Edifício NERD']
  },
  {
    id: 'evt-2',
    title: 'Olívia (Exposição Capgemini)',
    time: '10:00 - 19:00',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD Térreo - Hall',
    speakers: ['Equipe Capgemini'],
    description: 'Interaja com a Olívia, o avatar de IA da Capgemini projetado para orientar os visitantes do REC\'n\'Play com acessibilidade.',
    track: 'tech',
    trackLabel: 'Inovação e IA',
    tags: ['Avatar IA', 'Acessibilidade', 'Capgemini', 'Edifício NERD']
  },
  {
    id: 'evt-3',
    title: 'Crescer rápido sem quebrar: lições de quem escalou',
    time: '16:00 - 16:45',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD 3º andar - Palco Carcará',
    speakers: ['Paulo Magnus (Fundador da MV)', 'Domingos Monteiro (Trillia)', 'Flávia Brito (CEO BIDWEB)', 'Leonardo Pereira Costa (Selfit)'],
    description: 'Fundadores de gigantes de saúde e tech debatem os desafios de escalar operações — da contratação à expansão e governança.',
    track: 'saude',
    trackLabel: 'Saúde e Escala',
    tags: ['MV Saúde', 'Scale-up', 'Gestão', 'Edifício NERD']
  },
  {
    id: 'evt-4',
    title: "Fuckup Nights | Edição REC'n'Play 2026",
    time: '17:00 - 18:00',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD 3º andar - Palco Carcará',
    speakers: ['Empreendedores Convidados'],
    description: 'Histórias reais de erros, aprendizados e resiliência no ecossistema de startups e novos negócios.',
    track: 'negocios',
    trackLabel: 'Empreendedorismo',
    tags: ['Startups', 'Resiliência', 'Aprendizados', 'Edifício NERD']
  },
  {
    id: 'evt-5',
    title: 'Diversidade e inclusão nas organizações: como começar um plano de ação',
    time: '17:00 - 19:00',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD 2º andar - Lab. de Formação',
    speakers: ['Lucas Araujo'],
    description: 'Passo a passo prático para estruturar e implementar políticas de D e I efetivas dentro de empresas modernas.',
    track: 'negocios',
    trackLabel: 'Gestão de Pessoas',
    tags: ['Diversidade', 'Inclusão', 'Cultura', 'RH', 'Edifício NERD']
  },
  {
    id: 'evt-6',
    title: 'Quem você vai contratar em 2030? Os cargos que a IA está criando',
    time: '17:20 - 18:20',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD Térreo - Auditório',
    speakers: ['Cicero Lopes Silva', 'Marcos Santos', 'Victor Guelman', 'Mariana Pincovsky'],
    description: 'Projeções e perfis profissionais emergentes impulsionados por Inteligência Artificial generativa e agêntica.',
    track: 'tech',
    trackLabel: 'Futuro do Trabalho',
    tags: ['Carreiras', 'IA 2030', 'Talentos', 'Edifício NERD']
  },
  {
    id: 'evt-7',
    title: 'Hoje, amanhã e depois: o que vai mover os mercados e o marketing em 2027?',
    time: '14:00 - 15:15',
    buildingId: 18,
    location: 'Arena Pernambuco de Negócios - NERD Térreo - Auditório',
    speakers: ['Especialistas de Mercado'],
    description: 'Tendências de comportamento do consumidor, automação e previsão de demanda para os próximos anos.',
    track: 'negocios',
    trackLabel: 'Mercados e Marketing',
    tags: ['Mercado', 'Tendências 2027', 'Marketing', 'Edifício NERD']
  },

  // --- TRILHA DE SAÚDE, INCLUSÃO E IMPACTO SOCIAL ---
  {
    id: 'evt-8',
    title: 'Do Caos à Conexão: o futuro do trabalho precisa ser saudável',
    time: '11:40 - 12:40',
    buildingId: 7,
    location: 'Prédio Ti.Saúde (R. Mariz e Barros, 311)',
    speakers: ['Sílvio de Paula (UFPE)', 'Lucélia Karina Barbosa Tavares', 'Carolina Machado Dias Ramalho Luz'],
    description: 'Pesquisadores e psicólogos abordam o impacto da cobrança por desempenho e da hiperconectividade na saúde mental corporativa.',
    track: 'saude',
    trackLabel: 'Saúde Mental e Trabalho',
    tags: ['Ti.Saúde', 'Saúde Mental', 'Bem-Estar', 'Qualidade de Vida']
  },
  {
    id: 'evt-9',
    title: 'Novos modelos de moradia para longevidade',
    time: '11:40 - 12:40',
    buildingId: 16,
    location: 'Moeda 50 - Auditório Hall',
    speakers: ['Especialistas em Gerontologia e Urbanismo'],
    description: 'Debate essencial sobre Cohousing, Coliving, mobilidade urbana, redes de suporte e saúde para a população 60+.',
    track: 'saude',
    trackLabel: 'Longevidade e Saúde',
    tags: ['Longevidade', 'Habitação', 'Cohousing', 'Terceira Idade']
  },
  {
    id: 'evt-10',
    title: 'Oportunidades e desafios do uso da IA por pessoas idosas',
    time: '14:00 - 14:45',
    buildingId: 14,
    location: 'CESAR School - Bloco B - Sala 001 e 002',
    speakers: ['Guilherme Carvalho'],
    description: 'Como agentes de IA e interfaces adaptativas em smartphones criam novos suportes cognitivos e de saúde para a terceira idade.',
    track: 'saude',
    trackLabel: 'Saúde Digital e IA',
    tags: ['IA', 'Acessibilidade', 'Idosos', 'CESAR School']
  },
  {
    id: 'evt-11',
    title: '60+: Reinventando futuros com cultura e sabedoria',
    time: '17:00 - 19:00',
    buildingId: 14,
    location: 'CESAR School - Bloco B - Sala 101',
    speakers: ['Painel de Especialistas'],
    description: 'Economia prateada, reinvenção profissional e impacto cultural do envelhecimento ativo.',
    track: 'saude',
    trackLabel: 'Economia Prateada',
    tags: ['60+', 'Longevidade', 'Cultura', 'CESAR School']
  },
  {
    id: 'evt-12',
    title: 'Sinergia by Accenture - Carreiras, inclusão e novas possibilidades',
    time: '10:00 - 12:00',
    buildingId: 28,
    location: 'Accenture Innovation Center - Arena Marco Zero',
    speakers: ['Lideranças Accenture'],
    description: 'Inclusão produtiva, desenvolvimento de competências socioemocionais e diversidade corporativa.',
    track: 'negocios',
    trackLabel: 'Inclusão e Carreira',
    tags: ['Inclusão', 'Carreiras', 'Accenture']
  },
  {
    id: 'evt-13',
    title: 'Da primeira oportunidade à liderança: mulheres que abriram caminho',
    time: '18:00 - 19:00',
    buildingId: 1,
    location: 'Livraria Jaqueira - Galeria',
    speakers: ['Lideranças Femininas de Destaque'],
    description: 'Trajetórias inspiradoras de liderança feminina em tecnologia, finanças e gestão.',
    track: 'negocios',
    trackLabel: 'Liderança',
    tags: ['Mulheres Tech', 'Liderança', 'Carreira']
  },

  // --- TRILHA DE IA, DADOS E INOVAÇÃO EM SAÚDE E CRÍTICOS ---
  {
    id: 'evt-14',
    title: 'Absens: a IA que recupera vagas, apoia o regulador e acelera as filas do SUS',
    time: '14:40 - 15:30',
    buildingId: 26,
    location: 'Moinho Recife - Cesar - Sala Manguezal (TDC Stage)',
    speakers: ['Levi Nóbrega (CEO e Cofundador | Beyond Co.)'],
    description: 'Case de alta relevância médica e de gestão pública: como algoritmos de IA otimizam vagas hospitalares e regulação no SUS.',
    track: 'saude',
    trackLabel: 'Saúde Pública e IA',
    tags: ['IA no SUS', 'Absens', 'Beyond Co', 'TDC Stage', 'Moinho Recife']
  },
  {
    id: 'evt-15',
    title: 'TDC Stage - IA em Ambientes Críticos (Trilha Completa)',
    time: '14:40 - 19:00',
    buildingId: 26,
    location: 'Moinho Recife - Cesar - Sala Manguezal',
    speakers: ['Levi Nóbrega', 'Pesquisadores TDC', 'Lideranças de Governo'],
    description: 'Ciclo The Developer\'s Conference sobre governança de IA, modelos Hub-and-Spoke em serviços essenciais e saúde.',
    track: 'tech',
    trackLabel: 'IA Crítica e Governança',
    tags: ['TDC', 'IA Crítica', 'Governança', 'Moinho Recife']
  },
  {
    id: 'evt-16',
    title: 'Deep techs: Ciência e Impacto Global',
    time: '11:40 - 12:40',
    buildingId: 8,
    location: 'E.T.E. Porto Digital - Sala 3',
    speakers: ['Fundadores e Pesquisadores'],
    description: 'Como startups de base científica convertem pesquisa de bancada em soluções viáveis para saúde e sustentabilidade.',
    track: 'tech',
    trackLabel: 'Deep Tech e Ciência',
    tags: ['Deep Tech', 'Biotecnologia', 'Ciência', 'ETE Porto Digital']
  },
  {
    id: 'evt-17',
    title: 'Raízes antes de frutos: cultura e estratégia para reinventar a empresa com IA',
    time: '17:00 - 17:45',
    buildingId: 9,
    location: 'Ponto BB - Palco BBDW',
    speakers: ['Antônio Valença (CEO da Pitang)'],
    description: 'Transformação cultural e governança de dados na adoção massiva de Inteligência Artificial em empresas consolidadas.',
    track: 'negocios',
    trackLabel: 'Gestão e IA',
    tags: ['Pitang', 'Cultura IA', 'Governança', 'Ponto BB']
  },
  {
    id: 'evt-18',
    title: 'A IA funciona. A organização está pronta?',
    time: '17:00 - 18:00',
    buildingId: 8,
    location: 'E.T.E. Porto Digital - Sala 3',
    speakers: ['Líderes de Operações e Transformação'],
    description: 'Integração entre liderança, fluxos de trabalho e IA para captura de valor econômico real.',
    track: 'negocios',
    trackLabel: 'Operações e IA',
    tags: ['Transformação Digital', 'Operações', 'ETE Porto Digital']
  },
  {
    id: 'evt-19',
    title: 'Work-Based Learning: aprender enquanto o trabalho acontece',
    time: '18:00 - 19:00',
    buildingId: 26,
    location: 'Moinho Recife - Auditório',
    speakers: ['Silvio Meira', 'André Neves', 'Cinthia Cavalcanti'],
    description: 'Visão dos maiores nomes do ecossistema de inovação sobre o aprendizado contínuo acelerado por copilotos e agentes de IA.',
    track: 'tech',
    trackLabel: 'Futuro da Educação',
    tags: ['Silvio Meira', 'Work-Based Learning', 'Moinho Recife']
  },
  {
    id: 'evt-20',
    title: 'AX em Ação: Design e Data Science Construindo Confiança em Sistemas Agênticos',
    time: '18:00 - 19:00',
    buildingId: 14,
    location: 'CESAR School - Bloco C - Sala 111',
    speakers: ['Designers e Cientistas de Dados'],
    description: 'Agent Experience (AX) e a construção de credibilidade e segurança em automações orientadas por agentes.',
    track: 'tech',
    trackLabel: 'Sistemas Agênticos',
    tags: ['AX', 'Agentes IA', 'Data Science', 'CESAR School']
  },

  // --- NEGÓCIOS, GESTÃO E ESTRATÉGIA ---
  {
    id: 'evt-21',
    title: 'Do play à compra: conteúdo, entretenimento e estratégia do Mercado Livre',
    time: '10:00 - 11:15',
    buildingId: 14,
    location: 'CESAR School - Bloco B - Sala 001 e 002',
    speakers: ['Executivos de E-commerce'],
    description: 'A convergência entre live commerce, mídia própria e experiência de conversão em larga escala.',
    track: 'negocios',
    trackLabel: 'E-commerce e Mídia',
    tags: ['Mercado Livre', 'Conversão', 'CESAR School']
  },
  {
    id: 'evt-22',
    title: 'Do problema ao produto: IA está acelerando inovação ou apenas erros?',
    time: '18:00 - 19:00',
    buildingId: 15,
    location: 'Arena de Educação CESAR - Garagem 01',
    speakers: ['Product Managers e Engenheiros'],
    description: 'Validação ágil de hipóteses de produto contra o risco de alucinações e desperdício de sprint.',
    track: 'negocios',
    trackLabel: 'Product Management',
    tags: ['Produto', 'IA', 'Validação', 'Arena CESAR']
  },
  {
    id: 'evt-23',
    title: 'Liderar Times Híbridos: O Que Muda Quando Ninguém Está na Mesma Sala',
    time: '18:00 - 19:00',
    buildingId: 14,
    location: 'CESAR School - Bloco C - Sala 109',
    speakers: ['Gestores de Pessoas'],
    description: 'Comunicação assíncrona, segurança psicológica e métricas de entrega em regimes distribuídos.',
    track: 'negocios',
    trackLabel: 'Gestão de Pessoas',
    tags: ['Trabalho Remoto', 'Liderança', 'CESAR School']
  },
  {
    id: 'evt-24',
    title: 'Marca ou performance? O falso dilema que trava o crescimento de empresas',
    time: '18:00 - 19:00',
    buildingId: 14,
    location: 'CESAR School - Bloco A - Sala 204',
    speakers: ['Chief Marketing Officers'],
    description: 'Como alinhar branding e geração de pipeline qualificado em empresas B2B e tech.',
    track: 'negocios',
    trackLabel: 'Growth e Marketing',
    tags: ['Marketing B2B', 'Branding', 'Performance', 'CESAR School']
  }
];

export const STARTUPS_NERD = [
  // Startups do Dia 11/11 (Exposição Principal no Edifício NERD - Prédio 18)
  {
    id: 'stp-1',
    name: 'AnGV',
    slot: 'Slot 3',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Saúde e Gestão',
    tags: ['HealthTech', 'Gestão', 'Dia 11']
  },
  {
    id: 'stp-2',
    name: 'Antecipa Saúde',
    slot: 'Slot 4',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Medicina Preventiva',
    tags: ['Prevenção', 'Diagnóstico', 'Dia 11']
  },
  {
    id: 'stp-3',
    name: 'Chamavet',
    slot: 'Slot 6',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Saúde Animal e Vet',
    tags: ['VetTech', 'Saúde Animal', 'Dia 11']
  },
  {
    id: 'stp-4',
    name: 'DHF Saúde',
    slot: 'Slot 9',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Dispositivos e Hospitalar',
    tags: ['Hospitalar', 'Dispositivos', 'Dia 11']
  },
  {
    id: 'stp-5',
    name: 'Íris Biotec',
    slot: 'Slot 21',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Biotecnologia',
    tags: ['BioTech', 'Diagnóstico Avançado', 'Dia 11']
  },
  {
    id: 'stp-6',
    name: 'MedBooker (TECHCOD)',
    slot: 'Slot 24',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Agendamento e Clínicas',
    tags: ['SaaS Médico', 'Prontuário', 'Dia 11']
  },
  {
    id: 'stp-7',
    name: 'NanoMaPE',
    slot: 'Slot 29',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Nanotecnologia e Farmácia',
    tags: ['NanoTech', 'DeepTech', 'Dia 11']
  },
  {
    id: 'stp-8',
    name: 'Ninho Med - Exata Health Tech',
    slot: 'Slot 30',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Saúde Materno-Infantil',
    tags: ['Materno-Infantil', 'HealthTech', 'Dia 11']
  },
  {
    id: 'stp-9',
    name: 'PetBooker',
    slot: 'Slot 33',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Gestão Pet e Vet',
    tags: ['PetCare', 'VetTech', 'Dia 11']
  },
  {
    id: 'stp-10',
    name: 'Zyloq',
    slot: 'Slot 40',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '11 de Novembro',
    dayCode: '11',
    segment: 'Saúde e Inovação',
    tags: ['HealthTech', 'Conectividade', 'Dia 11']
  },

  // Startups do Dia 12/11 (Radar Complementar)
  {
    id: 'stp-11',
    name: 'Anamnese Case Co.',
    slot: 'Slot 1',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '12 de Novembro',
    dayCode: '12',
    segment: 'Educação Médica',
    tags: ['EdTech Saúde', 'Simulação', 'Dia 12']
  },
  {
    id: 'stp-12',
    name: 'DEEP MEDICA',
    slot: 'Slot 12',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '12 de Novembro',
    dayCode: '12',
    segment: 'IA Médica e Imagens',
    tags: ['IA Médica', 'DeepTech', 'Dia 12']
  },
  {
    id: 'stp-13',
    name: 'MindFocus',
    slot: 'Slot 29',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '12 de Novembro',
    dayCode: '12',
    segment: 'Neurotecnologia',
    tags: ['NeuroTech', 'Foco', 'Dia 12']
  },
  {
    id: 'stp-14',
    name: 'NexusBioTox',
    slot: 'Slot 30',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '12 de Novembro',
    dayCode: '12',
    segment: 'Biotoxicologia',
    tags: ['BioTech', 'Ensaios', 'Dia 12']
  },
  {
    id: 'stp-15',
    name: 'Wokibi',
    slot: 'Slot 40',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '12 de Novembro',
    dayCode: '12',
    segment: 'Saúde Ocupacional',
    tags: ['Ergonomia', 'Saúde Ocupacional', 'Dia 12']
  },

  // Startups do Dia 13/11 (Radar Complementar)
  {
    id: 'stp-16',
    name: 'Innmobile / Prevê Saúde Cidadã',
    slot: 'Slot 12',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '13 de Novembro',
    dayCode: '13',
    segment: 'Saúde Pública',
    tags: ['Saúde Cidadã', 'SUS', 'Dia 13']
  },
  {
    id: 'stp-17',
    name: 'Medme',
    slot: 'Slot 17',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '13 de Novembro',
    dayCode: '13',
    segment: 'Adesão Medicamentosa',
    tags: ['Farmácia', 'Adesão', 'Dia 13']
  },
  {
    id: 'stp-18',
    name: 'Novvus Healthtech',
    slot: 'Slot 20',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '13 de Novembro',
    dayCode: '13',
    segment: 'Integração de Dados',
    tags: ['Interoperabilidade', 'HealthTech', 'Dia 13']
  },
  {
    id: 'stp-19',
    name: 'Psi Talks',
    slot: 'Slot 25',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '13 de Novembro',
    dayCode: '13',
    segment: 'Saúde Mental',
    tags: ['Saúde Mental', 'Psicologia', 'Dia 13']
  },
  {
    id: 'stp-20',
    name: 'TO Vet',
    slot: 'Slot 33',
    buildingId: 18,
    buildingName: 'Arena Pernambuco de Negócios – Edifício NERD',
    date: '13 de Novembro',
    dayCode: '13',
    segment: 'Fisioterapia Veterinária',
    tags: ['VetTech', 'Reabilitação', 'Dia 13']
  }
];

// Documentos na íntegra para consulta pública transparente
export const RAW_DOCUMENTS = [
  {
    id: 'info_eventos_saude_gestao',
    title: 'Grade de Programação (11 de Novembro)',
    subtitle: 'Eventos selecionados para Saúde, Inteligência Artificial, Gestão e Negócios',
    badge: 'Programação 11/11',
    content: `# Guia REC'n'Play 2026 - Especial Negócios e Saúde (11 de Novembro)
AVISO: Este guia é uma iniciativa independente e colaborativa, sem vínculo institucional ou de comunicação oficial com a coordenação do festival REC'n'Play ou Porto Digital.

Este compilado focado no dia 11/11 reúne os painéis mais relevantes para quem atua em Saúde, Inteligência Artificial e Negócios. Ele foi desenhado para facilitar a jornada de tomadores de decisão, founders e profissionais de saúde, destacando as principais discussões e os locais onde o ecossistema estará reunido, incluindo a Arena de Negócios (Edifício NERD - Prédio 18), onde as startups AnGV e Zyloq estarão presentes.

## Destaques na Arena de Negócios (Edifício NERD - Prédio 18)
Visite as exposições e acompanhe os painéis no mesmo local onde a AnGV e a Zyloq apresentam suas soluções.

- 10:00 - 11:00 | Como transformar IA em Diferencial Estratégico
  * Local: Arena Pernambuco de Negócios - NERD 2º andar - Palco Asa Branca
  * Palestrantes: André Petenussi, Helder Lins, Henrique Rabenhorst e Ascânio França

- 10:00 - 19:00 | Olívia (Exposição Capgemini)
  * Local: Arena Pernambuco de Negócios - NERD Térreo - Hall
  * Descrição: Interaja com a Olívia, o avatar de IA da Capgemini, projetado para orientar os visitantes do REC'n'Play com dicas personalizadas, múltiplos idiomas e recursos de acessibilidade.

- 16:00 - 16:45 | Crescer rápido sem quebrar: lições de quem escalou
  * Local: Arena Pernambuco de Negócios - NERD 3º andar - Palco Carcará
  * Descrição: Fundadores discutem os desafios de escalar operações — da contratação rápida à expansão de mercados e manutenção da cultura organizacional.
  * Convidados de Destaque: Paulo Magnus (Fundador da MV), Domingos Monteiro (Conselheiro da Trillia), Flávia Brito (CEO BIDWEB) e Leonardo Pereira Costa (Fundador Selfit).

- 17:00 - 18:00 | Fuckup Nights | Edição REC'n'Play 2026
  * Local: Arena Pernambuco de Negócios - NERD 3º andar - Palco Carcará

- 17:00 - 19:00 | Diversidade e inclusão nas organizações: como começar um plano de ação
  * Local: Arena Pernambuco de Negócios - NERD 2º andar - Lab. de Formação
  * Palestrante: Lucas Araujo

- 17:20 - 18:20 | Quem você vai contratar em 2030? Os cargos que a IA está criando
  * Local: Arena Pernambuco de Negócios - NERD Térreo - Auditório
  * Palestrantes: Cicero Lopes Silva, Marcos Santos, Victor Guelman e Mariana Pincovsky

## Trilha de Saúde, Inclusão e Impacto Social
- 09:00 - 10:00 | To play hopscotch (Local: Senac - Galeria)
- 10:00 - 12:00 | Sinergia by Accenture - Carreiras, inclusão e novas possibilidades (Local: Accenture Innovation Center)
- 11:40 - 12:40 | Do Caos à Conexão: o futuro do trabalho precisa ser saudável (Local: Ti.Saúde - Prédio 07)
- 11:40 - 12:40 | Novos modelos de moradia para longevidade (Local: Moeda 50 - Auditório Hall - Prédio 16)
- 14:00 - 14:45 | Oportunidades e desafios do uso da IA por pessoas idosas (Local: Cesar School - Bloco B - Sala 001 e 002 - Prédio 14)
- 17:00 - 19:00 | 60+: Reinventando futuros com cultura e sabedoria (Local: Cesar School - Bloco B - Sala 101 - Prédio 14)
- 18:00 - 19:00 | Da primeira oportunidade à liderança: mulheres que abriram caminho (Local: Livraria Jaqueira - Galeria - Prédio 01)

## Trilha de Inteligência Artificial, Dados e Inovação
- 11:40 - 12:40 | Deep techs: Ciência e Impacto Global (Local: E.T.E. Porto Digital - Sala 3 - Prédio 08)
- 14:40 - 19:00 | TDC Stage - IA em Ambientes Críticos (Local: Moinho Recife - Cesar - Sala Manguezal - Prédio 26)
  * Destaques: Absens: IA no SUS por Levi Nóbrega (Beyond Co.).
- 16:40 - 17:40 | Criar, Compartilhar, Colaborar: a IA está reformatando nossas Economias? (Local: Moinho Recife - Lounge - Prédio 26)
- 17:00 - 17:45 | Raízes antes de frutos: cultura, estratégia e coragem para reinventar a empresa com IA (Local: Ponto BB - Palco BBDW - Prédio 09)
- 17:00 - 17:45 | Conecta Gov.br e Conecta+: Da Interoperabilidade à Economia de Dados (Local: Accenture Innovation Center - Auditório - Prédio 28)
- 17:00 - 18:00 | A IA funciona. A organização está pronta? (Local: E.T.E. Porto Digital - Sala 3 - Prédio 08)
- 18:00 - 19:00 | Work-Based Learning: aprender enquanto o trabalho acontece (Local: Moinho Recife - Auditório - Silvio Meira, André Neves, Cinthia Cavalcanti)
- 18:00 - 19:00 | AX em Ação: Design e Data Science Construindo Confiança em Sistemas Agênticos (Local: Cesar School - Bloco C - Sala 111 - Prédio 14)

## Negócios, Gestão e Empreendedorismo
- 10:00 - 10:45 | Exportação modo easy: como começar sem saber nada (Local: Senac - Auditório - Prédio 13)
- 10:00 - 11:15 | Do play à compra: conteúdo, entretenimento e a estratégia do Mercado Livre (Local: Cesar School - Prédio 14)
- 14:00 - 15:15 | Hoje, amanhã e depois: o que vai mover os mercados e o marketing em 2027? (Local: Arena de Negócios NERD - Prédio 18)
- 18:00 - 19:00 | Do problema ao produto: IA está acelerando inovação ou apenas erros? (Local: Arena CESAR School - Prédio 15)
- 18:00 - 19:00 | Liderar Times Híbridos: O Que Muda Quando Ninguém Está na Mesma Sala (Local: Cesar School - Prédio 14)
- 18:00 - 19:00 | Accenture SAP Domains (Local: Accenture Innovation Center - Prédio 28)
- 18:00 - 19:00 | Marca ou performance? O falso dilema que trava o crescimento de empresas (Local: Cesar School - Prédio 14)`
  },
  {
    id: 'info_startups_saude_expositoras',
    title: 'Startups de Saúde, Biotech e Vet na Arena NERD',
    subtitle: 'Mapeamento de slots de exposição no Edifício NERD (Prédio 18)',
    badge: 'Expositores NERD',
    content: `# Startups de Saúde, Biotech e Vet no REC'n'Play 2026 (Arena NERD)

AVISO: Guia independente e não-oficial de localização das healthtechs.

Este documento mapeia as startups do ecossistema de saúde e biotecnologia que estarão expondo na Arena de Negócios (Edifício NERD - Prédio 18) durante o REC'n'Play 2026. Os dados servem para guiar visitantes interessados em healthtechs e inovação médica.

## Dia 11 de Novembro (Dia Principal de Networking)
*Neste dia, as startups AnGV e Zyloq estarão expondo simultaneamente. Excelente oportunidade para criar conexões em bloco com visitantes da área da saúde.*

* **AnGV** (Slot 3)
* **Antecipa Saúde** (Slot 4)
* **Chamavet** (Slot 6)
* **DHF Saúde** (Slot 9)
* **Íris Biotec** (Slot 21)
* **MedBooker (TECHCOD)** (Slot 24)
* **NanoMaPE** (Slot 29)
* **Ninho Med - Exata Health Tech** (Slot 30)
* **PetBooker** (Slot 33)
* **Zyloq** (Slot 40)

## Dia 12 de Novembro (Radar de Oportunidades)
* **Anamnese Case Co.** (Slot 1)
* **DEEP MEDICA** (Slot 12)
* **MindFocus** (Slot 29)
* **NexusBioTox** (Slot 30)
* **Wokibi** (Slot 40)

## Dia 13 de Novembro (Radar de Oportunidades)
* **Innmobile / Prevê Saúde Cidadã** (Slot 12)
* **Medme** (Slot 17)
* **Novvus Healthtech** (Slot 20)
* **Psi Talks** (Slot 25)
* **TO Vet** (Slot 33)`
  },
  {
    id: 'info_empresas_saude_programacao',
    title: 'Grandes Players e Empresas de Saúde na Programação',
    subtitle: 'Casos práticos de IA no SUS, escala hospitalar e saúde do trabalhador',
    badge: 'Cases de Saúde',
    content: `# Empresas de Saúde na Programação (Dia 11/11)

Além da exposição, grandes players e soluções de saúde estarão nos palcos do festival:

## Absens (Beyond Company) - IA no SUS
* Palestra: Absens: a IA que recupera vagas, apoia o regulador e acelera as filas do SUS.
* Palestrante: Levi Nóbrega (Ceo e Cofundador | Beyond Co.).
* Horário: 14:40.
* Local: Moinho Recife - Cesar - Sala Manguezal (TDC Stage - IA em Ambientes Críticos - Prédio 26).

## MV - Cases de Escala
* Painel: Crescer rápido sem quebrar: lições de quem escalou.
* Participante: Paulo Magnus (Fundador da MV).
* Horário: 16:00 - 16:45.
* Local: Arena Pernambuco de Negócios - NERD 3º andar - Palco Carcará (Prédio 18).

## Ti.Saúde - Futuro do Trabalho e Saúde Mental
* Painel: Do Caos à Conexão: o futuro do trabalho precisa ser saudável.
* Participantes: Sílvio de Paula (UFPE), Lucélia Karina Barbosa Tavares, Carolina Machado Dias Ramalho Luz.
* Horário: 11:40 - 12:40.
* Local: Prédio Ti.Saúde (R. Mariz e Barros, 311 - Prédio 07).`
  },
  {
    id: 'info_mapa',
    title: 'Legenda do Mapa Oficial do Evento',
    subtitle: 'Relação dos 28 prédios oficiais, 29 ativações de rua e postos de apoio',
    badge: 'Legenda do Mapa',
    content: `# Legenda Oficial dos Polos e Prédios - REC'n'Play 2026

### PRÉDIOS E POLOS ESTRATÉGICOS
- 01 – Livraria Jaqueira
- 02 – Paço Alfândega – Espaço Educa Recife’Play
- 03 – Bunker Moeda
- 04 – Fab Lab Rec
- 05 – Arte Plural Galeria
- 06 – Sede Porto Digital
- 07 – Ti.Saúde
- 08 – ETE Porto Digital
- 09 – Ponto BB
- 10 – Teatro Hermilo Borba Filho
- 11 – Hub de Conexões
- 12 – Software Center da Stellantis
- 13 – Senac
- 14 – CESAR School
- 15 – Arena de Educação CESAR School
- 16 – Moeda 50
- 17 – Folha de Pernambuco
- 18 – Arena Pernambuco de Negócios – NERD
- 19 – Mercado Criativo de Pernambuco
- 20 – Secretaria da Mulher de Pernambuco
- 21 – UniAESO – Hub Patrocinadores
- 22 – Casa Zero
- 23 – Aponti
- 24 – Paço do Frevo
- 25 – Torre Malakoff
- 26 – Moinho Recife
- 27 – Cais do Sertão – Arena Gamer Banco do Brasil
- 28 – Accenture Innovation Center

### POSTOS DE SAÚDE
- PS – Posto Médico Sul (Próximo à Rua da Moeda e Prédio 18)
- PS – Posto Médico Norte (Próximo à Torre Malakoff e P2)

### MOBILIDADE
- M1 – Receptivo Caravanas de Estudante
- M2 – Ponto Teletáxi
- M3 – Ponto de Táxi e Aplicativos
- M4 – Bicicletários`
  }
];
