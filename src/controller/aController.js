const database = require('../config/database');

// Controller untuk Register
const registerUser = (req, res) => {
    const { username, password } = req.body;
    const sql = 'INSERT INTO user (username, password) VALUES (?, ?)';

    database.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error('Register Error:', err);
            return res.status(500).send('Gagal mendaftarkan user');
        }
        res.status(200).send('User berhasil didaftarkan');
    });
};

//Controller untuk Render SignUp Page
const renderSingnUpPage = (req, res) => {
    res.render('SignUp', {
        layout: 'layouts/main-layouts',
        title: 'signUp',
        showNavbar: false,
        showFooter: false,
    });
};

//Controller untuk Render SignIn Page
const renderSingnInPage = (req, res) => {
    res.render('SignIn', {
        layout: 'layouts/main-layouts',
        title: 'signIn',
        showNavbar: false,
        showFooter: false,
    });
};

// Controller untuk SignIn User
const signInUser = (req, res) => {
    const { username, password } = req.body;

    database.query('SELECT * FROM user WHERE username = ? AND password = ?',
        [username, password], (err, result) => {
            if (err) {
                console.error('Database Error:', err);
                return res.status(500).send('Error fetching user');
            }

            if (result.length === 0) {
                console.log('User not found:', username, password);
                return res.status(400).send('User not found');
            }

            req.session.idUser = result[0].id;
            res.redirect('/');
        });
};

// Controller untuk Logout
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Logout Error:', err);
            return res.status(500).send('Error logging out');
        }
        res.redirect('/SignIn');
    });
};

// Export semua controller
module.exports = {
    registerUser,
    renderSingnUpPage,
    renderSingnInPage,
    signInUser,
    logoutUser,
};