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
  


<!-- formulaire permettant de saisir , le prenom , l'age et le status  -->

  <div class="form-container">
    <h2>Formulaire de contact 2</h2>

    <form @submit.prevent="onSubmit">
      <div class="field">
        <label>prenom</label>
        <input v-model="formAction.prenom" type="text" placeholder="Ton prenom" />
      </div>

      <div class="field">
        <label>age</label>
        <input v-model="formAction.age" type="number" placeholder="Ton age" />
      </div>

      <div class="field">
        
        <div class="form-group">
            <label for="status">Status</label>
            <select id="status" v-model="formAction.status" class="form-select">
                <option v-for="s in status" :key="s" :value="s">
                    {{ s }}
                </option>
            </select>
            <p>Selectionnee : {{ formAction.status }}</p>
        </div>
       
      </div>

      <button type="submit">Envoyer</button>
    </form>
    

    <p v-if="success" class="success">
      Formulaire envoyé ✅
    </p>
  </div>

  <!-- marquer uen tâche comme terminée  -->
   
  
   <div class="form-container">
    <h2>Marquer une tâche comme terminée</h2>
    <ul>
      <li v-for="activity in activitiesList" :key="activity.name">
        <input type="checkbox" v-model="selectedActivities" :value="activity.name" />
        {{ activity.name }} - {{ activity.duration }} minutes - {{ activity.category }}
      </li>
    </ul>
    <p>Tâches terminées : {{ selectedActivities.join(', ') }}</p>
  </div>
  

  <!-- ecrire un mesage de type bonjour alice tu as 21 ans -->
    
  <div class="form-container">
    <h2>Message personnalisé</h2>
    <p >
      Bonjour {{ formAction.prenom }} tu as {{ formAction.age }} ans
    </p>
  </div>

  <!-- creation d'une liste d'activités sport ● travail ● loisirs ● études -->
   
   
  
  <div class="form-container">
    <h2>Liste d'activités</h2>
  
      <label>Activités</label>
      <!-- Chaque activité contient : ● nom ● durée (en minutes) ● catégorie -->
       
      <ul>
          <li v-for="activity in activitiesList" :key="activity.name">
            <input type="checkbox" />
            {{ activity.name }} - {{ activity.duration }} minutes - {{ activity.category }}
          </li>
      </ul>

  </div>

  <!-- formulaire qui affiche les elemnts du tableau -->
  

    
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

<!-- ajouter un filtre par categorie -->
    <div class="form-container">
        <h2>Filtrer les activités par catégorie</h2>
        <div class="field">
            <label>Catégorie</label>
            <select v-model="newActivity.category">
            <option value="">Toutes les catégories</option>
            <option v-for="s in category" :key="s" :value="s">{{ s }}</option>
            </select>
        </div>
        <ul>
            <li v-for="activity in activitiesList.filter(a => !newActivity.category || a.category === newActivity.category)" :key="activity.name">
              <input type="checkbox" />  
              {{ activity.name }} - {{ activity.duration }} minutes - {{ activity.category }}
            </li>
        </ul>
    </div>

<!-- creer des statistiques Créer des statistiques avec computed :○ nombre total d’activités ○ temps total ○ moyenne par activité -->
    
    <div class="form-container">
      <h2>Statistiques des activités</h2>

      <p>Nombre total d'activités : {{ totalActivities }}</p>
      <p>Temps total : {{ totalTime }} minutes</p>
      <p>Moyenne par activité : {{ averageTime }} minutes</p>
    </div>

  

   <!-- masquer : resume , statistiques -->
    <div class="form-container">
      <h2>Résumé et Statistiques</h2>

      <button @click="showSummary = !showSummary">
        {{ showSummary ? 'Masquer' : 'Afficher' }} le résumé
      </button>

      <div v-if="showSummary">
        <h3>Résumé</h3>
        <p>Nombre total d'activités : {{ totalActivities }}</p>
        <p>Temps total : {{ totalTime }} minutes</p>
        <p>Moyenne par activité : {{ averageTime }} minutes</p>
      </div>
    </div>
   
<!-- sauvegarder profil + activités dans le localStorage -->

  
  <div class="form-container">
    <h2>Sauvegarder le profil</h2>
    <div class="field">
      <label>Prénom</label>
      <input v-model="profile.prenom" type="text" placeholder="Ton prénom" />
    </div>
    <div class="field">
      <label>Âge</label>
      <input v-model="profile.age" type="number" placeholder="Ton âge" />
    </div>
    <div class="field">
      <label>Status</label>
      <select v-model="profile.status">
        <option v-for="s in status" :key="s" :value="s">{{ s }}</option>
      </select>
    </div>
    <button @click="saveProfile">Sauvegarder le profil</button>
    
  </div>
 

 <!--  -->




   


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
