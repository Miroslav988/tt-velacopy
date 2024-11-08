<template>
  <MyHeader :orderTotal="orderTotal" :numberOfOrders="numberOfOrders" />
  <div>
    <h1 class="title">Корзина</h1>
    <div v-if="cartItems.length === 0">Корзина пуста</div>
    <div
      v-else
      :style="{ display: 'flex', flexDirection: 'column', gap: '15px' }"
    >
      <div class="cartItem" v-for="item in cartItems" :key="item.title">
        <div
          class="cartItemImage"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        ></div>
        <div
          :style="{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
            marginTop: '24px',
          }"
        >
          <div
            :style="{
              display: 'flex',
              flexDirection: 'column',
            }"
          >
            <div class="sizeAndColorCont">
              <span class="sizeCartCont">Размер: {{ item.size }}</span>
              <span class="colorCartCont">Цвет: {{ item.color }}</span>
            </div>
            <h3 class="cardName">{{ item.title }}</h3>
            <button class="delete">
              <div class="icon"></div>
              <span>Удалить</span>
            </button>
          </div>
          <div class="priseAndCountCont">
            <p>{{ item.price * item.quantity }} ₽</p>
            <div class="biggerBtns">
              <button class="minus" @click="decreaseCount(item)">-</button
              ><span class="counter">{{ item.quantity }}</span
              ><button class="plus" @click="increaseCount(item)">+</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  methods: {
    increaseCount(item) {
      item.quantity += 1;
    },
    decreaseCount(item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  },
  components: {
    MyHeader,
  },
  data() {
    return {
      cartItems: [], // Инициализируем массив для товаров в корзине
    };
  },
  created() {
    const cartItemsString = this.$route.query.cartItems; // Получаем строку из параметров маршрута
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString); // Парсим строку в массив объектов
      console.log("Корзина:", this.cartItems); // Выводим данные в консоль для проверки
    } else {
      console.log("Корзина пуста"); // Сообщение, если данных нет
    }
  },
};
</script>
<style>
.cartItem {
  border: 1px solid #5e5e5e;
  display: flex;
  padding: 15px 36px 24px 18px;
  margin-left: 82px;
  margin-right: 82px;
}
.sizeAndColorCont {
  display: flex;
  gap: 14px;
  color: #5e5e5e;
}
.cartItemImage {
  width: 223px;
  height: 161px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
}
.delete {
  margin-top: auto;
}
.priseAndCountCont {
  margin-top: auto;
}
.biggerBtns {
}
</style>
