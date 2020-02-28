<template>
  <div>
    <Loader v-if="loading" />

    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <n-link to="/history" class="breadcrumb">
          {{ "detail-title" | localize(store) }}
        </n-link>

        <a class="breadcrumb" @click.prevent>
          {{ record.typeText }}
        </a>
      </div>

      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="[record.typeClass]">
            <div class="card-content white-text">
              <p>{{ "detail-desc" | localize(store) }}: {{ record.desc }}</p>
              <p>
                {{ "detail-amount" | localize(store) }}:
                {{ record.amount | currency("RUB") }}
              </p>
              <p>
                {{ "detail-category" | localize(store) }}:
                {{ record.categoryName }}
              </p>

              <small>{{ Date.parse(record.date) | date("datetime") }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else class="center">
      {{ "detail-with-id" | localize(store) }} {{ $route.params.id }}
      {{ "detail-not-found" | localize(store) }}
    </p>
  </div>
</template>

<script>
import { ref, onMounted } from "@vue/composition-api"

export default {
  head() {
    return {
      title: this.$title("detail-title")
    }
  },
  setup(props, ctx) {
    const loading = ref(true)
    const record = ref(null)

    onMounted(async () => {
      const { id } = ctx.root.$route.params
      const rec = await ctx.root.$store.dispatch("records/fetchRecordById", id)
      const cat = await ctx.root.$store.dispatch(
        "categories/fetchCategoryById",
        rec.categoryId
      )

      loading.value = false

      record.value = {
        ...rec,
        categoryName: cat.title,
        typeClass: rec.type === "income" ? "green" : "red",
        typeText: rec.type === "income" ? " Income" : "Outcome"
      }
    })

    return {
      loading,
      record,
      store: ctx.root.$store
    }
  }
}
</script>
