<script setup lang="ts">
import { ref, computed } from 'vue'

interface Activity {
  name: string
  duration: number
  category: string
  completed?: boolean
}

const props = defineProps<{
  activities: Activity[]
}>()

const showSummary = ref(true)

// Statistiques classiques
const totalActivities = computed(() => props.activities.length)

const totalTime = computed(() =>
  props.activities.reduce((total, activity) => total + activity.duration, 0)
)

const averageTime = computed(() =>
  totalActivities.value > 0
    ? (totalTime.value / totalActivities.value).toFixed(2)
    : 0
)

// Tâches terminées
const completedCount = computed(() =>
  props.activities.filter(a => a.completed).length
)

// Pourcentage terminé
const completionRate = computed(() => {
  if (totalActivities.value === 0) return 0
  return Math.round((completedCount.value / totalActivities.value) * 100)
})

// Donut chart
const radius = 60
const circumference = 2 * Math.PI * radius

const dashOffset = computed(() => {
  return circumference - (completionRate.value / 100) * circumference
})
</script>

<template>
  <p class="intro">Bienvenue dans votre espace Statistiques.</p>

  <div class="stats-wrapper">

    <!-- Bloc gauche -->
    <div class="stats-card left-card">
      <h2>Statistiques générales</h2>

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
      <h2>Progression des tâches</h2>

      <!-- Diagramme circulaire -->
      <div class="donut-container">
        <svg width="180" height="180">
          <!-- Cercle de fond -->
          <circle
            class="donut-bg"
            :r="radius"
            cx="90"
            cy="90"
          />

          <!-- Cercle animé -->
          <circle
            class="donut-progress"
            :r="radius"
            cx="90"
            cy="90"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="dashOffset"
          />
        </svg>

        <div class="donut-text">
          {{ completionRate }}%
        </div>
      </div>

      <p class="donut-label">
        {{ completedCount }} tâche(s) terminée(s) sur {{ totalActivities }}
      </p>

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
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

.intro {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 20px;
  color: #4f46e5;
  font-weight: 600;
}

/* Layout */
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

.left-card {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: white;
}

.right-card {
  background: #f9fafb;
}

/* Stat lines */
.stat-line {
  display: flex;
  justify-content: space-between;
  margin: 12px 0;
  font-size: 1.1rem;
}

.number {
  font-weight: 700;
  color: #ffdd57;
  font-size: 1.4rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.1); opacity: 1; }
  100% { transform: scale(1); opacity: .9; }
}

/* Donut chart */
.donut-container {
  position: relative;
  width: 180px;
  margin: 20px auto;
}

.donut-bg {
  fill: none;
  stroke: #e5e7eb;
  stroke-width: 15;
}

.donut-progress {
  fill: none;
  stroke: url(#gradient);
  stroke-width: 15;
  stroke-linecap: round;
  transform: rotate(-90deg);
  transform-origin: 50% 50%;
  transition: stroke-dashoffset 1s ease;
}

/* Dégradé du donut */
svg {
  --start: #10b981;
  --end: #3b82f6;
}

svg defs linearGradient stop:first-child {
  stop-color: var(--start);
}

svg defs linearGradient stop:last-child {
  stop-color: var(--end);
}

.donut-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2rem;
  font-weight: 700;
  color: #3b82f6;
}

.donut-label {
  text-align: center;
  font-weight: 600;
  margin-top: 10px;
}

/* Bouton */
.toggle-btn {
  padding: 10px 15px;
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  margin-top: 15px;
}

.toggle-btn:hover {
  background: #2563eb;
}

/* Résumé */
.summary-box {
  margin-top: 15px;
  padding: 15px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}

/* Fade animation */
.fade-enter-active, .fade-leave-active {
  transition: opacity .4s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
