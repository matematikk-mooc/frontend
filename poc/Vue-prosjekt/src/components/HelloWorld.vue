<script setup lang="ts">

const {homeOrganization} = defineProps<{ homeOrganization: string }>()
</script>
<template>
<footer role="contentinfo" id="mmooc-footer" class="ic-app-footer">
    <div class="mmooc-license">
        <p id="mmoocLicense" class="public-license-text"></p>
        <p class="public-license-text">
            <span v-if="homeOrganization">
              <a  target="_blank" class="external_link"  href="https://{{homeOrganization}}">{{homeOrganization}}</a></span>
            <span v-if="!homeOrganization"></span>

        </p>
    </div>
</footer>
</template>

<style >
  .external_link{
    color: orange;
  }
</style>
