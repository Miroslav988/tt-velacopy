<script>
import ItemCard from "@/components/ItemCard.vue";
import MyHeader from "@/components/MyHeader.vue";
import products from "@/data/lvl3Products.json";
import brands from "@/data/brands.json";
import FilterItems from "@/components/FilterItem.vue";
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
      this.cartItems.push(cartItem); // Добавляем товар в корзину
      console.log(this.cartItems);
      this.updateOrderTotal(cartItem.price * cartItem.quantity); // Обновляем общую стоимость
      this.updateOrderCount(cartItem.quantity); // Обновляем количество товаров
    },
    toggleBrand(brandId) {
      const index = this.selectedBrands.indexOf(brandId);
      if (index === -1) {
        this.selectedBrands.push(brandId); // Добавляем бренд, если он не выбран
      } else {
        this.selectedBrands.splice(index, 1); // Удаляем бренд, если он уже выбран
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen; // Переключаем состояние меню
    },
    updateOrderTotal(price) {
      const numericPrice = parseFloat(price);
      this.orderTotal += numericPrice; // Обновляем сумму заказа
    },
    updateOrderCount(quantity) {
      this.numberOfOrders += quantity; // Увеличиваем количество заказов
    },
  },
};
</script>
<template>
  <MyHeader
    :orderTotal="orderTotal"
    :numberOfOrders="numberOfOrders"
    :cartItems="cartItems"
  />
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
    <div class="itemList">
      <ItemCard
        v-for="item in filteredProducts"
        :key="item.id"
        :item="item"
        :updateOrderTotal="updateOrderTotal"
        :updateOrderCount="updateOrderCount"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<style>
.title {
  margin: 0;
  margin-left: 82px;
  color: #5e5e5e;
  font-size: 34px;
}
.mainContainer {
  display: flex;
  gap: 20px;
  margin: 24px 82px 0px 82px;
}
.itemList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.sorter {
  position: sticky;
  margin-top: 10px;
  display: flex;
  width: 304px;
  flex-direction: column;
  height: fit-content;
  border: 1px solid black;
  border-radius: 10px;
}
.filters {
  margin: 0;
  font-size: 16px;
  padding: 20px;
  border-bottom: 1px solid black;
}
</style>
