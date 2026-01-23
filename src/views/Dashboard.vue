<template>
  <div class="dashboard-page">
    
    <h1>Dashboard</h1>
    <TaskStat :activities="activitiesList" />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import TaskStat from '@/components/TaskStat.vue'
// import Header from '@/components/Header.vue' // si tu l’utilises dans le template

interface Activity {
  name: string
  duration: number
  category: string
}

const activitiesList = ref<Activity[]>([])

onMounted(() => {
  const stored = localStorage.getItem('activitiesList')
  if (stored) {
    activitiesList.value = JSON.parse(stored)
  }
})
</script>

<style scoped>
.dashboard-page {
  padding: 20px;
}
</style>
