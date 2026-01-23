<template>
  <header class="app-header">
    <div class="logo">MonLogo</div>
    <nav class="nav-links">
      <RouterLink to="/dashboard">Dashboard</RouterLink>
      <RouterLink to="/tasks">Tâches</RouterLink>
      <RouterLink to="/settings">Paramètres</RouterLink>
    </nav>
  </header>
</template>

<script lang="ts" setup>
// rien à importer ici, tout est statique
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 24px;
  background-color: #2c3e50;
  color: white;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  gap: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-weight: 500;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
