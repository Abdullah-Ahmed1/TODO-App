import { useState ,useEffect } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import {ViewAllTodos} from './components/viewAllTodos';
import {CreateTodo} from './components/createTodo';
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:5000/view')
    .then((res)=>{
      console.log(res.data.tasks)
      setTodos(res.data.tasks)
    }).catch((err)=>{
      console.log(err)
    })
  },[])
  return (
    <Grid container flexDirection={'column'} sx={{height:'97vh'}}  justifyContent={'center'} alignItems={'center'}>
      <Grid  sx = {{width:"500px",marginBottom:"10px"}}>
      <CreateTodo/>
        
      </Grid>
      <Grid sx = {{width:"500px"}}>
      <ViewAllTodos  todos = {todos} />

      </Grid>
    </Grid>
  )
}

export default App
