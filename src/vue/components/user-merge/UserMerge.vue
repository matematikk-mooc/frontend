<template>
  <a :href="linkUrl" class="edit_settings_link btn button-sidebar-wide">
    <i class="icon-edit"></i> Slå sammen brukere
  </a>
</template>

<script>
export default {
  props: {
    userId: {
      type: String,
      required: true
    },
    userMergeLtiToolId: {
      type: String,
      required: true
    }
  },
  computed: {
    linkUrl() {
      return `/users/${this.userId}/external_tools/${this.userMergeLtiToolId}?design=udir`;
    }
  }
};
</script>

<style lang="scss">
/* Add any additional styling here if needed */
</style>
