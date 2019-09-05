import Vue from 'vue';
import App from './app.vue';
import router from './router';

router.afterEach(() => {
  window.scrollTo(0, 0);
});

if (process.env.NODE_ENV !== 'production') {
  Vue.config.productionTip = false;
}

new Vue({
  el: '#app',
  router,
  render: h => h(App),
});
