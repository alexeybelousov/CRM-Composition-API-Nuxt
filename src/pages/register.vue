<template>
  <form class="card auth-card" @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">{{ "register-title" | localize(store) }}</span>

      <div class="input-field">
        <input
          id="email"
          v-model.trim="emailField"
          type="text"
          class="validate"
          :class="{
            invalid: isEmailInvalid
          }"
        >

        <label for="email">{{ "email" | localize(store) }}</label>

        <small v-if="isEmailInvalid" class="helper-text invalid">
          {{ "email-incorrect" | localize(store) }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="password"
          v-model.trim="passwordField"
          type="password"
          class="validate"
          :class="{
            invalid: isPasswordInvalid
          }"
        >

        <label for="password">{{ "password" | localize(store) }}</label>

        <small v-if="isPasswordInvalid" class="helper-text invalid">
          {{ "password-incorrect" | localize(store) }}
        </small>
      </div>

      <div class="input-field">
        <input
          id="name"
          v-model.trim="nameField"
          type="text"
          class="validate"
          :class="{
            invalid: isNameInvalid
          }"
        >

        <label for="name">{{ "name" | localize(store) }}</label>

        <small v-if="isNameInvalid" class="helper-text invalid">
          {{ "register-name-incorrect" | localize(store) }}
        </small>
      </div>

      <p>
        <label>
          <input v-model="agreeCheckbox" type="checkbox">
          <span>{{ "register-agree-with-rules" | localize(store) }}</span>
        </label>
      </p>
    </div>

    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{ "register" | localize(store) }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "register-have-account" | localize(store) }}
        <router-link tag="a" to="/login">
          {{ "login" | localize(store) }}
        </router-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref, computed } from "@vue/composition-api"
import useVuelidate from "@vuelidate/core"
import { email, required, minLength } from "vuelidate/lib/validators"

export default {
  head() {
    return {
      title: this.$title("register-title")
    }
  },
  layout: "empty",
  setup(props, ctx) {
    const emailField = ref("")
    const passwordField = ref("")
    const nameField = ref("")
    const agreeCheckbox = ref(false)

    const $v = useVuelidate(
      {
        emailField: { email, required, $autoDirty: true },
        passwordField: { required, minLength: minLength(6), $autoDirty: true },
        nameField: { required, $autoDirty: true },
        agreeCheckbox: { checked: v => v }
      },
      {
        emailField,
        passwordField,
        nameField,
        agreeCheckbox
      }
    )

    const isEmailInvalid = computed(
      () => $v.emailField.$dirty && $v.emailField.$invalid
    )
    const isPasswordInvalid = computed(
      () => $v.passwordField.$dirty && $v.passwordField.$invalid
    )
    const isNameInvalid = computed(
      () => $v.nameField.$dirty && $v.nameField.$invalid
    )

    const submit = async () => {
      if ($v.$invalid) {
        return
      }

      const formData = {
        email: emailField.value,
        password: passwordField.value,
        name: nameField.value
      }

      try {
        await ctx.root.$store.dispatch("auth/register", formData)
        ctx.root.$router.push("/")
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    return {
      emailField,
      passwordField,
      nameField,
      agreeCheckbox,
      submit,
      isEmailInvalid,
      isPasswordInvalid,
      isNameInvalid,
      $v,
      store: ctx.root.$store
    }
  }
}
</script>
