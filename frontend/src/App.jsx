import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import ViewAllTodos from './components/viewAllTodos/viewAllTodos';
import CreateTodo from './components/createTodo/createTodo';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container flexDirection={'column'} sx={{height:'97vh'}}  justifyContent={'center'} alignItems={'center'}>
      <Grid  sx = {{width:"500px",marginBottom:"10px"}}>
      <CreateTodo/>
        
      </Grid>
      <Grid sx = {{width:"500px"}}>
      <ViewAllTodos/>

      </Grid>
    </Grid>
  )
}

export default App
