const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/middleware-login');
const aController = require('../controller/aController');

// Routes untuk SignUp
router.get('/SignUp', aController.renderSingnUpPage);
router.post('/SignUp', aController.registerUser);

//Routes untuk SignIn
router.get('/SignIn', aController.renderSingnInPage);
router.post('/SignIn', aController.signInUser);

router.get('/Logout', aController.logoutUser);

router.get('/', isLoggedIn, (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layouts',
        title: 'Home',
        showNavbar: true,
        showFooter: true,
    });
});

module.exports = router;