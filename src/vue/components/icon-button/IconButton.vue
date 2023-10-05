<template>
 <button class="icon-button">
<Icon name="close"></Icon>
 </button>
</template>
<script>
import Icon from "../icon/Icon.vue"
export default {
  components: {
    Icon,
  },
  setup() {},
}
</script>
<style lang="scss">
.icon-button{
  background-color: red;
  color: blue;
  font-size: 1rem;
}
</style>
