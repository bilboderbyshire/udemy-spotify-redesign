<script lang="ts">
    export let element: "button" | "a";
    export let variant: "solid" | "outline" | "danger" = "solid";
    export let className: string = "";
</script>

<svelte:element this={element} class="button button-{variant} {className}" on:click {...$$restProps}>
    <slot/>
</svelte:element>

<style lang="scss">
    .button {
        display: inline-block;
        border: none;
        font-weight: 600;
        font-size: functions.toRem(16);
        border-radius: 20px;
        cursor: pointer;
        padding: 7px 15px;
        text-decoration: none;

        &.button-solid {
            background-color: var(--accent-color);
            color: #000;
            border: 2px solid var(--accent-color);
        }

        &.button-outline {
            background-color: none;
            color: var(--text-color);
            border: 2px solid;
        }

        &.button-danger {
            background-color: var(--error);
            color: #fff;
            border: 2px solid var(--error);
        }

        &:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }

        &:hover {
            &.button-solid, 
            &.button-danger {
                background-image: linear-gradient(rgba(0,0,0,0.1) 0 0);
            }

            &.button-outline {
                background-image: linear-gradient(rgba(255,255,255,0.1) 0 0);
            }
        }

        &:active {
            &.button-solid,
            &.button-danger {
                background-image: linear-gradient(rgba(255,255,255,0.1) 0 0);
            }
            &.button-outline {
                background-image: linear-gradient(rgba(255,255,255,0.3) 0 0);
            }
        }

    }
</style>