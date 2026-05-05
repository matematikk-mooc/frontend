<template>
  <div class="filter-wrapper">
    <!-- Mobile-only toggle button -->
    <button class="filter-drawer-toggle" @click="drawerOpen = true" aria-haspopup="dialog">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="20" y2="12"/><line x1="12" y1="18" x2="20" y2="18"/></svg>
      Filter
      <span v-if="selectedFilters.length > 0" class="filter-count-badge">{{ selectedFilters.length }}</span>
    </button>

    <!-- Backdrop -->
    <Transition name="fade">
      <div v-if="drawerOpen" class="filter-drawer-backdrop" @click="drawerOpen = false"></div>
    </Transition>

    <!-- Filter panel: sidebar on desktop, bottom drawer on mobile -->
    <div class="filter-container" :class="{ 'is-open': drawerOpen }" role="dialog" aria-label="Filter">
      <div class="filter-panel-header">
        <span class="filter-panel-title">Filter</span>
        <button class="filter-close-btn" @click="drawerOpen = false" aria-label="Lukk filter">×</button>
      </div>
      <Button :type="'outlined'" :size="'md'" @click="clearFilters">Tilbakestill filter</Button>
      <Transition name="slide-down">
        <div v-if="selectedFilters.length > 0" class="selected-filters-wrapper">
          <TransitionGroup name="tag" tag="ul" class="selected-filters-tags">
            <li v-for="filter in selectedFilters" :key="filter.id">
              {{ filter.filter_name }}
              <button class="selected-filter-remove" @click="removeFilter(filter)" :aria-label="'Fjern filter: ' + filter.filter_name">×</button>
            </li>
          </TransitionGroup>
        </div>
      </Transition>
      <div class="filter-group" v-for="item in filters">
        <div class="filter-title">
          {{ item.name }}
        </div>
        <ul class="cardfilter-list">
          <li v-for="filter in item.filter" :key="filter.id">
            <label class="checkbox-label" :for="filter.id">
              {{ filter.filter_name }} ({{ getHitCount(filter.id) }})
              <input :id="filter.id" :value="filter" :name="filter" type="checkbox" v-model="selectedFilters" /><span
                class="checkmark"
              ></span
            ></label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref, watch } from 'vue'
import Button from './Button.vue'

const drawerOpen = ref(false)

const { filterData, courses } = defineProps(['filterData', 'courses'])

const getHitCount = (filterId) => {
  if (!courses) return 0
  return courses.filter(course =>
    course.course_settings?.course_filter?.some(cf => cf.filter.id === filterId)
  ).length
}

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

const removeFilter = (filter) => {
  selectedFilters.value = selectedFilters.value.filter(f => f.id !== filter.id)
}

</script>

<style lang="scss">
.filter-wrapper {
  // On mobile this just holds the toggle button; on desktop it is the sidebar
}

// Mobile-only toggle button
.filter-drawer-toggle {
  display: none;
  align-items: center;
  gap: 0.5rem;
  background: #fff;
  border: 0.0625rem solid #51698f;
  color: #51698f;
  border-radius: 0.375rem;
  padding: 0.4rem 1rem;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  font-weight: 500;
}

.filter-count-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #51698f;
  color: #fff;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  min-width: 1.25rem;
  height: 1.25rem;
  padding: 0 0.3rem;
}

// Panel header (only visible in the drawer on mobile)
.filter-panel-header {
  display: none;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.filter-panel-title {
  font-size: 1.125rem;
  font-weight: 700;
}

.filter-close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  padding: 0.25rem;
  color: inherit;
  display: flex;
  align-items: center;
}

// Backdrop
.filter-drawer-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

// Desktop sidebar
.filter-container {
  min-width: 15rem;
}

@media (max-width: 800px) {
  .filter-drawer-toggle {
    display: flex;
  }

  .filter-panel-header {
    display: flex;
  }

  .filter-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    max-height: 85vh;
    overflow-y: auto;
    background: #fff;
    border-radius: 1rem 1rem 0 0;
    padding: 1.25rem 1rem 2rem;
    box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.15);
    z-index: 1000;
    transform: translateY(100%);
    transition: transform 0.3s cubic-bezier(0.32, 0.72, 0, 1);
    min-width: unset;

    &.is-open {
      transform: translateY(0);
    }
  }
}
.slide-down-enter-active,
.slide-down-leave-active {
  transition: max-height 0.35s ease, opacity 0.25s ease;
  overflow: hidden;
  max-height: 300px;
}
.slide-down-enter-from,
.slide-down-leave-to {
  max-height: 0;
  opacity: 0;
}
.tag-enter-active,
.tag-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.tag-enter-from,
.tag-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.selected-filters-tags {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
  margin: 0.75rem 0 0 0;
  li {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    background: #eaeaf5;
    padding: 4px 10px 4px 15px;
    margin-right: 8px;
    margin-bottom: 8px;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
}
.selected-filter-remove {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  padding: 0;
  color: inherit;
  display: flex;
  align-items: center;
}
.filter-group {
  margin: 1.75rem 0 1rem 0;
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
  left: 0.43rem;
  width: 0.5rem;
  height: 1rem;
  border: solid white;
  border-radius: 0rem 0.1rem 0rem 0.1rem;
  border-width: 0 0.2rem 0.2rem 0;
  -webkit-transform: rotate(40deg);
  -ms-transform: rotate(40deg);
  transform: rotate(40deg);
}
</style>
