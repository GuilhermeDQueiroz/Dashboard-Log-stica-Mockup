<template>
  <div class="painel-operacional">
    <!-- KPIs -->
    <v-row class="mb-4" justify="center">
      <v-col v-for="(kpi, key) in row1Kpis" :key="key" cols="12" sm="6" md="auto" class="flex-grow-1">
        <KpiCard :label="kpi.label" :value="kpi.value" :color="kpi.color" :is-badge="kpi.isBadge" />
      </v-col>
    </v-row>
    <v-row class="mb-6" justify="center">
      <v-col v-for="(kpi, key) in row2Kpis" :key="key" cols="12" sm="6" md="auto" class="flex-grow-1">
        <KpiCard :label="kpi.label" :value="kpi.value" :color="kpi.color" :is-badge="kpi.isBadge" />
      </v-col>
    </v-row>

    <!-- Charts Row 1 -->
    <v-row class="mb-6">
      <v-col cols="12" md="6">
        <v-card class="premium-card">
          <v-card-title class="card-title py-3 px-4 text-grey-darken-3">Previsão de Faturamento (R$ Carga)</v-card-title>
          <v-card-text>
            <apexchart type="bar" height="300" :options="chartOptionsFaturamento" :series="store.chartPrevisaoFaturamento.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="premium-card">
          <v-card-title class="card-title py-3 px-4 text-grey-darken-3">Previsão Carregamento Próximos 7 Dias (KG)</v-card-title>
          <v-card-text>
            <apexchart type="bar" height="300" :options="chartOptionsCarregamento" :series="store.chartCarregamento.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Row 2: Lead Time and Status Details -->
    <v-row class="mb-6">
      <!-- Lead Time -->
      <v-col cols="12" md="6">
        <v-card class="premium-card h-100">
          <v-card-title class="card-title py-3 px-4 text-grey-darken-3">Lead Time Médio por Região (Dias)</v-card-title>
          <v-card-text>
            <apexchart type="bar" height="300" :options="chartOptionsLeadTime" :series="store.chartLeadTime.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Status dos Pedidos (Granular) -->
      <v-col cols="12" md="6">
        <v-card class="premium-card d-flex flex-column" style="height: 420px;">
          <div class="py-3 px-4 d-flex justify-center align-center font-weight-bold flex-shrink-0 card-title border-bottom" style="font-size: 0.9rem;">
            <span class="text-grey-darken-3 text-uppercase">Status dos Pedidos</span>
          </div>
          <div class="bg-white py-1 px-4 d-flex justify-space-between text-caption font-weight-bold flex-shrink-0 text-grey-darken-2 border-bottom">
            <span style="flex: 2">STATUS</span>
            <span style="flex: 1; text-align: right">QTD</span>
          </div>
          <v-expansion-panels variant="accordion" class="custom-expansion flex-grow-1" style="overflow-y: auto;">
            <v-expansion-panel v-for="statusGroup in paginatedStatusPedidos" :key="statusGroup.status">
              <v-expansion-panel-title class="py-2 px-4 min-height-0 text-body-2 font-weight-medium bg-grey-lighten-4">
                <span style="flex: 2">{{ statusGroup.status }}</span>
                <span style="flex: 1; text-align: right" class="font-weight-bold">{{ statusGroup.items.length }}</span>
              </v-expansion-panel-title>
              <v-expansion-panel-text class="pa-0">
                <v-data-table
                  :headers="statusTableHeaders"
                  :items="statusGroup.items"
                  :items-per-page="10"
                  density="compact"
                  class="text-caption custom-table"
                >
                  <template #[`item.peso`]="{ value }">{{ value }}kg</template>
                </v-data-table>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
          <!-- Pagination -->
          <div class="px-4 py-1 border-top bg-white d-flex align-center justify-center">
            <v-pagination v-model="statusPage" :length="Math.ceil(store.statusPedidos.length / 10)" density="compact" total-visible="5"></v-pagination>
          </div>
          <div class="bg-white py-2 px-4 d-flex justify-space-between font-weight-bold text-body-2 flex-shrink-0 border-top text-grey-darken-3">
            <span style="flex: 2">Total Pedidos</span>
            <span style="flex: 1; text-align: right">314</span>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <!-- Toggle View Button -->
    <v-row class="mb-4" justify="center">
      <v-col cols="auto">
        <v-btn-toggle v-model="showRoteirizacao" color="primary" mandatory rounded="xl" elevation="1" class="bg-white">
          <v-btn :value="false" prepend-icon="mdi-table-large" class="px-6 text-none font-weight-bold">Tabelas Operacionais</v-btn>
          <v-btn :value="true" prepend-icon="mdi-map-marker-path" class="px-6 text-none font-weight-bold">Roteirização de Carga</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>

    <!-- SECTION: Tabelas Operacionais -->
    <div v-show="!showRoteirizacao">
      <v-row>
      <v-col cols="12" lg="6">
        <TableCard 
          title="Cargas Hoje" 
          :headers="['Carga', 'Descrição', 'Motorista', 'Peso', 'Status']"
          :items="store.cargasHoje"
        />
      </v-col>
      
      <v-col cols="12" lg="6">
        <TableCard 
          title="Retira Hoje" 
          :headers="['Carga', 'Descrição', 'Motorista', 'Peso', 'Status', 'Coleta']"
          :items="store.retiraHoje"
        />
      </v-col>
    </v-row>

    <v-row class="mt-4">
      <v-col cols="12">
        <TableCard 
          title="Conferência de Coletagem" 
          :headers="['Carga', 'Previsto', 'Realizado', 'Dif.']"
          :items="store.conferenciaColetagem"
        />
      </v-col>
    </v-row>

    </div>

    <!-- SECTION: Roteirização de Carga -->
    <div v-show="showRoteirizacao">
      <v-row class="mt-2">
        
        <!-- Left Column: Map -->
        <v-col cols="12" lg="5">
          <v-card class="premium-card h-100 d-flex flex-column">
            <v-card-title class="card-title py-3 px-4 text-center flex-shrink-0 border-bottom" style="white-space: normal; line-height: 1.2;">
              PEDIDOS/ASSISTÊNCIAS EM ABERTO POR CIDADE
            </v-card-title>
            <v-card-text class="pa-0 position-relative flex-grow-1" style="min-height: 500px;">
              <div id="map" style="width: 100%; height: 100%; position: absolute; top: 0; left: 0; right: 0; bottom: 0; z-index: 1;"></div>
            </v-card-text>
          </v-card>
        </v-col>

        <!-- Right Column: Tables and Charts -->
        <v-col cols="12" lg="7">
          <v-row>
            <!-- UF Table -->
            <v-col cols="12" md="6">
              <v-card class="premium-card d-flex flex-column" style="height: 420px;">
                <div class="py-3 px-4 d-flex justify-center align-center font-weight-bold flex-shrink-0 card-title border-bottom" style="font-size: 0.9rem;">
                  <span class="text-grey-darken-3">QUANTIDADE DE PEDIDOS POR UF/CIDADE</span>
                </div>
                <div class="bg-white py-1 px-4 d-flex justify-space-between text-caption font-weight-bold flex-shrink-0 text-grey-darken-2 border-bottom">
                  <span style="flex: 2">UF</span>
                  <span style="flex: 1; text-align: right">ASSISTÊNCIA</span>
                  <span style="flex: 1; text-align: right">PEDIDO</span>
                </div>
                <v-expansion-panels variant="accordion" class="custom-expansion flex-grow-1" style="overflow-y: auto;">
                  <v-expansion-panel v-for="item in store.roteirizacaoUF" :key="item.uf">
                    <v-expansion-panel-title class="py-2 px-4 min-height-0 text-body-2 font-weight-medium bg-grey-lighten-4">
                      <span style="flex: 2">{{ item.uf }}</span>
                      <span style="flex: 1; text-align: right">{{ item.assistencia || '' }}</span>
                      <span style="flex: 1; text-align: right">{{ item.pedido || '' }}</span>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text class="pa-0" v-if="item.cidades.length > 0">
                      <div v-for="cidade in item.cidades" :key="cidade.nome" class="d-flex justify-space-between py-1 px-4 text-caption bg-white border-bottom">
                        <span style="flex: 2" class="text-grey-darken-1 pl-4">{{ cidade.nome }}</span>
                        <span style="flex: 1; text-align: right">{{ cidade.assistencia }}</span>
                        <span style="flex: 1; text-align: right">{{ cidade.pedido }}</span>
                      </div>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
                <div class="bg-white py-2 px-4 d-flex justify-space-between font-weight-bold text-body-2 flex-shrink-0 border-top text-grey-darken-3">
                  <span style="flex: 2">Total</span>
                  <span style="flex: 1; text-align: right">2733</span>
                  <span style="flex: 1; text-align: right">1081</span>
                </div>
              </v-card>
            </v-col>

            <!-- Pedidos / Assistências Chart -->
            <v-col cols="12" md="6">
              <v-card class="premium-card d-flex flex-column" style="height: 420px;">
                <v-card-title class="card-title py-3 px-4 text-center text-grey-darken-3 border-bottom flex-shrink-0" style="font-size: 0.9rem; white-space: normal; line-height: 1.2;">
                  QUANTIDADE DE PEDIDOS/ASSISTÊNCIAS POR TIPO
                </v-card-title>
                <v-card-text class="pa-0 flex-grow-1" style="overflow: hidden;">
                  <div style="height: 100%; overflow-y: auto; padding: 10px 16px;">
                    <div style="height: 800px;">
                      <apexchart 
                        type="bar" 
                        height="100%" 
                        :options="chartOptionsPedidosAssistenciaCarga" 
                        :series="store.chartPedidosAssistenciaCarga.series" 
                      />
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>

          <v-row class="mt-4">
            <!-- VOLUME/PESO POR UF Redone -->
            <v-col cols="12" md="6">
              <v-card class="premium-card d-flex flex-column" style="height: 420px;">
                <v-card-title class="card-title py-3 px-4 text-center text-grey-darken-3 border-bottom">
                  VOLUME/PESO POR UF
                </v-card-title>
                <v-card-text class="pa-0 flex-grow-1" style="overflow: hidden;">
                  <div style="height: 100%; overflow-y: auto; padding: 10px 16px;">
                    <!-- Altura maior que o container para ativar o scroll -->
                    <div style="height: 700px;">
                      <apexchart 
                        type="bar" 
                        height="100%" 
                        :options="chartOptionsVolumePeso" 
                        :series="store.chartVolumePeso.series" 
                      />
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </v-col>

            <!-- New Toggle Chart (KG vs R$) -->
            <v-col cols="12" md="6">
              <v-card class="premium-card d-flex flex-column" style="height: 420px;">
                <div class="py-2 px-4 d-flex justify-space-between align-center border-bottom">
                  <span class="card-title text-uppercase text-grey-darken-3" style="font-size: 0.9rem;">ENTREGA (Sim/Não)</span>
                  <v-btn-toggle v-model="analiseToggle" mandatory density="compact" color="primary" class="bg-grey-lighten-3 elevation-0" style="height: 28px;">
                    <v-btn value="kg" class="text-caption px-2">KG</v-btn>
                    <v-btn value="rs" class="text-caption px-2">R$</v-btn>
                  </v-btn-toggle>
                </div>
                <v-card-text class="pt-6 d-flex align-center justify-center">
                  <apexchart type="donut" height="250" :options="chartOptionsEntrega" :series="seriesEntrega"></apexchart>
                </v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>

      <!-- New Detailed Table Row -->
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card class="premium-card">
            <v-card-title class="card-title py-3 px-4 text-grey-darken-3 border-bottom d-flex justify-space-between align-center">
              <span>DETALHAMENTO DE PEDIDOS / ASSISTÊNCIAS</span>
              <div class="d-flex align-center">
                <v-menu location="bottom end" :close-on-content-click="false">
                  <template v-slot:activator="{ props }">
                    <v-btn v-bind="props" variant="text" density="compact" icon="mdi-information-outline" color="primary"></v-btn>
                  </template>
                  <v-card min-width="300" class="pa-4">
                    <div class="text-subtitle-2 mb-2 font-weight-bold">LEGENDA</div>
                    <div class="d-flex flex-column gap-1">
                      <div class="d-flex align-center text-caption"><v-icon size="12" color="success" class="mr-2">mdi-circle</v-icon> Financeiro em dia</div>
                      <div class="d-flex align-center text-caption"><v-icon size="12" color="warning" class="mr-2">mdi-circle</v-icon> Financeiro pendente</div>
                      <div class="d-flex align-center text-caption"><v-icon size="12" color="error" class="mr-2">mdi-circle</v-icon> Assistência pendente > 30d</div>
                    </div>
                  </v-card>
                </v-menu>
              </div>
            </v-card-title>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="detalheHeaders"
                :items="store.pedidosAssistenciasDetalhe"
                density="compact"
                class="text-caption custom-table"
                :items-per-page="10"
              >
                <!-- Indicator columns -->
                <template #[`item.indicators.antec`]="{ value }">
                  <v-icon size="14" :color="value">mdi-circle</v-icon>
                </template>
                <template #[`item.indicators.ass`]="{ value }">
                  <v-icon size="14" :color="value">mdi-circle</v-icon>
                </template>

                <!-- Currency/Numeric columns -->
                <template #[`item.rsEmCarga`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.rsFrete`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.percFrete`]="{ value }">{{ value }}%</template>
                <template #[`item.rsPedido`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.peso`]="{ value }">{{ value.toLocaleString('pt-BR') }} kg</template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <!-- Detailed Cargas Table Row -->
      <v-row class="mt-4">
        <v-col cols="12">
          <v-card class="premium-card">
            <v-card-title class="card-title py-3 px-4 text-grey-darken-3 border-bottom">
              DETALHAMENTO DE CARGAS
            </v-card-title>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="cargasTableHeaders"
                :items="store.cargasDetalhe"
                density="compact"
                class="text-caption custom-table"
                :items-per-page="10"
              >
                <!-- Formatting columns -->
                <template #[`item.rsCarga`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.rsPedido`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.rsFrete`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.rsCombinado`]="{ value }">R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.difFrete`]="{ value }">
                  <span :class="value > 0 ? 'text-error font-weight-bold' : 'text-success'">
                    R$ {{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}
                  </span>
                </template>
                <template #[`item.peso`]="{ value }">{{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.m3`]="{ value }">{{ value.toLocaleString('pt-BR', { minimumFractionDigits: 2 }) }}</template>
                <template #[`item.percFrete`]="{ value }">{{ value }}%</template>
                
                <!-- Totals row -->
                <template v-slot:body.append>
                  <tr class="bg-grey-lighten-4 font-weight-bold">
                    <td colspan="2">Total</td>
                    <td class="text-right">798</td>
                    <td class="text-right">983.383,93</td>
                    <td class="text-right">1.904,59</td>
                    <td class="text-right">R$ 6.212.487,50</td>
                    <td class="text-right">R$ 6.638.458,98</td>
                    <td class="text-right">8,67%</td>
                    <td class="text-right">R$ 538.690,57</td>
                    <td class="text-right">R$ 0,00</td>
                    <td class="text-right">R$ 538.690,57</td>
                    <td class="text-right">35499</td>
                    <td colspan="5"></td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch, nextTick } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import TableCard from '../components/TableCard.vue'
