<template>
  <span :class="iconClasses" v-html="iconContent"></span>
</template>

<script>
import { computed } from 'vue'
import { IconPaths } from './iconPaths'

export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      type: [String, Number],
      default: '1em',
    },
    color: {
      type: String,
      default: 'currentColor',
    },
  },
  setup(props) {
    const iconPath = computed(() => {
      const selected = IconPaths[props.name]
      if (selected) {
        return selected
      }
    })

    const iconClasses = computed(() => {
      return [
        'material-icon',
        `custom-size-${typeof props.size === 'string' && props.size.includes('em') ? props.size : '1em'}`,
      ]
    })

    const iconContent = computed(() => {
      return `<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="${props.size}" viewBox="0 -960 960 960" width="${props.size}"><path d="${IconPaths[props.name]}"/></svg>`
    })

    return {
      iconClasses,
      iconContent,
      iconPath
    }
  },
}
</script>

<style lang="scss">
.material-icon {
  color: inherit;
  display: flex;

  &__icon {
    @each $size in (1em, 2em, 3em) {
      .custom-size-#{$size} {
        font-size: #{$size};
      }
    }
  }
}
</style>
