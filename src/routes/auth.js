// ------------------------------------------------------------------------------
//  ROUTING
// ------------------------------------------------------------------------------

function getRoot(req, res) {
    res.render('main')
}

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        res.redirect('profile')
    } else {
        res.render('login',{ message: req.flash('signMessage') });
    }
}

function getSignup(req, res) {
    res.render('signup',{ message: req.flash('signupMessage') });
}

function postLogin (req, res) {
    
    if (req.isAuthenticated()) {
        res.redirect('index?username='+req.user.username+'&email='+req.user.email)
    } else {
        res.redirect('login',)
    }
}

function postSignup (req, res) {
    if (req.isAuthenticated()) {
        res.redirect('index?username='+req.user.username+'&email='+req.user.email)
    } else {
        res.redirect('login')
    }
}

function getProfile (req, res) {
    if (req.isAuthenticated()) {
        let user = req.user;
        res.render('profileUser', { user: user, isUser:true })
    } else {
        res.redirect('login')
    }
}

function getFaillogin (req, res) {
    res.render('login-error', {});
}

function getFailsignup (req, res) {
    res.render('signup-error', {});
}

function getLogout (req, res) {
    req.logout( (err) => {
        if (!err) {
            req.session.destroy()
            res.render('login');
        } 
    });
}

function failRoute(req, res){
    res.status(404).render('routing-error', {});
}

function checkAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else {
        res.redirect("/login");
    }
}

module.exports = {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailsignup,
    checkAuthentication,
    getProfile
}
  