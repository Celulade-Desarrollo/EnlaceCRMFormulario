<template>
     <header>
        <div class="logo">
            <img src="/Enlace-Logo_Azul.jpg" alt="Logo" />
        </div>
        <nav class="menu">
            <button class="menu-toggle" id="menuToggle">
                <span class="bar"></span>
                <span class="bar"></span>
                <span class="bar"></span>
            </button>
            <ul class="menu-list" id="menuList">
                <li><a href="#home">Inicio</a></li>
                <li><a href="#texto-botton">Tu fiado</a></li>
                <li><a href="#services">Nosotros</a></li>
                <li><a href="#contact">Mi cuenta</a></li>
            </ul>
        </nav>
    </header>

  </template>
  
  <script>

  </script>
  
  <style scoped>
body {
    margin: 0;
    font-family:Verdana, Geneva, Tahoma, sans-serif;
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
    color:black;
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
  