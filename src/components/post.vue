<template>
	<div class="card">
		<div class="card-content">
			<p class="title">{{ title }}</p>
			<div class="content">{{ description }}</div>
		</div>
		<footer class="card-footer">
			<div class="card-footer__date">{{ date }}</div>
			<div class="card-footer__buttons">
				<b-button
					v-if="isWriter"
					@click="deletePost"
					class="card__button"
					type="is-danger"
					icon-right="delete">
					Удалить
				</b-button>
				<router-link
					:to="{name: 'editPost', params: {id: id}}"
					tag="div">
					<b-button
						v-if="isWriter"
						class="card__button"
						type="is-info"
						icon-right="pencil">
						Изменить
					</b-button>
				</router-link>
				<b-button
					v-if="isReader"
					@click="incClaps"
					class="card__button"
					type="is-info"
					icon-left="hand-left">
					{{ claps }}
				</b-button>
			</div>
		</footer>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'vPost',
	props: {
		title: String,
		description: String,
		claps: Number,
		created: Number,
		updated: Number,
		id: Number
	},
	created () {
		const days = Math.ceil(new Date().getTime() / 1000 / 60 / 60 / 24);
		const post = this.$store.getters['posts/post'](this.id);

		if (post.updated) {
			this.days = days - post.updated;
			this.typeAction = 'Обнавлен';
		} else {
			this.days = days - post.created;
			this.typeAction = 'Создан';
		}
	},
	data () {
		return {
			days: 0,
			typeAction: ''
		};
	},
	methods: {
		deletePost () {
			this.$store.dispatch('posts/deletePost', this.id);
		},
		incClaps () {
			const post = this.$store.getters['posts/post'](this.id);
			const claps = post.claps + 1;
			const time = Math.ceil(new Date().getTime() / 1000 / 60 / 60 / 24);

			this.$store.dispatch('posts/addClaps', {
				postId: this.id,
				title: post.title,
				description: post.description,
				claps: claps,
				created: post.created,
				updated: time,
				userId: post.userId
			});
		}
	},
	computed: {
		...mapGetters('users', [
			'role'
		]),
		isWriter () {
			return this.role === 'writer';
		},
		isReader () {
			return this.role === 'reader';
		},
		date () {
			const ten = Math.floor(this.days / 10 % 10);
			let one = this.days % 10;

			if (one > 1 && one < 5) {
				one = one + ' дня';
			} else if (one === 1) {
				one = one + ' день';
			} else if (one === 0) {
				one = 0;
			} else {
				one = one + ' дней';
			}

			if (one === 0) {
				return `${this.typeAction} сегодня`;
			} else if (ten === 0) {
				return `${this.typeAction} ${one} назад`;
			} else {
				return `${this.typeAction} ${ten}${one} назад`;
			}
		}
	}
};
</script>

<style scoped>
	.card-footer {
		justify-content: space-between;
		align-items: center;
		padding: 5px 5px 5px 20px;
	}

	.card-footer__buttons {
		display: flex;
	}

	.card__button {
		margin: 0 10px;
	}
</style>