import KpiCard from '../components/KpiCard.vue'

const store = useDashboardStore()
const showRoteirizacao = ref(false)
const analiseToggle = ref('kg')

// Pagination state
const statusPage = ref(1)

const statusTableHeaders = [
  { title: 'PEDIDO', key: 'pedido', sortable: true },
  { title: 'CLIENTE', key: 'cliente', sortable: true },
  { title: 'VOL.', key: 'volume', align: 'end' as const, sortable: true },
  { title: 'M3', key: 'm3', align: 'end' as const, sortable: true },
  { title: 'PESO', key: 'peso', align: 'end' as const, sortable: true }
]


const paginatedStatusPedidos = computed(() => {
  const start = (statusPage.value - 1) * 10
  return store.statusPedidos.slice(start, start + 10)
})

const detalheHeaders = [
  { title: 'SEQ.', key: 'seq', sortable: true, width: '50px' },
  { title: 'EMP.', key: 'emp', sortable: true, width: '50px' },
  { title: 'TIPO', key: 'tipo', sortable: true },
  { title: 'DOCUMENTO', key: 'doc', sortable: true },
  { title: 'EMISSÃO', key: 'emissao', sortable: true },
  { title: 'CÓD.', key: 'cod', sortable: true },
  { title: 'CLIENTE', key: 'cliente', sortable: true, minWidth: '200px' },
  { title: 'ANTEC. R$', key: 'indicators.antec', align: 'center' as const },
  { title: 'ASS. REC.', key: 'indicators.ass', align: 'center' as const },
  { title: 'M³', key: 'm3', align: 'end' as const },
  { title: 'PESO', key: 'peso', align: 'end' as const },
  { title: 'R$ EM CARGA', key: 'rsEmCarga', align: 'end' as const },
  { title: 'R$ FRETE', key: 'rsFrete', align: 'end' as const },
  { title: '% FRETE', key: 'percFrete', align: 'end' as const },
  { title: 'R$ PEDIDO', key: 'rsPedido', align: 'end' as const },
  { title: 'VOLUMES', key: 'volumes', align: 'end' as const },
  { title: 'PREVISÃO', key: 'previsao' },
  { title: 'CONSULTOR', key: 'consultor' }
]

