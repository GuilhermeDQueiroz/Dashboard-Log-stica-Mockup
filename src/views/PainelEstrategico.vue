<template>
  <div class="painel-estrategico">
    <!-- KPIs Row 1 -->
    <v-row class="mb-6" justify="center">
      <v-col v-for="(kpi, key) in row1Kpis" :key="key" cols="12" sm="6" md="auto" class="flex-grow-1">
        <KpiCard :label="kpi.label" :value="kpi.value" :color="kpi.color" :is-badge="kpi.isBadge" />
      </v-col>
    </v-row>

    <!-- Charts Row -->
    <v-row class="mb-6">
      <v-col cols="12" lg="6">
        <v-card class="premium-card h-100">
          <v-card-title class="card-title py-3 px-4">LeadTime (Fat. Últ. 12 meses)</v-card-title>
          <v-card-text>
            <apexchart type="area" height="300" :options="chartOptionsLeadTime" :series="store.chartLeadTime.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="6">
        <v-card class="premium-card h-100">
          <v-card-title class="card-title py-3 px-4 d-flex flex-column align-start">
            <span class="text-subtitle-1 font-weight-bold">Toneladas faturadas (Últ. 12 meses)</span>
          </v-card-title>
          <v-card-text>
            <apexchart type="bar" height="300" :options="chartOptionsToneladas" :series="store.chartToneladasFaturadas.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- R$ KG Chart Row -->
    <v-row class="mb-6">
      <v-col cols="12">
        <v-card class="premium-card">
          <v-card-title class="card-title py-3 px-4">MÉDIA DE VALOR POR KG (Fat. Últ. 12 meses)</v-card-title>
          <v-card-text>
            <apexchart type="area" height="300" :options="chartOptionsRSKG" :series="store.chartRSKG.series"></apexchart>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDashboardStore } from '../store/dashboardStore'
import KpiCard from '../components/KpiCard.vue'
import TableCard from '../components/TableCard.vue'

const store = useDashboardStore()

const kpiKeysEstrategico = [
  'freteFat30Dias', 
  'percPedidosEmAtraso', 
  'backlogDias', 
  'leadTimeMedio'
]
const row1Kpis = computed(() => {
  const result: any = {}
  kpiKeysEstrategico.forEach(k => result[k] = (store.kpis as any)[k])
  return result
})
const row2Kpis = computed(() => ({})) // Emptied for now

const chartOptionsLeadTime = {
  chart: { id: 'lead-time', toolbar: { show: false } },
  xaxis: { categories: store.chartLeadTime.categories },
  colors: ['#181852'],
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 5 },
  dataLabels: { 
    enabled: true,
    offsetY: -10,
    style: { colors: ['#666'] },
    background: { enabled: false }
  },
  fill: {
    type: 'solid',
    opacity: 0.2
  }
}

const chartOptionsToneladas = computed(() => {
  const data = store.chartToneladasFaturadas.series[0].data as number[]
  const avg = data.reduce((a, b) => a + b, 0) / data.length
  
  const dynamicColors = data.map(val => val < avg ? '#92171B' : '#181852')

  return {
    chart: { id: 'toneladas-faturadas', toolbar: { show: false } },
    xaxis: { categories: store.chartToneladasFaturadas.categories },
    colors: dynamicColors,
    plotOptions: { bar: { borderRadius: 2, distributed: true, dataLabels: { position: 'top' } } },
    dataLabels: { enabled: false },
    legend: { show: false }
  }
})

const chartOptionsRSKG = {
  chart: { id: 'rs-kg', toolbar: { show: false } },
  xaxis: { categories: store.chartRSKG.categories },
  colors: ['#92171B'],
  stroke: { curve: 'smooth', width: 3 },
  markers: { size: 5 },
  dataLabels: { 
    enabled: true,
    offsetY: -10,
    style: { colors: ['#666'] },
    background: { enabled: false }
  },
  fill: {
    type: 'solid',
    opacity: 0.2
  }
}
</script>
