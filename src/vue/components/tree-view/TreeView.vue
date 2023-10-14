<template>
  <div class="tree-node" :class="{ 'tree-node--collapsed': !isLeaf && collapsed, 'tree-node--active': isActive }">
    <span class="tree-node__label" @click="toggleCollapse">
      <span class="label-text">
        <span v-if="!isLeaf" class="dropdown-indicator" :class="{ 'dropdown-indicator--collapsed': collapsed }">
          <Icon name="expand_more" size="1.25em" />
        </span>
        <Icon class="tree-node__page-icon" v-if="type === 'page'" name="description" size="1em"></Icon>
        <Icon class="tree-node__done-icon" v-if="type === 'page' && isCompleted" name="check_circle_filled" size="1em"></Icon>
        <template v-if="type === 'page'">
          <a :href="'url'">{{ label }}</a>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </span>
    </span>
    <ul class="tree-node__child-nodes" v-if="!collapsed && !isLeaf">
      <li
        v-for="node in nodes"
        :key="node.label"
        class="tree-node__child-nodes__node"
      >
        <transition name="fade" mode="out-in">
          <TreeView
            :type="node.type"
            :label="node.label"
            :nodes="node.nodes"
            :isCompleted="node.isCompleted"
            :isActive="false"
            @toggle-active="toggleActive(node.label)"
          />
        </transition>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import Icon from '../icon/Icon.vue';

const props = defineProps({
  type: String,
  label: String,
  nodes: Array,
  isCompleted: Boolean,
  isActive: Boolean,
});

const emits = defineEmits(['toggleActive']);

const active = ref(false);
const collapsed = ref(true);

const isLeaf = computed(() => props.nodes.length === 0);

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
  }
  emits('toggleActive', props.label);
};

const toggleActive = (nodeLabel) => {
  emits('toggleActive', nodeLabel);
};
</script>

<style lang="scss">
@import '../../design/hide-show-effect';
.tree-node {
  color: #000;
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;

  &--active {
    color: #000;
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__page-icon {
    display: inline-block;
    font-size: 1em;
    vertical-align: middle;
  }

  &__done-icon {
    color: #3B7858;
    display: inline-block;
    font-size: 1em;
    vertical-align: middle;
  }

  &__label {
    display: flex;
    font-size: 0.875rem;
    width: 100%;
    height: 1.5rem;
    padding: 0.125rem 0.5rem;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;

    a {
      text-decoration: none;
      color: inherit;
    }
  }

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

  &__child-nodes {
    list-style-type: none;
    padding: 0;
    margin-bottom: 0.125rem;
    padding: 0.2rem 0 0.5rem 0.5rem;
    @include hide-show-effect
  }
}
</style>








