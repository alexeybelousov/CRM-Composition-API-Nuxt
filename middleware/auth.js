// export default function({ store, redirect }) {
//   console.log(store.getters.user);
//   if (!store.getters.user) {
//     debugger;
//     redirect('/login?message=login')
//   }
// }
export default function({ store, route, redirect }) {
  const user = store.getters['auth/user'];
  // const blockedRoute = /\/admin\/*/g;
  // const homeRoute = "/";
  if (!user) {
  // if (!user && route.path.match(blockedRoute)) {
    redirect('/login?message=login');
  }

  const loginRoute = /\/login\/*/g;

  if (user && route.path === loginRoute) {
    redirect('/');
  }
}
