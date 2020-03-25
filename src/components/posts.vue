<template>
	<div class="posts">
		<div class="posts__header">
			<h1 class="posts__title">Посты</h1>
			<router-link
				v-if="checkRole"
				to="/addPost"
				tag="div">
				<b-button
					class="posts__button"
					type="is-info"
					icon-left="plus-outline">
				</b-button>
			</router-link>
		</div>
		<ul class="posts__list">
			<li
				v-for="(element, index) in paginatePosts"
				:key="index"
				class="posts__item">
				<v-post
					:title="element.title"
					:description="element.description"
					:claps="element.claps"
					:created="element.created"
					:updated="element.updated"
					:id="element.id">
				</v-post>
			</li>
		</ul>
		<b-pagination
			v-if="viewPogination"
			@change="pageChange"
			:total="posts.length"
			:current.sync="current"
			:range-before="3"
			:range-after="3"
			:per-page="perPage"
			icon-prev="chevron-left"
			icon-next="chevron-right"
			rounded
			order="is-centered"
			class="posts-pagination">
		</b-pagination>
	</div>
</template>

<script>
import vPost from './post';
import { mapGetters } from 'vuex';

export default {
	name: 'vPosts',
	created () {
		this.$store.dispatch('posts/getPosts');
	},
	data () {
		return {
			current: parseInt(this.$route.params.page),
			perPage: 10
		};
	},
	methods: {
		pageChange (page) {
			this.$router.push('/posts/' + page);
		}
	},
	computed: {
		...mapGetters('posts', [
			'posts'
		]),
		...mapGetters('users', [
			'id',
			'role'
		]),
		paginatePosts () {
			const from = (this.current - 1) * this.perPage;
			const to = from + this.perPage;

			return this.posts.slice(from, to);
		},
		viewPogination () {
			if (this.perPage >= this.posts.length) {
				return false;
			} else {
				return true;
			}
		},
		checkRole () {
			const id = this.$cookies.get('userId');

			if (id) {
				this.$store.dispatch('users/getUserFromCookies', parseInt(id));
			}

			return this.id && this.role === 'writer';
		}
	},
	components: {
		vPost
	}
};
</script>

<style scoped>
	.posts {
		padding: 20px 0;
	}

	.posts__header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.posts__title {
		margin-top: .5em;
	}

	.posts__list {
		list-style: none;
		margin-left: 0;
	}

	.posts__item + .posts__item {
		margin-top: 20px;
	}

	.pagination {
		max-width: 400px;
		margin-left: auto;
		align-items: flex-end;
	}
</style>
