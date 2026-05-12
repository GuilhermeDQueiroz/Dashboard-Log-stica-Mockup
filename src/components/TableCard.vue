<template>
  <v-card class="premium-card h-100">
    <v-card-title class="card-title py-3 px-4 border-b">
      {{ title }}
    </v-card-title>
    <v-data-table
      :headers="mappedHeaders"
      :items="items"
      :items-per-page="10"
      density="comfortable"
      hover
      class="elevation-0"
    >
      <!-- Custom rendering for 'status' column -->
      <template #[`item.status`]="{ value }">
        <v-chip :color="value === 'Faturada' ? 'success' : (value === 'Aberta' ? 'error' : 'warning')" size="small" variant="flat">
          {{ value }}
        </v-chip>
      </template>

      <!-- Custom rendering for 'coleta' column -->
      <template #[`item.coleta`]="{ value }">
        <v-icon :color="value === 'error' ? 'error' : (value === 'success' ? 'success' : 'warning')">
          {{ value === 'error' ? 'mdi-close-circle' : (value === 'success' ? 'mdi-check-circle' : 'mdi-alert-circle') }}
        </v-icon>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  title: string;
  headers: string[];
  items: any[];
}>()

// Map simple string headers to v-data-table header objects
const mappedHeaders = computed(() => {
  if (props.items.length === 0) return []
  
  // Get keys from the first item
  const keys = Object.keys(props.items[0])
  
  return props.headers.map((title, index) => ({
    title: title.toUpperCase(),
    key: keys[index],
    align: 'start' as const,
    sortable: true
  }))
})
</script>

<style scoped>
.border-b {
  border-bottom: 1px solid rgba(0,0,0,0.05);
}
</style>
