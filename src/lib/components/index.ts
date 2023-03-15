// This file allows the importing of components in this directory without having to import the specific file path for each one
 // For example, in normal circumstances, importing the logout button would require this import line:
    // import LogoutButton from "../lib/components/LogoutButton.svelte"
        
        // or if using aliases correctly
    
    // import LogoutButton from "$components/LogoutButton.svelte"

 // But with this index file, the import can be as simple as writing:
    // import { LogoutButton } from "$components"

 // This system also allows you to import multiple components on the same import line:
    // import { LogoutButton, Button } from "$components"
 
 // Instead of having to import each component on their own line:
    // import LogoutButton from "../lib/components/LogoutButton.svelte"
    // import Button from "../lib/components/Button.svelte"
    

export {default as LogoutButton} from "./LogoutButton.svelte";
export {default as Button} from "./Button.svelte";
export {default as Navigation} from "./Navigation.svelte";