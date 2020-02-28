import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _9deb65d0 = () => interopDefault(import('../pages/categories.vue' /* webpackChunkName: "pages/categories" */))
const _0c01b570 = () => interopDefault(import('../pages/history.vue' /* webpackChunkName: "pages/history" */))
const _ef3dd6c6 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _47a02ed9 = () => interopDefault(import('../pages/planning.vue' /* webpackChunkName: "pages/planning" */))
const _20c99046 = () => interopDefault(import('../pages/profile.vue' /* webpackChunkName: "pages/profile" */))
const _1a5a22cd = () => interopDefault(import('../pages/record.vue' /* webpackChunkName: "pages/record" */))
const _57aee31f = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _2b8c2410 = () => interopDefault(import('../pages/detail/_id.vue' /* webpackChunkName: "pages/detail/_id" */))
const _828d1cf4 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/categories",
    component: _9deb65d0,
    name: "categories"
  }, {
    path: "/history",
    component: _0c01b570,
    name: "history"
  }, {
    path: "/login",
    component: _ef3dd6c6,
    name: "login"
  }, {
    path: "/planning",
    component: _47a02ed9,
    name: "planning"
  }, {
    path: "/profile",
    component: _20c99046,
    name: "profile"
  }, {
    path: "/record",
    component: _1a5a22cd,
    name: "record"
  }, {
    path: "/register",
    component: _57aee31f,
    name: "register"
  }, {
    path: "/detail/:id?",
    component: _2b8c2410,
    name: "detail-id"
  }, {
    path: "/",
    component: _828d1cf4,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
