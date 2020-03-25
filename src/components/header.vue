<template>
	<header class="header">
		<div class="container">
			<b-navbar>
				<template slot="brand">
					<b-navbar-item tag="router-link" to="/posts/1">
						<img
							src="@/assets/img/buefy-logo.png"
							alt="Posts">
					</b-navbar-item>
				</template>
				<template slot="end">
					<b-navbar-item tag="div">
						<router-link
							v-if="!id"
							to="/login"
							tag="div"
							class="buttons">
							<a class="button is-primary">Логин</a>
						</router-link>
						<b-button
							v-else
							@click="exit"
							type="is-info"
							icon-right="door-open">
							Выйти
						</b-button>
					</b-navbar-item>
				</template>
			</b-navbar>
		</div>
	</header>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	name: 'vLogin',
	methods: {
		exit () {
			this.$cookies.remove('userId');
			location.href = '/';
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
	.header {
		padding: 20px 0;
		background-color: lightslategrey;
	}

	.navbar {
		background-color: transparent;
	}

	.navbar-item {
		justify-content: flex-end;
	}
</style>
