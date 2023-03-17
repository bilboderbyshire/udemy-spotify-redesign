// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		
		// This interface allows us to set up our own type hints for objects that we create. In this case, we are saying
		 // that we are going to create a user object inside each of our pages. That user object will be of type 
		 // SpotifyApi.CurrentUsersProfileResponse, but we can set up our own by nesting another object inside
		interface PageData {
			user: SpotifyApi.CurrentUsersProfileResponse | null;
			title?: string;
		}
		// interface Platform {}
	}
}

export {};
