<script setup lang="ts">
import { reactive, watch } from 'vue'

// Liste des catégories (tu peux la passer en props si tu veux)
const categoryList = ['Sport', 'Travail', 'Loisir', 'Études']

// Filtres sélectionnés par l’utilisateur
const filters = reactive({
  category: '',
  minDuration: 0,
  showCompleted: true
})

// Le parent recevra les filtres via cet event
const emit = defineEmits(['updateFilters'])

// Dès qu’un filtre change → on envoie au parent
watch(filters, () => {
  emit('updateFilters', { ...filters })
}, { deep: true })
</script>

<template>
  <div class="filter-container">
    <h2>Filtres des tâches</h2>

    <!-- Filtre catégorie -->
    <div class="field">
      <label>Catégorie</label>
      <select v-model="filters.category">
        <option value="">Toutes</option>
        <option v-for="c in categoryList" :key="c" :value="c">{{ c }}</option>
      </select>
    </div>

    <!-- Filtre durée minimale -->
    <div class="field">
      <label>Durée minimale (minutes)</label>
      <input type="number" v-model.number="filters.minDuration" min="0" />
    </div>

    <!-- Filtre tâches terminées -->
    <div class="field checkbox">
      <label>
        <input type="checkbox" v-model="filters.showCompleted" />
        Afficher les tâches terminées
      </label>
    </div>
  </div>
</template>

<style scoped>
.filter-container {
  max-width: 400px;
  margin: 20px auto;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 10px;
}

.field {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

input, select {
  width: 100%;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.checkbox label {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: normal;
}
</style>
