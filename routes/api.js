var express = require('express');
var router = express.Router();
const { getAll,
  getOneNote,
  createNote,
  modifyNote,
  deleteNote } = require('../model/db_note');
const { Toast } = require('../src/js/mod/toast');

router.get('/notes', async (req, res, next) => {
  getAll()
    .then(notes => res.send(notes))
});
router.post('/note/create', async (req, res, next) => {
  const { id } = req.body
  const result = await getOneNote(id)
  if (result.length === 0) {
    createNote(id, 'input here')
      .then(() => console.log('create success'))
  } else {
    Toast('duplicated')
  }
})

router.post('/note/edit', async (req, res, next) => {
  const { id, note } = req.body
  modifyNote(id, note)
    .then(() => console.log('edit success'))
})
router.post('/note/delete', async (req, res, next) => {
  deleteNote(req.body.id)
    .then(() => console.log('delete success'))
})

module.exports = router;
