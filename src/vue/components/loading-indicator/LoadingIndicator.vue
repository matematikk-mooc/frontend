<template>
    <div class="loading-container">
        <div v-for="index in 3" :key="index" class="loading-dot" :class="{ 'dot-active': index === activeDot }"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            activeDot: 1
        };
    },
    mounted() {
        this.startAnimation();
    },
    methods: {
        startAnimation() {
            this.intervalId = setInterval(() => {
                this.activeDot = this.activeDot === 3 ? 1 : this.activeDot + 1;
            }, 300);
        }
    },
    beforeDestroy() {
        clearInterval(this.intervalId);
    }
};
</script>

<style scoped lang="scss">
@import "../../design/colors.scss";

.loading-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding-top: 10rem;
}

.loading-dot {
    width: 6rem;
    height: 6rem;
    border-radius: 50%;
    background-color: map-get($color-palette-slate, background, 200);
    transition: background-color 1s ease-in-out;
}

.dot-active {
    background-color: map-get($color-palette-slate, background, 400);
}
</style>
