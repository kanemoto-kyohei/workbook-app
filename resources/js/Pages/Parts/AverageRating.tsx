import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';

type Pageprops = {
  value:number
}

const AverageRating: React.FC<Pageprops> = ({value}:Pageprops) =>{


  return (
    <Box
    component='div'
      sx={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Rating
        name="text-feedback"
        value={value}
        readOnly
        precision={0.1}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
    </Box>
  );
}

export default AverageRating;