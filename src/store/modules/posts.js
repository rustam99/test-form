import axios from 'axios';

export default {
	namespaced: true,
	state: {
		posts: []
	},
	getters: {
		posts (state) {
			return state.posts;
		},
		post: (state) => (id) => {
			const map = {};

			for (let i = 0; i < state.posts.length; i++) {
				map[state.posts[i].id] = state.posts[i];
			}

			return map[id];
		}
	},
	mutations: {
		changePosts (state, posts) {
			state.posts = posts;
		},
		splicePosts (state, post) {
			const index = state.posts.indexOf(post);

			state.posts.splice(index, 1);
		},
		changePostClaps (state, data) {
			const index = state.posts.indexOf(data.post);

			state.posts[index].claps = data.claps;
		},
		changePost (state, data) {
			const index = state.posts.indexOf(data.post);

			for (const key in state.posts[index]) {
				state.posts[index][key] = data[key];
			}
		}
	},
	actions: {
		getPosts ({ commit }) {
			return axios.get('http://localhost:3000/posts')
				.then(r => {
					commit('changePosts', r.data);
				});
		},
		addPost ({ commit }, post) {
			return axios.post('http://localhost:3000/posts', pullObj(post));
		},
		editPost (store, data) {
			return axios.put(`http://localhost:3000/posts/${data.postId}`, pullObj(data))
				.then(() => {
					const post = store.getters.post(data.postId);

					store.commit('changePost', {
						...pullObj(data),
						post
					});
				});
		},
		deletePost (store, id) {
			axios.delete(`http://localhost:3000/posts/${id}`)
				.then(() => {
					const post = store.getters.post(id);

					store.commit('splicePosts', post);
				});
		},
		addClaps (store, data) {
			return axios.put(`http://localhost:3000/posts/${data.postId}`, pullObj(data))
				.then(() => {
					const post = store.getters.post(data.postId);

					store.commit('changePostClaps', {
						post: post,
						claps: data.claps
					});
				});
		}
	}
};

function pullObj (data) {
	return {
		title: data.title,
		description: data.description,
		claps: data.claps,
		created: data.created,
		updated: data.updated,
		userId: data.userId
	};
}
