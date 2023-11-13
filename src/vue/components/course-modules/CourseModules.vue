<template>
  <div class="courses">
    <div class="courses__header-section">
      <h3 tabindex="0" class="courses__header-section__header" @keydown.enter="toggleActiveModule(null)">
        <Icon name="format_list_numbered" size="1em" />
        <span class="courses__header-section__header__title">Moduler</span>
      </h3>
    </div>
    <div class="courses__treeview">
      <div
        class="courses__treeview__item"
        v-for="(module) in treestructure"
        :key="module.id"
      >
        <CourseModule
          :type="module.type"
          :label="extractLabelForSelectedLanguage(module.label,getSelectedLanguage())"
          :id="module.id"
          :nodes="module.nodes"
          :isActive="module.isActive"
          @toggleActiveModule="toggleActiveModule"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref } from 'vue';
import Icon from '../icon/Icon.vue';
import CourseModule from './CourseModule.vue';
import { extractLabelForSelectedLanguage, getSelectedLanguage } from '../../utils/lang-utils';


const props = defineProps({
  nodes: Array,
});

const treestructure = props.nodes; // Assign nodes prop to treestructure

const selectedNode = ref(-1);


const toggleActiveModule = ({moduleId, isOpen}) => {
  if (selectedNode.value === moduleId) {
    if (isOpen) {
      selectedNode.value = moduleId;
    } else {
      selectedNode.value = -1;
  }
  } else {
    if (isOpen) {
      selectedNode.value = moduleId;
    } else {
      selectedNode.value = -1;
    }
  }

};
  
const isActiveModule = (nodeId) => {
  return nodeId === selectedNode.value;
};
</script>


<style lang="scss">
@import '../../design/box-shadow';
@import '../../design/colors.scss';
.courses {
  width: 100%;
  max-width: 35rem;
  min-width: 30rem;
  border-radius: 1.6875rem 0rem 0rem 1.6875rem;
  border: 0.0625rem solid $color-grey-400; 
  background: $color-white;
  margin: 0 1rem 0 1rem;
  padding: 0 0 0.75rem 0;
  @include box-shadow(medium); 

  &__header-section {
    color: black;
    word-wrap: break-word;
    border-bottom: 0.125rem solid $color-grey-400; 
    padding: 1.75rem 1rem 0.625rem 1.5rem;
    &__header{
      display:flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 1.25rem;
      font-family: Roboto;
      font-weight: 600;
      margin-left: 1rem;
      &__title{
        margin-left:1.5rem;
        margin-top: -0.5rem;
      }
    }
   
  }

  &__treeview {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding-bottom:1rem;
  }
}
</style>
