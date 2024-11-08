<template>
  <header class="header">
    <div class="logo">LOGO</div>
    <div class="cartCont">
      <button class="cart" @click="goToCart">
        <div class="notif" v-if="numberOfOrders > 0">
          {{ numberOfOrders > 9 ? "9+" : numberOfOrders }}
        </div>
      </button>
      <div class="cartTextCont">
        <span class="cartName">Корзина</span>
        <span>{{ orderTotal.toFixed(2) }} {{ currency }}</span>
      </div>
    </div>
  </header>
</template>
<script>
import { useRouter } from "vue-router";
export default {
  props: {
    orderTotal: { type: Number, default: 0 }, // Пропс для суммы заказа
    currency: {
      type: String,
      default: "₽", // Укажите валюту по умолчанию
    },
    numberOfOrders: { type: Number, default: 0 },
    cartItems: Array,
  },

  setup(props) {
    const router = useRouter(); // Получите доступ к роутеру

    const goToCart = () => {
      router.push({
        path: "/cart",
        query: { cartItems: JSON.stringify(props.cartItems) },
      }); // Передаем массив товаров в параметры маршрута
    };

    return {
      goToCart,
    };
  },
};
</script>
<style>
.header {
  display: flex;
  justify-content: space-between;
  margin: 43px 82px 30px 82px;
}
.logo {
  font-size: 40px;
  font-weight: 900;
}
.cartCont {
  display: flex;
  align-items: center;
  gap: 8px;
}
.cartTextCont {
  display: flex;
  flex-direction: column;
}
.cart {
  position: relative;
  background-image: url("../../public/images/shopping-cart.svg");
  background-position: center;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #5e5e5e;
}
.cartName {
  color: #bbbbbb;
}
.notif {
  position: absolute;
  width: 16px;
  height: 16px;
  background: red;
  border: 1px solid white;
  top: 0;
  right: 0;
  border-radius: 50%;
  color: white;
}
</style>
