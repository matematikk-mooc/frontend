<template>
  <div class="form-field">
    <label :for="name" class="form-field__label">{{ label }}</label>
    <div :class="{
      'form-field__input': true,
      'form-field__input--error': hasError,
    }">
                          <div class="error-icon" v-if="hasError">
                              <Icon :name="'error'" :size="'1em'"/>
                          </div>
                          <input autocomplete="off" :id="name" :type="type" :class="{ 'input-error': hasError }" v-model="modelValue"
                                    :placeholder="placeHolder" @input="$emit('update:modelValue', $event)" />
                      </div>
        <div class="form-field__error" v-if="hasError">{{ errors[0] }}</div>
  </div>
</template>

<script>
import { ref, watch } from "vue"
import { useField } from "vee-validate"
import Icon from "../icon/Icon.vue"

export default {
  props: {
    name: String,
    label: String,
    placeHolder: String,
    type: String,
    rules: Object,
  },
  components: {
    Icon
  },
  setup(props, { emit }) {
    const modelValue = ref("")
    const { value: fieldValue, errors } = useField(props.name, props.rules)

    watch(modelValue, (newValue) => {
      fieldValue.value = newValue
    })

    const hasError = ref(false)


    watch(errors, (newErrors) => {
      hasError.value = newErrors.length > 0
    })

    return {
      modelValue,
      errors,
      hasError,
    }
  },
}
</script>

<style lang="scss">
@import "../../design/colors.scss";
@import "../../design/semantic-colors.scss";
@import "../../design/box-shadow.scss";
@import "../../design/shake-effect.scss";

.form-field {
  width: 100%;
  font-family: Roboto;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;

  &__label {
    box-sizing: border-box;
    color: $color-black;
    cursor: default;
    display: inline-block;
    font-size: 0.85rem;
    font-weight: 500;
    padding-bottom: 0.5rem;
  }

  &__input {
    border-top-left-radius: 0.25rem;
    border-top-right-radius: 0.25rem;
    border-bottom: 3px solid $color-black;
    background-color: $color-grey-100;
    height: 2.5rem;
    width: 100%;
    display: flex;
    justify-content: flex-start;

    &:hover {
      background-color: map-get($color-palette-azur, background, 300);
    }

    &:focus-within {
      border-color: map-get($color-palette-slate, background, 400);
      @include box-shadow('small');
      background-color: map-get($color-palette-azur, background, 300);
    }

    &:focus:not(:focus-visible) {
      outline: none;
    }

    &--error {
      border-bottom: 3px solid map-get($semantic-colors, error, foreground);

      .error-icon {
        color: map-get($semantic-colors, error, foreground);
        font-size: 1.5rem;
        display: flex;
        place-content: center;
        margin-top: 0.25rem;
        margin-left: 0.25rem;
        @include shake-effect();
      }
    }

    input {
      box-sizing: border-box;
      font-family: "Roboto";
      border-top-left-radius: 0.25rem;
      border-top-right-radius: 0.25rem;
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      width: 100%;
      flex: 1 1 0%;
      height: 100%;
      background-color: inherit;
      padding: 0 1rem;
      color: $color-grey-900;
      outline: none;
      border: none;
    }  
  }

  &__error {
    margin-top: 0.25rem;
    color: map-get($semantic-colors, error, foreground);
    background: map-get($semantic-colors, error, background);
    font-size: 0.875rem;
    padding: 0.025rem;
  }
}
</style>
