<script setup lang="ts">
import TaskFilter from '@/components/TaskFilter.vue'

function applyFilters(filters) {
  console.log("Filtres reçus :", filters)
  // Ici tu pourras filtrer activitiesList ou sauvegarder les préférences
}
</script>

<template>
  <div>
    <h1>Paramètres</h1>
    <TaskFilter @updateFilters="applyFilters" />
    
  </div>
</template>
