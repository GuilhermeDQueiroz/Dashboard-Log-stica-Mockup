<template>
  <v-app>
    <!-- Sidebar / Navigation Drawer -->
    <v-navigation-drawer 
      v-model="drawer" 
      :rail="rail" 
      permanent 
      elevation="2" 
      color="white"
      expand-on-hover
      @click="rail = false"
    >
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/men/85.jpg"
        title="Guilherme Queiroz"
        subtitle="Logística"
        nav
      >
        <template v-slot:append>
          <v-btn 
            variant="text" 
            :icon="rail ? 'mdi-chevron-right' : 'mdi-chevron-left'" 
            @click.stop="rail = !rail"
          ></v-btn>
        </template>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact" nav>
        <v-list-item 
          prepend-icon="mdi-chart-areaspline" 
          title="Estratégico" 
          value="estrategico"
          to="/estrategico"
          color="primary"
        ></v-list-item>
        <v-list-item 
          prepend-icon="mdi-truck-fast" 
          title="Operacional" 
          value="operacional"
          to="/operacional"
          color="primary"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar elevation="1" color="white" height="70">
      <template v-slot:prepend>
        <v-app-bar-nav-icon v-if="$vuetify.display.mobile" @click="drawer = !drawer"></v-app-bar-nav-icon>
      </template>

      <v-app-bar-title class="font-weight-bold text-h6 text-primary d-flex align-center">
        <v-icon size="small" class="mr-2">{{ pageIcon }}</v-icon>
        {{ pageTitle }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-cog-outline</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Main Content -->
    <v-main class="bg-background">
      <v-container fluid class="pa-6">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'

const drawer = ref(true)
const rail = ref(false)
const route = useRoute()

const pageTitle = computed(() => {
  if (route.path === '/operacional') return 'Painel Operacional'
  if (route.path === '/estrategico') return 'Painel Estratégico'
  return 'Dashboard de Logística'
})

const pageIcon = computed(() => {
  if (route.path === '/operacional') return 'mdi-truck-fast'
  if (route.path === '/estrategico') return 'mdi-chart-areaspline'
  return 'mdi-view-dashboard'
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.bg-background {
  background-color: #f4f6f8;
  min-height: 100vh;
}
</style>
