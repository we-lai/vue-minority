import Vue from 'vue'
import Router from 'vue-router'
import Index from './components/index'

Vue.use(Router)
const lazyload = component => () => import(`./components/${component}.vue`)

export default new Router({
  routes: [
    {
      path: '/',
      component: Index
    },
    {
      path: '/apart-letter',
      component: lazyload('apart-letter')
    }
  ]
})
