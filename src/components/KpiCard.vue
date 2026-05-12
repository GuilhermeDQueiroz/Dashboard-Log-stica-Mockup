<template>
  <v-card class="premium-card fill-height d-flex flex-column justify-center align-center pa-4 text-center">
    <div class="kpi-label mb-2">{{ label }}</div>
    <div v-if="!isBadge" class="kpi-value" :style="{ color: color }">{{ value }}</div>
    <v-chip v-else :color="color || 'grey'" text-color="white" class="font-weight-bold" size="large">
      {{ value }}
    </v-chip>
  </v-card>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  value: string | number;
  color?: string;
  isBadge?: boolean;
}>()
</script>
