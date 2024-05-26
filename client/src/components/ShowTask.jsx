import { Box, Typography , Button } from '@mui/material'
import axios from 'axios';
import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import { fetchData } from './fetchData';
import { useContext } from 'react';
import { Mycontext } from './context';
import {Modal} from '@mui/material';
import {Input} from '@mui/material';

const ShowTask = ({title,description,date,status,id}) => {
    const [message,setMessage] = useState('');
    const context = useContext(Mycontext);
    const [newtitle,setTitle] = useState(title);
    const [newdescripition,setDescription] = useState(description);
    const [newdate,setDate] = useState(date);
    const [newstatus,setStatus] = useState(status);
    const {setTasks , tasks , handleOpen ,open , handleClose} = context;

    const handleClick5 = async()=>{

        try {
            const response = await axios.put(`http://localhost:4000/task/updateData/${id}`,{
                newtitle,newdescripition,newdate,status
            },{
                headers:{
                    "Content-Type":"application/json"
                }
            });
            toast.success(response.data.message);

            fetchData();
            
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    


    const handleClick1 = ()=>{
        handleOpen();

    };
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };


    
const fetchData = async()=>{
 
    

    try {
        const response = await axios.get('http://localhost:4000/task/getData');
        setTasks(response.data.tasks);

        toast.success(response.data.message);

        
    } catch (error) {
        toast.error(error.response.data.message);
        
    }

}

    const handleClick = async()=>{
        
        try {
            const response = await axios.delete(`http://localhost:4000/task/deleteData/${id}`);
            toast.success(response.data.message)
            setMessage(response.data.message);
            fetchData();
            
            

        } catch (error) {
            toast.error(error.response.data.message);
            setMessage(error.response.data.message)


            
        }

    }
  return (
    <Typography sx={{marginTop:'2%'}}>
    <Toaster/>
    <Box boxShadow={10} borderRadius={3} width={"full"} >
    <Typography>
        <Typography variant='h4' sx={{fontFamily:"monospace",fontWeight:600}}>
            {title}
        </Typography>
        <Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:300}}>
            {description}
        </Typography>
        <Typography sx={{display:'flex',justifyContent:"space-between"}}>
        <Typography>
            {date}
        </Typography>
        <Typography>
            
            {status}
        </Typography>
        <Typography>
            <Button onClick={handleClick} variant='outlined'>Delete</Button>
        </Typography>
        <Typography>
            <Button onClick={handleClick1} variant='outlined'>Edit</Button>
        </Typography>
        <Modal
    open={open}
    onClose={handleClose}

    width={"50%"} sx={{background:"white",display:"flex",justifyContent:"center",alignItems:"center"}}
   
  >
   <Box padding={4} borderRadius={3} boxShadow={10} width={500} sx={{marginTop:"10%",}}>

<Typography sx={{display:"flex" , justifyContent:"center"}}>
 <Typography variant='h3'>
Edit Your Task
</Typography>
</Typography>
<Typography sx={{display:"flex" , justifyContent:"center"}}>
<Typography>
<Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
<Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Title</Typography>
<Typography><Input value={newtitle} onChange={(e)=>setTitle(e.target.value)}/></Typography>


</Typography>

<Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
<Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Description</Typography>
<Typography><Input value={newdescripition} onChange={(e)=>setDescription(e.target.value)}/></Typography>


</Typography>
<Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
<Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Due Date</Typography>
<Typography><Input value={newdate} onChange={(e)=>setDate(e.target.value)} type='date'/></Typography>

</Typography>
<Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
<Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Status</Typography>
<Typography><Input value={newstatus} onChange={(e)=>setStatus(e.target.value)} /></Typography>

</Typography>

<Typography sx={{marginTop:"20%"}}>
  <Button onClick={handleClick5} variant='contained'>Add Task</Button>
</Typography>


</Typography>
</Typography>


</Box>
  </Modal>
        </Typography>

        

    </Typography>
    </Box>
   

      
    </Typography>
  )
}

export default ShowTask
