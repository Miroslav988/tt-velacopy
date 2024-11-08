<template>
  <div id="app">
    <main>
      <router-view></router-view>
      <!-- Здесь будет отображаться контент в зависимости от маршрута -->
    </main>

    <footer>
      <p>© 2023 Ваш магазин. Все права защищены.</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style></style>
