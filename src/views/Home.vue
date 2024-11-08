<script>
import ItemCard from "@/components/ItemCard.vue";
import MyHeader from "@/components/MyHeader.vue";
import products from "@/data/lvl3Products.json";
import brands from "@/data/brands.json";
import FilterItems from "@/components/FilterItem.vue";
import "bootstrap/dist/css/bootstrap.min.css";
export default {
  components: {
    ItemCard,
    MyHeader,
    FilterItems,
  },
  data() {
    return {
      brands,
      products,
      isMenuOpen: false,
      selectedBrands: [],
      orderTotal: 0,
      numberOfOrders: 0,
      cartItems: [],
    };
  },

  computed: {
    filteredProducts() {
      if (this.selectedBrands.length === 0) {
        return this.products;
      }
      return this.products.filter((product) =>
        this.selectedBrands.includes(product.brand)
      );
    },
  },
  methods: {
    addToCart(cartItem) {
      const existingItem = this.cartItems.find(
        (item) =>
          item.title === cartItem.title &&
          item.size === cartItem.size &&
          item.color === cartItem.color
      );

      if (existingItem) {
        existingItem.quantity += cartItem.quantity;
      } else {
        this.cartItems.push({ ...cartItem, quantity: cartItem.quantity });
      }
      this.updateOrderTotal(cartItem.price * cartItem.quantity);
      this.updateOrderCount(cartItem.quantity);
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    updateOrderTotal(price) {
      const numericPrice = parseFloat(price);
      this.orderTotal += numericPrice;
    },
    updateOrderCount(quantity) {
      this.numberOfOrders += quantity;
    },
  },
};
</script>
<template>
  <MyHeader :cartItems="cartItems" />
  <h1 class="title">Заголовок</h1>
  <div class="mainContainer">
    <div class="sorter">
      <h3 class="filters">Фильтры</h3>
      <FilterItems
        menuItemText="Производитель"
        :brands="brands"
        :selectedBrands="selectedBrands"
        @update:selectedBrands="selectedBrands = $event"
      />
    </div>
    <div class="itemList row g-3">
      <div class="col-4" v-for="item in filteredProducts" :key="item.id">
        <ItemCard
          :key="item.id"
          :item="item"
          :updateOrderTotal="updateOrderTotal"
          :updateOrderCount="updateOrderCount"
          @add-to-cart="addToCart"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
$margin-bottom: 24px;
$title-color: #5e5e5e;
$title-font-size: 34px;
$gap: 20px;
$border-color: black;
$border-radius: 10px;

.title {
  margin: 0;
  margin-bottom: $margin-bottom;
  color: $title-color;
  font-size: $title-font-size;
}
.mainContainer {
  display: flex;
  gap: $gap;

  .sorter {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    height: fit-content;
    border: 1px solid $border-color;
    border-radius: $border-radius;

    .filters {
      font-size: 16px;
      width: 304px;
      padding: 20px;
      margin: 0;
      font-size: 16px;
      border-bottom: 1px solid $border-color;
    }
  }
}
</style>
