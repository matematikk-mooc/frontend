<template>
  <div class="module-package">
    <div
      class="module-package__title"
      :class="{ 'module-package__title--active': isActive }"
      @click="toggleCollapse"
      @keydown.enter="toggleCollapse"
      @keydown.space="toggleCollapse"
      tabindex="0"
      :aria-expanded="!collapsed"
      :role="isLeaf ? 'button' : 'treeitem'"
    >
      <div :class="{ 'module-package__indicator--active': isActive }"></div>
      <h4>
        <span
          class="module-package__dropdown-indicator"
          :class="{ 'module-package__dropdown-indicator--collapsed': collapsed }"
        >
          <Icon name="expand_more" size="2em" />
        </span>
        <span class="title">{{ localizedLabel }}</span>
      </h4>
    </div>

    <ul
      class="module-package__child-nodes"
      :class="{ 'module-package__child-nodes--hidden': collapsed }"
      tabindex="0"
      :aria-hidden="collapsed || isLeaf"
      :role="collapsed || isLeaf ? 'presentation' : 'group'"
    >
      <li v-for="course in nodes" :key="course.id">
        <TreeView
          :type="course.type"
          :label="course.label"
          :id="course.id"
          :lang="lang"
          :url="course.url? course.url : ''"
          :nodes="course.nodes"
          :isCompleted="course.isCompleted"
          :isActive="course.isActive"
          @toggleActiveModule="toggleActiveModule"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, defineEmits, onMounted} from 'vue';
import Icon from '../icon/Icon.vue';
import TreeView from '../tree-view/TreeView.vue';
import { extractLabelForSelectedLanguage } from '../../utils/lang-utils';


const props = defineProps({
  type: String,
  label: String,
  id: Number,
  nodes: Array,
  lang: String,
  isActive: Boolean,
});

const emits = defineEmits(['toggleActiveModule']);
const collapsed = ref(true);
const selectedNode = ref(-1);

const isLeaf = computed(() => props.nodes.length === 0);
const localizedLabel =  computed(() => extractLabelForSelectedLanguage(props.label, props.lang));

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
    emits('toggleActiveModule', { moduleId: props.id, isOpen: !collapsed.value });
  }
};

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


onMounted(() => {
  // Set collapsed.value to false if isActive prop is true
  if (props.isActive) {
    collapsed.value = false;
  }
});

</script>

<style lang="scss">
@import '../../design/hide-show-effect';
@import '../../design/colors.scss';

.module-package {
  border-top: 0.0625rem solid $color-grey-400;
  position:relative;

  &__title {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding:0.5rem 1.5rem 0.5rem 1.5rem;
    height: 4.375rem;
    color: $color-black;
    font-family: Roboto;
    font-size: 1.125rem;
    vertical-align: center;
    position: relative;
    .module-package__indicator--active{
      position: absolute;
      z-index:2;
      border-radius: 0rem 0.4375rem 0.4375rem 0rem;
      background: map-get($color-palette-green, background, 500);
      width: 0.875rem;
      height: 100%;
      right: -0.875rem;
      pointer-events: none;
     @include hide-show-effect;
    }
    h4 {
      font-weight: 400;
      font-size: 1.125rem;
      line-height: normal;
      letter-spacing:0.063rem ;
      display:flex;
      align-items: center;
      white-space: normal !important;
      word-wrap: break-word !important;
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
    background: map-get($color-palette-slate, background, 200);
    padding: 0.2rem 0 0.2rem 1.5rem;
    margin:0;
    @include hide-show-effect;
    &--hidden{
      display: none;
    }
  }
}
</style>
