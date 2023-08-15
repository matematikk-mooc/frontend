<template>
    <div class="sublicence">
      <h1 >I AM THE SUB LICENCE</h1>
        <p>{{ propExample }}</p>
    </div>
  </template>

  <script>
    export default {
      name: 'FooterSubLicence',
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
    .sublicence {
      color: pink;
      background-color: blue;
      display: inline-block;
     width: 100%;
     height: fit-content;
    }
  </style>