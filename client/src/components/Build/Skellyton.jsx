import React from 'react';
import {
  Box
} from '@mui/material';

import skelly from '../../images/skellyton.png';

const Skellyton = ({ bodyParts, handleClick }) => {

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m="auto"
      style={{maxWidth: '401px'}}
    >
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 401 622">
        <image width="401" height="622" xlinkHref={skelly}></image>
        <a onClick={() => handleClick('shoulders')}>
          <circle cx="142" cy="115" r="20" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('neck')}>
          <circle cx="198" cy="90" r="20" fill="#ff9505" opacity={bodyParts.includes('neck') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('back')}>
          <circle cx="195" cy="196" r="20" fill="#ff9505" opacity={bodyParts.includes('back') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('chest')}>
          <circle cx="196" cy="149" r="20" fill="#e2711d" opacity={bodyParts.includes('chest') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('hips')}>
          <circle cx="163" cy="287" r="20" fill="#cc5803" opacity={bodyParts.includes('hips') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('core')}>
          <circle cx="196" cy="250" r="30" fill="#ffb627" opacity={bodyParts.includes('core') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('legs')}>
          <circle cx="184" cy="440" r="50" fill="#ffb627" opacity={bodyParts.includes('legs') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('shoulders')}>
          <circle cx="251" cy="121" r="20" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '90%' : '50%'}/>
        </a><a onClick={() => handleClick('hips')}>
          <circle cx="240" cy="287" r="20" fill="#cc5803" opacity={bodyParts.includes('hips') ? '90%' : '50%'}/>
        </a>
      </svg>
    </Box>
  )
}

export default Skellyton;
