<template>
  <div class="modules-progress-indicator-container">
    <h5>Progresjon</h5>
    <div class="progress-indicator">
      <div class="progress-bar" :style="{ width: percentageCompleted + '%' }" :aria-label="modulesProgressionData.completedPages + ' av ' + modulesProgressionData.totalPages + 'er gjennomført.'"></div>
    </div>
    <div class="progress-label">{{ modulesProgressionData.completedModules }} av {{ modulesProgressionData.totalModules }} moduler gjennomført </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
  props: {
    modulesProgressionData: Object,
  },
  setup(props) {
    const state = reactive({
      modulesProgressionData: props.modulesProgressionData,
      percentageCompleted: computed(() => {
        return Math.round((state.modulesProgressionData.completedPages / state.modulesProgressionData.totalPages) * 100);
      }),
    });

    // Expose reactive properties as plain refs for template access
    return {
      ...state,
    };
  },
};
</script>


<style lang="scss">
@import "../../design/colors.scss";
.modules-progress-indicator-container{
  display:flex;
  flex-direction: column;
  width: 100%;
  padding-left: 1.5rem;
  box-sizing: border-box;
  h5{
    font-family: Inter;
    font-weight: 500;
  }

.progress-indicator {
  width: 100%;
  border: 0.063rem solid #99ABC5;
  border-radius: 0.25rem;
  background-color: #ECEFF2;
  overflow: hidden;
  margin: 0.625rem 0;
  height: 0.625rem;
  position: relative;

  .progress-bar {
    position:absolute;
    left:0;
    top:0;
    background-color: map-get($color-palette-green, background, 500);
    height: 0.625rem;
  }

}
.progress-label {
   font-size: 0.875rem;
   font-family: 'Inter';
   font-weight: 400;
  }
}

</style>
