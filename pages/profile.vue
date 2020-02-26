<template>
  <div>
    <div class="page-title">
      <h3>{{ 'profile-title' | localize }}</h3>
    </div>

    <form
      class="form"
      @submit.prevent="submit"
    >
      <div class="input-field">
        <input
          id="description"
          type="text"
          :class="{
            invalid: isNameInvalid,
          }"
          v-model="nameField"
        >

        <label for="description">{{ 'profile-name' | localize }}</label>

        <small
          v-if="isNameInvalid"
          class="helper-text invalid"
        >
          {{ 'profile-message-incorrect-name' | localize }}
        </small>
      </div>

      <div class="switch">
        <label>
          Eng
          <input
            type="checkbox"
            v-model="isRusLocale"
          >
          <span class="lever"></span>
          Rus
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{ 'profile-update' | localize }}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';
import useVuelidate from '@vuelidate/core';
import { required } from 'vuelidate/lib/validators';

export default {
  head() {
    return {
      title: this.$title('profile-title'),
    };
  },
  setup(props, ctx) {
    const info = computed(() => ctx.root.$store.getters['userInfo/info']);
    const nameField = ref('');
    const isRusLocale = ref();

    const $v = useVuelidate(
      {
        nameField: { required, $autoDirty: true },
      },
      { nameField },
    );

    const isNameInvalid = computed(() => $v.nameField.$dirty && $v.nameField.$invalid);

    const submit = async () => {
      if ($v.$invalid) {
        return;
      }

      try {
        await ctx.root.$store.dispatch('userInfo/updateUserInfo', {
          name: nameField.value,
          locale: isRusLocale.value ? 'ru-RU' : 'en-US',
        });
        // eslint-disable-next-line no-empty
      } catch (e) {}
    };

    onMounted(async () => {
      nameField.value = info.value.name;
      isRusLocale.value = info.value.locale === 'ru-RU';

      await ctx.root.$nextTick();
      // eslint-disable-next-line no-undef
      M.updateTextFields();
    });

    return {
      nameField,
      submit,
      isNameInvalid,
      $v,
      isRusLocale,
    };
  },
};
</script>

<style lang="scss" scoped>
  .switch {
    margin-bottom: 16px;
  }
</style>
