jQuery(function($) {
    // Checks if we hit the /canvas/login from Feide Enroll pages
    // If we go from permitted refferer, we redirect to Feide auth
    // when page user is unauthenticated and does not provide `?normalLogin` param

    if(document.location.pathname == "/login/canvas") {
        mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    }
    else if (document.location.pathname == "/courses") {
        mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
    }
});

