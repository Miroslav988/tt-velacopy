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
            <div v-if="item.size || item.color" class="sizeAndColorCont">
              <span class="sizeCartCont">Размер: {{ item.size }}</span>
              <span class="colorCartCont">Цвет: {{ item.color }}</span>
            </div>
            <h3 class="cardName">{{ item.title }}</h3>
            <button class="delete" @click="removeFromCart(item)">
              <div class="icon"></div>
              <span>Удалить</span>
            </button>
          </div>
          <div class="priseAndCountCont">
            <p class="totalPrice">
              {{ (item.price * item.quantity).toFixed(2) }} ₽
            </p>
            <div class="biggerBtns">
              <button class="minus" @click="decreaseCount(item)">-</button
              ><span class="counter">{{ item.quantity }}</span
              ><button class="plus" @click="increaseCount(item)">+</button>
            </div>
          </div>
        </div>
      </div>
      <p class="totalCartPrice">Итого: {{ totalPrice.toFixed(2) }} ₽</p>
      <button class="pay">Перейти к оформлению</button>
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader.vue";

export default {
  methods: {
    removeFromCart(item) {
      const index = this.cartItems.findIndex(
        (cartItem) =>
          cartItem.name === item.name &&
          cartItem.size === item.size &&
          cartItem.color === item.color
      );
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        console.log(`Товар ${item.name} удален из корзины.`);
      }
    },
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
  computed: {
    totalPrice() {
      return this.cartItems.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);
    },
  },
  data() {
    return {
      cartItems: [],
    };
  },
  created() {
    const cartItemsString = this.$route.query.cartItems;
    if (cartItemsString) {
      this.cartItems = JSON.parse(cartItemsString);
      console.log("Корзина:", this.cartItems);
    } else {
      console.log("Корзина пуста");
    }
  },
};
</script>
<style lang="scss">
$border-color: #5e5e5e;
$padding: 15px;
$font-color: #5e5e5e;
$font-weight-bold: 900;

.cartItem {
  border: 1px solid $border-color;
  display: flex;
  padding: $padding 36px 24px 18px;
  @media (max-width: 425px) {
    display: flex;
    flex-direction: column;
  }

  .sizeAndColorCont {
    display: flex;
    gap: 14px;
    color: $font-color;
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
    background-color: transparent;
    border: none;
    display: flex;
    gap: 12px;
    color: $font-color;
  }

  .priseAndCountCont {
    margin-top: auto;
  }

  .biggerBtns {
    border: 1px solid $border-color;
    width: 208px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 425px) {
      width: 144px;
    }
    @media (max-width: 320px) {
      width: auto;
      border: none;
    }

    .minus,
    .plus {
      background-color: transparent;
      border: none;
      padding: 0;
      font-size: 25px;
      padding: 20px;
    }
  }

  .totalPrice {
    font-size: 24px;
    font-weight: $font-weight-bold;
    text-align: right;
    @media (max-width: 425px) {
      text-align: center;
    }
  }

  .cardName {
    font-weight: $font-weight-bold;
    color: $font-color;
  }
}

.totalCartPrice {
  text-align: right;
  color: $font-color;
  font-size: 32px;
  margin-bottom: 25px;
  margin-top: 15px;
  font-weight: $font-weight-bold;
}

.pay {
  color: #ffffff;
  width: 352px;
  height: 65px;
  padding: 24px 30px;
  gap: 10px;
  border: none;
  border-radius: 2px;
  background-color: $border-color;
  margin-left: auto;
  font-size: 24px;
  @media (max-width: 425px) {
    margin-left: 0;
    width: auto;
    height: auto;
  }
}

.icon {
  background-image: url("../../public/images/корзина.svg");
  width: 16px;
  height: 16px;
  background-position: center;
  background-size: contain;
}
</style>
