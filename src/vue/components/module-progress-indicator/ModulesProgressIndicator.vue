<template>
  <div class="modules-progress-indicator-container">
    <h5>Progresjon</h5>
    <div class="progression" v-if="percentageCompleted !== 100">
      <div class="progress-indicator" >
        <div class="progress-bar" :style="{ width: percentageCompleted + '%' }" :aria-label="modulesProgressionData.completedPages + ' av ' + modulesProgressionData.totalPages + 'er gjennomført.'">
        </div>
      </div>
      <div class="progress-label">
        <span>
          {{ modulesProgressionData.completedPages }} av {{ modulesProgressionData.totalPages }} krav er gjennomført.
        </span>
      </div>
    </div>
    <div class="progression-completed" v-else>
      <span class="progression-completed-icon">
        <svg xmlns="http://www.w3.org/2000/svg" fill="#3b7858" height="2em" viewBox="0 -960 960 960" width="2em"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Z"></path></svg>
      </span>
      <p class="progression-completed-text">
        Gratulerer, kompetansepakken er fullført!
      </p>
    </div>
  </div>
</template>

<script>
import { reactive, computed } from 'vue';

export default {
    computed: {
    allRequirementsCompleted() {
      return this.requirementsCompleted >= this.requirementsTotal;
    },
    percentageValue() {
      if (this.requirementsTotal == 0) return 100;
      return Math.floor((this.requirementsCompleted / this.requirementsTotal) * 100);
    }
  },
  props: {
    modulesProgressionData: Object,
    requirementsCompleted: Number,
    requirementsTotal: Number,
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
    font-family: Montserrat;
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
    height: 1rem;
  }

}
.progress-label {
  display: flex;
  flex-direction: column;
   font-size: 0.875rem;
   font-family: 'Roboto';
   font-weight: 400;
  }
}

.progression-completed {
  display: flex;
  flex-direction: row;
  .progression-completed-icon {
    margin-right: 6px;
    align-self: anchor-center;
  }
}

</style>
