<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <a href="#" @click.prevent="$emit('toggle-sidebar')">
          <i class="material-icons black-text">dehaze</i>
        </a>
        <span class="black-text">{{ date | date("datetime", store) }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            ref="dropdownRef"
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
          >
            {{ name }} | {{ bill | currency("RUB") }}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id="dropdown" class="dropdown-content">
            <li>
              <n-link tag="a" to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{ "profile-title" | localize(store) }}
              </n-link>
            </li>
            <li class="divider" tabindex="-1" />
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{ "logout" | localize(store) }}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount
} from "@vue/composition-api"

export default {
  setup(props, ctx) {
    const date = ref(new Date())
    let interval = null
    let dropdown = null

    onMounted(() => {
      interval = setInterval(() => {
        date.value = new Date()
      }, 1000)
      // eslint-disable-next-line no-undef
      dropdown = M.Dropdown.init(ctx.refs.dropdownRef, {
        constrainWidth: false
      })
    })

    const name = computed(() => ctx.root.$store.getters["userInfo/info"].name)
    const bill = computed(() => ctx.root.$store.getters["userInfo/info"].bill)

    onBeforeUnmount(() => {
      clearInterval(interval)
      if (dropdown && dropdown.destroy) {
        dropdown.destroy()
      }
    })

    const logout = async () => {
      await ctx.root.$store.dispatch("auth/logout")
      ctx.root.$router.push("/login?message=logout")
    }

    return {
      date,
      name,
      bill,
      logout,
      store: ctx.root.$store
    }
  }
}
</script>
