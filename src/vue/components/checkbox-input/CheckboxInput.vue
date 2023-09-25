<template>
  <label class="checkbox-input" :for="name">
    <input :id="name" v-model="modelValue" type="checkbox" class="checkbox-input__checkbox" />
    <span class="checkbox-input__label">
      {{ label }}
    </span>
  </label>
</template>

<script>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'

export default {
  name: 'CheckboxInput',
  props: {
    name: String,
    label: String,
  },
  setup() {
    const modelValue = ref(false)
    const { value: fieldValue } = useField(props.name)

    watch(modelValue, (newValue) => {
      console.log('model value is', modelValue)
      fieldValue.value = newValue
    })
    return {
      modelValue,
    }
  },
}
</script>

<style lang="scss">
.checkbox-input {
  display: flex;
  justify-content: flex-start;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  &__label {
    font-size: 0.85rem;

    /* Custom checkbox styling */
    input[type="checkbox"] {
      /* Hide the default checkbox input */
      position: absolute;
      opacity: 0;

      /* Style the checkmark container */
      &~.checkmark {
        position: relative;
        width: 1rem;
        /* Increase the width for a larger checkbox */
        height: 1rem;
        /* Increase the height for a larger checkbox */
        background-color: #ffffff;
        border-radius: 0.25rem;
        border: 0.0625rem solid #bfbfbf;

        /* Style the checkmark indicator (hidden when unchecked) */
        &:after {
          content: "";
          position: absolute;
          display: none;
        }
      }

      /* Show the checkmark when checked */
      &:checked~.checkmark:after {
        display: block;
      }
    }

    /* Style the checkmark/indicator */
    input[type="checkbox"]~.checkmark:after {
      content: "";
      position: absolute;
      left: 0.5rem;
      /* Adjust the position of the checkmark */
      top: 0.9rem;
      /* Adjust the position of the checkmark */
      width: .5rem;
      height: 1rem;
      border: solid white;
      border-width: 0 0.25rem 0.25rem 0;
      /* Adjust the size of the checkmark */
      transform: rotate(45deg);
    }
  }
}
</style>


