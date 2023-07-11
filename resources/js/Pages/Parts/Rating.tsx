import * as React from 'react';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels: { [index: string]: string } = {
  
  1: 'とても易しい',
  2: '易しい',
  3: '少し難しい',
  4: 'とても難しい',
  5: '超難問',
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default function HoverRating({ onChange }: { onChange: (value: number | null) => void }) {
  const [value, setValue] = React.useState<number | null>(null);
  const [hover, setHover] = React.useState(-1);

  return (
    <Box component='div'>
      <div>
      <Rating
        name="hover-feedback"
        value={value}
        precision={1}
        getLabelText={getLabelText}
        onChange={(event, newValue) => {
          setValue(newValue);
          onChange(newValue);
        }}
        onChangeActive={(event, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      </div>
    </Box>
  );
}