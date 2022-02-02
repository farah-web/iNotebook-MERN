
import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/NoteContext'
import Notesitems from '../components/Notesitems'
import AddNote from '../components/AddNote'
import { useNavigate } from 'react-router-dom'


const Notes = () => {
    const navigate=useNavigate()
    const context = useContext(noteContext);
    const { notes, getNotes,updateNote,setAlertMsg } = context;
    const ref = useRef(null);
    const refClose = useRef(null);
    const [editCredentials, setEditCredentials] = useState({
        title: '',
        description: '',
        tag: ''
    })
    useEffect(() => {
        if (!localStorage.getItem('token')){
            navigate('/login')
        }
        else{
        getNotes()
        }
    }, []);

    const updateNoteHandler = (note) => {
        ref.current.click()
        setEditCredentials(note)
     }

    const NoteUpdatedHandler = (e) => {
        e.preventDefault()
        console.log("Edit Credentials ID is : " , editCredentials._id)
        refClose.current.click()
       updateNote(editCredentials)
    }
    const onChangeHandler = (e) => {
        setEditCredentials({ ...editCredentials, [e.target.name]: e.target.value })

    }
    return (
        <>
            <AddNote />

            {/* Modal start */}
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {/* form start */}
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text"
                                        className="form-control"
                                        id="title"
                                        name="title"
                                        value={editCredentials.title}
                                        onChange={onChangeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text"
                                        className="form-control"
                                        id="description"
                                        name="description"
                                        value={editCredentials.description}
                                        onChange={onChangeHandler} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text"
                                        className="form-control"
                                        id="tag"
                                        name="tag"
                                        value={editCredentials.tag}
                                        onChange={onChangeHandler} />
                                </div>
                               
                            </form>
                            {/* form end */}
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={NoteUpdatedHandler}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Modal end */}

            <div className='container'>
                <div className="row ">
                    {notes.length===0 ? 'No notes found':
                        notes.map((note) => {
                            return <Notesitems key={note._id} note={note} updateNoteHandler={updateNoteHandler} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default Notes
