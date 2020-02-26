<script>
import { Pie } from 'vue-chartjs';

export default {
  extends: Pie,
  props: {
    chartData: {
      type: Object,
      required: true,
    },
    options: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    this.renderChart(this.chartData, {
      maintainAspectRatio: false,
      height: 200,
      ...this.options,
    });
  },
};
</script>
