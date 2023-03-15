<script lang="ts">
    import type { HTMLAnchorAttributes, HTMLButtonAttributes } from "svelte/elements";

    // Sets the type of this element to either be a button or an anchor tag
    type Element = $$Generic<"button" | "a">;

    // A storage interface that stores the acceptable attributes (as imported and specified above)
     // for each of the possible element types this component can act as
    interface ButtonComponentElements {
        button : HTMLButtonAttributes;
        a : HTMLAnchorAttributes;
    }

    // Sets up the possible props that can be passed to this component on import. The type of props is adjusted
     // by the interface by passing in the key that is dynamically set by the exported element variable.
    type $$Props = ButtonComponentElements[Element] & {
        element: Element
        variant?: "solid" | "outline" | "danger";
        className?: string;
    };

    export let element: Element;
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
            color: var(--text-color);
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