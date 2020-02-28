import Vue from "vue"

import VueCompositionAPI from "@vue/composition-api"
import dateFilter from "@/filters/date.filter"
import currencyFilter from "@/filters/currency.filter"
import localizeFilter from "@/filters/localize.filter"

import { VuelidatePlugin } from "@vuelidate/core"
import messagePlugin from "@/utils/message.plugin"

import tooltipDirective from "@/directives/tooltip.directive"

import Loader from "@/components/app/Loader.vue"

Vue.use(VueCompositionAPI)

Vue.filter("date", dateFilter)
Vue.filter("currency", currencyFilter)
Vue.filter("localize", localizeFilter)

Vue.use(VuelidatePlugin)
Vue.use(messagePlugin)

Vue.directive("tooltip", tooltipDirective)

Vue.component("Loader", Loader)
