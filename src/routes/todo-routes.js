const express = require('express');
const router = express.Router();
const todoController = require('../controller/todo-controller');
const {isLoggedIn} = require('../middleware/middleware-login');

// Rute untuk menambahkan kegiatan (Create)
router.post('/add', todoController.addKegiatan);

// Rute untuk mendapatkan semua kegiatan (Read)
router.get('/', todoController.getAllKegiatan);

// Rute untuk mendapatkan kegiatan berdasarkan ID (Read)
router.get('/edit/:id', todoController.getKegiatanById);

// Rute untuk memperbarui kegiatan (Update)
router.post('/update/:id', todoController.updateKegiatan);

// Rute untuk menghapus kegiatan (Delete)
router.get('/delete/:id', todoController.deleteKegiatan);

router.get('/', isLoggedIn, (req, res) => {
    res.render('todo', {
        layout: 'layouts/main-layouts',
        title: 'Todo',
        showNavbar: true,
        showFooter: true,
    });
});


module.exports = router;