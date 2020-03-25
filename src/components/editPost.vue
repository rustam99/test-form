<template>
	<div class="edit-post">
		<b-field label="Заголовок">
			<b-input
				@input="isValid"
				v-model.trim="title"
				minlength="10">
			</b-input>
		</b-field>
		<b-field label="Описание">
			<b-input
				@input="isValid"
				type="textarea"
				v-model.trim="desc"
				minlength="25">
			</b-input>
		</b-field>
		<b-button
			:disabled="disabled"
			@click="editPost"
			class="edit-post__button"
			type="is-success">
				Изменить
		</b-button>
		<b-button
			@click="goBack"
			class="edit-post__button"
			type="is-info">
				Назад
		</b-button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { checkUser } from '@/assets/js/functions';

export default {
	name: 'vEditPost',
	created () {
		checkUser(this);

		const id = parseInt(this.$route.params.id);
		const post = this.$store.getters['posts/post'](id);

		this.postId = id;

		if (post) {
			this.title = post.title;
			this.desc = post.description;
		} else {
			this.$store.dispatch('posts/getPosts')
				.then(() => {
					const post = this.$store.getters['posts/post'](id);

					this.title = post.title;
					this.desc = post.description;
				});
		}
	},
	data () {
		return {
			disabled: true,
			title: '',
			desc: '',
			postId: 0
		};
	},
	methods: {
		isValid () {
			if (this.title.length >= 10 && this.desc.length >= 25) {
				this.disabled = false;
			} else {
				this.disabled = true;
			}
		},
		editPost () {
			const time = Math.ceil(new Date().getTime() / 1000 / 60 / 60 / 24);

			this.$store.dispatch('posts/editPost', {
				postId: this.postId,
				title: this.title,
				description: this.desc,
				claps: this.getPost.claps,
				created: this.getPost.created,
				updated: time,
				userId: this.$cookies.get('userId')
			})
				.then(() => {
					this.$router.go(-1);
				});
		},
		goBack () {
			this.$router.go(-1);
		}
	},
	computed: {
		...mapGetters('posts', [
			'post'
		]),
		getPost () {
			return this.post(this.postId);
		}
	}
};
</script>

<style scoped>
	.edit-post {
		max-width: 800px;
		margin: 20px auto 0;
	}

	.edit-post__button + .edit-post__button {
		margin-left: 20px;
	}
</style>
