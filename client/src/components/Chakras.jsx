import React from 'react';
import {
  Box
} from '@mui/material';

import skelly from '../images/skellyfire.jpg';

const Chakras = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      m="auto"
      style={{maxWidth: '401px'}}
    >
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="0 0 401 622">
      <image width="401" height="622" xlinkHref={skelly} />
    </svg>
    </Box>
  )
}

export default Chakras;