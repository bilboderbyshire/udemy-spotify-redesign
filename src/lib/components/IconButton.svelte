<script lang="ts">
	import type { Icon } from "lucide-svelte";
	import type { ComponentType } from "svelte";
	import type { HTMLButtonAttributes } from "svelte/elements";


    export let icon: ComponentType<Icon>;
    export let iconColor: string = "--text-color"

    interface $$Props extends HTMLButtonAttributes {
        icon: ComponentType<Icon>;
        label: string;
    }

    export let label: string;

</script>

<button on:click on:mouseover on:focus on:keydown {...$$restProps}>
    <svelte:component this={icon} color="var({iconColor})" aria-hidden="true" focusable="false"/>
    <span class="visually-hidden">{label}</span>
</button>

<style lang="scss">
    button {
        border: none;
        background-color: none;
        cursor: pointer;
        padding: 0;
        width: 38px;
        height: 38px;
        border-radius: 10px;

        :global(svg) {
            vertical-align: middle;
        }

        &:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }

        &:active {
            background-image: linear-gradient(rgba(100, 100, 100, 0.2) 0 0);
        }
    }
</style>