import { redirect } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { SPOTIFY_APP_CLIENT_ID, BASE_URL } from "$env/static/private";
import pkce from "pkce-gen";

// This function generates a random string of given length from the standard alphanumeric character set
const generateRandomString = (length: number) => {
    let randomString = "";
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < length; i++) {
		randomString += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
	}
	return randomString;
}   

// This scope represents all the permissions we are asking the user to give us when they agree to using our app. This essentially
 // lets the spotify server know that we are asking for access to these features of the users account, the server can then pass this
 // on to the user, and if they agree, the server is authorized to give us access to them.
const scope =
'ugc-image-upload user-modify-playback-state user-read-playback-state user-read-currently-playing user-follow-modify user-follow-read user-read-recently-played user-read-playback-position user-top-read playlist-read-collaborative playlist-modify-public playlist-read-private playlist-modify-private app-remote-control streaming user-read-email user-read-private user-library-modify user-library-read';

// The state is a generated string of 16 characters.
const state = generateRandomString(16);

// The challenge is generated by the pkce library. Purely guesswork, the challenge is an object that provides the server with an
// code_challenge. The server then takes the challenge, does something with it (hashing of some kind?) and returns a code. 
// Any time we access the API, we can just provide the code, and code_verifier we used, allowing the api to quickly authorise 
// our permissions by comparing the provided information to their stored information.
const challenge = pkce.create()

export const GET: RequestHandler = ({cookies}) => {
    // The generated state and challenge are stored in cookies allowing us to use them in our callback endpoint
    cookies.set("spotify_auth_state", state)
    cookies.set("spotify_auth_challenge_verifier", challenge.code_verifier)

    // Redirect the user directly to the spotify website, asking them to log in. We provide the spotify website with some extra 
     // url parameters, specifying which program is asking for this information (client_id), how much information is being asked for
     // (scope), where to go after the user has completed logging in (redirect_uri), the special string we can use to verify the 
     // websites response when it redirects to our callback (state), and our authorization challenge (code_challenge).

    // Once the user has completed logging in and agreeing to this programs use of their data, it redirects to the callback endpoint
     // here: api/auth/callback/+server.ts
    throw redirect(
        307, 
        `https://accounts.spotify.com/authorize?${new URLSearchParams({
            response_type: "code",
            client_id: SPOTIFY_APP_CLIENT_ID,
            scope,
            redirect_uri:  `${BASE_URL}/api/auth/callback`,
            state,
            code_challenge_method: 'S256',
            code_challenge: challenge.code_challenge

        })
    }`);
};