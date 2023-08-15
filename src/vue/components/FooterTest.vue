<template>
  <footer class="footert">
    <div v-if="licence">
      <footer-licence prop-example="I AM A PROP"/>
    </div>
    <h1>I AM THE FOOTER</h1>
    <div v-if="courses.length">
      <h2>Courses</h2>

      <div class="cardscontainer" v-for="course in courses" :key="course.id">
        <div class="card">
            <h4><b>{{ course.name }}</b></h4>
            <p>{{ course.id  }}</p>
        </div>
      </div>

    </div>
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
    courses: Object
  },
  data() {
    return {
      msg: 'Hello world!',
      count: 0,
      courses: this.courses

    }
  },
  created() {
    console.log("hei" + this.name)
    console.log(this.courses)
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
  background-color: pink ;
  width: 100%;
  height: fit-content;
}
.example {
  color: green;
}
.testButton {
  background-color: blue;
}

.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  width: 40%;
  transition: 0.3s;
  border-radius: 5px;
  display: block;
  background-color: white;
}
.cardscontainer {
  width: 100%;
  display: block;

}

</style>