import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MenuIcon from '@mui/icons-material/Menu';
export default function InputAccordion() {
  return (
    <div>
      <Accordion sx = {{ backgroundColor:'rgba(255, 255, 255,0.3)'}} >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
           <Grid container >
                <MenuIcon sx = {{marginRight:"15px"}}/>
                <Typography>Todo Today</Typography>

            </Grid>    
          
        </AccordionSummary>
        <AccordionDetails>
            <Grid container  >
                <Grid sx= {{width:"80%"}}>
                <TextField id="standard-basic" variant="standard" fullWidth placeholder='Add Todo here' />
            
                </Grid>
            </Grid>
        </AccordionDetails>
      </Accordion>
      
     
    </div>
  );
}