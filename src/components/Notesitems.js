import React, { useContext } from 'react'
import noteContext from '../context/notes/NoteContext'


const Notesitems = ({ note,updateNoteHandler }) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { _id, key, title, description, tag } = note;

    const deleteNoteHandler = () => {
        deleteNote(_id)
    }

    return (
        <div className="col-3 my-2 d-flex align-items-stretch">
            <div className="card flex-grow-1" key={key} >

                <div className="card-body">

                    <h5 className="card-title text-center">{title}</h5>
                    <p className='text-end'>
                        <i className="fas fa-trash-alt mx-2" onClick={deleteNoteHandler}></i>
                        <i className="fas fa-edit mx-2" onClick={()=>{updateNoteHandler(note)}}></i>
                    </p>
                    <hr />
                    <p><small className="text-muted">{tag}</small></p>
                    <hr />
                    <p className="card-text">{description}</p>



                </div>
            </div>
        </div>
    )
}

export default Notesitems
