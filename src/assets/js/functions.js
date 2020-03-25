function checkUser (context) {
	const userId = context.$cookies.get('userId');
	let role;

	if (!userId) {
		context.$router.replace('/posts/1');
	} else {
		context.$store.dispatch('users/getUserFromCookies', parseInt(userId))
			.then(() => {
				role = context.$store.getters['users/role'];

				if (role !== 'writer') {
					context.$router.replace('/posts/1');
				}
			});
	}
}

function viewDate (context) {
	const ten = Math.floor(context.days / 10 % 10);
	let one = context.days % 10;

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
		return `${context.typeAction} сегодня`;
	} else if (ten === 0) {
		return `${context.typeAction} ${one} назад`;
	} else {
		return `${context.typeAction} ${ten}${one} назад`;
	}
}

export { checkUser, viewDate };
