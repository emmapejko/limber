import React from 'react';
import {
  Box
} from '@mui/material';

//import skelly from '../images/skellyton.png';
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
      <image width="401" height="622" xlinkHref={skelly}></image>
      {/* <a xlinkHref="crown">
        <circle cx="198" cy="15" r="15" opacity="50%" fill="#d55df0" />
      </a><a xlinkHref="third eye">
        <circle cx="198" cy="50" r="15" opacity="50%" fill="#4481ee" />
      </a><a xlinkHref="throat">
        <circle cx="195" cy="93" r="15" opacity="50%"fill="#3ad3d2" />
      </a><a xlinkHref="heart">
        <circle cx="195" cy="155" r="15" opacity="50%" fill="#8fd33b" />
      </a><a xlinkHref="solar plexus">
        <circle cx="195" cy="200" r="15" opacity="50%" fill="#ffba39" />
      </a><a xlinkHref="sacral">
        <circle cx="195" cy="245" r="15" opacity="50%" fill="#ff862e" />
      </a><a xlinkHref="root">
        <circle cx="195" cy="290" r="15" opacity="50%" fill="#ff4e53" />
      </a> */}
    </svg>
    </Box>
  )
}

export default Chakras;