const cargasTableHeaders = [
  { title: 'CARGA', key: 'carga', sortable: true },
  { title: 'DESCRIÇÃO', key: 'desc', sortable: true, minWidth: '200px' },
  { title: 'QTD. DOC.', key: 'qtdDoc', align: 'end' as const },
  { title: 'PESO', key: 'peso', align: 'end' as const },
  { title: 'M³', key: 'm3', align: 'end' as const },
  { title: 'R$ CARGA', key: 'rsCarga', align: 'end' as const },
  { title: 'R$ PEDIDO', key: 'rsPedido', align: 'end' as const },
  { title: '% FRETE', key: 'percFrete', align: 'end' as const },
  { title: 'R$ FRETE', key: 'rsFrete', align: 'end' as const },
  { title: 'R$ COMBINADO', key: 'rsCombinado', align: 'end' as const },
  { title: 'DIF. FRETE', key: 'difFrete', align: 'end' as const },
  { title: 'VOLUMES', key: 'volumes', align: 'end' as const },
  { title: 'PRE. FAT.', key: 'preFat' },
  { title: 'FECHAMENTO', key: 'fechamento' },
  { title: 'LIBERAÇÃO', key: 'liberacao' },
  { title: 'CONFERÊNCIA', key: 'conferencia' },
  { title: 'LIB. FATURAMENTO', key: 'libFat' }
]

