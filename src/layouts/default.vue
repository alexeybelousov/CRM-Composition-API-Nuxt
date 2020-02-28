<template>
  <div>
    <Loader v-if="loading" />

    <div v-else class="app-main-layout">
      <Navbar @toggle-sidebar="onToggleSidebar" />

      <Sidebar :key="locale" :is-sidebar-open="isSidebarOpen" />

      <main
        class="app-content"
        :class="{
          full: !isSidebarOpen
        }"
      >
        <div class="app-page">
          <nuxt />
        </div>
      </main>

      <div class="fixed-action-btn">
        <nuxt-link
          :key="locale"
          v-tooltip="localizeFilter('create-record', store)"
          tag="a"
          class="btn-floating btn-large blue"
          to="/record"
        >
          <i class="large material-icons">add</i>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash"
import { ref, onMounted, computed, watch } from "@vue/composition-api"
import Loader from "@/components/app/Loader.vue"

import Navbar from "@/components/app/Navbar.vue"
import Sidebar from "@/components/app/Sidebar.vue"

import localizeFilter from "@/filters/localize.filter"

import messages from "@/utils/messages"

export default {
  components: {
    Navbar,
    Loader,
    Sidebar
  },
  setup(props, ctx) {
    const loading = ref(true)
    const isSidebarOpen = ref(false)
    const onToggleSidebar = () => {
      isSidebarOpen.value = !isSidebarOpen.value
    }

    onMounted(async () => {
      if (!_.get(ctx, "root.$store.getters[userInfo/info].name", null)) {
        await ctx.root.$store.dispatch("userInfo/fetchUserInfo")
      }

      loading.value = false
    })

    const error = computed(() => ctx.root.$store.getters["notify/error"])

    watch(error, fbError => {
      if (fbError) {
        ctx.root.$error(messages[fbError.code] || "Something wrong")
      }
    })

    const locale = computed(
      () => ctx.root.$store.getters["userInfo/info"].locale
    )

    return {
      isSidebarOpen,
      onToggleSidebar,
      loading,
      locale,
      store: ctx.root.$store,
      localizeFilter
    }
  }
}
</script>
