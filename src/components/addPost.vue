<template>
	<div class="add-post">
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
			@click="addPost"
			class="add-post__button"
			type="is-success">
				Добавить
		</b-button>
		<b-button
			@click="goBack"
			class="add-post__button"
			type="is-info">
				Назад
		</b-button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { checkUser } from '@/assets/js/functions';

export default {
	name: 'vAddPost',
	created () {
		checkUser(this);
	},
	data () {
		return {
			title: '',
			desc: '',
			disabled: true
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
		addPost () {
			const time = Math.ceil(new Date().getTime() / 1000 / 60 / 60 / 24);

			this.$store.dispatch('posts/addPost', {
				title: this.title,
				description: this.desc,
				claps: 0,
				created: time,
				updated: 0,
				userId: this.id
			}).then(() => {
				this.$router.go(-1);
			});
		},
		goBack () {
			this.$router.go(-1);
		}
	},
	computed: {
		...mapGetters('users', [
			'id'
		])
	}
};
</script>

<style scoped>
	.add-post {
		max-width: 800px;
		margin: 20px auto 0;
	}

	.add-post__button + .add-post__button {
		margin-left: 20px;
	}
</style>
