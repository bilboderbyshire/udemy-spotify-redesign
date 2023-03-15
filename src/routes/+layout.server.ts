import type { LayoutServerLoad } from './$types';
import { SPOTIFY_BASE_URL } from '$env/static/private';
import { redirect } from '@sveltejs/kit';

// Everytime a page in our program is loaded, this function is run. This is because this is a root file, and there's something
 // about how it's a server as well as a layout page that makes this important. I think it's about how this file is always
 // run FIRST, before the layout.ts page.

// This function will return an object that can be accessed from any page. To make this simpler, it is automatically "imported" in the 
 // layout page via the data object: routes/+layout.svelte line 7
export const load: LayoutServerLoad = async ({ cookies, fetch, url }) => {
	// We collect the access and refresh tokens from the stored cookies. Since every page will want to personalise themselves
	 // to the user, we should automatically load their information using their credentials from the cookies
	const accessToken = cookies.get('access_token');
	const refreshToken = cookies.get("refresh_token");

	// If the access token is empty, return a null object. This should trigger a force to the /login page (I think...)
	if (!accessToken) {
		return {
			user: null
		};
	}

	// We make a fetch request to ourselves (??) I have no idea what route this is referring to
	const profileRes = await fetch(`${SPOTIFY_BASE_URL}/me`, {
		headers: {
			// We specify that this request is authorizing the user according to their access token(??)
			Authorization: `Bearer ${accessToken}`
		}
	});

	// If the request we just made was successful (??) we turn our profile into a json version of the response
	if (profileRes.ok) {
		const profile: SpotifyApi.CurrentUsersProfileResponse = await profileRes.json();
		
		// The profile of the user is returned
		return {
			user: profile
		};
	} 

	// If the request wasn't successful, specifically because the access token has expired (or changed) and there is a refresh token
	 // We will run the refresh endpoint.
	if (profileRes.status === 401 && refreshToken) {
		const refreshRes = await fetch("/api/auth/refresh");
		if (refreshRes.ok) {
			// If the refresh is successful, we redirect to the original page the user was trying to get to
			throw redirect(307, url.pathname)
		}

		// If the refresh isn't successful, return an empty user. This should trigger a force to the /login page
		return {
			user: null
		};
	
	// If the request wasn't successful, and there is no refresh token then return an empty user
	} else {
		return {
			user: null
		};
	}
};