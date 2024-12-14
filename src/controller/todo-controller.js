const database = require('../config/database');

// Controller untuk Menambahkan Kegiatan (Create)
const addKegiatan = (req, res) => {
    const { Nama_Kegiatan, Jenis_Kegiatan, Tanggal_Kegiatan } = req.body;
    const sql = 'INSERT INTO kegiatan (Nama_Kegiatan, Jenis_Kegiatan, Tanggal_Kegiatan) VALUES (?, ?, ?)';

    database.query(sql, [Nama_Kegiatan, Jenis_Kegiatan, Tanggal_Kegiatan], (err, result) => {
        if (err) {
            console.error('Error adding kegiatan:', err);
            return res.status(500).send('Gagal menambahkan kegiatan');
        }
        res.redirect('/todo');
    });
};

// Controller untuk Mendapatkan Semua Kegiatan (Read)
const getAllKegiatan = (req, res) => {
    const sql = 'SELECT * FROM kegiatan';

    database.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching kegiatan:', err);
            return res.status(500).send('Gagal mengambil data kegiatan');
        }
        res.render('todo', { 
            layout: 'layouts/main-layouts', 
            title: 'Daftar Kegiatan', 
            kegiatan: results,
            showNavbar: true, // Tambahkan ini untuk mengirim variabel ke template
            showFooter: true // Tambahkan jika Anda juga ingin footer ditampilkan
        });
    });
};


// Controller untuk Mendapatkan Kegiatan Berdasarkan ID
const getKegiatanById = (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM kegiatan WHERE id_Kegiatan = ?';

    database.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error fetching kegiatan:', err);
            return res.status(500).send('Gagal mengambil kegiatan');
        }
        if (result.length === 0) {
            return res.status(404).send('Kegiatan tidak ditemukan');
        }
        res.render('edit-todo', { 
            layout: 'layouts/main-layouts', 
            title: 'Edit Kegiatan', 
            kegiatan: result[0] 
        });
    });
};

// Controller untuk Memperbarui Kegiatan (Update)
const updateKegiatan = (req, res) => {
    const id = req.params.id;
    const { Nama_Kegiatan, Jenis_Kegiatan, Tanggal_Kegiatan } = req.body;
    const sql = 'UPDATE kegiatan SET Nama_Kegiatan = ?, Jenis_Kegiatan = ?, Tanggal_Kegiatan = ? WHERE id_Kegiatan = ?';
    database.query(sql, [Nama_Kegiatan, Jenis_Kegiatan, Tanggal_Kegiatan, id], (err, result) => {
        if (err) {
            console.error('Error updating kegiatan:', err);
            return res.status(500).send('Gagal memperbarui kegiatan');
        }
        res.redirect('/todo');
    });
};


// Controller untuk Menghapus Kegiatan (Delete)
const deleteKegiatan = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM kegiatan WHERE id_Kegiatan = ?';

    database.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting kegiatan:', err);
            return res.status(500).send('Gagal menghapus kegiatan');
        }
        res.redirect('/todo');
    });
};

module.exports = {
    addKegiatan,
    getAllKegiatan,
    getKegiatanById,
    updateKegiatan,
    deleteKegiatan
};