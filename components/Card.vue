<template>
  <div
    class="flex flex-col justify-between h-full w-full bg-white border border-gray-200 rounded-2xl shadow-lg dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-2xl"
  >
    <!-- Top: Content -->
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-1 text-gray-900 dark:text-white">{{ name }}</h2>
      <p class="custom-p text-sm text-gray-500">{{ location }}</p>

      <!-- Features Grid -->
      <div class="mt-6 grid grid-cols-3 gap-4">
        <!-- Wifi -->
        <div class="flex flex-col items-center">
          <i class="fas fa-wifi"></i>
          <span class="text-sm text-gray-700 dark:text-gray-300">WiFi</span>
          <span
            :class="[wifiAvailable ? 'text-green-600' : 'text-red-500', 'text-base mt-1']"
          >
            {{ wifiAvailable ? "Yes" : "No" }}
          </span>
        </div>

        <!-- Plugs -->
        <div class="flex flex-col items-center">
          <i class="fas fa-plug"></i>
          <span class="text-sm text-gray-700 dark:text-gray-300">Plugs</span>
          <span
            :class="[
              plugsAvailable ? 'text-green-600' : 'text-red-500',
              'text-base mt-1',
            ]"
          >
            {{ plugsAvailable ? "Yes" : "No" }}
          </span>
        </div>

        <!-- Quiet -->
        <div class="flex flex-col items-center">
          <i class="fas fa-volume-up"></i>
          <span class="text-sm text-gray-700 dark:text-gray-300">Quiet</span>
          <span :class="[quiet ? 'text-green-600' : 'text-red-500', 'text-base mt-1']">
            {{ quiet ? "Yes" : "No" }}
          </span>
        </div>
      </div>
    </div>

    <!-- Bottom: Button -->
    <div class="p-6 pt-0">
      <NuxtLink
        :href="mapLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center justify-center w-full py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 transition no-underline"
      >
        Open map
        <svg
          class="w-4 h-4 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: String,
  location: String,
  wifiAvailable: Boolean,
  plugsAvailable: Boolean,
  quiet: Boolean,
  mapLink: String,
});
</script>

<style scoped>
.custom-p {
  margin-top: 0px;
  color: #999;
  text-transform: uppercase;
}
</style>
