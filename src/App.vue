<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { computed } from 'vue'
  import {useCounterStore} from '@/stores/counter'
  import TaskForm from '@/components/TaskForm.vue'
  import TaskStat from '@/components/TaskStat.vue'
  import TaskFilter from '@/components/TaskFilter.vue'

  const success = ref(false)
  const status = ref(['etudiant', 'actif', 'autre'])
  const category = ref(['Sport', 'Travail', 'Loisir', 'Études'])
  const selectedActivities = ref([])
  const counterStore = useCounterStore()


  interface Activity {
    name: string
    duration: number
    category: string
  }
  // marquer uen tache comme terminé
 
  // declaration d'une constante avec type et valeurs par defaut
  const activitiesList = ref<Array<Activity>>([])
  
   activitiesList.value=[
    { name: 'Sport', duration: 60, category: 'Loisir' },
    { name: 'Travail', duration: 480, category: 'Travail' },
    { name: 'Loisirs', duration: 120, category: 'Loisir' },
    { name: 'Études', duration: 180, category: 'Études' }]
  

  const newActivity = reactive({
  name: '',
  duration: 0,
  category: ''
})

    // fonction addActivity pour ajouter une activité au tableau activitiesList
  function addActivity() {
    activitiesList.value.push({
      name: newActivity.name,
      duration: newActivity.duration,
      category: newActivity.category

    })
    console.log('Données envoyées :', newActivity)
     newActivity.name = '' 
     newActivity.duration =0 
     newActivity.category =''
      
    
   
  }

  const formAction = reactive({
    prenom: '',
    age: '',
    status: <'etudiant'|'actif'|'autre'>('etudiant')
  })

  function onSubmit() {
    console.log('Données envoyées :', formAction)

    // reset
    formAction.prenom = ''
    formAction.age = ''
    formAction.status = 'etudiant'
    success.value = true
  }

// pour le computed
const totalActivities = computed(() => activitiesList.value.length)

const totalTime = computed(() =>
  activitiesList.value.reduce((total, activity) => total + activity.duration, 0)
)

const averageTime = computed(() =>
  totalActivities.value > 0
    ? (totalTime.value / totalActivities.value).toFixed(2)
    : 0
)

// masquer et afficher 
const showSummary = ref(true)

 // sauvegarde localStorage 

let profile = reactive({
    prenom: '',
    age: '',
    status: ''
  })

function saveProfile() {
    localStorage.setItem('profile', JSON.stringify(profile))
    console.log('Profil sauvegardé dans le localStorage :', profile)
  }

const stored = localStorage.getItem("profile");
if (stored) {
profile = JSON.parse(stored);
}


</script>

<template>
  
<TaskStat />
<TaskForm />
<TaskFilter/>

</template>

<style scoped>
  .form-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 20px;
  background: #f3f4f6;
  border-radius: 10px;
}

.field {
  margin-bottom: 12px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 4px;
}

input, textarea {
  /* width: 100%; */
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background: #2563eb;
}

.success {
  margin-top: 10px;
  color: green;
  text-align: center;
}

h2 {
  color: black;
}
</style>
