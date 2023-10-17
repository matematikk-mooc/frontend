<template>
  <div class="module-package">
    <div :class="{ 'module-package--active': isActive }"></div>
    <div  class="module-package__title" :class="{ 'module-package__title--active': isActive }" @click="toggleCollapse">
      <h4>
          <span class="module-package__dropdown-indicator" :class="{ 'module-package__dropdown-indicator--collapsed': collapsed }">
          <Icon name="expand_more" size="2em" />
          </span>
          <span class="title">
              {{ label }}
          </span>
      </h4>
    </div>
    
    <ul class="module-package__child-nodes" v-if="!collapsed && !isLeaf">
      <li v-for="course in nodes" :key="course.label">
        <TreeView  
          :type="course.type"
          :label="course.label"
          :nodes="course.nodes"
          :isCompleted="course.isCompleted"
          :isActive="isActive && course.label === selectedNode"
          @toggleActive="toggleActive(course.label)"
        /> 
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits } from 'vue';
import Icon from '../icon/Icon.vue';
import TreeView from '../tree-view/TreeView.vue';

const props = defineProps({
  type: String,
  label: String,
  nodes: Array,
  isActive: Boolean,
});

const emits = defineEmits(['toggleActiveModule']);

const collapsed = ref(true);
const selectedNode = ref(null);

const isLeaf = computed(() => props.nodes.length === 0);

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
  }
  console.log('emitting value', props.label)
  emits('toggleActiveModule', props.label);
};

const toggleActive = (nodeLabel) => {
  selectedNode.value = nodeLabel;
};
</script>

<style lang="scss">
@import '../../design/hide-show-effect';

.module-package {
  border-top: 1px solid #E6E6E6;
  position:relative;
  &--active{
    position: absolute;
    z-index:10;
    border-radius: 0rem 0.4375rem 0.4375rem 0rem;
    background: #3B7858;
    width: 0.875rem;
    height: 4.375rem;
    right: -0.875rem;
     @include hide-show-effect;
  }

  &__title {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding: 0.75rem 0 0.75rem 0;
    height: 4.375rem;
    color: #000;
    font-family: Roboto;
    font-size: 1.125rem;
    margin-left: 0.25rem;
    vertical-align: center;

    h4 {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: normal;
      letter-spacing:0.063rem ;
      padding: 0.25rem 0 0.25rem 0;
      display:flex;
      align-items: center;
    }

    &--active {
      h4 {
        font-weight: 700;
      }
    }
  }

  .module-package__dropdown-indicator {
    display: inline-block;
    transition: transform 0.3s;
    font-size: 1.125rem;

    &--collapsed {
      transform: rotate(-90deg);
    }
  }

  &__child-nodes {
    list-style-type: none;
    background: #ECEFF2;
    padding: 0.2rem 0 0.2rem 0.5rem;
    margin:0;
    @include hide-show-effect;
  }
}
</style>





