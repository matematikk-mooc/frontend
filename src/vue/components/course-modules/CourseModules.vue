<template>
  <div class="courses">
    <div class="courses__header-section">
      <h3 class="courses__header-section__header">
        <Icon name="format_list_numbered" size="1em" />
        <span class="courses__header-section__header__title">Moduler</span>
      </h3>
    </div>
    <div class="courses__treeview">
      <div class="courses__treeview__item" v-for="(module, index) in treestructure" :key="index">
       <CourseModule
          :type="module.type"
          :label="module.label"
          :nodes="module.nodes"
          :isActive="isActiveModule(module.label)"
          @toggleActiveModule="toggleActiveModule(module.label)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Icon from '../icon/Icon.vue';
import CourseModule from './CourseModule.vue';

const treeData = [
  {
    label: 'box1',
    nodes: [
      {
        label: 'box_1.2',
        type:'module',
        nodes: [
          {
            label: 'box_1.2.1', type:'page',  isCompleted: true ,nodes: [{
            label: 'box_1.2.2.1',type:'page',isCompleted: true , nodes: []
            }
            
          ] },
          { label: 'box_1.2.2',type:'page', nodes: [] },
          { label: 'box_1.2.3',type:'page', nodes: [] },
          { label: 'box_1.2.4', type:'page',nodes: [] }
        ]
      }
    ]
  },
  {
    label: 'box2',
    type:'module',
    nodes: [
      { label: 'box_2.2.1',type:'page', nodes: [] },
      { label: 'box_2.2.2',type:'page', nodes: [] },
      { label: 'box_2.2.3',type:'page', nodes: [] },
      { label: 'box_2.2.4',type:'page', nodes: [] }
    ]
  },
  {
    label: 'box3',
    type:'module',
    nodes: [
      { label: 'box_3.2.1',type:'page', nodes: [] },
      { label: 'box_3.2.2', type:'page',nodes: [] },
      { label: 'box_3.2.3',type:'page', nodes: [] },
      { label: 'box_3.2.4',type:'page', nodes: [] }
    ]
  }
]

const treestructure = ref(treeData);

const selectedNode = ref(null);

const toggleActiveModule = (nodeLabel) => {
  if (selectedNode.value === nodeLabel) {
    selectedNode.value = null; 
  } else {
    selectedNode.value = nodeLabel; 
  }
};


const isActiveModule = (nodeLabel) => {
  return nodeLabel === selectedNode.value;
};

</script>


<style lang="scss">
@import '../../design/box-shadow';
.courses {
  width: 100%;
  max-width: 17rem;
  border-radius: 1.6875rem 0rem 0rem 1.6875rem;
  border: 1px solid #E6E6E6; 
  background: #FFF;
  margin: 0 1rem 0 1rem;
  padding: 0 0 0.75rem 0;
  @include box-shadow(medium); 

  &__header-section {
    color: black;
    word-wrap: break-word;
    border-bottom: 1px solid #E6E6E6; /* Adjusted border thickness */
    padding: 10px 0; /* Added padding for spacing */
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
