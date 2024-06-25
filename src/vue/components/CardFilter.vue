<template>
  <div class="filter-wrapper">

    <div class="filter-buttons">
      <Button class="desktop-hide filter-button" :type="'filter'" :size="'md'" @click="toggleFilters">Filter</Button>
    <Button class="reset-button" :type="'filter_reset'" :size="'md'" @click="clearFilters">Tilbakestill</Button>
  </div>
  <div class="filter-modal">
  <div class="filter-container mobile-hide">
    <div class="filter-groups">
      <div class="filter-group" v-for="item in filters">
        <div class="filter-title">
            {{ item.name }}
          </div>
          <ul class="cardfilter-list">
            <li v-for="filter in item.filter" :key="filter.id">
              <label class="checkbox-label" :for="filter.id">
                {{ filter.filter_name }}
                <input :id="filter.id" :value="filter" :name="filter" type="checkbox" v-model="selectedFilters" /><span
                class="checkmark"
                ></span
                ></label>
              </li>
            </ul>
          </div>
        </div>
        <Button class="desktop-hide" :type="'filled'" :size="'md'" @click="toggleFilters">Vis treff</Button>
      </div>
    </div>
  </div>

</template>

<script setup lang="js">
import { ref, watch } from 'vue'
import Button from './Button.vue'

const {filterData} = defineProps(['filterData'])

const data = [
  {
    name: 'Målgruppe',
    filter: filterData.filter(item => item.type == 'TARGET').map(item => item)

  },
  {
    name: 'Kategori',
    filter: filterData.filter(item => item.type == 'CATEGORY').map(item => item)
  }
]

const filters = ref(data)
const selectedFilters = ref([])

defineExpose({
  filters,
  selectedFilters
})

const emit = defineEmits(['update:selectedFilters'])

watch(selectedFilters, (newValue, oldValue) => {
  emit('update:selectedFilters', newValue)
})

const clearFilters = () => {
  selectedFilters.value = []
}

const toggleFilters = () => {
  const filterContainers = document.getElementsByClassName('filter-container');
  const filterModal = document.getElementsByClassName('filter-modal');
  for (let i = 0; i < filterContainers.length; i++) {
    filterContainers[i].classList.toggle('mobile-hide');
    filterModal[i].classList.toggle('backdrop');
  }
}


</script>

<style lang="scss">
.filter-container {
  min-width: 15rem;
}
.filter-group {
  margin: 1rem 0 1rem 0;
}
.cardfilter-list {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
.filter-title {
  font-size: 1rem;
  margin-bottom: 0.25rem;
  font-weight: 700;
}
.checkbox-label {
  display: block;
  position: relative;
  padding-left: 2.25rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 1rem;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.filter-wrapper {
  width:100%;
}

.checkbox-label input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
  border: 0.0625rem solid #bfbfbf;
}

.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #ffffff;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 0.25rem;
  border: 0.0625rem solid #bfbfbf;
}

/* On mouse-over, add a grey background color */
.checkbox-label:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the checkbox is checked, add a blue background */
.checkbox-label input:checked ~ .checkmark {
  background-color: #51698f;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: '';
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.checkbox-label input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.checkbox-label .checkmark:after {
  left: 0.5rem;
  top: 0.125rem;
  width: 0.5rem;
  height: 1rem;
  border: solid white;
  border-width: 0 0.25rem 0.25rem 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
