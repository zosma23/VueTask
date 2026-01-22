<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import { computed } from 'vue'
  import {useCounterStore} from '@/stores/counter'

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

let activity = reactive({
    name: '',
    duration: 0,
    category: ''
  })

  function saveActivity(){
    localStorage.setItem('activity', JSON.stringify(activity))
    console.log('Tâche sauvegardée dans le localStorage :', activity)
    }

    const store = localStorage.getItem("activity");
    if (store) {
    activity = JSON.parse(store);
    }










</script>

<template>
  
  

    
    <div class="form-container">
        <h2>Ajouter une nouvelle tâche</h2>
        <form @submit.prevent="addActivity">
        <div class="field">
            <label>Nom de la tâche</label>
            <input v-model="newActivity.name" type="text" placeholder="Nom de la tâche" required />
        </div>
    
        <div class="field">
            <label>Durée (en minutes)</label>
            <input v-model.number="newActivity.duration" type="number" placeholder="Durée en minutes" required />
        </div>
    
        <div class="field">
            <label>Catégorie</label>
            <select v-model="newActivity.category" required>
            <option disabled value="">Sélectionnez une catégorie</option>
            <option v-for="s in category" :key="s" :value="s">{{ s }}</option>
            </select>
        </div>
    
        <button type="submit">Ajouter la tâche</button>
        </form>
    </div>



<!-- marquer uen tâche comme terminée  -->
   
  
   <div class="form-container">
    <h2>Liste de vos taches vous pouvez les marquer comme terminée</h2>
    <ul>
      <li v-for="activity in activitiesList" :key="activity.name">
        <input type="checkbox" v-model="selectedActivities" :value="activity.name" />
        {{ activity.name }} - {{ activity.duration }} minutes - {{ activity.category }}
      </li>
    </ul>
    <p>Tâches terminées : {{ selectedActivities.join(', ') }}</p>
  </div>
  
   

<!-- sauvegarde de la tâche dans le localStorage -->
 
    <div class="form-container">
      <h2>Sauvegarder la tâche</h2>
      <div class="field">
        <label>Nom de la tâche</label>
        <input v-model="activity.name" type="text" placeholder="Nom de la tâche" />
      </div>
      <div class="field">
        <label>Durée (en minutes)</label>
        <input v-model.number="activity.duration" type="number" placeholder="Durée en minutes" />
      </div>
      <div class="field">
        <label>Catégorie</label>
        <select v-model="activity.category">
          <option v-for="s in category" :key="s" :value="s">{{ s }}</option>
        </select>
      </div>
      <button @click="saveActivity"> Sauvegarder la tâche </button>
    </div>
 
  

<!-- creer des statistiques Créer des statistiques avec computed :○ nombre total d’activités ○ temps total ○ moyenne par activité -->
    
    

  

   <!-- masquer : resume , statistiques -->
    




   


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
