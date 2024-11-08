// src/router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue"; // Импортируйте компонент Home
import Cart from "../views/Cart.vue"; // Импортируйте компонент Cart

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // Установите Home как компонент для маршрута по умолчанию
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart, // Добавьте маршрут для страницы корзины
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
