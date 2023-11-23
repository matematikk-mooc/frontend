<template>
  <div class="dropdown">
    <Button type="dropdown" size="lg" @click="toggleDropdown">
      <span :class="['dropdown-button__content', { 'dropdown-button__content--open': isOpen }]">
        {{ selectedOption?.value ? selectedOption.value : 'Bokmål' }}
        <Icon class="toggle-icon" size="1.5em" name="expand_more" />
      </span>
    </Button>
    <ul v-if="isOpen" class="dropdown__content">
      <li v-for="option in filteredOptions" :key="option.key" @click="selectOption(option)" class="dropdown__item">
        {{ option.value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, computed, emit } from 'vue';
import Button from '../Button.vue';
import Icon from '../icon/Icon.vue';

export default {
  props: {
    options: Array,
    preselect: String
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const isOpen = ref(false);
    const selectedOption = ref(props.preselect ? props.options.find((item) => item.key === props.preselect) : props.options[0]);

    const toggleDropdown = () => {
      isOpen.value = !isOpen.value;
    };

    const selectOption = (option) => {
      selectedOption.value = option;
      isOpen.value = false;
      emit('selected', option.key);
    };

    const filteredOptions = computed(() => {
      return props.options.filter(option => option.key !== selectedOption.value.key);
    });

    return {
      isOpen,
      selectedOption,
      toggleDropdown,
      selectOption,
      filteredOptions
    };
  },
  components: {
    Button,
    Icon,
  },
};
</script>



<style lang="scss">
@import "../../design/hide-show-effect";
@import "../../design/box-shadow";
@import "../../design/colors.scss";

.dropdown {
  position: relative;
  width: fit-content;
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
    background-color:$color-white;
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

    &:hover {
      background-color: $color-grey-900;
      color:$color-white;
    }
  }
}
</style>

