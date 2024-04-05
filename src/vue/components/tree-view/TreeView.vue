<template>
  <div
    class="tree-node"
    :class="{'tree-node__leaf': isLeaf, 'tree-node--collapsed': !isLeaf && collapsed, 'tree-node__leaf--active': isActive && isLeaf, 'tree-node--active': isActive && !isLeaf}"
    :aria-hidden="collapsed || isLeaf"
    :tabIndex="isLeaf ? -1 : 0"
    :role=" isLeaf ? 'presentation' : 'group'"
    @click="toggleCollapse"
    @keydown.enter="toggleCollapse"
    @keydown.space="toggleCollapse"
  >
    <span class="tree-node__label" tabIndex="-1">
      <div class="tree-node__label__text">
        <span v-if="!isLeaf" class="dropdown-indicator" :class="{ 'dropdown-indicator--collapsed': collapsed }">
          <Icon name="expand_more" size="2em" />
        </span>
        <Icon class="tree-node__label__text__done-icon" v-if="(type === 'page' || type === 'discussion' || type === 'quiz') && isCompleted" name="check_circle_filled" size="0.8em"></Icon>
        <Icon class="tree-node__label__text__icon" v-if="type === 'page'  && isActivity()" name="edit_document" size="0.8em"></Icon>
        <Icon class="tree-node__label__text__icon" v-else-if="type === 'page' && isVideo()" name="video_camera" size="0.8em"></Icon>
        <Icon class="tree-node__label__text__icon" v-else-if="type === 'page'" name="article" size="0.8em"></Icon>
        <Icon class="tree-node__label__text__icon" v-else-if="type === 'discussion'" name="chat" size="0.8em"></Icon>
        <Icon class="tree-node__label__text__icon" v-else-if="type === 'quiz'" name="edit_document" size="0.8em"></Icon>
        <template v-if="type === 'page' || type === 'discussion' || type === 'quiz'">
          <a @click="setActivePageAndModule(url)">{{ localizedLabel }}</a>
        </template>
        <template v-else>
          <div class="dropdown-title"> {{ localizedLabel }}</div>
        </template>
      </div>
    </span>
    <ul class="tree-node__child-nodes" v-if="!collapsed && !isLeaf">
      <li v-for="node in nodes" :key="node.id" class="tree-node__child-nodes__node">
        <TreeView
          :type="node.type"
          :label="extractLabelForSelectedLanguage(node.label, getSelectedLanguage())"
          :id="node.id"
          :nodes="node.nodes"
          :lang=" lang"
          :url = "node.url? node.url : ''"
          :isCompleted="node.isCompleted"
          :isActive="node.isActive"
        />
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, defineProps, onMounted } from 'vue';
import Icon from '../icon/Icon.vue'
import { getSelectedLanguage, extractLabelForSelectedLanguage } from '../../utils/lang-utils';
const props = defineProps({
  type: String,
  label: String,
  lang: String,
  url: String,
  id: Number,
  nodes: Array,
  isCompleted: Boolean,
  isActive: Boolean,
});

import { useStore } from 'vuex'
const store = useStore()
const setActivePageAndModule = (url) => {
    store.dispatch('setActivePageAndModule', url)
    .then(() => {
        window.location = url;
    })
    .catch(error => {
        console.error('Error:', error);
    });
};

const collapsed = ref(true);
const initialIsActive = ref(props.isActive);
const isLeaf = computed(() => props.nodes.length === 0);

const toggleCollapse = () => {
  if (!isLeaf.value) {
    collapsed.value = !collapsed.value;
  }
  if (isLeaf.value) {
    setActivePageAndModule(props.url)
  }
};

if (initialIsActive.value && !isLeaf.value) {
  collapsed.value = false;
}

const localizedLabel = computed(() => extractLabelForSelectedLanguage(props.label, props.lang));


    onMounted(() => {
      // Set collapsed.value to false if isActive prop is true
      if (props.isActive) {
        collapsed.value = false;
      }




});

const isVideo = function isVideo() {
  return props.label.toLowerCase().includes('video');
};

const isActivity = function isActivity() {
  return props.label.toLowerCase().includes('aktivitet');
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
  margin-bottom: .5rem;
  box-sizing: border-box;
  padding-right: 0.5rem;

  &--active {
    color: $color-black;
    font-family: Roboto;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
  }

  &__leaf {
    width:100%;
    font-weight:400;
    padding-left: 1.5rem;
    margin: 0.2rem 0 0.2rem 0;

    &--active {
      background: $color-white;
      font-weight: 700;
    }

    &:hover {
      background:$color-white;
    }
  }

  &__label {
    position: relative;
    display: flex;
    width: 100%;
    min-height: 2rem;
    padding: 0.2rem 0.2rem 0.2rem 0.5rem;
    align-items: center;
    justify-content: flex-start;
    gap: 0.75rem;
    cursor: pointer;

    a {
      text-decoration: none;
      color: inherit;
      width: 100%;
    }

    &__text {
      font-size: 1rem;
      position: relative;
      box-sizing: border-box;
      display:flex;
      justify-content: flex-start;
      align-items: center;
      margin-right: 0.5rem;
      .dropdown-title{
        font-weight: 500;
      }

      &__done-icon {
        position: absolute;
        left: -1.7rem;
        color: map-get($color-palette-green, background, 500);
        font-size: 1.5rem;
      }

      &__icon {
        position: relative;
        padding-right: 0.5rem;
        color: $color-black;
        font-size: 1.5rem;
      }

      .dropdown-indicator {
        position: relative;
        font-size: 1rem;
        width: 1.75rem;
        height: 1.75rem;
        transition: transform 0.3s;
      }

      .dropdown-indicator--collapsed {
        transform: rotate(-90deg);
        top: 0.25rem;
      }
  }
}

  &__child-nodes {
    list-style-type: none;
    margin-bottom: 0.125rem;
    margin-left: 0;
    @include hide-show-effect;
  }
   .tree-node__child-nodes__node{
    box-sizing: border-box;
   }

  .tree-node__child-nodes:focus > ul,
  .tree-node__child-nodes:hover > ul {
    visibility: visible;
    opacity: 1;
    display: block;
    box-sizing: border-box;
  }
}
.tree-node__label__text{
  span, a{
    word-break: break-word;
  }

}
</style>
