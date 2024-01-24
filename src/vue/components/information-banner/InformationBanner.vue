<template>
    <div :class="'information-banner-container-' + type" class="information-banner-container">
        <div class="information-banner-content">
            <Icon class="icon" :class="'icon-' + type" :name=this.icon size="1.5em"></Icon>
            <div class="information-banner-content-text">
                {{ message }}
                <a v-if="url" :href="url" target="_blank">Les mer</a>
                <span v-if="date"> Vedlikehold avsluttet: {{ formatedDate }}</span>
            </div>
        </div>
        <IconButton @click="closeBanner()" class="information-banner-close"></IconButton>
    </div>
</template>

<script>
import Icon from '../icon/Icon.vue'
import IconButton from '../icon-button/IconButton.vue'
export default {
    name: 'InformationBanner',
    components: {
        Icon,
        IconButton,
    },
    props: {
        type: String,
        text: String,
        date: String,
    },
    data() {
        return {
            icon: '',
            url: '',
            message: '',
            fornatedDate: '',
        };
    },
    created() {
        this.getIcon();
        this.checkUrl();
        if(this.date){
            this.formatDate();
        }
    },
    methods: {
        closeBanner() {
            document.getElementsByClassName('information-banner-container')[0].style.display = 'none';
        },
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
        checkUrl() {
            const urlRegex = /(https?):\/\/[^\s/$.?#].[^\s]*/;
            const match = this.text.match(urlRegex);
            if(match){
                this.url = match[0];
                this.message = this.text.replace(urlRegex, '');
            }
            else{
                this.message = this.text;

            }
        },
        formatDate() {
            const inputDate = new Date(this.date);
            const options = {
                year: 'numeric',
                month: 'long',
                day: '2-digit',
            };

            this.formatedDate = inputDate.toLocaleDateString('no-NB', options);

        },
    },
}
</script>

<style lang="scss">
@import '../../design/colors.scss';

.information-banner-container {
    height: 3.125rem;
    justify-content: center;
    align-items: center;
    display: flex;

}
.information-banner-container-ALERT{
    background: map-get($color-palette-red, background, 200);
    border: 0.125rem solid map-get($color-palette-red, background, 600);
}
.information-banner-container-NOTIFICATION{
    background: map-get($color-palette-steel, background, 300);
    border: 0.125rem solid map-get($color-palette-steel, background, 700);
}
.information-banner-container-FEEDBACK{
    background: map-get($color-palette-green, background, 200);
    border: 0.125rem solid map-get($color-palette-green, background, 600);
}
.information-banner-container-UNMAINTAINED{
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

.information-banner-close{
    flex: 0 0 auto;
    margin-right: 1.5rem;
    background: none;
    color: black;
    cursor: pointer;
    &:hover{
        background: white;
    }
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
