<template>
  <div>
    <div class="page-title">
      <h3>{{ "planning-title" | localize(store) }}</h3>
      <h4>{{ bill | currency("RUB") }}</h4>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ "planning-categories-not-exist" | localize(store) }}
      <router-link to="/categories">
        {{ "add-new" | localize(store) }}
      </router-link>
    </p>

    <section v-else>
      <div v-for="cat in filteredCategories" :key="cat.id">
        <p>
          <strong>{{ cat.title }}:</strong>
          {{ cat.spend | currency }} из {{ cat.limit | currency }}
        </p>
        <div v-tooltip="cat.tooltip" class="progress">
          <div
            class="determinate"
            :class="[cat.progressColor]"
            :style="{
              width: `${cat.progressPercent}%`
            }"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "@vue/composition-api"
import currencyFilter from "@/filters/currency.filter"

export default {
  async fetch({ store }) {
    store.dispatch("records/fetchRecords")
    await store.dispatch("categories/fetchCategories")
  },
  head() {
    return {
      title: this.$title("planning-title")
    }
  },
  setup(props, ctx) {
    const loading = ref(true)
    const records = computed(() => ctx.root.$store.getters["records/records"])
    const categories = computed(
      () => ctx.root.$store.getters["categories/categories"]
    )
    const bill = computed(() => ctx.root.$store.getters["userInfo/info"].bill)
    const filteredCategories = ref([])

    onMounted(async () => {
      if (!categories.value.length) {
        await ctx.root.$store.dispatch("categories/fetchCategories")
      }

      if (!records.value.length) {
        await ctx.root.$store.dispatch("records/fetchRecords")
      }

      loading.value = false

      filteredCategories.value = categories.value.map(cat => {
        const spend = records.value
          .filter(r => r.categoryId === cat.id)
          .filter(r => r.type === "outcome")
          // eslint-disable-next-line no-return-assign, no-param-reassign
          .reduce((total, record) => (total += record.amount), 0)

        // eslint-disable-next-line no-mixed-operators
        const percent = (100 * spend) / cat.limit
        const progressPercent = percent > 100 ? 100 : percent
        // eslint-disable-next-line no-nested-ternary
        const progressColor =
          percent < 60 ? "green" : percent < 100 ? "yellow" : "red"

        const tooltipValue = cat.limit - spend
        const tooltip = `${
          tooltipValue < 0 ? "Previshenie na" : "Ostalos"
        } ${currencyFilter(Math.abs(tooltipValue))}`

        return {
          ...cat,
          progressPercent,
          progressColor,
          spend,
          tooltip
        }
      })
    })

    return {
      loading,
      categories,
      filteredCategories,
      bill,
      store: ctx.root.$store
    }
  }
}
</script>
