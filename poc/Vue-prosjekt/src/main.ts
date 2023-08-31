import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import $ from 'jquery';
window.$ = $;

$(document).ready(function () {
    const elem = document.getElementById("application");
    if(elem){
        createApp(App).mount('#application');
        console.error('Creating app for prod')
    }
    else{
        createApp(App).mount('#app');
        console.error('Creating app locally')
    }
});
