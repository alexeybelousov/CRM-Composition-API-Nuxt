<template>
  <div class="app-loader">
    <div class="preloader-wrapper active">
      <div class="spinner-layer" :class="{ color }">
        <div class="circle-clipper left">
          <div class="circle" />
        </div>
        <div class="gap-patch">
          <div class="circle" />
        </div>
        <div class="circle-clipper right">
          <div class="circle" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api'

export default {
  setup() {
    const color = computed(() => {
      const colors = [
        'spinner-blue-only',
        'spinner-red-only',
        'spinner-green-only',
        'spinner-yellow'
      ]
      return colors[Math.floor(Math.random() * 3)]
    })

    return {
      color
    }
  }
}
</script>
