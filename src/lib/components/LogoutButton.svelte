<script lang="ts">

	import { invalidateAll } from "$app/navigation";

</script>

<!-- When this form is submitted it will post a message to the logout endpoint here: .../routes/api/auth/logout/+server.ts  -->
<form method="POST" action="/api/auth/logout" on:submit|preventDefault={async () => {
    // The response constant will fetch a response from the endpoint
    const response = await fetch("/api/auth/logout", {
        // The type of fetch is a POST method which is used to send data to a server for
         // creating or updating a resource: https://www.w3schools.com/tags/ref_httpmethods.asp
        method: "POST",

        // A header is an additional prop that represents the meta-data associated with this API request/response:   
        headers: {
            // The accept header indicates which content type the client (our device?) 
             // should recieve from the server: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept
            
             // In this case a MIME type of application/json is used to specify that the response from the server should be
             // given as a json type. The server will then send a response with the content-type header of application/json
             
             // In normal circumstances the server will infer what content-type to respond with, this hardcodes it to prevent
             // any unwanted errors (I think...?)
            accept: "application/json"
        }
    });
    // If the fetched response is successful (success: true) then invalidate all current pages (force a refresh)
     // This will update the components in the displayed. In this case, the pages will no longer contain user specific information and
     // will be forced to the /login page as defined by the logout endpoint
    if (response.ok) {
        invalidateAll();
    }
}}>
    <button type="submit">Logout</button>
</form>