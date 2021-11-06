import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Typography, Chip, List, ListItem, ListItemText }  from '@mui/material';
 

const SavedFlowCard = (props) => {

  const [flows, setFlows] = useState([]);

  //axios get request to flows table
  const getSavedFlows = () => {
    axios.get('/profile/savedFlows')
    .then(({ data }) => {
      setFlows(data);
    })
    .catch((err) => {
      console.warn(err, 'savedFlows');
    });
  }

  useEffect(() => {
    getSavedFlows();
  }, []);

  const getFontSize = () => {
    return Number(props.style.fontSize.slice(0,2)) + 4;
  }

  return (
    <div>
    <Box padding="5%">
       
      <List>
        <Typography style={{ fontSize: `${getFontSize()}px`}}>
           {flows.map((flow, i) => (
              (i < 5) ?
          <ListItem 
          disableGutters
          secondaryAction={
              <Chip 
              label={flow.difficulty} 
              size="small" 
              color={flow.difficulty === 'beginner' ? 'success' : flow.difficulty === 'intermediate' ? 'primary' : 'secondary'}
              />
              
          }  
              
            style={{ fontSize: `${getFontSize()}px`}} 
            key={i}
            >
              {flow.name}
          </ListItem>
          : null
          ))}
        </Typography>
        
      </List>
          
    </Box>
    </div>
  );
}
export default SavedFlowCard;

