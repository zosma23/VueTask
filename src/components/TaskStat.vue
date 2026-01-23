<script setup lang="ts">
import { ref, computed } from 'vue'

interface Activity {
  name: string
  duration: number
  category: string
}

const props = defineProps<{
  activities: Activity[]
}>()

const showSummary = ref(true)

const totalActivities = computed(() => props.activities.length)

const totalTime = computed(() =>
  props.activities.reduce((total, activity) => total + activity.duration, 0)
)

const averageTime = computed(() =>
  totalActivities.value > 0
    ? (totalTime.value / totalActivities.value).toFixed(2)
    : 0
)
</script>

<template>
  <p>Bienvenue dans votre espace Statistiques. </p>
  <!-- <img src="" alt=""> -->
  <div class="stats-wrapper">

    <!-- Bloc gauche -->
    <div class="stats-card left-card">
      <h2>Statistiques des activités</h2>

      <div class="stat-line">
        <span>Nombre total d'activités</span>
        <span class="number">{{ totalActivities }}</span>
      </div>

      <div class="stat-line">
        <span>Temps total</span>
        <span class="number">{{ totalTime }} min</span>
      </div>

      <div class="stat-line">
        <span>Moyenne par activité</span>
        <span class="number">{{ averageTime }} min</span>
      </div>
    </div>

    <!-- Bloc droit -->
    <div class="stats-card right-card">
      <h2>Résumé</h2>

      <button class="toggle-btn" @click="showSummary = !showSummary">
        {{ showSummary ? 'Masquer' : 'Afficher' }} le résumé
      </button>

      <transition name="fade">
        <div v-if="showSummary" class="summary-box">
          <p><strong>Total :</strong> {{ totalActivities }}</p>
          <p><strong>Temps :</strong> {{ totalTime }} min</p>
          <p><strong>Moyenne :</strong> {{ averageTime }} min</p>
        </div>
      </transition>
    </div>

  </div>
</template>

<style scoped>
/* Police moderne */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Layout général */
.stats-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  margin: 40px auto;
  max-width: 900px;
}

/* Cartes */
.stats-card {
  flex: 1;
  padding: 25px;
  border-radius: 15px;
  background: white;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  transition: transform .3s ease, box-shadow .3s ease;
}

.stats-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 12px 25px rgba(0,0,0,0.15);
}

/* Carte gauche */
.left-card {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
}

/* Carte droite */
.right-card {
  background: #f9fafb;
}

/* Titres */
h2 {
  margin-bottom: 20px;
  font-weight: 700;
}

/* Lignes statistiques */
.stat-line {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 1.1rem;
}

/* Chiffres mis en valeur */
.number {
  font-weight: 700;
  color: #ffdd57;
  font-size: 1.4rem;
  animation: pulse 1.5s infinite;
}

/* Animation des chiffres */
@keyframes pulse {
  0% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: .9; }
}

/* Bouton résumé */
.toggle-btn {
  padding: 10px 15px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background .3s ease;
  width: 100%;
}

.toggle-btn:hover {
  background: #2563eb;
}

/* Résumé animé */
.summary-box {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Animation fade */
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
