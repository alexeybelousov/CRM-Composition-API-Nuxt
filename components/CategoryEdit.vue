<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{ 'categories-edit' | localize(store) }}</h4>
      </div>

      <form
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
          <label>{{ 'select-category' | localize(store) }}</label>
        </div>

        <div class="input-field">
          <input
              id="title-edit"
              type="text"
              :class="{
                invalid: isTitleInvalid,
              }"
              v-model="titleField"
          >

          <label for="name">{{ 'name' | localize(store) }}</label>

          <span
            v-if="isTitleInvalid"
            class="helper-text invalid"
          >
            {{ 'categories-input-name' | localize(store) }}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit-edit"
              type="number"
              :class="{
                invalid: isLimitInvalid,
              }"
              v-model.number="limitField"
          >

          <label for="limit">{{ 'categories-limit' | localize(store) }}</label>

          <span
            v-if="isLimitInvalid"
            class="helper-text invalid"
          >
            {{ 'categories-min-value' | localize(store) }}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{ 'categories-update' | localize(store) }}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import {
  ref, onMounted, onBeforeUnmount, computed, watch,
} from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { required, minValue } from 'vuelidate/lib/validators';

export default {
  setup(props, ctx) {
    let select = null;
    const titleField = ref('');
    const limitField = ref(100);
    const categories = computed(() => ctx.root.$store.getters['categories/categories']);
    const selected = ref(null);
    const { id, title, limit } = categories.value[0];

    selected.value = id;
    titleField.value = title;
    limitField.value = limit;

    const $v = useVuelidate(
      {
        titleField: { required, $autoDirty: true },
        limitField: { minValue: minValue(100), $autoDirty: true },
      },
      { titleField, limitField },
    );

    const isTitleInvalid = computed(() => $v.titleField.$dirty && $v.titleField.$invalid);
    const isLimitInvalid = computed(() => $v.limitField.$dirty && $v.limitField.$invalid);

    onMounted(() => {
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

    watch(selected, (val) => {
      // eslint-disable-next-line no-shadow
      const { title, limit } = categories.value.find((c) => c.id === val);
      titleField.value = title;
      limitField.value = limit;
    });

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      const formData = {
        title: titleField.value,
        limit: limitField.value,
        id: selected.value,
      };

      try {
        await ctx.root.$store.dispatch('categories/updateCategory', formData);

        titleField.value = '';
        limitField.value = 100;

        $v.titleField.$reset();
        $v.limitField.$reset();

        ctx.root.$message('Category updated');
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    return {
      categories,
      titleField,
      limitField,
      selected,
      isTitleInvalid,
      isLimitInvalid,
      submit,
      $v,
      store: ctx.root.$store,
    };
  },
};
</script>
