import type { RequestHandler } from './$types';
import {SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET} from "$env/static/private";
import { error, json } from '@sveltejs/kit';

// As far as I'm aware, this endpoint is called when a new page is accessed and the root layout.server page notices that the
 // access token has expired. You can see this in /routes/+layout.server.ts on line 26
export const GET: RequestHandler = async ({cookies, fetch}) => {
    // We start by getting our refresh token that is stored in a cookie
    const refreshToken = cookies.get("refresh_token");

    // We then send a request to the spotify API. They will check our credentials and permissions regarding the user and respond
     // with a new access token
    const response = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`).toString("base64")}`
        },
        body: new URLSearchParams({
            // We let the API know that we want to use our refresh token
            grant_type: "refresh_token",

            // We provide our refresh token for them to verify
            refresh_token: refreshToken || ""
        })
    });

    // We wait for a response from the API, and store it as a json object
    const responseJSON = await response.json();
    
    // If the response from the API comes back as an error, we force logout our user by deleting their cookies, and then
     // throw them to an error page letting them know what the error is.
    if (responseJSON.error) {
        cookies.delete("refresh_token"), {path: "/"};
        cookies.delete("access_token"), {path: "/"};
        throw error(401, responseJSON.error_description);
    }

    // If there is no error, we get the new refresh token given to us by the API and overwrite our current refresh token with it
    cookies.set("refresh_token", responseJSON.refresh_token, {path: "/"});

    // We also update our access token
    cookies.set("access_token", responseJSON.access_token, {path: "/"});

    // We return the full response to the +layout.server.ts file that originally called this endpoint.
    return json(responseJSON);
};