<template>
  <div class="tree-node">
    {{ label }}
    <TreeView v-for="node in nodes" :label="node.label" :nodes="node.nodes" :key="node.label" />
  </div>
</template>

<script setup >

const props = defineProps({
  label: String,
  nodes: Array,
});
</script>
<style lang="scss">
.tree-node{
  display:block;
  color: blue;
  width: 200px;
  min-height: 40px;
  border: 2px solid green;
}
</style>

