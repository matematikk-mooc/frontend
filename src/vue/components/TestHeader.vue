<template>
    <div class="licence">
      <h1 >I AM THE HEADER</h1>
      <p>{{ msg }}</p>
      <button @click="updateText" class="testButton">Trykk på meg</button>
    </div>
  </template>

  <script>
    export default {
      name: 'TestHeader',

      data() {
        return {
          msg: 'Hello world!',
          count: 0
        }
      },
      created() {
        console.log('TestHeader created')
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

  </style>
