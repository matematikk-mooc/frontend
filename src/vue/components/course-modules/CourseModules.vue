<template>
  <div class="courses">
    <div class="courses__header-section">
      <h3 class="courses__header-section__header"><Icon name="format_list_numbered" size="1em" /><span class="courses__header-section__header__title">Moduler</span></h3>
    </div>
    <div class="courses__treeview">
      <div class="courses__treeview___item"  v-for="(module, index) in treestructure"
        :key="index">
     <TreeView
       
        :label="module.label"
        :nodes="module.nodes"
      />
      </div>
 
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import TreeView from '../tree-view/TreeView.vue'
import Icon from '../icon/Icon.vue'

const treeData = [
  {
    label: 'box1',
    nodes: [
      {
        label: 'box_1.2',
        nodes: [
          {
            label: 'box_1.2.1', nodes: [{
            label: 'box_1.2.2.1', nodes: []
            }
            
          ] },
          { label: 'box_1.2.2', nodes: [] },
          { label: 'box_1.2.3', nodes: [] },
          { label: 'box_1.2.4', nodes: [] }
        ]
      }
    ]
  },
  {
    label: 'box2',
    nodes: [
      { label: 'box_2.2.1', nodes: [] },
      { label: 'box_2.2.2', nodes: [] },
      { label: 'box_2.2.3', nodes: [] },
      { label: 'box_2.2.4', nodes: [] }
    ]
  },
  {
    label: 'box3',
    nodes: [
      { label: 'box_3.2.1', nodes: [] },
      { label: 'box_3.2.2', nodes: [] },
      { label: 'box_3.2.3', nodes: [] },
      { label: 'box_3.2.4', nodes: [] }
    ]
  }
]

const treestructure = ref(treeData)
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
    &___item{
       border-top: 1px solid #E6E6E6; 
    }
  }
}
</style>
