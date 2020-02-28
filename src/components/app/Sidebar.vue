<template>
  <ul
    class="sidenav app-sidenav"
    :class="{
      open: isSidebarOpen
    }"
  >
    <n-link
      v-for="link in links"
      :key="link.url"
      tag="li"
      active-class="active"
      :to="link.url"
      :exact="link.exact"
    >
      <a href="#" class="waves-effect waves-orange pointer">
        {{ link.title }}
      </a>
    </n-link>
  </ul>
</template>

<script>
import localizeFilter from "@/filters/localize.filter"

export default {
  props: {
    isSidebarOpen: Boolean
  },
  setup(props, { root }) {
    const links = [
      {
        title: localizeFilter("sidebar-bill", root.$store),
        url: "/",
        exact: true
      },
      {
        title: localizeFilter("sidebar-history", root.$store),
        url: "/history"
      },
      {
        title: localizeFilter("sidebar-planning", root.$store),
        url: "/planning"
      },
      {
        title: localizeFilter("sidebar-new-record", root.$store),
        url: "/record"
      },
      {
        title: localizeFilter("sidebar-categories", root.$store),
        url: "/categories"
      }
    ]

    return {
      links
    }
  }
}
</script>
