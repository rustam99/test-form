import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vueCookies from 'vue-cookies';
import '@mdi/font/css/materialdesignicons.css';
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

Vue.config.productionTip = false;

Vue.use(vueCookies);
Vue.use(Buefy);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app');
