<template>
  <div class="modules-list">
  <h3>Moduler:</h3>
    <ul>
      <li v-for="m in modules" :key="m.id">
        {{m.name}}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  props: {
    modules: Array
  }
}
</script>

<style lang="scss">
.modules-list {
  margin-top: 1rem;
  font-family: 'Roboto';
  font-weight: 400;
  ul {
  list-style-type: none;
  padding: 0;
}

li {
  position: relative;
  padding-left: 1rem;
  margin-bottom: 0.5rem;
}

li:before {
  content: '•';
  font-size: 1.5em;
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  line-height: 0;
}
  }

</style>
