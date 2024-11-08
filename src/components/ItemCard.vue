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
            <span>S</span>
          </button>
          <button
            class="ItemSize"
            :class="{ clicked: selectedSize === 'M' }"
            :disabled="!isSizeAvailable('M')"
            @click="selectSize('M')"
          >
            <span>M</span>
          </button>
          <button
            class="ItemSize"
            :class="{ clicked: selectedSize === 'L' }"
            :disabled="!isSizeAvailable('L')"
            @click="selectSize('L')"
          >
            <span>L</span>
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
      <button
        class="cart"
        @click="addToCart"
        :disabled="
          item.type === 'configurable' && (!selectedColor || !selectedSize)
        "
      ></button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    updateOrderTotal: Function,
    updateOrderCount: Function,
  },
  data() {
    return {
      cart: [],
      counter: 1,
      selectedColor: "",
      selectedSize: "",
    };
  },
  methods: {
    changeImage(colorLabel) {
      this.item.image = `images/conf/${colorLabel.toLowerCase()}.png`;
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
      this.selectedColor = colorLabel;
      this.changeImage(colorLabel);
    },
    selectSize(sizeLabel) {
      this.selectedSize = sizeLabel;
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
      const quantity = parseInt(this.counter);
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
      this.counter = 1;
      this.selectedColor = "";
      this.selectedSize = "";
    },
  },
};
</script>

<style lang="scss">
$red: red;
$border-radius: 3px;
$box-shadow: 1px 1px 16px 0px rgba(36, 36, 36, 0.08);
$font-size-small: 10px;
$cart-size: 60px;

.ItemSize {
  padding: 0;
  width: 22px;
  height: 15px;
  background-color: transparent;
  font-size: $font-size-small;
  border-radius: $border-radius;
  border: 1px solid #5e5e5e;

  &:disabled {
    color: $red;
    position: relative;
    border-color: $red;

    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 115%;
      height: 1px;
      background-color: $red;
      top: 6px;
      left: -1px;
    }

    &::before {
      transform: rotate(30deg);
    }

    &::after {
      transform: rotate(-30deg);
    }
  }
}

.product {
  box-sizing: border-box;
  box-shadow: $box-shadow;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  padding: 12px;
  height: 390px;

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

    .colorCont {
      display: flex;
      gap: 11px;
      margin-bottom: 11px;
    }

    .sizeCont {
      display: flex;
      gap: 5px;
    }
  }
}

.ItemColor {
  width: 18px;
  height: 16px;
  border-radius: $border-radius;
  border: none;
}

.cartFooter {
  margin-top: 34px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .minus,
  .plus {
    background-color: transparent;
    border: none;
  }

  .itemCountCont {
    display: flex;
    border: 1px solid #5e5e5e;
    border-radius: $border-radius;
    width: 68px;
    justify-content: space-around;
    align-items: center;
  }
}

.cart {
  background-image: url("../../public/images/shopping-cart.svg");
  background-position: center;
  background-repeat: no-repeat;
  width: $cart-size;
  height: $cart-size;
  border: none;
  border-radius: 50%;
  background-color: #5e5e5e;

  &:disabled {
    background-color: $red;
  }
}

.clicked {
  border: 1px solid rgb(255, 0, 0);
}
</style>
