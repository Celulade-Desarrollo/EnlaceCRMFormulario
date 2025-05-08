<script setup>
import { ref, onMounted } from 'vue';
import RouterLink from "../components/UI/Routerlink.vue"; 
import Heading from "../components/UI/Heading.vue";
import Button from "../components/UI/Button.vue";
import { FormKit } from "@formkit/vue";

const config = {
    cUrl: 'https://api.countrystatecity.in/v1/countries',
    cKey: 'SWNxMFI5MzlqQzhoR3JqTXZTQWVJWVluZVNpeEU5UVVGUFVsNFJrbA=='
};


const countrySelect = ref(null);


function loadCountries() {
    let apiEndPoint = config.cUrl;

    fetch(apiEndPoint, { headers: { "X-CSCAPI-KEY": config.cKey } })
        .then(response => response.json())
        .then(data => {
            data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.iso2;
                option.textContent = country.name;
                countrySelect.value.appendChild(option);
            });
        })
        .catch(error => console.error('Error loading countries:', error));
}

onMounted(loadCountries);
</script>

<template>   
  <Heading />
  <section class="container py-5 registro">
    <div class="row align-items-center">
      <div class="col-lg-6 desktop">
        <picture>
          <img src="/public/pago.png" alt="Pago" class="img-fluid" loading="lazy" title="Pago" />
        </picture>
      </div>
    </div>

    <div class="custom-select-wrapper">
      <h3 class="titulo mb-5">¿Cuál es tu nacionalidad?</h3>
      <select class="custom-select" aria-label="Default select example" ref="countrySelect">
        <option selected disabled >Selecciona tu país</option>
      </select>
    </div>

    <form action="Pantalla7View">
      <Button></Button>
    </form>
  </section>
</template>

<style scoped>
.custom-select-wrapper {
  position: relative;
  margin-bottom: 24px;
}

.custom-select {
  appearance: none;
  border: none;
  border-bottom: 2px solid #ccc;
  background-color: transparent;
  font-size: 16px;
  padding: 8px 30px 8px 0;
  background-image: url('data:image/svg+xml;charset=utf8,%3Csvg fill="%23495057" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/%3E%3C/svg%3E');
  background-position: right 12px center;
  background-size: 16px 12px;
  width: 100%;
  outline: none;
  box-shadow: none;
  color: #333;
  cursor: pointer;
}
.custom-select:focus {
  border-bottom: 2px solid #ff00f2;
  outline: none;
  box-shadow: none;
}



  body {
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    background-color: white;
  }
  .formkit-wrapper {
    align-items: center;
    width: 100%;
  }
  .formkit-input {
    text-align: center;
  }
  .formkit-help {
    margin-left: 50px;
  }
  .form-group input {
    background-color: transparent;
    border-width: 0 0 1px;
    border-style: solid;
    border-color: rgba(17, 17, 17, 0.2);
    border-radius: 0;
    box-sizing: border-box;
    color: rgb(17, 17, 17);
    caret-color: currentColor;
    display: block;
    margin: 0;
    padding: 8px 0;
    text-align: left;
    outline: none;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .container button {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
    border-radius: 6.25rem;
    background: #dd3590;
    color: #fff;
    height: 3rem;
    display: flex;
    width: 100%;
    justify-content: space-between;
    cursor: pointer;
    outline: none;
    align-items: center;
    text-align: center;
    overflow: hidden;
    border: none;
    transform: translate3d(0, 0, 0);
  }
  .container {
    background-color: white;
    color: #111;
  }
  .parrafo {
    font-size: medium;
  }
  .info-banner {
    font-family: Graphik-Medium, Graphik-Regular, "Gotham SSm A", "Gotham SSm B", "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0 0 12px;
    font-weight: 500;
    letter-spacing: -0.03em;
    font-size: 1.875rem;
    line-height: 1.2;
  }
  .h5 {
    font-weight: bold;
  }
  p {
    color: black;
    font-size: 0.75rem;
  }
  .checklist {
    max-width: 300px;
    margin-top: 30px;
    margin: 0 auto;
  }
  .titulo {
    font-weight: bold;
  }
  .check-item {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    font-size: 16px;
    position: relative;
  }
  .check-item input[type="checkbox"] {
    opacity: 0;
    position: absolute;
  }
  .checkmark {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: #e0e0e0;
    margin-right: 10px;
    position: relative;
  }
  .check-item input[type="checkbox"]:checked + .checkmark {
    background-color: #dd3590;
    border: 2px solid #dd3590;
  }
  .check-item input[type="checkbox"]:checked + .checkmark::after {
    content: "";
    position: absolute;
    left: 6px;
    top: 2px;
    width: 6px;
    height: 12px;
    border: solid white;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
    display: block;
  }
  @media (max-width: 767px) {
    .desktop {
      display: none;
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
