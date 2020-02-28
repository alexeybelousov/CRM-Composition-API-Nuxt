/* eslint-disable vue/html-self-closing */
<template>
  <div>
    <div class="page-title">
      <h3>{{ "record-title" | localize(store) }}</h3>
    </div>

    <Loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{ `Categories does not exist. ` }}
      <router-link to="/categories">
        {{ "add-new" | localize(store) }}
      </router-link>
    </p>

    <form class="form" @submit.prevent="submit">
      <div class="input-field">
        <select ref="selectRef" v-model="selected">
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>{{ "select-category" | localize(store) }}</label>
      </div>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="income"
          />
          <span>{{ "record-income" | localize(store) }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            v-model="type"
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
          />
          <span>{{ "record-outcome" | localize(store) }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          v-model.number="amountField"
          type="number"
          :class="{
            invalid: isAmountInvalid
          }"
        />

        <label for="amount">{{ "record-amount" | localize(store) }}</label>

        <span v-if="isAmountInvalid" class="helper-text invalid">
          {{ "record-amount-incorrect" | localize(store) }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          v-model="descField"
          type="text"
          :class="{
            invalid: isAmountInvalid
          }"
        />

        <label for="description">{{ "record-desc" | localize(store) }}</label>

        <span v-if="isDescInvalid" class="helper-text invalid">
          {{ "record-desc-incorrect" | localize(store) }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ "create" | localize(store) }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {
  ref,
  onMounted,
  onBeforeUnmount,
  computed,
  watch
} from "@vue/composition-api"
import useVuelidate from "@vuelidate/core"
import { required, minValue } from "vuelidate/lib/validators"

export default {
  async fetch({ store }) {
    await store.dispatch("categories/fetchCategories")
  },
  head() {
    return {
      title: this.$title("record-title")
    }
  },
  setup(props, ctx) {
    const loading = ref(true)
    let select = null
    const selected = ref(null)
    const type = ref("outcome")
    const amountField = ref(50)
    const descField = ref("-")

    const categories = computed(
      () => ctx.root.$store.getters["categories/categories"]
    )
    const bill = computed(() => ctx.root.$store.getters["userInfo/info"].bill)

    watch(categories, cat => {
      if (cat.length) {
        selected.value = cat[0].id
      }
    })

    onMounted(async () => {
      if (!categories.value.length) {
        await ctx.root.$store.dispatch("categories/fetchCategories")
      }

      loading.value = false

      await ctx.root.$nextTick()
      // eslint-disable-next-line no-undef
      select = M.FormSelect.init(ctx.refs.selectRef, {})

      // eslint-disable-next-line no-undef
      M.updateTextFields()
    })

    onBeforeUnmount(() => {
      if (select && select.destroy) {
        select.destroy()
      }
    })

    const $v = useVuelidate(
      {
        amountField: { minValue: minValue(1), $autoDirty: true },
        descField: { required, $autoDirty: true }
      },
      { amountField, descField }
    )

    const isAmountInvalid = computed(
      () => $v.amountField.$dirty && $v.amountField.$invalid
    )
    const isDescInvalid = computed(
      () => $v.descField.$dirty && $v.descField.$invalid
    )

    const canCreateRecord = computed(() => {
      if (type.value === "income") {
        return true
      }

      return bill.value >= amountField.value
      // ctx.root.$store.getters.categories
    })

    const submit = async () => {
      if ($v.$invalid) {
        return
      }

      if (canCreateRecord.value) {
        const formData = {
          amount: amountField.value,
          desc: descField.value,
          type: type.value,
          categoryId: selected.value,
          date: new Date().toJSON()
        }

        try {
          await ctx.root.$store.dispatch("records/createRecord", formData)

          amountField.value = 50
          descField.value = "-"
          type.value = "outcome"

          $v.amountField.$reset()
          $v.descField.$reset()

          ctx.root.$message("Record created")
          // eslint-disable-next-line no-empty
        } catch (e) {}
      } else {
        ctx.root.$message("You do not have money")
      }
    }

    return {
      loading,
      categories,
      selected,
      type,
      amountField,
      descField,
      isAmountInvalid,
      isDescInvalid,
      submit,
      canCreateRecord,
      bill,
      store: ctx.root.$store
    }
  }
}
</script>
scri
