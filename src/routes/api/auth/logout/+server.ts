import { json, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";

// In the event that the user logs out of their account, this endpoint is called and this function is run. So far, the only way
 // this endpoint is called is via the form submission by the logoutButton here: lib/components/LogoutButton.svelte 


export const POST: RequestHandler = ({cookies, request}) => {
    // Initially, the cookies that contain the tokens specific to the user are deleted (meaning that our program can no longer use their
     // information)
    cookies.delete("refresh_token", { path: "/" });
    cookies.delete("access_token", { path: "/" });

    // A check is then made that the header provided in the request made by the LogoutButton.svelte component has been sent in the
     // correct MIME format (application/json).
    if (request.headers.get("accept") === "application/json"){
        return json({
            // If the check is passed, success is returned to the LogoutButton.svelte button
            success: true
        });
    }

    // The user is then forced to the login page
    throw redirect(303, "/login");
}