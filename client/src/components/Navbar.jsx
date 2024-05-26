import { Typography } from '@mui/material'
import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <Typography sx={{width:"100%",display:"flex",justifyContent:"space-between",background:"pink"}}>
    <Typography>
        <Link to='/'>Create Task</Link>
    </Typography>
    <Typography>
        <Link to='/play'>Update Task</Link>
    </Typography>


      
    </Typography>
  )
}

export default Navbar
