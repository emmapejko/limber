import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box
} from '@mui/material';

const Chakras = () => {
  const [img, setImg] = useState('');

  useEffect(() => {
    axios.get('/images/otherImages/skellyfire.jpg')
      .then(({ data }) => {
        setImg(data);
      })
      .catch(err => {
        console.warn('error getting image: ', err);
      })
  })

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m="auto"
      style={{maxWidth: '401px'}}
    >
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 401 622">
      <image width="401" height="622" xlinkHref={img} />
    </svg>
    </Box>
  )
}

export default Chakras;