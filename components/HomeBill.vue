<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{ 'bill-currency' | localize }}</span>

        <p
          v-for="currency of currencies"
          :key="currency"
          class="currency-line"
        >
          <span>{{ getCurrency(currency) | currency(currency) }}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/composition-api';

export default {
  props: {
    rates: Object,
  },
  setup(props, ctx) {
    const currencies = ['RUB', 'USD', 'EUR'];
    // eslint-disable-next-line max-len
    const base = computed(() => ctx.root.$store.getters['userInfo/info'].bill / props.rates.RUB / props.rates.EUR);
    const getCurrency = (currency) => Math.floor(base.value * props.rates[currency]);

    return {
      currencies,
      base,
      getCurrency,
    };
  },
};
</script>
