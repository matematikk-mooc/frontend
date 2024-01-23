<template>
    <div :class="'information-banner-container-' + type" class="information-banner-container">
        <div class="information-banner-content">
            <Icon class="icon" :class="'icon-' + type" :name=this.icon size="1.5em"></Icon>
            <div class="information-banner-content-text">
                {{ text }}
                <span v-if="date"> Sist vedlikeholdt: {{ date }}</span>
            </div>
        </div>
    </div>
</template>

<script>
import Icon from '../icon/Icon.vue'
export default {
    name: 'InformationBanner',
    components: {
        Icon,
    },
    props: {
        type: String,
        text: String,
        date: String,
    },
    data() {
        return {
            icon: '',
        };
    },
    created() {
        this.getIcon();
    },
    methods: {
        getIcon() {
            if (this.type === "ALERT") {
                this.icon = 'campaign';
            } else if (this.type === "NOTIFICATION") {
                this.icon = 'info';
            } else if (this.type === "FEEDBACK") {
                this.icon = 'feedback';
            } else if (this.type === "UNMAINTAINED") {
                this.icon = 'notification_important';
            }
        },
    },
}
</script>

<style lang="scss">
@import '../../design/colors.scss';

.information-banner-container {
    height: 3.125rem;
    justify-content: center;
    display: flex;

}
.information-banner-container-ALERT{
    background: map-get($color-palette-red, background, 200);
    border: 0.125rem solid map-get($color-palette-red, background, 600);
}
.information-banner-container-NOTIFICATION{
    background: map-get($color-palette-steel, background, 400);
    border: 0.125rem solid map-get($color-palette-steel, background, 700);
}
.information-banner-container-FEEDBACK{
    background: map-get($color-palette-green, background, 300);
    border: 0.125rem solid map-get($color-palette-green, background, 600);
}
.infomation-banner-container-UNMAINAINED{
    background: map-get($color-palette-red, background, 200);
    border: 0.125rem solid map-get($color-palette-red, background, 600);
}

.information-banner-content{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 100%;
    gap: .5rem;
}

.icon {
    margin-bottom: -0.125rem;

}
.icon-ALERT{
    color: map-get($color-palette-red, background, 600);
}
.icon-NOTIFICATION{
    color: map-get($color-palette-steel, background, 700);
}
.icon-FEEDBACK{
    color: map-get($color-palette-green, background, 600);
}
.icon-UNMAINTAINED{
    color: map-get($color-palette-red, background, 600);
}
</style>