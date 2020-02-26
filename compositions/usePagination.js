import _ from 'lodash';
import { ref } from '@vue/composition-api';

export default function usePagination(ctx) {
  const pageSize = 5;
  let allItems = [];

  const pageFromQuery = +ctx.root.$route.query.page || 1;
  const page = ref(pageFromQuery);
  const items = ref([]);
  const pageCount = ref(0);

  const initPagination = (list) => {
    allItems = _.chunk(list, pageSize);
    pageCount.value = _.size(allItems);
    items.value = allItems[page.value - 1] || allItems[0];
  };

  const pageChange = (pageNum) => {
    ctx.root.$router.push(`${ctx.root.$route.path}?page=${pageNum}`);
    items.value = allItems[pageNum - 1] || allItems[0];
  };

  return {
    initPagination,
    page,
    items,
    pageCount,
    pageChange,
  };
}
