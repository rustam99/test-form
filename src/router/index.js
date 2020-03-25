import Vue from 'vue';
import VueRouter from 'vue-router';

import posts from '../components/posts';
import login from '../components/login';
import edit from '../components/editPost';
import add from '../components/addPost';
import v404 from '../components/404';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		redirect: '/posts/1'
	},
	{
		path: '/posts/:page',
		component: posts
	},
	{
		path: '/login',
		component: login
	},
	{
		path: '/editPost/:id',
		name: 'editPost',
		component: edit
	},
	{
		path: '/addPost',
		component: add
	},
	{
		path: '*',
		component: v404
	}
];

const router = new VueRouter({
	mode: 'history',
	routes
});

export default router;
