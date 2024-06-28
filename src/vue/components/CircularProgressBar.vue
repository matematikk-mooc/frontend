<template>
    <div class="circular-progress-bar">
        <svg :width="size" :height="size" viewBox="0 0 36 36" class="circular-chart">
            <path
                class="circle-bg"
                d="M18 2.0845
                    a 15.9155 15.9155 0 0 0 0 31.831
                    a 15.9155 15.9155 0 0 0 0 -31.831"
                :fill="isFinished ? progressColor : 'transparent'"
                :stroke="isFinished ? 'transparent' : backgroundColor"
            />

            <path
                class="circle"
                :stroke-dasharray="circleDashArray"
                :stroke-dashoffset="circleDashOffset" d="M18 2.0845
                    a 15.9155 15.9155 0 0 0 0 31.831
                    a 15.9155 15.9155 0 0 0 0 -31.831"
                :fill="isFinished ? progressColor : 'transparent'"
                :stroke="isFinished ? 'transparent' : progressColor"
            />

            <!-- Percentage text -->
            <text x="18" :y="isFinished ? 25.35 : 21.35" class="percentage" :fill="isFinished ? 'white' : 'black'" :font-size="isFinished ? '20px' : '10px'">
                {{ isFinished ? "✔" : `${percentage}%` }}
            </text>
        </svg>
    </div>
</template>

<script>
export default {
    name: "CircularProgressBar",
    props: {
        percentage: {
            type: Number,
            required: true,
            validator(value) {
                return value >= 0 && value <= 100;
            },
        },
        size: {
            type: Number,
            default: 100,
        },
        progressColor: {
            type: String,
            default: "#3b7858",
        },
        backgroundColor: {
            type: String,
            default: "#eaeaf5",
        }
    },
    computed: {
        isFinished() {
            return this.percentage == 100;
        },
        circleDashArray() {
            const radius = 15.9155;
            const circumference = 2 * Math.PI * radius;
            return `${circumference} ${circumference}`;
        },
        circleDashOffset() {
            const radius = 15.9155;
            const circumference = 2 * Math.PI * radius;
            const progress = this.percentage / 100;
            return circumference * (1 - progress);
        },
    },
};
</script>

<style scoped>
.circular-progress-bar {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
}

.circular-chart {
    display: block;
    max-width: 100%;
    max-height: 250px;
}

.circle-bg {
    stroke-width: 3.8;
}

.circle {
    stroke-width: 2.8;
    stroke-linecap: round;
    transition: stroke-dasharray 0.6s ease 0s, stroke-dashoffset 0.6s ease 0s;
}

.percentage {
    font-family: "Roboto";
    font-weight: 400;
    text-anchor: middle;
}
</style>
