<template>
  <div class="product">
    <div
      class="itemImage"
      :style="{
        backgroundImage: `url(${item.image})`,
      }"
    ></div>
    <div class="cadrHeader">
      <h4 class="itemName">{{ item.title }}</h4>
      <div class="productVars" v-if="item.type === 'configurable'">
        <div class="colorCont">
          <button
            v-for="color in item.configurable_options[0].values"
            :key="color.value_index"
            class="ItemColor"
            :class="{ clicked: selectedColor === color.label }"
            :style="{ backgroundColor: color.value }"
            :title="color.label"
            @click="selectColor(color.label)"
          ></button>
        </div>
        <div class="sizeCont">
          <button
            class="ItemSize"
            :class="{ clicked: selectedSize === 'S' }"
            :disabled="!isSizeAvailable('S')"
            @click="selectSize('S')"
          >
            S
          </button>
          <button
            class="ItemSize"
            :class="{ clicked: selectedSize === 'M' }"
            :disabled="!isSizeAvailable('M')"
            @click="selectSize('M')"
          >
            M
          </button>
          <button
            class="ItemSize"
            :class="{ clicked: selectedSize === 'L' }"
            :disabled="!isSizeAvailable('L')"
            @click="selectSize('L')"
          >
            L
          </button>
        </div>
      </div>
    </div>
    <div class="cartFooter">
      <p class="itemPrice">
        {{ item.regular_price.value }} {{ item.regular_price.currency }}
      </p>
      <div class="itemCountCont">
        <button class="minus" @click="decreaseCount">-</button
        ><span class="counter">{{ counter }}</span
        ><button class="plus" @click="increaseCount">+</button>
      </div>
      <button class="cart" @click="addToCart"></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true, // Правильное использование required
    },
    updateOrderTotal: Function,
    updateOrderCount: Function,
  },
  data() {
    return {
      cart: [],
      counter: 1,
      selectedColor: "", // Новое свойство для отслеживания выбранного цвета
      selectedSize: "",
    };
  },
  methods: {
    changeImage(colorLabel) {
      // Формируем путь к изображению на основе метки цвета
      this.item.image = `images/conf/${colorLabel.toLowerCase()}.png`; // Пример: conf/red.jpg
    },
    isSizeAvailable(size) {
      const sizes = this.item.configurable_options.find(
        (option) => option.attribute_code === "size"
      );
      if (sizes) {
        return sizes.values.some((value) => value.label === size);
      }
      return false;
    },
    selectColor(colorLabel) {
      this.selectedColor = colorLabel; // Устанавливаем выбранный цвет
      this.changeImage(colorLabel); // Изменяем изображение
    },
    selectSize(sizeLabel) {
      this.selectedSize = sizeLabel; // Устанавливаем выбранный размер
    },
    increaseCount() {
      this.counter += 1;
    },
    decreaseCount() {
      if (this.counter > 1) {
        this.counter -= 1;
      }
    },
    addToCart() {
      const price = parseFloat(this.item.regular_price.value);

      const quantity = parseInt(this.counter, 10); // Преобразуем в целое число
      this.updateOrderCount(quantity);
      this.updateOrderTotal((price * quantity).toFixed(2));

      const cartItem = {
        image: this.item.image,
        title: this.item.title,
        price: price,
        color: this.selectedColor,
        size: this.selectedSize,
        quantity: quantity,
      };
      this.$emit("add-to-cart", cartItem);
      this.counter = 1; // Сброс счетчика
      this.selectedColor = ""; // Сброс выбранного цвета
      this.selectedSize = ""; // Сброс выбранного размера
    },
  },
};
</script>

<style>
.ItemSize:disabled {
  color: red;
  position: relative;
  border-color: red;
}
.ItemSize:disabled::before,
.ItemSize:disabled::after {
  content: ""; /* Псевдоэлементы без текста */
  position: absolute; /* Абсолютное позиционирование */
  width: 115%; /* Ширина на всю кнопку */
  height: 1px; /* Толщина линии */
  background-color: red; /* Цвет линий */
  top: 6px;
  left: -1px; /* Выравнивание по левому краю */
}
.ItemSize:disabled::before {
  transform: rotate(30deg); /* Первая линия под углом 45 градусов */
}

.ItemSize:disabled::after {
  transform: rotate(-30deg); /* Вторая линия под углом -45 градусов */
}
.product {
  box-sizing: border-box;
  box-shadow: 1px 1px 16px 0px #24242414;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 12px;
  width: 304px;
  height: 390px;
}
.itemImage {
  margin-top: 34px;
  width: 100%;
  height: 161px;
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}
.itemName {
  margin: 0;
}
.cadrHeader {
  display: flex;
  margin-top: 49px;
  justify-content: space-between;
  align-items: center;
}
.productVars {
  display: flex;
  flex-direction: column;
}
.colorCont {
  display: flex;
  gap: 11px;
  margin-bottom: 11px;
}
.sizeCont {
  display: flex;
  gap: 5px;
}
.ItemColor {
  width: 18px;
  height: 16px;
  border-radius: 3px;
  border: none;
}
.ItemSize {
  width: 22px;
  height: 15px;
  background-color: transparent;
  font-size: 10px;
  border-radius: 3px;
  border: 1px solid #5e5e5e;
}
.cartFooter {
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.minus,
.plus {
  background-color: transparent;
  border: none;
}
.itemCountCont {
  display: flex;
  border: 1px solid #5e5e5e;
  border-radius: 3px;
  width: 68px;
  justify-content: space-around;
  align-items: center;
}
.cart {
  background-image: url("../../public/images/shopping-cart.svg");
  background-position: center;
  background-repeat: no-repeat;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background-color: #5e5e5e;
}
.clicked {
  border: 1px solid rgb(255, 0, 0);
}
</style>
