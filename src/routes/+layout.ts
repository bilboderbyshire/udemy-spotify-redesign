import { redirect } from "@sveltejs/kit";
import type { LayoutLoad } from "./$types";

// Everytime a page in the program is accessed, this function is run
export const load: LayoutLoad = ({data, url}) => {
    const {user} = data || {};

    // If the user is logged in and they try to access the login page, redirect them to the home page
    if (user && url.pathname === "/login") {
        throw redirect(307, "/");
    }

    // If the user is not logged in and they try to access any page other than the login page, force them to the login page
    if (!user && url.pathname !== "/login"){
        throw redirect(307, "/login");
    }

    // Give the user data back to the page
    return {
        user
    };
}