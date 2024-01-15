<template>
  <a target="_blank" :href="privacypolicylink" class="external" rel="noreferrer">
    <span>personvernvilkårene</span>
    <span class="ui-icon ui-icon-extlink ui-icon-inline" title="Lenker til en ekstern side."></span>
  </a>
</template>

<script>
export default {
  props: {
    privacypolicylink: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss">
</style>
