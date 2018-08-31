const express = require('express');
const router = express.Router();

// Item Model
const Item = require('../../models/Item');

// @route GET request ke api/items
// @desc Get All Items
// @access Public

router.get('/', (req, res) => {
  Item.find()
    .sort({ date: -1 }) //sorting descending klo ascending 1
    .then(items => res.json(items))
});

// @route post request ke api/items
// @desc menambah Items
// @access Public

router.post('/', (req, res) => {
  const newItem = new Item({
    name: req.body.name
  }); //Item adalah variabel untuk item model di atas 

  newItem
    .save() //simpan name dalam variabel newItem
    .then(item => res.json(item)); //meminta kembali
});

// @route DELETE request ke api/items/:id <=== maksudnya item dengan ID tertentu(ID sudah diatur mongoDB secara otomatis) berapapun ID tersebut
// @desc menghapus Items
// @access Public

router.delete('/:id', (req, res) => {
   Item
    .findById(req.params.id) //findById fungsi dari mongoDB, req.params.id adalah mongoURI otomatis
    .then(
          item => item.remove() //hapus item
            .then(() => res.json({success: true})) //kemudian menampilkan pesan dengan mengirimkan json success
        )
    .catch(err => res.status(404).json({success: false})) //jika ID tidak ditemukan atau ID yg dimasukkan tidak ada [if] model baru maka success: false
    //find() findById() sort() save() then() catch() remove() semua ini adalah "promises" jika satu berhasil dikerjakan maka terusan ke semua yg disebutkan itu akan dikerjakan
});

module.exports = router;