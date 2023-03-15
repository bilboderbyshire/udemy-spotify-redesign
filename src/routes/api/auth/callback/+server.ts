import { error, redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import {BASE_URL, SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET} from "$env/static/private"

// This function gets called when this endpoint is referenced, which is after the user has agreed to relinquish their
 // data to this program. The pathway looks like this:
    // The user clicks login and runs the /api/auth/login/+server.ts file
    // The user is sent to the spotify login page to log them in and asks them to agree to their data being handled by us
    // When the server is done with their end of the bargain, they then run the redirect_uri, which is this file, providing it
     // with information from the server itself.
export const GET: RequestHandler = async ({url, cookies, fetch}) => {
    // The url is deconstructed to get the code and the state (they come from the spotify server after the user has logged in) 
     // and stored in a variable

    // We generated the state in the original login endpoint, I assume is what allows us to verify that the response from the server
     // is related to the request we made. We compare the state given to us, to the state we saved in our cookies when the user
     // originally clicked login

    // The code is what the spotify server responds with, as long as the user has actually logged in and agreed. Look at the
     // original login endpoint for a clearer idea of what the code is.

    // In the situation where the response has no stored code or state, the variables are set to null. A check will handle this later
    const code = url.searchParams.get("code") || null;
    const state = url.searchParams.get("state") || null;

    // The cookies currently stored on the browser are inspected to get the authorization state, and the challenge verifier
    const storedState = cookies.get("spotify_auth_state") || null;
    const storedChallengeVerifier = cookies.get("spotify_auth_challenge_verifier") || null;

    // If there is no state, there will be an error with the request and a 400 error page is thrown
     // If the state in the response doesn't match the one stored in the cookies, there's obviously a problem
    if (state === null || state !== storedState) {
        throw error(400, "State Mismatch");

    }

    // If the response passes the validations, a request is now sent to the spotify api for access and refresh tokens
     // that can be stored in our cookies
    const response  = await fetch("https://accounts.spotify.com/api/token", {
        // The method of sending the request is a POST, which edits or changes the contents in the API:
         // https://www.w3schools.com/tags/ref_httpmethods.asp
        method: "POST",
        headers: {
            // The content type of this request is stored in the headers. This type of request uses the type
             // application/x-www-form-urlencoded which is a method of sending small alphanumeric content:
             // https://stackoverflow.com/questions/4007969/application-x-www-form-urlencoded-or-multipart-form-data
            "Content-Type": "application/x-www-form-urlencoded",

            // This request is specifically being sent after the user has selected agree to their data being handled in
             // this program. So now we send a request to the api using the information specific to our program. (I think
             // this means that the spotify api can check our credentials, verify that we really are the program we say we are,
             // check that the user has definitely agreed to using our app, and then provide us with the relevant information
             // of the user)
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`).toString("base64")}`
        },

        // The body of our request is going to contain some new information, specifically the information from the server that
         // proves the user agreed to using our program (code, and code_verifier). The api will contain the code, and our cookies
         // stores the original pkce generated code_verifier we created. The api will run our verifier through their process, and if the result
         // matches the code we've provided, it means we're authorized.

        // The fetch will then redirect us back to this page (?? Maybe because we need to complete the rest of this function? 
         // But it's an async so I'm not sure)
        body: new URLSearchParams({
            code: code || "",
            redirect_uri: `${BASE_URL}/api/auth/callback`,
            grant_type: "authorization_code",
            code_verifier: storedChallengeVerifier || "",
            client_id: SPOTIFY_APP_CLIENT_ID
                    })
    });

    // Assuming that the redirect_uri sends us back here in order to complete the rest of this function, we create a JSON version
     // of the response from the API in a constant. 
    const responseJSON = await response.json();
    
    // If the response is an error, we throw an error with the description stored in the error response
    if (responseJSON.error) {
        throw error(400, responseJSON.error_description);
    }

    // If the response from the API is successful, we delete the authorization cookies (since they're not needed anymore) and
     // replace them with tokens given to us by the API.
    cookies.delete("spotify_auth_state");
    cookies.delete("spotify_auth_challenge_verifier");

    // The refresh token appears to be used to allow our program to grab a new access token if it expires. I assume this allows
     // us to skip having to access the spotify server again to verify the user, going directly to the API instead. 
     // More information about what happens with the refresh token in the refresh endpoint here: api/auth/refresh/+server.ts
    cookies.set("refresh_token", responseJSON.refresh_token, {path: "/"});

    // The access token is the important one, giving us direct access to the users information from the spotify API immediately
     // without having to constantly verify it via the spotify server (I think...)
    cookies.set("access_token", responseJSON.access_token, {path: "/"});

    // NOTE:: The {path: "/"} object represents where to store the cookies being created here (I think). Storing it in the root
     // page means that this information is accessible from any child page, which should be all of them.

    // Once the cookies have been set, throw the user to the home page of our program.
    throw redirect(303, "/");

}