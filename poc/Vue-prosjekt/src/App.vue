<script setup lang="ts">
import $ from 'jquery';
window.$ = $;

const elem = document.getElementById("application");
    if(elem){
      elem.classList.add("bg-color");
        console.error('Creating class name for  for prod')
        const wrapper = document.getElementById("wrapper");
        if(wrapper){
          
        }
    }
    else{
      const local= document.getElementById('app')
      if(local){
      local.classList.add("bg-color-local");
        console.error('Creating class name for locally')
    }}

</script>

<template>
</template>

<style>
  .bg-color{
    background-color: red;
 }
 #app, .bg-color-local{
  height: 200px;
  width: 300px;
  background-color: blue;
 } 

</style>
