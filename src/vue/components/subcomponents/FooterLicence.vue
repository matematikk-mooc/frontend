<template>
    <div class="licence">
      <footer-sub-licence prop-example="PPRROOOPP"/>
      <h1 >I AM THE LICENCE</h1>
        <p>{{ propExample }}</p>
      <p>{{ msg }}</p>
      <button @click="updateText" class="testButton">Trykk på meg</button>
    </div>
  </template>

  <script>
    export default {
      name: 'FooterLicence',
      props: {
        propExample: String
      },

      data() {
        return {
          msg: 'Hello world!',
          count: 0
        }
      },
      created() {
        console.log('FooterLicence created')
      },
      methods: {
      updateText() {
        this.count++
        this.msg = 'Hello world! I am updated! ' + this.count + ' times'
      }
    }
    }
  </script>

  <script setup>
  import FooterSubLicence from './FooterSubLicence.vue';
  </script>

  <style>
    .licence {
      color: green;
      background-color: yellow;
      display: inline-block;
     width: 100%;
     height: fit-content;
    }
  </style>