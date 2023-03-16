<script lang="ts">
	import { Navigation } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, type Icon } from 'lucide-svelte';

	$: user = $page.data.user;
</script>

<div class="content">
	<div class="left">
		<Navigation desktop={false} />
	</div>
	<div class="right">
		<div id="profile-button">
			<button class="profile-button">
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" />
				{/if}
				{user?.display_name}
				<span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
	}

	.profile-button {
		background-color: var(--sidebar-color);
		//border: 1px solid var(--border);
		border: none;
		padding: 5px;
		border-radius: 25px;
		display: flex;
		color: var(--light-text-color);
		align-items: center;
		cursor: pointer;

		:global(.profile-arrow) {
			margin-left: 3px;
		}

		img {
			width: 28px;
			height: 28px;
			border-radius: 100%;
			margin-right: 10px;
		}

		&:hover {
			background-image: linear-gradient(rgba(200, 200, 200, 0.3) 0 0);
		}
	}
</style>
