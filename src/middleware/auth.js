export default function({ store, redirect }) {
  const user = store.getters["auth/user"]

  if (!user) {
    redirect("/login?message=login")
  }
}
