import Vue from 'vue'
import {
  ValidationProvider,
  ValidationObserver,
  localize,
  extend,
} from 'vee-validate'
import ja from 'vee-validate/dist/locale/ja.json'
import {
  required,
  required_if,
  email,
  max,
  min,
  regex,
} from 'vee-validate/dist/rules'

extend('required', required)
extend('required_if', required_if)
extend('email', email)
extend('max', max)
extend('min', min)
extend('regex', regex)

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
localize('ja', ja)
