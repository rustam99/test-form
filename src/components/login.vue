<template>
	<div class="form">
		<b-field label="E-mail">
			<b-input
				@input="valid"
				v-model="email"
				ref="email"
				placeholder="E-mail"
				type="email">
			</b-input>
		</b-field>
		<b-field label="Пароль">
			<b-input
				@input="valid"
				v-model="password"
				ref="password"
				placeholder="Пароль"
				type="password"
				minlength="5"
				maxlength="10"
				validation-message="Пароль должен состоять от 5 до 10 символов">
			</b-input>
		</b-field>
		<b-button
			:disabled="disabled"
			@click="login"
			class="form__button"
			type="is-info">
			Войти
		</b-button>
	</div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
	name: 'vLogin',
	beforeMount () {
		const id = this.$cookies.get('userId');

		if (id) {
			this.$router.replace('/posts/1');
		}
	},
	data () {
		return {
			disabled: true,
			email: '',
			password: ''
		};
	},
	methods: {
		...mapActions('users', [
			'getUserFromLogin',
			'getUserFromCookies'
		]),
		valid (e) {
			if (refValid(this, 'email') &&
				refValid(this, 'password')) {
				this.disabled = false;
			}
		},
		login () {
			this.getUserFromLogin({
				email: this.email,
				password: this.password
			}).then(r => {
				if (typeof r === 'string') {
					this.$buefy.notification.open({
						duration: 5000,
						message: r,
						position: 'is-bottom-right',
						type: 'is-danger',
						hasIcon: true
					});
				} else {
					this.$router.go(-1);
				}
			});
		}
	}
};

function refValid ($this, ref) {
	if ($this.$refs[ref].$refs.input.validity.valid &&
		$this.$refs[ref].$refs.input.value) {
		return true;
	} else {
		return false;
	}
}
</script>

<style scoped>
	.form {
		max-width: 800px;
		margin: 20px auto 0;
	}
</style>
