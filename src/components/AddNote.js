import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/NoteContext'

const AddNote = () => {
    const context = useContext(noteContext);
    const {notes, addNote } = context;
    const [credentials, setCredentials] = useState({
        title: '',
        description: '',
        tag: ''
    })


    const AddNoteHandler = (e) => {
        e.preventDefault()
        addNote(credentials)
        setCredentials({
            title: '',
            description: '',
            tag: ''
        })
    }
    const onChangeHandler = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })

    }
    return <div>
        <div className="container my-4">
            <h2>Add Notes</h2>

            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={credentials.title}
                        onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text"
                        className="form-control"
                        id="description"
                        name="description"
                        value={credentials.description}
                        onChange={onChangeHandler} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text"
                        className="form-control"
                        id="tag"
                        name="tag"
                        value={credentials.tag}
                        onChange={onChangeHandler} />
                </div>
                <button disabled={credentials.title.lenght<5 || credentials.description.length<5}type="submit" className="btn btn-primary" onClick={AddNoteHandler}>Add Note</button>
            </form>
            <h2 className='my-4'>Your Notes</h2>
        </div>
    </div>;
};

export default AddNote;
