<template>
  <div>
    <div class="page-title">
      <h3>{{ 'record-title' | localize }}</h3>
    </div>

    <Loader
      v-if="loading"
    />

    <p
      v-else-if="!categories.length"
      class="center"
    >
      {{ `Categories does not exist. ` }}
      <router-link
        to="/categories"
      >
        {{ 'add-new' | localize }}
      </router-link>
    </p>

    <form
      class="form"
      @submit.prevent="submit"
    >
      <div class="input-field" >
        <select
            v-model="selected"
            ref="selectRef"
          >
            <option
              v-for="cat in categories"
              :key="cat.id"
              :value="cat.id"
            >
              {{ cat.title }}
            </option>
          </select>
        <label>{{ 'select-category' | localize }}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{ 'record-income' | localize }}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{ 'record-outcome' | localize }}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          :class="{
            invalid: isAmountInvalid,
          }"
          v-model.number="amountField"
        >

        <label for="amount">{{ 'record-amount' | localize }}</label>

        <span
          v-if="isAmountInvalid"
          class="helper-text invalid"
        >
          {{ 'record-amount-incorrect' | localize }}
        </span>
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          :class="{
            invalid: isAmountInvalid,
          }"
          v-model="descField"
        >

        <label for="description">{{ 'record-desc' | localize }}</label>

        <span
          v-if="isDescInvalid"
          class="helper-text invalid"
        >
          {{ 'record-desc-incorrect' | localize }}
        </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'create' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {
  ref, onMounted, onBeforeUnmount, computed, watch,
} from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  head() {
    return {
      title: this.$title('record-title'),
    };
  },
  async fetch({ store }) {
    //if (!store.getters['userInfo/info']) {
      //store.dispatch('userInfo/fetchUserInfo');
      await store.dispatch('categories/fetchCategories');
    //}
  },
  setup(props, ctx) {
    const loading = ref(true);
    let select = null;
    const selected = ref(null);
    const type = ref('outcome');
    const amountField = ref(50);
    const descField = ref('-');

    const categories = computed(() => ctx.root.$store.getters['categories/categories']);
    const bill = computed(() => ctx.root.$store.getters['userInfo/info'].bill);

    watch(categories, (cat) => {
      if (cat.length) {
        selected.value = cat[0].id;
      }
    });

    onMounted(async () => {
      if (!categories.value.length) {
        await ctx.root.$store.dispatch('categories/fetchCategories');
      }

      loading.value = false;

      await ctx.root.$nextTick();
      // eslint-disable-next-line no-undef
      select = M.FormSelect.init(ctx.refs.selectRef, {});

      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });

    onBeforeUnmount(() => {
      if (select && select.destroy) {
        select.destroy();
      }
    });

    const $v = useVuelidate(
      {
        amountField: { minValue: minValue(1), $autoDirty: true },
        descField: { required, $autoDirty: true },
      },
      { amountField, descField },
    );

    const isAmountInvalid = computed(() => $v.amountField.$dirty && $v.amountField.$invalid);
    const isDescInvalid = computed(() => $v.descField.$dirty && $v.descField.$invalid);

    const canCreateRecord = computed(() => {
      if (type.value === 'income') {
        return true;
      }

      return bill.value >= amountField.value;
      // ctx.root.$store.getters.categories
    });

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      if (canCreateRecord.value) {
        const formData = {
          amount: amountField.value,
          desc: descField.value,
          type: type.value,
          categoryId: selected.value,
          date: new Date().toJSON(),
        };

        try {
          await ctx.root.$store.dispatch('records/createRecord', formData);

          amountField.value = 50;
          descField.value = '-';
          type.value = 'outcome';

          $v.amountField.$reset();
          $v.descField.$reset();

          ctx.root.$message('Record created');
          // eslint-disable-next-line no-empty
        } catch (e) {}
      } else {
        ctx.root.$message('You do not have money');
      }
    };

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
    };
  },
};
</script>scri
