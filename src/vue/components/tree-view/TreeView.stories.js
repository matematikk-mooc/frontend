import TreeView from './TreeView.vue'; // Adjust the path to your component
import { defineComponent } from 'vue';

const treeData = [
  {
    label: 'box1',
    type:'module',
    nodes: [
      {
        label: 'box_1.2',
        nodes: [{ label: 'box_1.2.1', nodes: [] }, { label: 'box_1.2.2', nodes: [] }, { label: 'box_1.2.3', nodes: [] }, { label: 'box_1.2.4', nodes: [] }]
      }
    ]
  }, {
    
    label: 'box2',
    type:'module',
    nodes: [{ label: 'box_2.2.1',isCompleted:true, type:'page', nodes: [] }, { label: 'box_2.2.2',type:'page',isCompleted:false, nodes: [] }, { label: 'box_2.2.3',type:'page',isCompleted:true, nodes: [] }, { label: 'box_2.2.4',isCompleted:false,type:'page', nodes: [] }]
  }, {
    label: 'box3',
    type:'module',
    nodes: [{ label: 'box_3.2.1', isCompleted:true, type:'page',nodes: [] }, { label: 'box_3.2.2',isCompleted:false, nodes: [] }, { label: 'box_3.2.3', nodes: [] }, { label: 'box_1.2.4',type:'page', nodes: [] }]
  }
]


export default {
  title: "Components/TreeView",
  component: TreeView,
};

const Template = (args) =>
  defineComponent({
    components: { TreeView },
    setup() {
      return { args };
    },
    template: '<TreeView v-bind="args" />',
  });

export const Basic = Template.bind({});
Basic.args = {
  label: 'Root Node',
  nodes: [
    {
      label: 'Child 1',
      type: 'module',
      nodes: [
        { label: 'Grandchild 1.1', isCompleted:true,type: 'page', nodes: [] },
        { label: 'Grandchild 1.2',isCompleted:true,type: 'page', nodes: [] },
      ],
    },
    { label: 'Child 2', isCompleted:true,type: 'page',nodes: [] },
  ],
};







