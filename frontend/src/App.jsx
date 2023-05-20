import { useState } from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import './App.css'
import ViewAllTodos from './components/viewAllTodos/viewAllTodos';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Grid container  sx={{height:'97vh'}}  justifyContent={'center'} alignItems={'center'}>
      <ViewAllTodos/>
    </Grid>
  )
}

export default App
