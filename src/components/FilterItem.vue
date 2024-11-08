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
        opacity: isMenuOpen ? 1 : 0,
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
      this.isMenuOpen = !this.isMenuOpen; // Переключаем состояние меню
    },
    handleChange(brandId) {
      const index = this.selectedBrands.indexOf(brandId);
      if (index === -1) {
        // Добавляем бренд, если он не выбран
        this.$emit("update:selectedBrands", [...this.selectedBrands, brandId]);
      } else {
        // Удаляем бренд, если он уже выбран
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

<style scoped>
.brandList {
  padding: 20px;
  padding-top: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: opacity 0.3s ease, height 0.3s ease; /* Плавный переход для opacity и высоты */
  overflow: hidden; /* Скрываем переполнение */
}
.inputLabel {
  color: #bbbbbb;
  display: flex;
  align-items: center;
  gap: 12px;
}
.checkboxInput {
  filter: grayscale(1);
  width: 20px;
  height: 20px;
  border-radius: 2px;
}
.menuItemCont {
  display: flex;
  justify-content: space-between;
  padding: 20px;
}
.menuItemText {
  margin: 0;
}
.openMenu {
  background-color: transparent;
  border: none;
  transform: rotate(90deg);
  transition: all 0.5s;
}
.menuOpened {
  transform: rotate(-90deg);
  transition: all 0.5s;
}
</style>
