import { defineComponent } from "vue";
import CourseModules from "./CourseModules.vue"
import { tree_data_2_levels, tree_data_3_levels, addPropertiesToTreeData } from "./test-data";

export default {
  title: "Components/CourseModules",
};
const Template = (args) =>
  defineComponent({
    components: { CourseModules },
    setup() {
      return { args };
    },
    template: '<CourseModules v-bind="args" />',
  });

export const TwoLevelTree = Template.bind({});
TwoLevelTree.args = {
  nodes: addPropertiesToTreeData(tree_data_2_levels),
};

export const ThreeLevelTree = Template.bind({});
ThreeLevelTree.args = {
  nodes: addPropertiesToTreeData(tree_data_3_levels),
};
