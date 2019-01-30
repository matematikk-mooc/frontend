jQuery(function($) {
    if(document.location.pathname == "/login/canvas") {
        mmooc.utilRoot.redirectFeideAuthIfEnrollReferrer();
    }
    else if (document.location.pathname == "/courses") {
        mmooc.utilRoot.redirectToEnrollIfCodeParamPassed();
    }
});

