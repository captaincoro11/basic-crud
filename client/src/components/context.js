import { createContext, useState } from "react";

const Mycontext = createContext();

const MyProvider = ({children})=>{
    const [tasks,setTasks] = useState([]);
    const [open,setOpen] = useState(false);

    const handleOpen = ()=>setOpen(true);
    const handleClose = ()=>setOpen(false);


    return(
        <Mycontext.Provider value={{tasks , setTasks , open , handleOpen, handleClose}}>
            {children}
        </Mycontext.Provider>
    )
}

export {Mycontext,MyProvider}