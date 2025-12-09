<script setup>
import RouterLink from "../components/UI/Routerlink.vue";
import HeadingNoAtras from "../components/UI/HeadingNoAtras.vue";
import { FormKit } from "@formkit/vue";
import { fadeInUp } from "../motion/PagesAnimation";
import { motion } from "motion-v";
import { onMounted } from 'vue';
import axios from 'axios';

const whatsappLink = "https://wa.me/573196622476";

</script>

<template>
  <HeadingNoAtras />
  <motion.div v-bind="fadeInUp">
    <section class="container py-5">
      <div class="row align-items-center">
        <div class="col-lg-6 desktop">
        </div>
        <div class="col-lg-6">
          <div>
<h2 class="display-4 titulo text-center">
  No fue posible aprobar <br /> tu solicitud de crédito en este momento. <br />
  Si tienes dudas, comunícate con el siguiente número.
</h2>

          </div>
          <picture>
            <img
              src="/public/tendero.png"
              alt="Pago"
              class="img-fluid mt-auto"
              loading="lazy"
              title="Pago"
            />
          </picture>
          <div>
    <a
      class="whatsapp-btn"
      :href="whatsappLink"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        class="whatsapp-logo"
      />
      Comunícate con nosotros
    </a>

          </div>
</div>
      </div>
    </section>
  </motion.div>
</template>

<style scoped>
body {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  background-color: white;
}

.whatsapp-btn {
  margin-top: auto;
  background-color: #DD3590;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
  transition: background-color 0.3s ease;
}

.whatsapp-btn:hover {
  background-color: #ff00f2;
}

.whatsapp-logo {
  width: 24px;
  height: 24px;
  margin-right: 0.75rem;
}

.form-group input {
  background-color: transparent;
  border-width: 0px 0px 1px;
  border-top-style: initial;
  border-right-style: initial;
  border-left-style: initial;
  border-top-color: initial;
  border-right-color: initial;
  border-left-color: initial;
  border-image: initial;
  border-radius: 0px;
  box-sizing: border-box;
  color: rgb(17, 17, 17);
  caret-color: currentcolor;
  display: block;
  margin: 0px;
  padding: 8px 0px;
  text-align: left;
  outline: none;
  width: 100%;
  border-bottom-style: solid;
  border-bottom-color: rgba(17, 17, 17, 0.2);
  --inputCurrentColor: #111111;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.container button {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
  border-radius: 13px;
  background: #dd3590;
  color: rgb(255, 255, 255);
  --rippleLayerColor: rgba(255, 255, 255, 0.2);
  height: 3rem;
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  -webkit-box-pack: justify;
  justify-content: space-between;
  cursor: pointer;
  outline: 0px;
  -webkit-box-align: center;
  align-items: center;
  vertical-align: middle;
  overflow: hidden;
  position: relative;
  border: 0px;
  transform: translate3d(0px, 0px, 0px);
}
span {
  color: #dd3590;
}
.parrafo {
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: medium;
}
.info-banner {
  margin: 0px 0px 12px;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
  background-color: #dd3590;
  color: white;
  border-radius: 16px;
  padding: 24px;
  width: 100%;
}
.titulo-1 {
  font-weight: bold;
}
.titulo {
  margin: 0px 0px 16px;
  color: inherit;
  font-weight: 500;
  letter-spacing: -0.03em;
  font-size: 1.875rem;
  line-height: 1.2;
}
.registro {
  background-color: #251886;
  color: white;
}
.banners {
  background-color: white;
}

.tarjeta button {
  justify-content: center;
}

@media (max-width: 767px) {
  .img-fluid {
    margin-top: -90px;
  }
  .titulo {
    font-weight: bold;
  }
  .tarjeta {
    background-color: rgb(255, 255, 255);
    padding: 24px;
    border-radius: 16px;
    width: 100%;
  }
}
</style>
