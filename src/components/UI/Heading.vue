<template>
  <header>
    <div class="logo">
      <img src="/Enlace-Logo_Azul.jpg" alt="Logo" />
    </div>
    <nav class="menu">
      <!-- <button class="menu-toggle" id="menuToggle">
        <span class="bar"></span>
        <span class="bar"></span>
        <span class="bar"></span>
      </button> -->
      <ul class="menu-list" id="menuList">
        <li><a href="#home">Inicio</a></li>
        <li><a href="#texto-botton">Tu fiado</a></li>
        <li><a href="#services">Nosotros</a></li>
        <li><a href="#contact">Mi cuenta</a></li>
        <li><a href="https://enlace-crm.com:3000/LoginView">Administrador</a></li>
      </ul>
    </nav>
  </header>

  <header class="app-header">
<button @click="goBack" class="back-button">
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.498.498 0 0 1-.146-.35v-.008a.498.498 0 0 1 .146-.35l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5a.5.5 0 0 1 .5.5z"/>
  </svg>
  <span>Atrás</span>
</button>

    <!-- Título centrado -->
    <h1 class="title">
      {{ title }}
    </h1>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({
  fallback: {
    type: String,
    default: '/' // 👈 ruta de fallback si no hay historial
  }
})

const router = useRouter()

function goBack() {
  if (history.length > 1) {
    router.back()
  } else {
    router.push(props.fallback)
  }
}
</script>

<style scoped>
body {
  margin: 0;
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  color: black;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #ffff;
  color: #333;
}

.logo img {
  max-height: 50px;
}

.back-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;              /* menos espacio entre ícono y texto */
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  background: #251786;
  border: none;
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
}

.back-button:hover {
  background: #3223a3;
  box-shadow: 0 3px 8px rgba(0,0,0,0.25);
}

.back-button:active {
  transform: scale(0.96);
}
.title {
  flex: 1;
  text-align: center;
  font-size: 1.25rem;
  font-weight: 600;
  color: #222;
}

.menu {
  position: relative;
  color: #333;
}

.menu-toggle {
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 10px;
}

.menu-toggle .bar {
  display: block;
  width: 25px;
  height: 3px;
  background: #8b8989;
  margin: 5px auto;
  transition: 0.3s;
}

.menu-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menu-list li {
  margin: 0 10px;
}

.menu-list a {
  color: black;
  text-decoration: none;
  padding: 5px 10px;
}

.menu-list a:hover {
  text-decoration: underline;
}

/* Estilos para el menú hamburguesa en dispositivos móviles */
@media (max-width: 768px) {
  .menu-list {
    display: none;
    flex-direction: column;
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #333;
    width: 200px;
    border-radius: 5px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  .menu-list.active {
    display: flex;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
