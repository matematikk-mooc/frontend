<template>
  <div class="dropdown">
    <Button 
      type="dropdown" 
      size="lg" 
      @click="toggleDropdown"  
      @keydown.down.prevent="openDropdown"  
      @keydown.enter.prevent="openDropdown"  
      @keydown.space.prevent="openDropdown"
    >
      <span :class="['dropdown-button__content', { 'dropdown-button__content--open': isOpen }]">
        {{ selectedOption?.value ? selectedOption.value : 'Bokmål' }}
        <Icon class="toggle-icon" size="1.5em" name="expand_more" />
      </span>
    </Button>
    <ul v-show="isOpen" ref="dropdownList" class="dropdown__content" @keydown.prevent="handleKeyDown" tabindex="0">
      <li 
        v-for="option in filteredOptions" 
        :key="option.key"
        :data-key="option.key"
        :tabIndex="option.key === currentIndex ? 0 : -1"
        @click="selectOption(option)" 
        @focus="currentIndex = option.key"
        class="dropdown__item"
      >
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import Button from '../Button.vue';
import Icon from '../icon/Icon.vue';

export default {
  props: {
    options: Array,
    preselect: String
  },
  components: {
    Button, 
    Icon
  },
  data() {
    return {
      isOpen: false,
      selectedOption: this.preselect ? this.options.find((item) => item.key === this.preselect) : this.options[0],
      currentIndex: this.preselect ? this.options.find((item) => item.key === this.preselect).key : this.options[0].key,
    };
  },
  emits: ['selected'],

  methods: {
    toggleDropdown() {
      this.isOpen = !this.isOpen;
      this.focusOnFirstItem();
    },
    openDropdown() {
      this.isOpen = true;
      this.focusOnFirstItem();
      this.currentIndex = this.filteredOptions.length > 0 ? this.filteredOptions[0].key : null;
    },
    focusOnFirstItem() {
      this.$nextTick(() => {
        const firstItem = this.$refs.dropdownList.querySelector('.dropdown__item[tabIndex="0"]');
        if (firstItem) {
          firstItem.focus();
        }
      });
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.$emit('selected', option.key);
    },
    focusOnItem(item) {
    this.$nextTick(() => {
      const targetItem = this.$refs.dropdownList.querySelector(`.dropdown__item[data-key="${item.key}"]`);
      if (targetItem) {
        targetItem.focus();
      }
    });
  },
    handleKeyDown(event) {
      switch (event.key) {
        case 'ArrowDown':
          this.navigateList('down');
          break;
        case 'ArrowUp':
          this.navigateList('up');
          break;
        case 'Enter':
          this.selectOption(this.filteredOptions.find(option => option.key === this.currentIndex));
          break;
      }
    },
    navigateList(direction) {
      if (direction === 'down') {
        const index = this.filteredOptions.findIndex(item => item.key === this.currentIndex);
        if (index >= 0 && index < this.filteredOptions.length - 1) {
          const option = this.filteredOptions[index + 1]
          this.currentIndex = option.key;
          this.focusOnItem(option)
        } 
      } else if (direction === 'up') {
        const index = this.filteredOptions.findIndex(item => item.key === this.currentIndex);
        if (index > 0) {
           const option = this.filteredOptions[index - 1]
          this.currentIndex = option.key;
          this.focusOnItem(option)
        }
      }
    },
  },
  computed: {
    filteredOptions() {
      return this.options.filter(option => option.key !== this.selectedOption.key);
    }
  },
};
</script>

<style lang="scss">
@import "../../design/hide-show-effect";
@import "../../design/box-shadow";
@import "../../design/colors.scss";

.dropdown {
  position: relative;
  width: 9rem;
  .dropdown-button__content {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    .toggle-icon {
      position: relative;
      bottom: -0.15rem;
      margin-left: 0.15rem;
      transition: transform 0.3s ease;
    }

    &--open {
      .toggle-icon {
        transform: rotateX(-180deg);
        bottom: 0;
      }
    }
  }

  &__content {
    width: 100%;
    position: absolute;
    top: 3rem;
    list-style: none;
    padding: 0;
    margin: 0;
    overflow: hidden;
    background-color: $color-white;
    border-top: none;
    border-radius: 0.25rem;
    display: hidden;
    @include box-shadow(medium);
    @include hide-show-effect;

    &.show {
      display: block;
    }
  }

  &__item {
    padding: 0.75rem;
    cursor: pointer;
    min-width: 6rem;

    &:focus {
      background-color: $color-grey-900;
      color: $color-white;
    }

    &:hover {
      background-color: $color-grey-900;
      color: $color-white;
    }
  }
}
</style>
