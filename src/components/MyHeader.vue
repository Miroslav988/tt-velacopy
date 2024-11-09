<template>
  <header class="header">
    <router-link class="link" to="/home"
      ><div class="logo">LOGO</div></router-link
    >
    <div class="cartCont">
      <button class="cart" @click="goToCart">
        <div class="notif" v-if="totalOrders > 0">
          <span>{{ totalOrders > 9 ? "9+" : totalOrders }}</span>
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
    cartItems: {
      type: Array,
      default: () => [],
    },
    currency: {
      type: String,
      default: "₽",
    },
  },
  computed: {
    totalOrders() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0);
    },
    orderTotal() {
      return this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  setup(props) {
    const router = useRouter();

    const goToCart = () => {
      router.push({
        path: "/cart",
        query: { cartItems: JSON.stringify(props.cartItems) },
      });
    };

    return {
      goToCart,
    };
  },
};
</script>

<style lang="scss">
$header-margin: 43px 0 30px 0;
$logo-font-size: 40px;
$logo-font-weight: 900;
$cart-size: 60px;
$cart-bg-color: #5e5e5e;
$notif-size: 16px;
$notif-bg-color: red;
$notif-border-color: white;
$cart-text-color: #bbbbbb;

.header {
  display: flex;
  justify-content: space-between;
  margin: $header-margin;

  .logo {
    font-size: $logo-font-size;
    font-weight: $logo-font-weight;
  }

  .cartCont {
    display: flex;
    align-items: center;
    gap: 8px;

    .cartTextCont {
      display: flex;
      flex-direction: column;
    }

    .cart {
      position: relative;
      background-image: url("../../public/images/shopping-cart.svg");
      background-position: center;
      background-repeat: no-repeat;
      width: $cart-size;
      height: $cart-size;
      border: none;
      border-radius: 50%;
      background-color: $cart-bg-color;
      @media (max-width: 320px) {
        width: 45px;
        height: 45px;
      }

      .cartName {
        color: $cart-text-color;
      }

      .notif {
        position: absolute;
        width: $notif-size;
        height: $notif-size;
        background: $notif-bg-color;
        border: 1px solid $notif-border-color;
        top: 0;
        right: 0;
        border-radius: 50%;
        color: white;
        font-size: 10px;
      }
    }
  }

  .link {
    text-decoration: none;
    color: black;
  }
}
</style>
