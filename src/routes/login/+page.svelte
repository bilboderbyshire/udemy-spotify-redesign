<script>
    import { Button } from "$components";
    import logo from "$assets/spotify_logo_full_purple.png";
    import cover from "$assets/spotify-cover-image.png";

</script>

<div class="wrapper">
    <div class="content">
        <img src={logo} class="logo" alt="Spotify logo"/>
        <h1>£10.00 GBP for 3 months of Premium!</h1>
        <p>Enjoy ad-free listening, offline playback, and more. Cancel anytime</p>
        <div class="buttons">
            <Button element="a" variant="outline" href="https://www.spotify.com/" target="blank" rel="noopener noreferrer">
            Sign up</Button>
            <Button element="a" variant="solid" href="/api/auth/login">Login</Button>
        </div>
    </div>

    <div class="cover">
        <img src={cover} alt="Svelte album cover"/>
    </div>
</div>

<style lang="scss">
    :global(body) {
        background-image: linear-gradient(355deg, var(--accent-color), var(--secondary-color), var(--faux-white));
        height: 100vh;
        min-width: 300px;

        @include breakpoint.down("md") {
            height: 100%;
        }
    }

    .wrapper {
        display: flex;
        width: 100%;
        max-width: 1200px;
        margin: 80px auto 0;
        align-items: center;
        flex-direction: row;

        @include breakpoint.down("md") {
            flex-direction: column;
            margin: 20px auto 0;
        }
    }

    .cover {
        flex: 1;
        margin-left: 20px;

        @include breakpoint.down("md") {
            margin-left: 0;
            margin-top: 30px;
        }

        img {
            width: 100%;
            box-shadow: 15px 17px 39px -9px rgba(0,0,0,0.75);
        }
    }

    .content {
        flex: 1.8;

        h1 {
            font-size: functions.toRem(40);
        }

        p {
            font-size: functions.toRem(20);
        }

        .buttons {
            margin-top: 40px;

            :global(.button) {
                margin-right: 10px;
                padding: 8px 16px;
                text-transform: uppercase;
            }

        }

        .logo {
            width: 250px;
            max-width: 100%;
            margin-bottom: 30px;
        }
    }
</style>