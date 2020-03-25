import axios from 'axios';
import Vue from 'vue';

export default {
	namespaced: true,
	state: {
		id: 0,
		role: ''
	},
	getters: {
		id (state) {
			return state.id;
		},
		role (state) {
			return state.role;
		}
	},
	mutations: {
		changeUserData (state, data) {
			state.id = data.id;
			state.role = data.role;
		}
	},
	actions: {
		getUserFromLogin ({ commit }, userData) {
			const email = userData.email;
			const password = userData.password;

			return axios.get(`http://localhost:3000/users?login=${email}`)
				.then(r => {
					if (r.data.length) {
						if (r.data[0].password === password) {
							commit('changeUserData', {
								id: r.data[0].id,
								role: r.data[0].role
							});

							Vue.$cookies.config('7d');
							Vue.$cookies.set('userId', r.data[0].id);
						} else {
							return 'Пароль или логин не верны';
						}
					} else {
						return 'Такого логина не существует';
					}
				});
		},
		getUserFromCookies ({ commit }, id) {
			return axios.get(`http://localhost:3000/users/?id=${id}`)
				.then(r => {
					commit('changeUserData', {
						id: r.data[0].id,
						role: r.data[0].role
					});
				});
		}
	}
};
