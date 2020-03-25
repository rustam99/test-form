<template>
	<div id="app">
		<v-header></v-header>
		<div class="content">
			<div class="container">
				<router-view></router-view>
			</div>
		</div>
	</div>
</template>

<script>
import vHeader from './components/header';

export default {
	components: {
		vHeader
	}
};
</script>

<style>
	.content .pagination-list {
		list-style: none;
	}
</style>
