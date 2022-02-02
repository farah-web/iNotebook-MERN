const { Router } = require('express')
const router = Router();
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

//ROUTE 1: Add note using:POST "/api/notes/addnote"
router.post('/addnote', fetchuser, [
    body('title', 'Title should be atleast 3 characters long.').isLength({ min: 3 }),
    body('description', 'Description should be atleast 5 characters long.').isLength({ min: 5 }),
], async (req, res) => {
    const { title, description, tag } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {

        const note = await Note.create({
            user: req.user.id,
            title,
            description,
            tag
        })

        res.status(201).json(note)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'internal Server error' })
    }
})

//ROUTE 2: Fetch all notes of that specific user using:GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    console.log('user:id--', req.user.id)
    try {
        const note = await Note.find({ user: req.user.id })
        console.log("value in note : ", note)
        if (!note) {
            res.json({ error: "Please enter correct user credentials" })
        }

        res.json(note)
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'internal Server error' })
    }
})
//ROUTE 3: Update the notes of that specific user using:PUT "/api/notes/updatenote"
//here :id -- consists of the note's id which is supposed to be updated
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const { title, description, tag } = req.body;

    const newNote = {};
    if (title) { newNote.title = title }
    if (description) { newNote.description = description }
    if (tag) { newNote.tag = tag }
// Check whether the note of that id exists 
    try {
        let note = await Note.findById(req.params.id)
        console.log("note: ", note)
        if (!note) {
            return res.status(404).send("Wrong Note")
        }
// Check whether the user who wrote that note exists 
console.log("note.user: ", note.user.toString())
        if (note.user.toString() !== req.user.id) {
            res.status(404).send("Wrong User")
        }
//if he note and the user of that note exists then--- find that note based on that its id and update it
        const updateNote = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ updateNote })
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'internal Server error' })
    }
})

//ROUTE 4: Deletethe notes of that specific user using:PUT "/api/notes/deletenote"
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
 
// Check whether the note of that id exists 
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            return res.status(404).send("Wrong Note")
        }
// Check whether the user who wrote that note exists 
console.log("note.user: ", note.user.toString())
        if (note.user.toString() !== req.user.id) {
            res.status(404).send("Wrong User")
        }
//if he note and the user of that note exists then--- find that note based on that its id and delete it
        const deleteNote = await Note.findByIdAndDelete(req.params.id)
        res.json({ "Success": 'Note Deleted' , "note":deleteNote})
    }
    catch (err) {
        console.log(err.message)
        res.status(500).json({ error: 'internal Server error' })
    }
})

module.exports = router;