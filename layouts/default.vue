<template>
    <div class="min-h-screen">
        <main class="">
            <div>
                <slot />
                <Footer />
            </div>
        </main>
    </div>
</template>

<script setup>
import { baseStore } from '@/stores'
const store = baseStore()

const addResponsiveClasses = () => {
  var current_width = document.body.clientWidth
  let body = document.querySelector('body')
  // small mobile
  if (current_width <= 375) {
    body.classList.add('mobile-mode', 'mobile-small')
    store.$patch({ mode: 'mobile' }),
    store.$patch({ small_mobile: true })
  }
  // regular mobile
  else if (current_width < 575) {
    body.classList.add('mobile-mode', 'mobile-regular')
    store.$patch({ mode: 'mobile' })
  }
  // large mobile
  else if (current_width < 767) {
    body.classList.add('mobile-mode', 'mobile-large')
    store.$patch({ mode: 'mobile' })
  }
  // tablet
  else if (current_width < 991) {
    body.classList.add('tablet-mode')
    store.$patch({ mode: 'tablet' })
  }
  // small laptop (13 inch)
  else if (current_width < 1500) {
    body.classList.add('desktop-mode', 'laptop-small')
    store.$patch({ mode: 'desktop' })
  }
  // large laptop (15 inch)
  else if (current_width < 1750) {
    body.classList.add('desktop-mode', 'laptop-large')
    store.$patch({ mode: 'desktop' })
  }
  // large desktop (external monitor)
  else {
    body.classList.add('desktop-mode', 'desktop-large')
    store.$patch({ mode: 'desktop' })
  }
}

onMounted(() => {
  addResponsiveClasses()
})

</script>

<style>
h1 {
    font-size: 100px;
    font-family: 'SF_Pro_Display_bold', sans-serif;
    font-weight: 500;
}
h2 {
    font-size: 40px;
    font-family: 'SF_Pro_Display_medium', sans-serif;
    font-weight: 500;
}
body {
    font-size: 20px;
    font-family: 'Arial', sans-serif;
}
</style>