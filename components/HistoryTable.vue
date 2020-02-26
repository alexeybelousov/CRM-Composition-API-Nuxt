<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{ 'amount' | localize(store) }}</th>
      <th>{{ 'date' | localize(store) }}</th>
      <th>{{ 'categories-title' | localize(store) }}</th>
      <th>{{ 'type' | localize(store) }}</th>
      <th>{{ 'open' | localize(store) }}</th>
    </tr>
    </thead>

    <tbody>
    <tr
      v-for="(record, idx) in records"
      :key="record.id"
    >
      <td>{{ idx + 1}}</td>
      <td>{{ record.amount | currency('RUB') }}</td>
      <td>{{ Date.parse(record.date) | date('datetime') }}</td>
      <td>{{ record.categoryName }}</td>
      <td>
        <span
          class="white-text badge"
          :class="[record.typeClass]"
        >
          {{ record.typeText }}
        </span>
      </td>
      <td>
        <button
          v-tooltip="'Open record details'"
          class="btn-small btn"
          @click="$router.push(`/detail/${record.id}`)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>

export default {
  props: {
    records: {
      type: Array,
      require: true,
    },
  },
  setup(props, ctx) {
    return {
      store: ctx.root.$store,
    }
  }
};
</script>
