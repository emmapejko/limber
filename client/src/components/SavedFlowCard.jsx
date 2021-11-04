import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Box, Typography, Chip, List, ListItem, Icon }  from '@mui/material';
 //<StarIcon color="primary"/>

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
    <Box
          padding="5%"
      //  display="flex"
      //  alignItems="center"
      //  justifyContent="center"
      //  m="auto"
    >
       
      <List>
        <Typography style={{ fontSize: `${getFontSize()}px`}}>
           {flows.map((flow, i) => (
              (i < 8) ?
          <ListItem 
          disableGutters
          secondaryAction={
              <Chip 
              // edge="end"
              label={flow.difficulty} 
              size="small" 
              />
          }  
            style={{ fontSize: `${getFontSize()}px`}} 
            key={i}>{flow.name}
           
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

{/* <Typography style={{ fontSize: `${getFontSize()}px`}}>
{flows.map((flow, i) => (
    (i < 8) ?
    <div style={{ fontSize: `${getFontSize()}px`}} key={i}>{flow.name}<Chip label={flow.difficulty} size="small" /></div>
    : null
))}
</Typography> */}