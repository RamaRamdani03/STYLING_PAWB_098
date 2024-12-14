const database = require('../config/database')

const allContact = (req, res) => {
    const { Name, Telepon, Alamat } = req.body;
    const sql = 'INSERT INTO contact (name, telepon, alamat) VALUES (?, ?, ?)';

    database.query(sql, [Name, Telepon, Alamat], (err, result) => {
        if (err) {
            console.error('Error adding kegiatan:', err);
            return res.status(500).send('Gagal menambahkan kegiatan');
        }
        res.redirect('/contact');
    });
};

const getContact = (req, res) => {
    const sql = 'SELECT * FROM contact';

    database.query(sql, (err, results) => {
        if (err) {
            console.error('Error fetching kegiatan:', err);
            return res.status(500).send('Gagal mengambil data kegiatan');
        }
        res.render('contact', {
            title: 'Contact',
            layout: 'layouts/main-layouts',
            kegiatan: results,
            showNavbar: true, // Tambahkan ini untuk mengirim variabel ke template
            showFooter: true // Tambahkan jika Anda juga ingin footer ditampilkan
        });
    });
};

const putContact = (req, res) => {
    const id = req.params.id;
    const { Name, Telepon, Alamat } = req.body;
    const sql = 'UPDATE contact SET Name = ?, Telepon = ?, Alamat = ? WHERE id_contact = ?';
    database.query(sql, [Name, Telepon, Alamat, id], (err, result) => {
        if (err) {
            console.error('Error updating kegiatan:', err);
            return res.status(500).send('Gagal memperbarui kegiatan');
        }
        res.redirect('/contact');
    });
};

const deleteContact = (req, res) => {
    const id = req.params.id;
    const sql = 'DELETE FROM contact WHERE id_contact = ?';

    database.query(sql, [id], (err, result) => {
        if (err) {
            console.error('Error deleting contact:', err);
            return res.status(500).send('Gagal menghapus contact');
        }
        res.redirect('/contact');
    });
};


module.exports = {
    allContact,
    getContact,
    putContact,
    deleteContact,
};