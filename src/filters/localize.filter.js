import _ from "lodash"
import ru from "../locales/ru.json"
import en from "../locales/en.json"

const locales = {
  "ru-RU": ru,
  "en-US": en
}

export default function localizeFilter(key, store) {
  const locale =
    _.get(store, "getters['userInfo/info'].locale", null) || "ru-RU"

  return locales[locale][key] || `[Localize error] key ${key} not found`
}
