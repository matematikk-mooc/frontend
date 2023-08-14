<template>
    <div class="licence">
      <h1 >I AM THE LICENCE</h1>
        <p>{{ propExample }}</p>
      <p>{{ msg }}</p>
      <p><a href="https://www.vg.no/">VG.no</a></p>
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

  <style>
    .licence {
      color: green;
      background-color: yellow;
      display: inline-block;
     width: 100%;
    }
  </style>