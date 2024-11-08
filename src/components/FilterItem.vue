<template>
  <div>
    <div class="menuItemCont">
      <h4 class="menuItemText">{{ menuItemText }}</h4>
      <button
        :class="{ menuOpened: isMenuOpen }"
        class="openMenu"
        @click="toggleMenu"
      >
        &gt;
      </button>
    </div>
    <div
      class="brandList"
      :style="{
        display: isMenuOpen ? 'flex' : 'none',
        height: isMenuOpen ? 'auto' : '0',
      }"
    >
      <div v-for="brand in brands" :key="brand.id">
        <label class="inputLabel">
          <input
            class="checkboxInput"
            type="checkbox"
            :value="brand.id"
            @change="handleChange(brand.id)"
            :checked="isSelected(brand.id)"
          />
          {{ brand.title }}
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menuItemText: {
      type: String,
      required: true,
    },
    brands: {
      type: Array,
      required: true,
    },
    selectedBrands: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleChange(brandId) {
      const index = this.selectedBrands.indexOf(brandId);
      if (index === -1) {
        this.$emit("update:selectedBrands", [...this.selectedBrands, brandId]);
      } else {
        this.$emit(
          "update:selectedBrands",
          this.selectedBrands.filter((id) => id !== brandId)
        );
      }
    },
    isSelected(brandId) {
      return this.selectedBrands.includes(brandId);
    },
  },
};
</script>

<style lang="scss" scoped>
$primary-color: #3498db;
$secondary-color: #2ecc71;
$text-color: #333;
$background-color: #f9f9f9;
$border-color: #e0e0e0;
$border-radius: 8px;
$shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

.brandList {
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: opacity 0.3s ease, height 0.3s ease;
  overflow: hidden;
  border-radius: $border-radius;
  box-shadow: $shadow;

  .inputLabel {
    color: #bbbbbb;
    display: flex;
    align-items: center;
    gap: 12px;
    font-size: 14px;
    transition: color 0.3s ease;

    &:hover {
      color: $primary-color; // Изменение цвета при наведении
    }
  }

  .checkboxInput {
    filter: grayscale(1);
    width: 20px;
    height: 20px;
    border-radius: 2px;
    transition: filter 0.3s ease;

    &:hover {
      filter: grayscale(0);
    }
  }
}

.menuItemCont {
  display: flex;
  justify-content: space-between;
  padding: 20px;

  .menuItemText {
    margin: 0;
    font-size: 16px;
    color: $text-color;
  }

  .openMenu {
    background-color: transparent;
    border: none;
    transform: rotate(90deg);
    transition: transform 0.5s ease;
  }

  .menuOpened {
    transform: rotate(-90deg);
    transition: transform 0.5s ease;
  }
}
</style>
