<template>
  <div class="welcome-container">
    <h1>{{ $t('home.title') }}</h1>
    <p class="subtitle">{{ $t('home.subtitle') }}</p>
  </div>
</template>

<style scoped>
.welcome-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 90vh;
}
h1 {
  font-size: 4rem;
  font-weight: 700;
  color: #2c3e50;
  letter-spacing: 2px;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-bottom: 0.5rem;
}
.subtitle {
  font-size: 1.2rem;
  color: #7f8c8d;
  margin-top: 0.5rem;
  font-weight: 300;
  letter-spacing: 4px;
}
</style>