const kpiKeysOperacional = [
  'pedidosMais30DiasRS', 'pedidosMais30DiasQtd', 
  'pedidosSemCargaRS', 'pedidosSemCargaQtd', 
  'pedidosEmAbertoRS', 'm3PedidosEmAberto', 
  'volumesEmAberto', 'cargasEmAberto', 'cargasEmAbertoRS'
]

const row1Kpis = computed(() => {
  const result: any = {}
  kpiKeysOperacional.slice(0, 5).forEach(k => result[k] = (store.kpis as any)[k])
  return result
})
const row2Kpis = computed(() => {
  const result: any = {}
  kpiKeysOperacional.slice(5).forEach(k => result[k] = (store.kpis as any)[k])
  return result
})

const chartOptionsFaturamento = {
  chart: { id: 'previsao-faturamento', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  xaxis: { categories: store.chartPrevisaoFaturamento.categories, labels: { style: { fontFamily: "'Plus Jakarta Sans', sans-serif" } } },
  colors: ['#181852'],
  plotOptions: { bar: { borderRadius: 4, horizontal: false, columnWidth: '40%' } },
  dataLabels: { enabled: false }
}

const chartOptionsCarregamento = {
  chart: { id: 'carregamento', stacked: true, toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  xaxis: { categories: store.chartCarregamento.categories, labels: { style: { fontFamily: "'Plus Jakarta Sans', sans-serif" } } },
  colors: ['#92171B', '#181852'], // Vermelho for Não, Azul for Sim
  plotOptions: { bar: { borderRadius: 4, horizontal: false } },
  dataLabels: { enabled: false },
  legend: { 
    position: 'bottom',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    markers: { width: 12, height: 12, radius: 12 }
  }
}

const chartOptionsLeadTime = {
  chart: { id: 'lead-time', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  xaxis: { 
    type: 'category',
    categories: store.chartLeadTime.categories,
    labels: { 
      show: true,
      style: { fontWeight: 700, fontSize: '11px', fontFamily: "'Plus Jakarta Sans', sans-serif" }
    }
  },
  yaxis: { 
    labels: { 
      show: true,
      style: { fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" },
      formatter: (val: number) => val + ' d'
    }
  },
  colors: ['#181852'],
  plotOptions: { 
    bar: { borderRadius: 4, horizontal: true, barHeight: '60%', distributed: true } 
  },
  dataLabels: { 
    enabled: true,
    formatter: (val: number) => val + 'd',
    offsetX: 30,
    style: { fontSize: '10px', colors: ['#333'], fontFamily: "'Plus Jakarta Sans', sans-serif" }
  },
  legend: { show: false }
}

// --- Roteirização Mappings ---

// --- Leaflet Map Logic ---

let map: any = null

onMounted(() => {
  // Inicialização do mapa aguardará o v-show estar true para pegar o tamanho correto
})

watch(showRoteirizacao, async (newVal) => {
  if (newVal) {
    await nextTick()
    if (!map) {
      // Create map
      map = (window as any).L.map('map').setView([-14.235, -51.925], 4) // Center of Brazil
      
      // Add light basemap (e.g. CartoDB Positron for clean look like the image)
      ;(window as any).L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
      }).addTo(map)

      // Add points
      store.mapaPedidos.forEach(p => {
        const popupContent = `
          <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 5px;">
            <div style="font-weight: 700; font-size: 11px; text-align: center; margin-bottom: 8px; color: #333;">LEGENDA SELEÇÃO DA CIDADE</div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span style="color: #666; margin-right: 15px;">CEP CIDADE</span> <strong>${p.cep}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span style="color: #666; margin-right: 15px;">VALOR EM ABERTO</span> <strong>${p.valor}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span style="color: #666; margin-right: 15px;">CIDADE</span> <strong>${p.cidade}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span style="color: #666; margin-right: 15px;">PESO</span> <strong>${p.peso}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px; margin-bottom: 4px;">
              <span style="color: #666; margin-right: 15px;">VOLUMES</span> <strong>${p.volumes}</strong>
            </div>
            <div style="display: flex; justify-content: space-between; font-size: 10px;">
              <span style="color: #666; margin-right: 15px;">M3</span> <strong>${p.m3}</strong>
            </div>
          </div>
        `

        const marker = (window as any).L.circleMarker([p.y, p.x], {
          radius: 8,
          fillColor: "#181852", // Azul
          color: "#92171B", // Vermelho
          weight: 2,
          opacity: 1,
          fillOpacity: 0.8
        }).addTo(map)

        marker.bindPopup(popupContent, {
          closeButton: false,
          className: 'custom-popup'
        })
        
        marker.on('mouseover', () => {
            marker.openPopup()
        })
        marker.on('mouseout', () => {
            marker.closePopup()
        })
      })
    } else {
      map.invalidateSize()
    }
  }
})

const chartOptionsVolumePeso = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  colors: ['#181852', '#92171B'],
  plotOptions: { bar: { horizontal: true, barHeight: '70%', borderRadius: 4 } },
  dataLabels: { enabled: false },
  xaxis: {
    categories: store.chartVolumePeso.categories,
    labels: {
      style: { fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" },
      formatter: (val: number) => val >= 1000000 ? (val / 1000000).toFixed(1) + ' Mi' : val.toLocaleString()
    }
  },
  yaxis: {
    labels: { style: { fontWeight: 700, fontSize: '11px', fontFamily: "'Plus Jakarta Sans', sans-serif" } }
  },
  legend: {
    position: 'bottom',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    markers: { width: 12, height: 12, radius: 12 }
  },
  grid: { borderColor: '#f1f1f1', xaxis: { lines: { show: true } } },
  tooltip: { shared: true, intersect: false }
}

const chartOptionsPedidosAssistenciaCarga = {
  chart: { type: 'bar', toolbar: { show: false }, fontFamily: "'Plus Jakarta Sans', sans-serif" },
  plotOptions: { bar: { horizontal: true, barHeight: '60%', borderRadius: 2 } },
  colors: ['#181852', '#92171B'],
  dataLabels: { enabled: false },
  xaxis: {
    categories: store.chartPedidosAssistenciaCarga.categories,
    labels: { style: { fontWeight: 600, fontSize: '10px', fontFamily: "'Plus Jakarta Sans', sans-serif" } }
  },
  yaxis: {
    labels: { style: { fontWeight: 700, fontSize: '11px', fontFamily: "'Plus Jakarta Sans', sans-serif" } }
  },
  legend: {
    position: 'bottom',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    markers: { width: 12, height: 12, radius: 12 }
  },
  grid: { borderColor: '#f1f1f1', xaxis: { lines: { show: true } } }
}

const seriesEntrega = computed(() => {
  return analiseToggle.value === 'kg' ? store.chartEntrega.kg : store.chartEntrega.rs
})

const chartOptionsEntrega = computed(() => ({
  chart: { id: 'entrega-donut' },
  labels: store.chartEntrega.labels,
  colors: ['#181852', '#92171B'], // Sim (Azul), Não (Vermelho)
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        labels: {
          show: true,
          name: { show: true },
          value: {
            show: true,
            formatter: (val: string) => {
              const num = Number(val)
              if (analiseToggle.value === 'rs') {
                return num >= 1000000 ? `R$ ${(num / 1000000).toFixed(2)} Mi` : `R$ ${num.toLocaleString('pt-BR')}`
              }
              return num >= 1000 ? `${(num / 1000).toFixed(1)}k KG` : `${num} KG`
            }
          },
          total: {
            show: true,
            showAlways: false,
            label: 'Total',
            formatter: function (w: any) {
              const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0)
              if (analiseToggle.value === 'rs') {
                return total >= 1000000 ? `R$ ${(total / 1000000).toFixed(2)} Mi` : `R$ ${total.toLocaleString('pt-BR')}`
              }
              return total >= 1000 ? `${(total / 1000).toFixed(1)}k KG` : `${total} KG`
            }
          }
        }
      }
    }
  },
  dataLabels: { enabled: false },
  legend: { position: 'bottom' }
}))
</script>

<style scoped>
.custom-expansion .v-expansion-panel-title {
  min-height: 36px !important;
  padding: 4px 16px !important;
}
.border-bottom {
  border-bottom: 1px solid #f0f0f0;
}
</style>
