<template>
    <div class="mobile-warning-container">
        <Icon class='icon-mobile-warning' name="cancel" size="3rem" />
        <div class="mobile-warning-content">
            <p>Akkurat nå fungerer ikke kompetanse.udir.no så bra på små skjermer. Prøv en større skjerm.</p>
        </div>
    </div>
</template>

<script>
import Icon from '../icon/Icon.vue';
    export default {
        name: 'MobileWarning',
        components: {
            Icon,
        },
    };
</script>

<style scoped lang="scss">
@import '../../design/colors.scss';
.mobile-warning-container {
    width: 100%;
    height: 10rem;
    background: map-get($color-palette-red, background, 200);
    padding: 0.625rem 0.625rem 0.625 0.625rem;
    margin-bottom: 1rem;
    border: 0 0 6.25rem;
    border-radius: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    flex-grow: 0;
}
.icon-mobile-warning {
    color: map-get($color-palette-red, background, 600);
}

</style>