<template>
	<div class="error">
		<h1 class="error__title">Страница не найдена</h1>
		<router-link
			to="/posts/1"
			tag="div"
			class="error__link">
			<b-button
				type="is-info">
				Вернуться на главную
			</b-button>
		</router-link>
	</div>
</template>

<script>
export default {
	name: 'v404',
	beforeMount () {
		const id = this.$cookies.get('userId');

		if (!id) {
			this.$router.replace('/posts/1');
		} else {
			this.$store.dispatch('users/getUserFromCookies', parseInt(id));
		}
	}
};
</script>

<style scoped>
	.error {
		padding: 20px 0;
	}

	.error__title {
		text-align: center;
	}

	.error__link {
		text-align: center;
	}
</style>
