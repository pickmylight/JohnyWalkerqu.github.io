var oktaSignIn = new OktaSignIn({
  baseUrl: "{{ https://johnywalkerqu.github.io/ }}",
  clientId: "{{ 0oa5crc1jmLOKLyyU5d6 }}",
  authParams: {
    issuer: "{{ https://johnywalkerqu.github.io/ }}/oauth2/default",
    responseType: ["token", "id_token"],
    display: "page"
  }
});

if (oktaSignIn.token.hasTokensInUrl()) {
  oktaSignIn.token.parseTokensFromUrl(
    // If we get here, the user just logged in.
    function success(res) {
      var accessToken = res[0];
      var idToken = res[1]

      oktaSignIn.tokenManager.add("accessToken", accessToken);
      oktaSignIn.tokenManager.add("idToken", idToken);

      window.location.hash = "";
      document.getElementById("messageBox").innerHTML = "Hello, " + idToken.claims.email + "! You just logged in! :)";
    },
    function error(err) {
      console.error(err);
    }
  );
} else {
  oktaSignIn.session.get(function (res) {
    // If we get here, the user is already signed in.
    if (res.status === 'ACTIVE') {
      document.getElementById("messageBox").innerHTML = "Hello, " + res.login + "! You are *still* logged in! :)";
      return;
    }

    // If we get here, the user is not logged in, so we should show the sign-in form.
    oktaSignIn.renderEl(
      { el: '#sign-in-container' },
      function success(res) {},
      function error(err) {
        console.error(err);
      }
    );
  });
}