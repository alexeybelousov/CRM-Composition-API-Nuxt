<template>
  <div>
    <div class="page-title">
      <h3>{{ "bill-title" | localize(store) }}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <Loader v-if="loading" />

    <div v-else class="row">
      <HomeBill :rates="currency.rates" />

      <HomeCurrency :rates="currency.rates" :date="currency.date" />
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "@vue/composition-api"
import Loader from "@/components/app/Loader.vue"

import HomeBill from "@/components/HomeBill.vue"
import HomeCurrency from "@/components/HomeCurrency.vue"

export default {
  components: {
    Loader,
    HomeBill,
    HomeCurrency
  },
  async fetch({ store }) {
    await store.dispatch("fetchCurrency")
  },
  head() {
    return {
      title: this.$title("bill-title")
    }
  },
  middleware: "auth",
  setup(props, ctx) {
    const loading = ref(true)

    const currency = computed(() => ctx.root.$store.getters["currency"])

    onMounted(async () => {
      if (!currency.value) {
        await ctx.root.$store.dispatch("fetchCurrency")
      }

      loading.value = false
    })

    const refresh = async () => {
      loading.value = true
      await ctx.root.$store.dispatch("fetchCurrency")
      loading.value = false
    }

    return {
      loading,
      currency,
      refresh,
      store: ctx.root.$store
    }
  }
}
</script>
