<template>
  <div class="course-license-footer">
    <div class="course-license">
      <span> Lisensenivå: Illustrasjoner og filmer utviklet i regi av prosjektet: </span>
        <Link url="http://creativecommons.org/licenses/by-nc-nd/4.0/"><span>CC BY-NC-ND 4.0 <Icon name="open_in_new"></Icon></span></Link>
    </div>
    <div class="course-license">
     <span>
        Annet innhold utviklet i regi av prosjektet:
      </span> <Link  url="http://creativecommons.org/licenses/by-nc-sa/4.0"><span> CC BY-NY-SA 4.0 <Icon name="open_in_new"></Icon></span></Link>
    </div>
  </div>
</template>
<script setup>
import Icon from '../icon/Icon.vue'
import Link from '../link/Link.vue'

</script>
<style lang="scss">
.course-license-footer{
  width: 100%;
  height: 3.125rem;
  display:flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap:wrap;
  .course-license{
    display: inline-block;
    max-width: 48%;
    padding: 0 0.5rem;
  }
}
</style>
