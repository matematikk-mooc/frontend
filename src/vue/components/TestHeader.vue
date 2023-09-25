<template>
    <div class="licence">
      <h1 >I AM THE HEADER</h1>
      <p>{{ allC }}</p>
      <button @click="updateText" class="testButton">Trykk på meg</button>
    </div>
  </template>

  <script>
    export default {
      name: 'TestHeader',
      props: {
        courses: Object
      },
      data() {
        return {
          msg: 'Hello world!',
          count: 0,
          allC : this.courses
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

  <style lang="scss" >
     @import "src/vue/design/index";
    .licence {
      color: map-get($color-palette-eggshell, background, 300);
      background-color: yellow;
      display: inline-block;
     width: 100%;
     height: fit-content;
    }
  </style>