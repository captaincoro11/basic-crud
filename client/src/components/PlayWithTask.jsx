import axios from 'axios'
import React, { useEffect ,useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import ShowTask from './ShowTask';
import { Typography } from '@mui/material';
import { fetchData } from './fetchData';
import { useContext } from 'react';
import { Mycontext } from './context';


const PlayWithTask = () => {
    const [title,setTitle] = useState('');
  const [descripition,setDescription] = useState('');
  const [date,setDate] = useState();
  const context = useContext(Mycontext);
  const {setTasks , tasks} = context;
  

  
const fetchData = async()=>{

    

    try {
        const response = await axios.get('http://localhost:4000/task/getData');
        setTasks(response.data.tasks);

        toast.success(response.data.message);

        
    } catch (error) {
        toast.error(error.response.data.message);
        
    }

}



    useEffect(()=>{
        fetchData();

    },[]);

    if(!tasks){
        return(
            <div>
                Loading..
            </div>
        )

    }
  return (
    <div>
    <Toaster/>
    <Typography variant='h3' sx={{display:"flex",justifyContent:"center"}}>
        All Tasks
    </Typography>
    {
        tasks.length>0?
    
        tasks.map((item,index)=>(
       <ShowTask date={item.DueDate} title={item.task} description={item.description} status={item.status} id={item._id}/>

        )):(
            <Typography sx={{display:"flex",justifyContent:"center"}}>Create New one</Typography>
        )

    }


   
      
    </div>
  )
}

export default PlayWithTask
