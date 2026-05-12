import { defineStore } from 'pinia'

export const useDashboardStore = defineStore('dashboard', {
  state: () => ({
    // KPIs Estratégicos
    kpis: {
      freteFat30Dias: { label: '% Frete (Fat. Últ. 30 dias)', value: '9,71%', color: '#181852' },
      pedidosMais30DiasRS: { label: 'R$ Pedidos > 30 dias', value: 'R$ 6,25 Mi', color: '#92171B' },
      pedidosMais30DiasQtd: { label: 'Qtd. Pedidos > 30 dias', value: '761', color: '#92171B' },
      pedidosSemCargaRS: { label: 'R$ Pedidos sem Carga', value: '45,61 Mi', color: '#181852' },
      pedidosSemCargaQtd: { label: 'Qtd. Pedidos sem Carga', value: '6974', color: '#181852' },
      pedidosEmAbertoRS: { label: 'Pedidos em aberto (Kg)', value: '1,09 Mi', color: '#181852' },
      m3PedidosEmAberto: { label: 'M3 pedidos em aberto', value: '9395,07', color: '#181852' },
      volumesEmAberto: { label: 'Volumes em aberto', value: '88338', color: '#181852' },
      percPedidosEmAtraso: { label: '% Pedidos em Atraso', value: '591', color: '#181852' },
      backlogDias: { label: 'Backlog (Dias)', value: '14,13', color: '#92171B' },
      leadTimeMedio: { label: 'Lead Time (médio)', value: '505,48', color: '#181852' },
      cargasEmAberto: { label: 'Cargas em aberto', value: '78', color: '#181852' },
      cargasEmAbertoRS: { label: 'Cargas em aberto (R$)', value: 'R$ 6,21 Mi', color: '#181852' },
    },
    
    // Gráfico de Previsão de Faturamento
    previsaoFaturamento: [
      { ano: 2026, mes: 'maio', carga: 33, peso: 833.93, rsCarga: 432120.61, rsKG: 6.12, difFrete: 242299.28 },
      { ano: 2026, mes: 'abril', carga: 21, peso: 329.24, rsCarga: 168276.10, rsKG: 6.53, difFrete: 97286.40 },
      { ano: 2026, mes: 'março', carga: 7, peso: 20.52, rsCarga: 10831.13, rsKG: 6.03, difFrete: 2802.33 },
    ],
    chartPrevisaoFaturamento: {
      series: [{ name: 'R$ Carga Previsto', data: [10831.13, 168276.10, 432120.61] }],
      categories: ['Março/2026', 'Abril/2026', 'Maio/2026']
    },

    // Lead Time por Região
    chartLeadTime: {
      categories: ['Sul de Minas', 'Triângulo Mineiro', 'Vale do Aço', 'Zona da Mata', 'Grande BH'],
      series: [{ name: 'Lead Time (Dias)', data: [4.2, 5.5, 3.8, 6.1, 4.4] }]
    },

    // Status Pedidos Granular
    statusPedidos: [
      { 
        status: 'Bloqueado', 
        items: [
          { pedido: 'PED-1001', cliente: 'Logistica Brasil S.A', volume: 15, m3: 1.2, peso: 450 },
          { pedido: 'PED-1002', cliente: 'Transp. Rápido Ltda', volume: 8, m3: 0.6, peso: 210 }
        ] 
      },
      { 
        status: 'Recepcionado/Em aberto', 
        items: [
          { pedido: 'PED-2001', cliente: 'Distribuidora Norte', volume: 120, m3: 8.5, peso: 2400 },
          { pedido: 'PED-2002', cliente: 'Sul Varejo', volume: 45, m3: 3.2, peso: 980 }
        ] 
      },
      { 
        status: 'Em produção', 
        items: [
          { pedido: 'PED-3001', cliente: 'Indústria Metal', volume: 60, m3: 4.0, peso: 1500 }
        ] 
      },
      { 
        status: 'Faturado', 
        items: [
          { pedido: 'PED-4001', cliente: 'Comércio Global', volume: 200, m3: 15.0, peso: 5000 }
        ] 
      },
      { 
        status: 'Liberado para carregamento', 
        items: [
          { pedido: 'PED-5001', cliente: 'Transporte & Cia', volume: 90, m3: 7.2, peso: 1800 }
        ] 
      },
      { 
        status: 'Em transporte', 
        items: [
          { pedido: 'PED-6001', cliente: 'Logística Total', volume: 300, m3: 22.5, peso: 7500 }
        ] 
      },
      { 
        status: 'Entregue', 
        items: [
          { pedido: 'PED-7001', cliente: 'Cliente Final SP', volume: 10, m3: 0.8, peso: 120 }
        ] 
      }
    ],

    // Mock Chart Data
    chartRSKG: {
      series: [{ name: 'R$ KG', data: [6.03, 5.92, 6.02, 6.16, 6.32, 6.02, 5.93, 5.95, 6.03, 6.21, 6.29, 6.19] }],
      categories: ['jun/25', 'jul/25', 'ago/25', 'set/25', 'out/25', 'nov/25', 'dez/25', 'jan/26', 'fev/26', 'mar/26', 'abr/26', 'mai/26']
    },



    chartToneladasFaturadas: {
      series: [{ name: 'Toneladas', data: [2522.39, 2745.54, 2748.53, 2627.08, 2953.61, 3091.67, 2416.18, 2239.33, 1583.87, 2768.34, 2583.92, 628.89] }],
      categories: ['jun/25', 'jul/25', 'ago/25', 'set/25', 'out/25', 'nov/25', 'dez/25', 'jan/26', 'fev/26', 'mar/26', 'abr/26', 'mai/26'],
      colors: ['#181852', '#92171B', '#181852', '#92171B', '#181852', '#92171B', '#181852', '#92171B', '#181852', '#92171B', '#181852', '#92171B']
    },

    chartCarregamento: {
      series: [
        { name: 'Não', data: [0, 44171, 0, 61504, 0, 90085, 72715] },
        { name: 'Sim', data: [124565, 0, 0, 0, 0, 0, 0] },
      ],
      categories: ['6', '7', '8', '9', '10', '11', '12']
    },
    
    // Operacional - Cargas Hoje
    cargasHoje: [
      { carga: '89367', desc: 'ADAIR ALAGOAS', motorista: 'INDEFINIDA', peso: 9723.87, status: 'Aberta' },
      { carga: '89394', desc: 'ANTONIO RIO DE JANEIRO', motorista: 'ANTONIO...', peso: 7758.78, status: 'Faturada' },
      { carga: '89418', desc: 'JULIO REDE CASA 2', motorista: 'JULIO CES...', peso: 30958.17, status: 'Faturada' },
      { carga: '89420', desc: 'ADAIR HOUSE RODEIRO', motorista: 'ADAIR LUI...', peso: 16927.90, status: 'Faturada' },
      { carga: '89449', desc: 'OSCAR PONCIO', motorista: 'INDEFINIDA', peso: 18634.69, status: 'Aberta' },
    ],

    // Operacional - Conferência Coletagem
    conferenciaColetagem: [
      { carga: '89600 - RETIRA SAMUEL COELHO', previsto: 6, realizado: 6, dif: 0 },
      { carga: '89599 - RETIRA GESLAN', previsto: 8, realizado: 8, dif: 0 },
      { carga: '89598 - RETIRA MARCO ANTONIO', previsto: 2, realizado: 2, dif: 0 },
      { carga: '89596 - RETIRA ELETROLAR DAMARI', previsto: 4, realizado: 4, dif: 0 },
    ],

    // Operacional - Retira Hoje
    retiraHoje: [
      { carga: '88927', desc: 'MADEIRA 07/04 ARU...', motorista: 'INDEFINIDA', peso: '136,30', status: 'Faturada', coleta: 'error' },
      { carga: '89010', desc: 'MADEIRA 09/04 ARU...', motorista: 'INDEFINIDA', peso: '25,80', status: 'Faturada', coleta: 'success' },
      { carga: '89121', desc: 'MADEIRA 14/04 ARU...', motorista: 'INDEFINIDA', peso: '96,70', status: 'Faturada', coleta: 'success' },
      { carga: '89246', desc: 'AST. MADEIRA ARUJ...', motorista: 'INDEFINIDA', peso: '19,16', status: 'Faturada', coleta: 'warning' },
      { carga: '89249', desc: 'AST. MADEIRA RJ 22...', motorista: 'INDEFINIDA', peso: '14,97', status: 'Faturada', coleta: 'warning' },
      { carga: '89250', desc: 'AST. MADEIRA 22/04', motorista: 'INDEFINIDA', peso: '165,90', status: 'Faturada', coleta: 'warning' },
      { carga: '89271', desc: 'MADEIRA 22/04 ARU...', motorista: 'INDEFINIDA', peso: '2.575,30', status: 'Faturada', coleta: 'success' },
      { carga: '89322', desc: 'MADEIRA DIRETA M...', motorista: 'INDEFINIDA', peso: '1.253,30', status: 'Faturada', coleta: 'success' },
      { carga: '89354', desc: 'MADEIRA 24/04 ARU...', motorista: 'INDEFINIDA', peso: '417,20', status: 'Faturada', coleta: 'success' },
      { carga: '89356', desc: 'MADEIRA 24/04 GER...', motorista: 'INDEFINIDA', peso: '193,10', status: 'Faturada', coleta: 'success' },
      { carga: '89360', desc: 'AST. MADEIRA ARUJ...', motorista: 'INDEFINIDA', peso: '8,32', status: 'Faturada', coleta: 'warning' },
      { carga: '89361', desc: 'MADEIRA 24/04 FAV...', motorista: 'INDEFINIDA', peso: '686,60', status: 'Faturada', coleta: 'success' },
      { carga: '89363', desc: 'AST. MADEIRA RJ 27...', motorista: 'INDEFINIDA', peso: '6,36', status: 'Faturada', coleta: 'warning' },
      { carga: '89364', desc: 'AST. MADEIRA 27/04', motorista: 'INDEFINIDA', peso: '54,56', status: 'Faturada', coleta: 'warning' },
    ],

    // --- Roteirização de Carga ---

    // Mapa de Calor (Simulado com dados de Scatter/Bubble)
    mapaPedidos: [
      { x: -69.19, y: -3.10, z: 20, cep: '69680-000', valor: 'R$ 779,80', cidade: 'SANTO ANTONIO DO ICA', peso: '2.394,53', volumes: '88', m3: '6,09' },
      { x: -38.50, y: -3.71, z: 15, cep: '60000-000', valor: 'R$ 1.250,00', cidade: 'FORTALEZA', peso: '850.00', volumes: '120', m3: '150,00' },
      { x: -38.52, y: -12.97, z: 30, cep: '40000-000', valor: 'R$ 4.500,00', cidade: 'SALVADOR', peso: '3.200.00', volumes: '450', m3: '850,00' },
      { x: -47.92, y: -15.78, z: 10, cep: '70000-000', valor: 'R$ 3.100,00', cidade: 'BRASILIA', peso: '1.500.00', volumes: '200', m3: '400,00' },
      { x: -46.63, y: -23.55, z: 40, cep: '01000-000', valor: 'R$ 15.000,00', cidade: 'SAO PAULO', peso: '12.000.00', volumes: '1500', m3: '3.200,00' },
      { x: -43.17, y: -22.90, z: 35, cep: '20000-000', valor: 'R$ 12.300,00', cidade: 'RIO DE JANEIRO', peso: '9.500.00', volumes: '1100', m3: '2.400,00' },
      { x: -43.93, y: -19.92, z: 25, cep: '30000-000', valor: 'R$ 8.400,00', cidade: 'BELO HORIZONTE', peso: '6.200.00', volumes: '850', m3: '1.800,00' },
      { x: -49.27, y: -25.42, z: 28, cep: '80000-000', valor: 'R$ 7.800,00', cidade: 'CURITIBA', peso: '5.400.00', volumes: '720', m3: '1.500,00' },
      { x: -51.21, y: -30.03, z: 22, cep: '90000-000', valor: 'R$ 6.900,00', cidade: 'PORTO ALEGRE', peso: '4.800.00', volumes: '650', m3: '1.300,00' },
      { x: -48.54, y: -27.59, z: 18, cep: '88000-000', valor: 'R$ 5.200,00', cidade: 'FLORIANOPOLIS', peso: '3.500.00', volumes: '480', m3: '900,00' },
      { x: -34.88, y: -8.04, z: 24, cep: '50000-000', valor: 'R$ 6.500,00', cidade: 'RECIFE', peso: '4.200.00', volumes: '580', m3: '1.100,00' },
      { x: -49.25, y: -16.68, z: 14, cep: '74000-000', valor: 'R$ 4.100,00', cidade: 'GOIANIA', peso: '2.800.00', volumes: '350', m3: '700,00' },
      { x: -56.09, y: -15.60, z: 12, cep: '78000-000', valor: 'R$ 3.800,00', cidade: 'CUIABA', peso: '2.500.00', volumes: '320', m3: '650,00' },
      { x: -44.30, y: -2.52, z: 16, cep: '65000-000', valor: 'R$ 4.900,00', cidade: 'SAO LUIS', peso: '3.100.00', volumes: '410', m3: '850,00' },
      { x: -60.02, y: -3.11, z: 20, cep: '69000-000', valor: 'R$ 5.600,00', cidade: 'MANAUS', peso: '3.800.00', volumes: '520', m3: '1.050,00' },
      { x: -40.31, y: -20.31, z: 17, cep: '29000-000', valor: 'R$ 3.400,00', cidade: 'VITORIA', peso: '2.100.00', volumes: '280', m3: '550,00' }
    ],

    // Tabela UF/Cidade
    roteirizacaoUF: [
      { uf: 'ACRE', assistencia: 2, pedido: 5, cidades: [{ nome: 'Rio Branco', assistencia: 2, pedido: 5 }] },
      { uf: 'ALAGOAS', assistencia: 7, pedido: 9, cidades: [{ nome: 'Maceió', assistencia: 5, pedido: 7 }, { nome: 'Arapiraca', assistencia: 2, pedido: 2 }] },
      { uf: 'AMAPA', assistencia: 1, pedido: 3, cidades: [{ nome: 'Macapá', assistencia: 1, pedido: 3 }] },
      { uf: 'AMAZONAS', assistencia: 4, pedido: 12, cidades: [{ nome: 'Manaus', assistencia: 4, pedido: 10 }, { nome: 'Parintins', assistencia: 0, pedido: 2 }] },
      { uf: 'BAHIA', assistencia: 27, pedido: 45, cidades: [{ nome: 'Salvador', assistencia: 20, pedido: 30 }, { nome: 'Feira de Santana', assistencia: 7, pedido: 15 }] },
      { uf: 'CEARA', assistencia: 12, pedido: 28, cidades: [{ nome: 'Fortaleza', assistencia: 8, pedido: 20 }, { nome: 'Caucaia', assistencia: 4, pedido: 8 }] },
      { uf: 'DISTRITO FEDERAL', assistencia: 9, pedido: 15, cidades: [{ nome: 'Brasília', assistencia: 9, pedido: 15 }] },
      { uf: 'ESPIRITO SANTO', assistencia: 15, pedido: 22, cidades: [{ nome: 'Vitória', assistencia: 10, pedido: 12 }, { nome: 'Vila Velha', assistencia: 5, pedido: 10 }] },
      { uf: 'GOIAS', assistencia: 18, pedido: 35, cidades: [{ nome: 'Goiânia', assistencia: 12, pedido: 25 }, { nome: 'Anápolis', assistencia: 6, pedido: 10 }] },
      { uf: 'MARANHAO', assistencia: 8, pedido: 18, cidades: [{ nome: 'São Luís', assistencia: 6, pedido: 14 }, { nome: 'Imperatriz', assistencia: 2, pedido: 4 }] },
      { uf: 'MATO GROSSO', assistencia: 11, pedido: 26, cidades: [{ nome: 'Cuiabá', assistencia: 8, pedido: 16 }, { nome: 'Rondonópolis', assistencia: 3, pedido: 10 }] },
      { uf: 'MINAS GERAIS', assistencia: 45, pedido: 89, cidades: [{ nome: 'Belo Horizonte', assistencia: 25, pedido: 50 }, { nome: 'Uberlândia', assistencia: 12, pedido: 25 }, { nome: 'Contagem', assistencia: 8, pedido: 14 }] },
      { uf: 'PARANA', assistencia: 32, pedido: 67, cidades: [{ nome: 'Curitiba', assistencia: 20, pedido: 45 }, { nome: 'Londrina', assistencia: 8, pedido: 12 }, { nome: 'Maringá', assistencia: 4, pedido: 10 }] },
      { uf: 'PERNAMBUCO', assistencia: 21, pedido: 41, cidades: [{ nome: 'Recife', assistencia: 15, pedido: 30 }, { nome: 'Jaboatão', assistencia: 6, pedido: 11 }] },
      { uf: 'RIO DE JANEIRO', assistencia: 56, pedido: 112, cidades: [{ nome: 'Rio de Janeiro', assistencia: 40, pedido: 80 }, { nome: 'Niterói', assistencia: 10, pedido: 20 }, { nome: 'Nova Iguaçu', assistencia: 6, pedido: 12 }] },
      { uf: 'RIO GRANDE DO SUL', assistencia: 38, pedido: 75, cidades: [{ nome: 'Porto Alegre', assistencia: 22, pedido: 40 }, { nome: 'Caxias do Sul', assistencia: 10, pedido: 25 }, { nome: 'Pelotas', assistencia: 6, pedido: 10 }] },
      { uf: 'SANTA CATARINA', assistencia: 25, pedido: 54, cidades: [{ nome: 'Florianópolis', assistencia: 12, pedido: 24 }, { nome: 'Joinville', assistencia: 8, pedido: 20 }, { nome: 'Blumenau', assistencia: 5, pedido: 10 }] },
      { uf: 'SAO PAULO', assistencia: 120, pedido: 245, cidades: [{ nome: 'São Paulo', assistencia: 70, pedido: 150 }, { nome: 'Campinas', assistencia: 25, pedido: 50 }, { nome: 'Guarulhos', assistencia: 15, pedido: 25 }, { nome: 'SBC', assistencia: 10, pedido: 20 }] }
    ],

    // Gráfico Volume/Peso por UF
    chartVolumePeso: {
      series: [
        { name: 'VOLUME', data: [15000, 50000, 10000, 150000, 600000, 900000, 120000, 250000, 300000, 180000, 400000, 1500000, 800000, 450000, 1800000, 750000, 550000, 3500000] },
        { name: 'PESO', data: [25000, 80000, 15000, 200000, 850000, 1200000, 180000, 350000, 420000, 280000, 500000, 2200000, 1100000, 650000, 2500000, 950000, 750000, 4800000] }
      ],
      categories: ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MG', 'PR', 'PE', 'RJ', 'RS', 'SC', 'SP']
    },

    // Gráfico Pedidos e Assistências por Carga
    chartPedidosAssistenciaCarga: {
      series: [
        { name: 'Pedidos', data: [150, 200, 120, 180, 220, 190, 110, 300, 250, 170, 140, 280, 210, 160, 230] },
        { name: 'Assistências', data: [20, 35, 10, 25, 40, 15, 8, 45, 30, 20, 12, 38, 28, 18, 33] }
      ],
      categories: ['Carga 8901', 'Carga 8902', 'Carga 8903', 'Carga 8904', 'Carga 8905', 'Carga 8906', 'Carga 8907', 'Carga 8908', 'Carga 8909', 'Carga 8910', 'Carga 8911', 'Carga 8912', 'Carga 8913', 'Carga 8914', 'Carga 8915']
    },

    // Entrega: Sim/Não (Toggle KG / R$)
    chartEntrega: {
      kg: [85400, 23100], // Sim, Não
      rs: [1542000, 410500], // Sim, Não
      labels: ['Sim (Entrega)', 'Não (Retira)']
    },

    // Detalhamento de Pedidos e Assistências
    pedidosAssistenciasDetalhe: [
      { seq: 0, emp: 1, tipo: 'Ped.', doc: '1672815', emissao: '03/10/2025', cod: '35707', cliente: 'MARIA ELANE DOS REIS SILVA', indicators: { antec: 'success', ass: 'error' }, m3: 0.16, peso: 76.90, rsEmCarga: 542.23, rsFrete: 54.22, percFrete: 10, rsPedido: 542.23, volumes: 2, previsao: '14/04/2026', consultor: 'RODRIGUES E SANTOS REPRESENTACOES' },
      { seq: 0, emp: 1, tipo: 'Ped.', doc: '1631366', emissao: '03/10/2025', cod: '35707', cliente: 'MARIA ELANE DOS REIS SILVA', indicators: { antec: 'success', ass: 'error' }, m3: 0.49, peso: 230.70, rsEmCarga: 1626.69, rsFrete: 162.66, percFrete: 10, rsPedido: 1626.69, volumes: 6, previsao: '14/04/2026', consultor: 'RODRIGUES E SANTOS REPRESENTACOES' },
      { seq: 0, emp: 1, tipo: 'Ass.', doc: '1645778', emissao: '07/10/2025', cod: '1292', cliente: 'BAZAR SAO LUIZ LTDA', indicators: { antec: 'success', ass: 'error' }, m3: 0.02, peso: 15.59, rsEmCarga: 52.06, rsFrete: 0.00, percFrete: 0, rsPedido: 52.06, volumes: 7, previsao: '-', consultor: 'MARCELO MARQUES REPRESENTAÇÃO' },
      { seq: 0, emp: 1, tipo: 'Ass.', doc: '1675182', emissao: '27/10/2025', cod: '26539', cliente: 'MOBILIADORA TOLEDO LTDA ME', indicators: { antec: 'warning', ass: 'error' }, m3: 0.01, peso: 3.40, rsEmCarga: 9.52, rsFrete: 0.00, percFrete: 0, rsPedido: 9.52, volumes: 1, previsao: '12/05/2026', consultor: 'M.C REPRESENTAÇÕES' },
      { seq: 0, emp: 1, tipo: 'Ass.', doc: '1682961', emissao: '02/11/2025', cod: '26539', cliente: 'MOBILIADORA TOLEDO LTDA ME', indicators: { antec: 'warning', ass: 'error' }, m3: 0.01, peso: 4.17, rsEmCarga: 14.25, rsFrete: 0.00, percFrete: 0, rsPedido: 14.25, volumes: 1, previsao: '12/05/2026', consultor: 'M.C REPRESENTAÇÕES' },
      { seq: 7, emp: 1, tipo: 'Ped.', doc: '1639745', emissao: '05/01/2026', cod: '16663', cliente: 'SUPERMERCADO 2000 LTDA', indicators: { antec: 'success', ass: 'error' }, m3: 0.34, peso: 120.20, rsEmCarga: 969.13, rsFrete: 135.67, percFrete: 14, rsPedido: 969.13, volumes: 4, previsao: '17/04/2026', consultor: 'SOUZA LIMA REPRESENTACOES' },
      { seq: 0, emp: 1, tipo: 'Ped.', doc: '1796029', emissao: '14/01/2026', cod: '26070', cliente: 'ORGANIZACAO COMERCIAL FONSECA LTDA', indicators: { antec: 'success', ass: 'error' }, m3: 0.75, peso: 415.20, rsEmCarga: 2411.10, rsFrete: 0.00, percFrete: 0, rsPedido: 6028.70, volumes: 12, previsao: '19/01/2026', consultor: 'MARCELO MARQUES REPRESENTAÇÃO' },
    ],

    // Detalhamento de Cargas
    cargasDetalhe: [
      { carga: '89681', desc: 'MANSAO RJ', qtdDoc: 3, peso: 23439.00, m3: 46.48, rsCarga: 148982.35, rsPedido: 148982.35, percFrete: 5.94, rsFrete: 8842.94, rsCombinado: 0, difFrete: 8842.94, volumes: 851, preFat: '14/05/2026', fechamento: '', liberacao: '', conferencia: '', libFat: '' },
      { carga: '89680', desc: 'RETIRA HJM', qtdDoc: 2, peso: 1745.60, m3: 3.54, rsCarga: 11867.46, rsPedido: 65536.23, percFrete: 0.00, rsFrete: 0.00, rsCombinado: 0, difFrete: 0.00, volumes: 68, preFat: '', fechamento: '', liberacao: '', conferencia: '', libFat: '' },
      { carga: '89679', desc: 'RETIRA JOSE EUDES', qtdDoc: 3, peso: 369.20, m3: 0.69, rsCarga: 2626.36, rsPedido: 2626.36, percFrete: 0.00, rsFrete: 0.00, rsCombinado: 0, difFrete: 0.00, volumes: 18, preFat: '', fechamento: '', liberacao: '', conferencia: '', libFat: '' },
      { carga: '89678', desc: 'RETIRA SOARES E NOE', qtdDoc: 3, peso: 317.70, m3: 0.66, rsCarga: 2268.60, rsPedido: 2268.60, percFrete: 0.00, rsFrete: 0.00, rsCombinado: 0, difFrete: 0.00, volumes: 9, preFat: '08/05/2026', fechamento: '', liberacao: '', conferencia: '', libFat: '' },
      { carga: '89676', desc: 'REQUINTE', qtdDoc: 11, peso: 27615.90, m3: 58.56, rsCarga: 190752.00, rsPedido: 190752.00, percFrete: 5.77, rsFrete: 11014.02, rsCombinado: 0, difFrete: 11014.02, volumes: 982, preFat: '13/05/2026', fechamento: '', liberacao: '', conferencia: '', libFat: '' },
      { carga: '89673', desc: 'RETIRA MAIA CUSTODIO', qtdDoc: 2, peso: 1001.00, m3: 2.19, rsCarga: 7425.47, rsPedido: 16970.42, percFrete: 0.00, rsFrete: 0.00, rsCombinado: 0, difFrete: 0.00, volumes: 26, preFat: '08/05/2026', fechamento: '08/05/2026', liberacao: '08/05/2026', conferencia: '', libFat: '' },
    ]
  }),
  actions: {
    // Ações para carregar/atualizar dados (simulado)
  }
})
