<script lang="ts">
	import { LogoutButton } from "$components";
    import 'modern-normalize/modern-normalize.css';
    import '../styles/main.scss';
	import type { LayoutData } from './$types';

    // This data contains all the user information that was collected in the +layout.server.ts file. If there is a valid
     // access token, this information will be from the Spotify API
    export let data: LayoutData;

    // A simplification of the data, allowing us to specifically access the spotify user data
    $: user = data.user;
</script>

<div id="main">
    <div id="content">
        <main id="main-content">
            <slot/>
        </main>
    </div>
</div>

<style lang="scss">
    #main {
        #content {
            main#main-content {
                padding: 30px 15px 60px;
                @include breakpoint.up("md") {
                    padding: 30px 30px 60px;
                }
            }
        }
    }
</style> 