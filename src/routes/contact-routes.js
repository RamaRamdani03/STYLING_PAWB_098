const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/middleware-login');

// Import controller untuk menangani pengiriman formulir kontak
const contactController = require('../controller/contact-controller');

// Rute untuk menampilkan halaman kontak (formulir)
router.get('/', contactController.getContact);
router.put('/:id', contactController.putContact);
router.delete('/:id', contactController.deleteContact);

router.get('/', isLoggedIn, (req, res) => {
    res.render('contact', {
        title: 'Contact',
        layout: 'layouts/main-layouts',
        showNavbar: true,
        showFooter: true,
    });
})
module.exports = router;