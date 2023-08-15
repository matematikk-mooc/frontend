<template>
  <footer class="footert">
    <div v-if="licence">
    <footer-licence prop-example="I AM A PROP"/>
  </div>
    <h1>I AM THE FOOTER</h1>
    <p>prop: {{name }}</p>
    <div class="example">{{msg}}</div>
    <button @click="updateText" class="testButton">Trykk på meg</button>
</footer>
</template>

<script>

  export default {
    name: 'FooterTest',
    props: {
      name: String,
      licence: Boolean,
    },
    data() {
      return {
        msg: 'Hello world!',
        count: 0,
        courses: {}

      }
    },
    created() {
      console.log("hei" + this.name)
    },
    methods: {
      updateText() {
        this.count ++
        this.msg = 'Hello world! I am updated! ' + this.count + ' times'
      }
    }
  }
</script>

<script setup>
import FooterLicence from './subcomponents/FooterLicence.vue';
</script>

<style>
  .footert {
    background-color: red ;
    width: 100%;
    height: fit-content;
  }
  .example {
    color: green;
  }
  .testButton {
    background-color: blue;
  }
</style>