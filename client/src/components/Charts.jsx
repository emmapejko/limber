import React, { useEffect, useState } from "react";
import axios from 'axios';



import { Chart } from 'react-google-charts';
const countObj = {};
const Charts = ({ poses }) => {

 const countObj = (poses.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
 
        
        let level = Object.entries(countObj);
        let count = Object.values(countObj);
        let output = ['Difficulty', 'Number of Moves'];

return (

  <div>
    <Chart
    width={'420px'}
    height={'420px'}
    chartType="PieChart"
    loader={<div>Loading Chart...</div>}
    data={[
      ['Difficulty', 'Number of Moves'],
     ...level
      

    ]}
    options={{
      title: 'Degree of Yoga Poses',
    }}
  />

  </div>

)
  
  };

export default Charts;



// import { Doughnut } from 'react-chartjs-2';

// const Charts = ({poses}) => {
//  //console.log('props:', poses)
//  const countObj = (poses.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
 
        
//         let level = Object.keys(countObj);
//         let count = Object.values(countObj);
//   const chartData = () => ({
    
//     labels: ['beginner', 'intermediate', 'shartvanced'],
//     datasets: [
//       {
//         label: 'level of difficulty',
//         data: [32, 13, 12], 
//         backgroundColor: ['rgba(75, 192, 192)'],
//         borderWidth: 1
//       }
//     ]
    
// });

// const dynamicData = () => (
//    console.log('count:', level),
//    {
  
//   labels: level,
//   datasets: [
//     {
//       label: 'level of difficulty',
//       data: count, 
//       backgroundColor: ['rgba(75, 192, 192)'],
//       borderWidth: 1
//     }
//   ]
  
// }
// );

// const [data, setData] = useState(chartData());     
//  const [yoga, setYoga]= useState(dynamicData());

// useEffect(() => {
  
//   setData(chartData())
// }, []);

// useEffect(() => {
//   const interval = setInterval(() => setYoga(dynamicData()), 5000);

//   return () => clearInterval(interval);
//   setYoga(dynamicData())
// }, []);

// return (
//   <div>
//    <h1>Dat Chart</h1> 
  
// <Doughnut 
//       data={data}
      
//    />


    

//   </div>
// )


// }



// export default Charts;

// axios.get('profile/userPosesKnown')
//           .then(({ data }) => {
//             const countObj = (data.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
//             level = Object.keys(countObj);
//             count = Object.values(countObj);
//             console.log(level);
           
//           })
//           .catch(err => {
//             console.log(err);
//           }), 
          
//           {
//             labels: level,
//             datasets: [
//               {
//                 label: 'level of difficulty',
//                 data: count, 
//                 backgroundColor: ['rgba(75, 192, 192)'],
//                 borderWidth: 1
//               }
//             ]
            
//           }