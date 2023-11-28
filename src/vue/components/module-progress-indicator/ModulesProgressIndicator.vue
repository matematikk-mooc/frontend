<template>
  <div class="modules-progress-indicator-container">
    <div class="progress-indicator">
      <div class="progress-bar" :style="{ width: percentageCompleted + '%' }"></div>
    </div>
    <div class="progress-label">{{ modulesProgressionData.completedModules }} av {{ modulesProgressionData.totalModules }} moduler gjennomført </div>
  </div>
</template>

<script>

export default {
  props: {
    modulesProgressionData: Object,
  },
  data() {
    return {
      percentageCompleted: Math.round((this.modulesProgressionData.completedPages / this.modulesProgressionData.totalPages) * 100),
      modulesProgressionData: this.modulesProgressionData
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
   font-family: 'Roboto';
   font-weight: 400;
  }
}
  
</style>
