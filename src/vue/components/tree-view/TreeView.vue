<template>
  <div
    class="tree-node"
    :class="{'tree-node__leaf': isLeaf, 'tree-node--collapsed': !isLeaf && collapsed, 'tree-node--active': isActive }"
    :tabindex=" isLeaf ? -1 : 0"
    @keydown.enter="toggleCollapse"
    @keydown.space="toggleCollapse"
  >
    <span class="tree-node__label" @click="toggleCollapse" @keydown.enter="toggleCollapse" @keydown.space="toggleCollapse">
      <span class="tree-node__label__text">
        <span v-if="!isLeaf" class="dropdown-indicator" :class="{ 'dropdown-indicator--collapsed': collapsed }">
          <Icon name="expand_more" size="1.25em" />
        </span>
        <Icon class="tree-node__label__text__done-icon" v-if="type === 'page' && isCompleted" name="check_circle_filled" size="1.25em"></Icon>
        <Icon class="tree-node__label__text__page-icon" v-if="type === 'page'" name="description" size="1.25em"></Icon>
        <template v-if="type === 'page'">
          <a :href="'url'">{{ label }}</a>
        </template>
        <template v-else>
          {{ label }}
        </template>
      </span>
    </span>
    <ul class="tree-node__child-nodes" v-if="!collapsed && !isLeaf">
      <li v-for="node in nodes" :key="node.label" class="tree-node__child-nodes__node">
        <TreeView
          :type="node.type"
          :label="node.label"
          :nodes="node.nodes"
          :isCompleted="node.isCompleted"
          :isActive="false"
          @toggleActiveModule="toggleActiveModule"
        />
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

const collapsed = ref(true);

const isLeaf = computed(() => props.nodes.length === 0);

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
    emits('toggleActiveModule', { module: props.label, isOpen: !collapsed.value });
  }
  if (isLeaf.value) {
      window.location.href = 'your_url_here';
  }
};

const toggleActiveModule = ({module, isOpen}) => {
  if (selectedNode.value === module) {
    if (isOpen) {
      selectedNode.value = module;
    } else {
      selectedNode.value = null;
  }
  } else {
    if (isOpen) {
      selectedNode.value = module;
    } else {
      selectedNode.value = null;
    }
  }

};
</script>

<style lang="scss">
@import '../../design/colors';
@import '../../design/hide-show-effect';
.tree-node {
  color: $color-black;
  font-family: Roboto;
  font-size: 0.875rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 0.5rem;
  padding-left: 1rem;
  letter-spacing: 0.063rem;

  &--active {
    color: $color-black;
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__leaf {
    margin: 0.5rem 0 0.5rem 1.5rem;
    border-radius: 1.0652rem 0 0 1.0652rem;
    font-weight: 400;

    &--active {
      background: $color-white;
      font-weight: 700;
    }

    &:hover {
      background:$color-white;
    }
  }

  &__label {
    display: flex;
    width: 100%;
    height: 2rem;
    padding: 0.125rem 0 0.125rem 0.5rem;
    align-items: center;
    gap: 0.75rem;
    cursor: pointer;

    a {
      text-decoration: none;
      color: inherit;
    }

    &__text {
      font-size: 0.875rem;
      position: relative;

      &__page-icon {
        display: inline-block;
        font-size: 1em;
        margin-right: 0.125rem;
        vertical-align: middle; 
      }

      &__done-icon {
        position: absolute;
        left: -1.25rem;
        color: map-get($color-palette-green, backround, 500);
        display: inline-block;
        font-size: 1em;
        vertical-align: middle;
      }
    }
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
    padding: 0.2rem 0 0.5rem 0.2rem;

    @include hide-show-effect;
  }

  .tree-node__child-nodes:focus > ul,
  .tree-node__child-nodes:hover > ul {
    visibility: visible;
    opacity: 1;
    display: block;
  }
}
</style>








