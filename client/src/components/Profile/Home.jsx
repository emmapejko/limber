import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Paper,
  FormControlLabel,
  Switch,
  Grid,
  Card
} from '@mui/material';

import DashBoard from './DashBoard.jsx';
import DashBoardCard from './DashBoardCard.jsx';
import SavedFlow from './SavedFlow.jsx';
import SavedFlowCard from './SavedFlowCard.jsx';
import BuildFlow from './BuildFlow.jsx';
import BuildFlowCard from './BuildFlowCard.jsx';
import PoseKnown from './PoseKnown.jsx';
import LearningPose from './LearningPose.jsx';

const Home = (props) => {
  const [pose, setPose] = useState([]);
  const [teacher, setTeacher] = useState(false);

  // axios call to database for poseKnown
  const whatIsKnown = () => {
    axios
      .get('/profile/allPoses')
      .then((res) => {
        setPose(res.data);
        isTeacher();
      })
      .catch((err) => {
        console.info(err, 'Error from poseKnown');
      });
  };

  const isTeacher = () => {
    axios.get('/chat/full_name')
      .then(({ data }) => {
        setTeacher(data.is_teacher);
      })
      .catch(err => {
        console.warn(err);
      })
  }

  const changeTeacherStatus = (e) => {
    const is_teacher = e.target.checked;
    axios.put(`/profile/changeTeacherStatus`, { data: { is_teacher }})
      .then(() => {
        isTeacher();
      })
      .catch(err => {
        console.warn(err);
      })
  }

  useEffect(() => {
    whatIsKnown();
  }, []);
// const color = {
//   backgroundColor: '#fffde7'
// }
  return (
    <div>
      <div>
      <FormControlLabel control={<Switch checked={teacher} onChange={(e) => changeTeacherStatus(e)}/>} label={teacher ? 'Teacher' : 'Student'} />
      </div>
      <div>
     
       <Grid container spacing={2} sx={{alignItems: "center", justifyContent:"center", alignItems:"stretch"}}>
       
         <Grid item xs={12} sm={4}>
         <Card elevation={3} style={{height: "100%"}}>
            <DashBoard style={props.style}/>
            <DashBoardCard style={props.style}/>
          </Card>
           </Grid>
         <Grid item xs={12} sm={4}>
         <Card elevation={3} style={{height: "100%"}}>
            <SavedFlow style={props.style}/>
            <SavedFlowCard style={props.style}/>
          </Card>
         </Grid>
         <Grid item xs={12} sm={4}>
         <Card elevation={3} style={{height: "100%"}}>
            <BuildFlow style={props.style}/>
            <BuildFlowCard style={props.style}/>
          </Card>
       </Grid>
       </Grid>
      
       <Grid container spacing={2} sx={{alignItems:"center", justifyContent:"center", marginTop: "1%"}}>
       
       <Grid item xs={12} sm={6}>
       <Card elevation={3} style={{height: "100%"}}>
            <PoseKnown
              pose={pose}
              style={props.style}
            />
          </Card>
       </Grid>
         <Grid item xs={12} sm={6}>
         <Card elevation={3} style={{height: "100%"}}>
            <LearningPose
            pose={pose}
            style={props.style}
            />
          </Card>
         </Grid>
         
       </Grid>
       
       </div>
    </div>
  );
};

export default Home;



 {/* <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 12,
              width: 220,
              height: 250,
            },
          }}
        >
          <Paper elevation={3} rounded>
            <DashBoard style={props.style}/>
            <DashBoardCard style={props.style}/>
          </Paper>
          <Paper elevation={3}>
            <SavedFlow style={props.style}/>
            <SavedFlowCard style={props.style}/>
          </Paper>
          <Paper elevation={3}>
            <BuildFlow style={props.style}/>
            <BuildFlowCard style={props.style}/>
          </Paper>
        </Box>
      </div>
      <div>
     
        <Grid>
        <Box      //set to 6 
        
          sx={{
            alignItems:"center",
            justifyContent:"center",
            display: 'flex',
            flexWrap: 'wrap',
            '& > :not(style)': {
              m: 12,
              width: 220,
              height: 250,
            },
          }}
        >
          <Paper elevation={3}>
            <PoseKnown
              pose={pose}
              style={props.style}
            />
          </Paper>
          <Paper elevation={3}>
            <LearningPose
            style={props.style}
              pose={pose}
            />
          </Paper>
        </Box>
        </Grid> */}