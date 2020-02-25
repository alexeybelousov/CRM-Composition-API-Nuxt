<template>
  <div class="grey darken-1 empty-layout">
    <nuxt />
  </div>
</template>

<script>
import { computed, watch } from '@vue/composition-api';
import messages from '@/utils/messages';

export default {
  setup(props, ctx) {
    const error = computed(() => ctx.root.$store.getters.error);

    watch(error, (fbError) => {
      if (fbError) {
        // ctx.root.$error(messages[fbError.code] || 'Something wrong');
      }
    });

    return {
      error,
    };
  },
};
</script>
