<template>
  <div>
    <div class="page-title">
      <h3>{{ 'categories-title' | localize(store) }}</h3>
    </div>
    <section>
      <Loader
        v-if="loading"
      />

      <div
        v-else
        class="row"
      >
        <CategoryCreate />

        <CategoryEdit
          v-if="categories.length"
          :key="`${key}`"
        />

        <p class="center" v-else>
          {{ 'categories-not-found' | localize(store) }}
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import {
  ref, computed, onMounted, watch,
} from '@vue/composition-api';
import Loader from '@/components/app/Loader.vue';

import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';

export default {
  head() {
    return {
      title: this.$title('categories-title'),
    };
  },
  async fetch({ store }) {
    await store.dispatch('categories/fetchCategories');
  },
  components: {
    Loader,
    CategoryCreate,
    CategoryEdit,
  },
  setup(props, ctx) {
    const loading = ref(true);
    const key = ref('');
    const categories = computed(() => ctx.root.$store.getters['categories/categories']);

    onMounted(async () => {
      if (!categories.value.length) {
        await ctx.root.$store.dispatch('categories/fetchCategories');
      }

      loading.value = false;
    });

    watch(categories, () => {
      key.value = new Date();
    });

    return {
      categories,
      loading,
      key,
      store: ctx.root.$store,
    };
  },
};
</script>
