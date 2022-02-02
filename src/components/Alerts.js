import React,{useContext} from 'react'
import NoteContext from '../context/notes/NoteContext';
const Alerts = () => {
    const context = useContext(NoteContext);
    const{alertMsg, setAlertMsg}=context
    return (
        <>
            <div className="alert alert-success" role="alert">
                {alertMsg}
            </div>
        </>
    )
}

export default Alerts
