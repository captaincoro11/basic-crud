import {Box, Button, Input, TextField, Typography} from '@mui/material'
import { useEffect, useState } from 'react';
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
function CreateTask() {

  const [task,setTask] = useState([]);
  const [title,setTitle] = useState('');
  const [descripition,setDescription] = useState('');
  const [date,setDate] = useState();

  const handleClick = async () => {
    try {
      if (!title || !date) {
        toast.error('Title and Due Date are required.');
        return;
      }

      // Additional validation can be added here for the date format or other criteria

      const response = await axios.post(
        'http://localhost:4000/task/dashboard',
        { title, descripition, date },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setTitle('');
      setDescription('');
      setDate('');

      toast.success(response.data.messasge);
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred while adding the task.');
      }
    }
  };

  return (
    <>
    <Toaster/>

 
    <Typography   >
        <Typography variant='h3' sx={{fontFamily:"monospace",fontWeight:600,display:"flex" , justifyContent:"center"}}  >
    Task

 
  </Typography>
  <Typography  sx={{display:"flex" , justifyContent:"center"}}>
  <Box padding={4} borderRadius={3} boxShadow={10} width={500} sx={{marginTop:"10%",}}>

  <Typography sx={{display:"flex" , justifyContent:"center"}}>
   <Typography variant='h3'>
    Add Your Task
  </Typography>
  </Typography>
  <Typography sx={{display:"flex" , justifyContent:"center"}}>
  <Typography>
  <Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
  <Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Title</Typography>
  <Typography><Input value={title} onChange={(e)=>setTitle(e.target.value)}/></Typography>
  

  </Typography>

  <Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
  <Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Description</Typography>
  <Typography><Input value={descripition} onChange={(e)=>setDescription(e.target.value)}/></Typography>
  

  </Typography>
  <Typography sx={{display:'flex-col',marginTop:"5%",justifyContent:"space-around"}}>
  <Typography variant='h6' sx={{fontFamily:"monospace",fontWeight:600}}>Due Date</Typography>
  <Typography><Input value={date} onChange={(e)=>setDate(e.target.value)} type='date'/></Typography>

  </Typography>

  <Typography sx={{marginTop:"20%"}}>
    <Button onClick={handleClick} variant='contained'>Add Task</Button>
  </Typography>
  

  </Typography>
  </Typography>


  </Box>
  </Typography>

 


  </Typography>
  </>
  
  );
}

export default CreateTask;
