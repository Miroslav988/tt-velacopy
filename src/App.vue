<template>
  <div>
    <main>
      <router-view></router-view>
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

<style lang="scss">
@font-face {
  font-family: "Raleway";
  src: url("../public/Raleway/Raleway-VariableFont_wght.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}

#app {
  font-family: "Raleway", sans-serif;
  margin: 0 82px;

  @media (max-width: 1024px) {
    margin: 0 41px;
  }
}
footer {
  text-align: center;
  padding: 20px;
}
</style>
