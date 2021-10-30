import React from 'react';
import {
  Box
} from '@mui/material';

import skelly from '../images/skellyton.png';


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
          <rect x="118" y="94" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '95%' : '50%'} width="50" height="50"></rect>
        </a><a onClick={() => handleClick('neck')}>
          <rect x="174" y="69" fill="#ff9505" opacity={bodyParts.includes('neck') ? '95%' : '50%'} width="52" height="50"></rect>
        </a><a onClick={() => handleClick('back')}>
          <rect x="171" y="182" fill="#ff9505" opacity={bodyParts.includes('back') ? '95%' : '50%'} width="50" height="50"></rect>
        </a><a onClick={() => handleClick('chest')}>
          <rect x="170" y="128" fill="#e2711d" opacity={bodyParts.includes('chest') ? '95%' : '50%'} width="50" height="50"></rect>
        </a><a onClick={() => handleClick('hips')}>
          <rect x="134" y="266" fill="#cc5803" opacity={bodyParts.includes('hips') ? '95%' : '50%'} width="129" height="59"></rect>
        </a><a onClick={() => handleClick('core')}>
          <rect x="154" y="219" fill="#ffb627" opacity={bodyParts.includes('core') ? '95%' : '50%'} width="84" height="50"></rect>
        </a><a onClick={() => handleClick('legs')}>
          <rect x="139" y="371" fill="#ffb627" opacity={bodyParts.includes('legs') ? '95%' : '50%'} width="111" height="142"></rect>
        </a><a onClick={() => handleClick('shoulders')}>
          <rect x="227" y="100" fill="#ffb627" opacity={bodyParts.includes('shoulders') ? '95%' : '50%'} width="50" height="50"></rect>
        </a>
      </svg>
    </Box>
  )
}

export default Skellyton;
