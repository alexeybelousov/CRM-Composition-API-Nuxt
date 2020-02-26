export default function({ store, route, redirect }) {
  const user = store.getters['auth/user'];

  if (!user) {
    redirect('/login?message=login');
  }
}
