import TreeView from './TreeView.vue'; // Adjust the path to your component
import { defineComponent } from 'vue';

const treeData = [
  {
    label: 'box1',
    nodes: [
      {
        label: 'box_1.2',
        nodes: [{ label: 'box_1.2.1', nodes: [] }, { label: 'box_1.2.2', nodes: [] }, { label: 'box_1.2.3', nodes: [] }, { label: 'box_1.2.4', nodes: [] }]
      }
    ]
  }, {
    label: 'box2',
    nodes: [{ label: 'box_2.2.1', nodes: [] }, { label: 'box_2.2.2', nodes: [] }, { label: 'box_2.2.3', nodes: [] }, { label: 'box_2.2.4', nodes: [] }]
  }, {
    label: 'box3',
    nodes: [{ label: 'box_3.2.1', nodes: [] }, { label: 'box_3.2.2', nodes: [] }, { label: 'box_3.2.3', nodes: [] }, { label: 'box_1.2.4', nodes: [] }]
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
      nodes: [
        { label: 'Grandchild 1.1', nodes: [] },
        { label: 'Grandchild 1.2', nodes: [] },
      ],
    },
    { label: 'Child 2', nodes: [] },
  ],
};







