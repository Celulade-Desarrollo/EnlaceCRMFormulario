<template>
  <button type="submit" id="email-on-hero-submit-btn" class="submit-btn">
    Continuar
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 21 20" class="icon">
      <title>Arrow Right</title>
      <path d="M18.5 10H2.5M18.5 10L12 16.5M18.5 10L12 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="square" stroke-linejoin="round"/>
    </svg>
  </button>
</template>

<style scoped>
.submit-btn {
  outline: none;
  padding: 0 1.25rem;
  border-radius: 6.25rem;
  background: #dd3590;
  color: white;
  height: 3rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  cursor: pointer;
  border: none;
  transform: translate3d(0, 0, 0);
  font-weight: 500;
  transition: background 0.3s;
  width: 100%;
  text-align: center;
}

.submit-btn:hover {
  background: #c42f7e;
}

.icon {
  margin-left: 0.25rem;
}
</style>