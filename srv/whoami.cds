/*
 * Diagnostic endpoint: shows which user, roles and token scopes the server actually receives.
 * Open  /whoami/me()  in the browser.  Remove this file before go-live.
 */
@path: '/whoami'
@requires: 'authenticated-user'
service WhoAmI {
    function me() returns {
        user     : String;
        roles    : many String;
        authKind : String;
        scopes   : many String;
        issuer   : String;
        clientId : String;
    };
}
