<template>
  <ul
    class="sidenav app-sidenav"
    :class="{
      'open': isSidebarOpen,
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
import localizeFilter from '@/filters/localize.filter';

export default {
  props: {
    isSidebarOpen: Boolean,
  },
  setup() {
    const links = [
      {
        title: localizeFilter('sidebar-bill'),
        url: '/',
        exact: true,
      },
      {
        title: localizeFilter('sidebar-history'),
        url: '/history',
      },
      {
        title: localizeFilter('sidebar-planning'),
        url: '/planning',
      },
      {
        title: localizeFilter('sidebar-new-record'),
        url: '/record',
      },
      {
        title: localizeFilter('sidebar-categories'),
        url: '/categories',
      },
    ];

    return {
      links,
    };
  },
};
</script>
