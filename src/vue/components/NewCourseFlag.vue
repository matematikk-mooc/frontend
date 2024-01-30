<template>
<div class="new-flag-container">
    <div class="new-flag">
        <p class="new-flag-text">Ny</p>
    </div>
</div>
</template>

<script>
</script>

<style scoped lang="scss">
@import '../design/colors.scss';

.new-flag-container {
    position: absolute;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    width: 100%;
    height: 3rem;
    z-index: 1;
    margin-top: -0.75rem;
    margin-left: -0.75rem;
}
.new-flag {
    width: 3rem;
    height: 3rem;
    border-radius: 3px;
    background: map-get($color-palette-steel, background, 600);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1;
}

.new-flag-text {
    font-size: 1rem;
    font-weight: 700;
    color: $color-white;
    text-transform: uppercase;
    justify-content: center;
    display: flex;
    z-index: 1;

}
</style>
