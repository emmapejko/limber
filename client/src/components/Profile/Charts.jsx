import React, { useEffect, useState } from "react";
import { Chart } from 'react-google-charts';

const countObj = {};

const Charts = ({ poses }) => {

 const countObj = (poses.map(pose => pose.difficulty)).reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});
        let level = Object.entries(countObj);
        let count = Object.values(countObj);
        let output = ['Difficulty', 'Number of Moves'];
    
  let orderedArray = new Array(3);
    level.forEach(item => {
      if(item[0] === 'beginner') {
        orderedArray[0] = item;
      } else if(item[0] === 'intermediate') {
        orderedArray[1] = item;
      } else {
        orderedArray[2] = item;
      }
    })

  return (

    <div>
      <Chart
      width={'420px'}
      height={'420px'}
      chartType="PieChart"
      loader={<div>Loading Chart...</div>}
      data={[
        ['Difficulty', 'Number of Moves'],
      ...orderedArray


      ]}
      options={{
        title: 'Degree of Yoga Poses',
        colors: ['#ffb627', '#ff9505', '#e2711d'],
      }}
    />

    </div>

  )
};

export default Charts;


