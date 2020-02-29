<template>
  <form class="card auth-card" @submit.prevent="submit">
    <div class="card-content">
      <span class="card-title">{{ "login-title" | localize(store) }}</span>

      <div class="input-field">
        <input
          id="email"
          v-model.trim="emailField"
          :disabled="loading"
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
          :disabled="loading"
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
    </div>

    <div class="card-action">
      <div>
        <button
          :disabled="loading"
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{ "login" | localize(store) }}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{ "login-no-account" | localize(store) }}
        <n-link tag="a" to="/register">
          {{ "register" | localize(store) }}
        </n-link>
      </p>
    </div>
  </form>
</template>

<script>
import { ref, computed, onMounted } from "@vue/composition-api"
import useVuelidate from "@vuelidate/core"
import { email, required, minLength } from "vuelidate/lib/validators"
import messages from "@/utils/messages"

export default {
  head() {
    return {
      title: this.$title("login-title")
    }
  },
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.getters["auth/user"]) {
      return redirect("/")
    }
  },
  layout: "empty",
  setup(props, ctx) {
    const loading = computed(() => ctx.root.$store.getters['auth/loading'])

    const emailField = ref("")
    const passwordField = ref("")

    const $v = useVuelidate(
      {
        emailField: { email, required, $autoDirty: true },
        passwordField: { required, minLength: minLength(6), $autoDirty: true }
      },
      { emailField, passwordField }
    )

    const isEmailInvalid = computed(
      () => $v.emailField.$dirty && $v.emailField.$invalid
    )
    const isPasswordInvalid = computed(
      () => $v.passwordField.$dirty && $v.passwordField.$invalid
    )

    const submit = async () => {
      if ($v.$invalid) {
        return
      }

      const formData = {
        email: emailField.value,
        password: passwordField.value
      }

      try {
        await ctx.root.$store.dispatch("auth/login", formData)
        ctx.root.$router.push("/")
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }

    onMounted(() => {
      if (messages[ctx.root.$route.query.message]) {
        ctx.root.$message(messages[ctx.root.$route.query.message])
      }
    })

    return {
      loading,
      emailField,
      passwordField,
      submit,
      isEmailInvalid,
      isPasswordInvalid,
      $v,
      store: ctx.root.$store
    }
  }
}
</script>
