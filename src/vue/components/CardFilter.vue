<template>
  <div class="filter-wrapper">
    <!-- Mobile-only: toggle button + active pills in a wrapping flex row -->
    <div class="filter-mobile-bar">
      <button class="filter-drawer-toggle" @click="drawerOpen = true" aria-haspopup="dialog">
        Filter
        <span v-if="selectedFilters.length > 0" class="filter-count-badge">{{ selectedFilters.length }}</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><g clip-path="url(#clip0_1439_42726)"><path d="M3 17V19H9V17H3ZM3 5V7H13V5H3ZM13 21V19H21V17H13V15H11V21H13ZM7 9V11H3V13H7V15H9V9H7ZM21 13V11H11V13H21ZM15 9H17V7H21V5H17V3H15V9Z" fill="currentColor"/></g><defs><clipPath id="clip0_1439_42726"><rect width="24" height="24" fill="white"/></clipPath></defs></svg>
      </button>
      <TransitionGroup v-if="selectedFilters.length > 0" name="tag" tag="ul" class="selected-filters-tags mobile-pills">
        <li v-for="filter in selectedFilters" :key="filter.id">
          {{ filter.filter_name }}
          <button class="selected-filter-remove" @click="removeFilter(filter)" :aria-label="'Fjern filter: ' + filter.filter_name">×</button>
        </li>
      </TransitionGroup>
    </div>

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
      <h2 class="filter-desktop-title">Filtrering</h2>
      <div class="filter-actions">
        <Button class="bruk-btn" :type="'filled'" :size="'md'" @click="drawerOpen = false">Bruk <Icon name="check" size="1.2em" style="margin-left: 0.4rem" /></Button>
        <Button :type="'outlined'" :size="'md'" @click="clearFilters(); drawerOpen = false" :disabled="selectedFilters.length === 0">Tilbakestill <Icon name="restart_alt" size="1.2em" style="margin-left: 0.4rem" /></Button>
      </div>
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
import Icon from './icon/Icon.vue'

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
  background: #ffffff;
  color: #303030;
  border: 0.125rem solid #303030;
  border-radius: 0.1875rem;
  padding: 0.375rem 1.25rem 0.375rem 1.15rem;
  font-size: 1rem;
  font-family: 'Inter', sans-serif;
  cursor: pointer;
  font-weight: 700;

  &:hover {
    border-color: #00468e;
  }
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

.filter-mobile-bar {
  display: none;
}

.mobile-pills {
  display: none;
}

.filter-actions {
  display: flex;
  gap: 0.5rem;

  .btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
}

.bruk-btn {
  display: none;
}

@media (max-width: 800px) {
  .bruk-btn {
    display: flex;
  }
}

.filter-desktop-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
}

@media (max-width: 800px) {
  .filter-desktop-title {
    display: none;
  }
}

// Desktop sidebar
.filter-container {
  min-width: 15rem;
  margin-right: 2rem;
}

@media (max-width: 800px) {
  .filter-wrapper {
    margin-bottom: 1rem;
  }
}

@media (max-width: 800px) {
  .filter-wrapper {
    width: 100%;
  }

  .filter-mobile-bar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem 0.75rem;
    margin-left: 1.7rem;
  }

  .filter-drawer-toggle {
    display: flex;
  }

  .mobile-pills {
    display: flex;
    margin: 0;
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
