<script lang="ts">
	import { Navigation } from '$components';
	import { page } from '$app/stores';
	import { ChevronDown, type Icon, ExternalLink } from 'lucide-svelte';
	import { tippy } from '$actions';
	import LogoutButton from './LogoutButton.svelte';

	$: user = $page.data.user;
</script>

<div class="content">
	<div class="left">
		<Navigation desktop={false} />
	</div>
	<div class="right">
		<div id="profile-button">
			<button
				class="profile-button"
				use:tippy={{
					content: document.getElementById('profile-menu') || undefined,
					trigger: 'click',
					placement: 'bottom-end',
					theme: 'menu',
					arrow: false,
					interactive: true,
					onMount: () => {
						const template = document.getElementById('profile-menu');
						if (template) {
							template.style.display = 'block';
						}
					}
				}}
			>
				{#if user?.images && user.images.length > 0}
					<img src={user.images[0].url} alt="" />
				{/if}
				{user?.display_name}
				<span class="visually-hidden">Profile menu</span>
				<ChevronDown class="profile-arrow" size={22} />
			</button>
		</div>
		<div id="profile-menu" style="display: none;">
			<div class="profile-menu-content">
				<ul>
					<li>
						<a href={user?.external_urls.spotify} target="_blank" rel="noopener norefferer"
							>View on Spotify
							<ExternalLink focusable="false" aria-hidden="true" size={12}/>
						</a>
					</li>
					<li>
						<a href="/profile">View Profile</a>
					</li>
					<li>
						<LogoutButton />
					</li>
				</ul>
			</div>
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
		background-color: var(--accent-button-trans);
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

	.profile-menu-content {
		padding: 5px 0;
		ul {
			padding: 0;
			margin: 0;
			list-style: none;

			li {

				a :global(svg){
					vertical-align: middle;
					margin-left: 5px;
					margin-bottom: 5px;
				}

				a,
				:global(button) {
					display: inline-block;
					padding: 10px 15px;
					text-decoration: none;
					cursor: pointer;
					border: none;
					color: var(--text-color);
					background: none;
					width: 100%;
					text-align: left;
					font-size: functions.toRem(15);
				}

				&:hover {
					background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
				}

			}
		}
	}
	
</style>
