<script lang="ts">
    import type { ComponentType } from "svelte";
    import { Home, Search, ListMusic, type Icon } from "lucide-svelte";
    import logo from "$assets/spotify_logo_full_white.png";
	import { page } from "$app/stores";
	import { slide } from "svelte/transition";

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
    <nav aria-label="Main">
        <div class="nav-content-inner">
            <img src={logo} class="logo" alt="spotify logo"/>
            <ul>
                {#each menuItems as item}
                    <li class:active={item.path === $page.url.pathname}>
                        <a href="{item.path}">
                            <svelte:component this={item.icon} focusable="false" aria-hidden="true"/>
                            <p>{item.label}</p>
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </nav>
</div>

<style lang="scss">
    .nav-content {

        .logo {
            max-width: 100%;
            width: 150px;
        }

        .nav-content-inner {
            padding: 20px;
            min-width: var(--sidebar-width);
            background-color: var(--sidebar-color);
            height: 100vh;
            overflow: auto;
            display: none;

            ul {
                padding: 0;
                margin: 20px 0 0;
                list-style: none;

                li {
                    &.active {
                        a {
                            opacity: 1;
                        }
                    }
                    
                    a {
                        display: flex;
                        max-height: fit-content;
                        align-items: center;
                        text-decoration: none;
                        color: var(--light-text-color);
                        font-size: functions.toRem(16);
                        padding: 5px;
                        margin: 10px 0;
                        opacity: 0.7;
                        transition: opacity 0.2s;

                        &:hover, 
                        &:focus {
                            opacity: 1;
                        }
                    }

                    :global(svg) {
                        margin-right: 12px;
                        width: 25px;
                        height: 25px;
                    }

                    p {
                        max-height: 100%;
                        height: auto;
                        margin: auto 0;
                        font-weight: 500;
                    }
                }
            };
        }

        &.desktop {
            position: sticky;
            top: 0;
            .nav-content-inner {
                @include breakpoint.up("md") {
                    display: block;
                }
                
            }
        }
    }
</style>