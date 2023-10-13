<template>
  <div class="tree-node" :class="{ 'tree-node--active': active, 'tree-node--collapsed': !isLeaf && collapsed }">
    <span class="tree-node__label" @click="toggleCollapse">
      <span class="label-text">
         <span v-if="!isLeaf" class="dropdown-indicator" :class="{ 'dropdown-indicator--collapsed': collapsed }"><Icon name="expand_more" size="1.25em" /></span>
        {{ label }}
      </span>
    </span>
    <ul class="tree-node__child-nodes" v-if="!collapsed && !isLeaf">
      <li v-for="node in nodes" :key="node.label">
        <TreeView :label="node.label" :nodes="node.nodes" />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, defineProps, computed } from 'vue';
import Icon from '../icon/Icon.vue'
const { nodes, label } = defineProps(['nodes', 'label']);
const active = ref(false);
const collapsed = ref(true); // Set to true initially

const isLeaf = computed(() => nodes.length === 0);

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
  }
};
</script>

<style lang="scss">
.tree-node {
  color: #000;
  font-family: Roboto;
  font-size: 1rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  overflow: hidden;

  &__label {
    display: flex;
    width: 19.5rem;
    height: 1.5rem;
    padding: 0.125rem 0.5rem 0.125rem 0.5rem;
    align-items: flex-start;
    gap: 0.75rem;
    cursor: pointer;

    .label-text {
      flex: 1;
      margin-right: 0.75rem;
    }

    .dropdown-indicator {
      display: inline-block;
      font-size: 1em;
      transition: transform 0.3s;
      vertical-align: middle;
      
    }

    .dropdown-indicator--collapsed {
     transform: rotate(-90deg);
    }
  }

  &__child-nodes {
    list-style-type: none;
    padding:none;
    padding-left: 0.5rem;
    margin: 0.2rem 0 0.5rem 1.5rem;
  }

  &--active .tree-node__label {
    background-color: #007bff;
    color: #fff;
    border-bottom: 1px solid #0052cc;
  }

  &--collapsed .tree-node__child-nodes {
    display: none;
  }
}
</style>






