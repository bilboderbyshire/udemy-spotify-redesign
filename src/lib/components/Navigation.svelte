<script lang="ts">
    import type { ComponentType } from "svelte";
    import { Home, Search, ListMusic, type Icon } from "lucide-svelte";
    import logo from "$assets/spotify_logo_full_white.png";
	import { page } from "$app/stores";

    export let desktop: boolean = true;

    const menuItems: { path: string; label: string; icon: ComponentType<Icon> }[] = [
        {
            path: "/",
            label: "Home",
            icon: Home
        },
        {
            path: "/search",
            label: "Search",
            icon: Search
        },
        {
            path: "/playlists",
            label: "Playlists",
            icon: ListMusic
        }
    ];
</script>

<div class="nav-content" class:desktop class:mobile={!desktop}>
    <nav aria-label="nav-content-inner">
        <img src={logo} class="logo" alt="spotify logo" width="100px"/>
        <ul>
            {#each menuItems as item}
                <li class:active={item.path === $page.url.pathname}>
                    <a href="{item.path}">
                        <svelte:component this={item.icon} focusable="false" aria-hidden="true"/>
                        {item.label}
                    </a>
                </li>
            {/each}
        </ul>
    </nav>
</div>