<script setup>
import { ref, computed } from 'vue'
import PublicGoogleSheetsParser from 'public-google-sheets-parser'

const SHEET_ID = '1CXOmlB9xnEKRGJiRTLogSZUF-L2sEZfYPpFRSX-x7rs'
const SHEET_NAME = 'Sheet1'

const cafes = ref([])
const activeFilters = ref({
  areas: [],
  amenities: []
})
const areas = ref([])
const isLoading = ref(true)
const error = ref(null)

// Load data from Google Sheets once on component mount
onMounted(async () => {
  try {
    isLoading.value = true
    error.value = null

    const options = { sheetName: SHEET_NAME, useFormat: true }
    const sheetsParser = new PublicGoogleSheetsParser(SHEET_ID, options)
    const data = await sheetsParser.parse()

    if (data && data.length > 0) {
      cafes.value = data
      // Extract unique areas
      const uniqueAreas = [...new Set(data.map((cafe) => cafe.Area))]
      areas.value = uniqueAreas
    } else {
      error.value = 'No data found in Google Sheets'
    }
  } catch (err) {
    console.error('Error loading data:', err)
    error.value = 'Failed to load data from Google Sheets'
  } finally {
    isLoading.value = false
  }
})

// Computed filtered cafes for better performance
const filteredCafes = computed(() => {
  if (isLoading.value || !cafes.value.length) return []

  let result = [...cafes.value]

  // Filter by areas
  if (activeFilters.value.areas.length > 0) {
    result = result.filter((cafe) => activeFilters.value.areas.includes(cafe.Area))
  }

  // Filter by amenities
  if (activeFilters.value.amenities.includes('wifi')) {
    result = result.filter((cafe) => cafe.Wifi === 'Y')
  }
  if (activeFilters.value.amenities.includes('plugPoints')) {
    result = result.filter((cafe) => cafe['Plug points'] === 'Y')
  }
  if (activeFilters.value.amenities.includes('quiet')) {
    result = result.filter((cafe) => cafe.Quiet === 'Y')
  }

  return result
})

const toggleAreaFilter = (area) => {
  activeFilters.value = {
    ...activeFilters.value,
    areas: activeFilters.value.areas.includes(area)
      ? activeFilters.value.areas.filter((a) => a !== area)
      : [...activeFilters.value.areas, area]
  }
}

const toggleAmenityFilter = (amenity) => {
  activeFilters.value = {
    ...activeFilters.value,
    amenities: activeFilters.value.amenities.includes(amenity)
      ? activeFilters.value.amenities.filter((a) => a !== amenity)
      : [...activeFilters.value.amenities, amenity]
  }
}

const resetFilters = () => {
  activeFilters.value = {
    areas: [],
    amenities: []
  }
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto">

  <h1 class="fw-bold">Rio cafe finder ☕️</h1>

    <template v-if="isLoading">
      <div class="text-center p-8">
        <p class="text-lg text-gray-600">Loading cafe data...</p>
      </div>
    </template>

    <template v-else-if="error">
      <div class="text-center p-8 bg-red-50 rounded">
        <p class="text-lg text-red-600">{{ error }}</p>
      </div>
    </template>

    <template v-else>
      <!-- Filters -->
      <div class="bg-gray-100 p-6 rounded-lg mb-6 shadow-sm">

        <!-- Area Filters -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Area</h3>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="(area, index) in areas"
              :key="index"
              @click="toggleAreaFilter(area)"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="{
                'bg-blue-500 text-white': activeFilters.areas.includes(area),
                'bg-white text-gray-700 hover:bg-gray-200': !activeFilters.areas.includes(area)
              }"
            >
              {{ area }}
            </button>
          </div>
        </div>

        <!-- Amenity Filters -->
        <div class="mb-6">
          <h3 class="text-lg font-medium mb-3">Amenities</h3>
          <div class="flex flex-wrap gap-2">
            <button
              @click="toggleAmenityFilter('wifi')"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="{
                'bg-green-500 text-white': activeFilters.amenities.includes('wifi'),
                'bg-white text-gray-700 hover:bg-gray-200': !activeFilters.amenities.includes('wifi')
              }"
            >
              WiFi
            </button>

            <button
              @click="toggleAmenityFilter('plugPoints')"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="{
                'bg-green-500 text-white': activeFilters.amenities.includes('plugPoints'),
                'bg-white text-gray-700 hover:bg-gray-200': !activeFilters.amenities.includes('plugPoints')
              }"
            >
              Plug Points
            </button>

            <button
              @click="toggleAmenityFilter('quiet')"
              class="px-4 py-2 rounded-full text-sm font-medium transition-colors"
              :class="{
                'bg-green-500 text-white': activeFilters.amenities.includes('quiet'),
                'bg-white text-gray-700 hover:bg-gray-200': !activeFilters.amenities.includes('quiet')
              }"
            >
              Quiet
            </button>
          </div>
        </div>

        <button
        v-if="activeFilters.areas.length > 0 || activeFilters.amenities.length > 0"
        class="px-6 py-2 mt-3 bg-black text-white font-medium hover:bg-gray-600 rounded-md shadow-sm transition-colors"
        @click="resetFilters"
        >
        Reset Filters
        </button>
      </div>

      <!-- Results Count -->
      <div class="mb-4 mt-10">
        <p class="text-gray-600">{{ filteredCafes.length }} {{ filteredCafes.length === 1 ? 'result' : 'results' }} found</p>
      </div>

      <!-- Cafe Cards -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card
            v-for="(cafe, index) in filteredCafes"
            :key="index"
            :name="cafe.Name"
            :location="cafe.Area"
            :wifi-available="cafe.Wifi === 'Y'"
            :plugs-available="cafe['Plug points'] === 'Y'"
            :quiet="cafe.Quiet === 'Y'"
            :map-link="cafe.Map"
        />
        </div>

      <div
        v-if="filteredCafes.length === 0 && !isLoading"
        class="text-center p-8 bg-gray-100 rounded"
      >
        <p class="text-lg text-gray-600">No cafes match your filters</p>
      </div>
    </template>
  </div>
</template>

<style scoped>
h1 {
    line-height: 100px;
}
</style>