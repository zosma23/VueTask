<script setup lang="ts">
import { reactive, ref, computed, onMounted, watch } from 'vue'

interface Activity {
  name: string
  duration: number
  category: string
  completed?: boolean
}

const category = ref(['Sport', 'Travail', 'Loisir', 'Études'])

const activitiesList = reactive<Activity[]>([])

const selectActivity = reactive<Activity>({
  name: '',
  duration: 0,
  category: '',
  completed: false
})

const editingIndex = ref<number | null>(null)
const filterCategory = ref('Toutes')

onMounted(() => {
  const storedActivities = localStorage.getItem('activitiesList')
  if (storedActivities) {
    const parsed = JSON.parse(storedActivities)

    // Ajout automatique du champ completed si absent
    parsed.forEach((a: Activity) => {
      if (a.completed === undefined) a.completed = false
    })

    activitiesList.splice(0, activitiesList.length, ...parsed)
  }

  const storedForm = localStorage.getItem('activity')
  if (storedForm) {
    const data = JSON.parse(storedForm)
    selectActivity.name = data.name
    selectActivity.duration = data.duration
    selectActivity.category = data.category
  }
})

watch(selectActivity, () => {
  localStorage.setItem('activity', JSON.stringify(selectActivity))
}, { deep: true })

function saveToLocalStorage() {
  localStorage.setItem('activitiesList', JSON.stringify(activitiesList))
}

function onSubmit() {
  if (editingIndex.value !== null) {
    activitiesList[editingIndex.value] = { ...selectActivity }
    editingIndex.value = null
  } else {
    activitiesList.push({ ...selectActivity, completed: false })
  }

  saveToLocalStorage()

  selectActivity.name = ''
  selectActivity.duration = 0
  selectActivity.category = ''

  localStorage.removeItem('activity')
}

function editTask(index: number) {
  editingIndex.value = index
  const task = activitiesList[index]
  selectActivity.name = task.name
  selectActivity.duration = task.duration
  selectActivity.category = task.category
}

function deleteTask(index: number) {
  activitiesList.splice(index, 1)
  saveToLocalStorage()
}

function toggleCompleted(activity: Activity) {
  activity.completed = !activity.completed
  saveToLocalStorage()
}

// LISTES FILTRÉES
const activeTasks = computed(() =>
  activitiesList.filter(a => !a.completed)
)

const completedTasks = computed(() =>
  activitiesList.filter(a => a.completed)
)

const filteredActiveTasks = computed(() => {
  if (filterCategory.value === 'Toutes') return activeTasks.value
  return activeTasks.value.filter(a => a.category === filterCategory.value)
})

const filteredCompletedTasks = computed(() => {
  if (filterCategory.value === 'Toutes') return completedTasks.value
  return completedTasks.value.filter(a => a.category === filterCategory.value)
})

// STATISTIQUES
const totalActivities = computed(() => activeTasks.value.length)
const totalTime = computed(() =>
  activeTasks.value.reduce((total, activity) => total + activity.duration, 0)
)
const averageTime = computed(() =>
  totalActivities.value > 0
    ? (totalTime.value / totalActivities.value).toFixed(2)
    : 0
)
</script>

<template>

  <!-- FORMULAIRE -->
  <div class="card glass">
    <h2>{{ editingIndex !== null ? "Modifier la tâche" : "Ajouter une nouvelle tâche" }}</h2>

    <form @submit.prevent="onSubmit" class="form-grid">
      <div class="field">
        <label>Nom</label>
        <input v-model="selectActivity.name" type="text" placeholder="Ex: Sport du matin" required />
      </div>

      <div class="field">
        <label>Durée (min)</label>
        <input v-model.number="selectActivity.duration" type="number" required />
      </div>

      <div class="field">
        <label>Catégorie</label>
        <select v-model="selectActivity.category" required>
          <option disabled value="">Choisir...</option>
          <option v-for="s in category" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>

      <button class="btn-primary" type="submit">
        {{ editingIndex !== null ? "Mettre à jour" : "Ajouter" }}
      </button>
    </form>
  </div>

  <!-- FILTRE -->
  <div class="card glass">
    <h2>Filtrer</h2>
    <select v-model="filterCategory" class="filter-select">
      <option value="Toutes">Toutes</option>
      <option v-for="c in category" :key="c" :value="c">{{ c }}</option>
    </select>
  </div>

  <!-- TÂCHES EN COURS -->
  <div class="card glass">
    <h2>Tâches en cours</h2>

    <div class="task-list">
      <div class="task-card" v-for="(activity, index) in filteredActiveTasks" :key="activity.name">

        <input 
          type="checkbox"
          class="checkbox"
          v-model="activity.completed"
          @change="toggleCompleted(activity)"
        />

        <div class="task-info">
          <h3>{{ activity.name }}</h3>
          <p>{{ activity.duration }} min — <span class="tag">{{ activity.category }}</span></p>
        </div>

        <div class="task-actions">
          <button class="btn-edit" @click="editTask(index)">✏️</button>
          <button class="btn-delete" @click="deleteTask(index)">🗑️</button>
        </div>

      </div>
    </div>
  </div>

  <!-- TÂCHES TERMINÉES -->
  <div class="card glass">
    <h2>Tâches terminées</h2>

    <div class="task-list">
      <div class="task-card doneTask" v-for="activity in filteredCompletedTasks" :key="activity.name">

        <input 
          type="checkbox"
          class="checkbox"
          v-model="activity.completed"
          @change="toggleCompleted(activity)"
        />

        <div class="task-info">
          <h3>{{ activity.name }}</h3>
          <p>{{ activity.duration }} min — <span class="tag">{{ activity.category }}</span></p>
          
        </div>

      </div>
    </div>
  </div>

  <!-- STATISTIQUES -->
  <div class="stats-container">
    <div class="stat-box">
      <h3>Total</h3>
      <p class="stat-number">{{ totalActivities }}</p>
    </div>

    <div class="stat-box">
      <h3>Temps total</h3>
      <p class="stat-number">{{ totalTime }} min</p>
    </div>

    <div class="stat-box">
      <h3>Moyenne</h3>
      <p class="stat-number">{{ averageTime }} min</p>
    </div>
  </div>

</template>

<style scoped>
/* Police moderne */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;500;700&display=swap');

* {
  font-family: 'Poppins', sans-serif;
}

/* Glassmorphism */
.glass {
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(12px);
  border-radius: 15px;
  padding: 25px;
  margin: 25px auto;
  box-shadow: 0 8px 25px rgba(0,0,0,0.1);
  max-width: 600px;
  animation: fadeIn .6s ease;
}

/* Animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Formulaire */
.form-grid {
  display: grid;
  gap: 15px;
}

.field label {
  font-weight: 600;
}

input, select {
  width: 100%;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

/* Checkbox */
.checkbox {
  width: 20px;
  height: 20px;
  accent-color: #4f46e5;
  cursor: pointer;
}

/* Tâche terminée */
.doneTask {
  opacity: 0.6;
  text-decoration: line-through;
}

/* Boutons */
.btn-primary {
  background: #4f46e5;
  color: white;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: .3s;
}

.btn-primary:hover {
  background: #4338ca;
}

/* Liste des tâches */
.task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-card {
  background: white;
  padding: 15px;
  border-radius: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  transition: .3s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.task-card:hover {
  transform: translateX(5px);
}

.tag {
  background: #e0e7ff;
  padding: 3px 8px;
  border-radius: 6px;
  font-size: .8rem;
}

/* Actions */
.btn-edit, .btn-delete {
  border: none;
  background: transparent;
  cursor: pointer;
  font-size: 1.2rem;
}

.btn-edit:hover {
  color: #4f46e5;
}

.btn-delete:hover {
  color: #dc2626;
}

/* Statistiques */
.stats-container {
  display: flex;
  justify-content: space-around;
  margin: 30px auto;
  max-width: 700px;
}

.stat-box {
  background: #4f46e5;
  color: white;
  padding: 20px;
  border-radius: 12px;
  width: 30%;
  text-align: center;
  animation: pulse 2s infinite;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
}

/* Animation pulse */
@keyframes pulse {
  0% { transform: scale(1); opacity: .9; }
  50% { transform: scale(1.05); opacity: 1; }
  100% { transform: scale(1); opacity: .9; }
}
</style>
