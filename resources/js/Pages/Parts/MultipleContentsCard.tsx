import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';
import { red } from '@mui/material/colors';
import AverageRating from '@/Pages/Parts/AverageRating';
import FastForwardIcon from '@mui/icons-material/FastForward';

const SquareCard = styled(Card)`
  width: 100px;
  height: 100px;
  background-color: #f6f4f1;
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 2px 4px rgba(0,0,0,2);
  &:hover {
    box-shadow: 0px 4px 8px rgba(0,0,0,2);
  }
  &:active{
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.2);
  transform: translateY(1px);
  }  
`;


export default function MultipleContentsCardCard({name,value,difficulty,people}:{name:string,value:number,difficulty:string,people:number}) {

  function isNumber(value:any){
    return !isNaN(value);
  }
  return (
    <SquareCard 
    sx={{ 
      minWidth: { xs:250,md:270,lg:300 },
      height: 200
    }}>
      <CardContent>
        <Typography
        sx={{fontFamily:'Kaisei Decol'}}>
          {name}
        </Typography>
        <Typography>
        <AverageRating value={value}/>
        {isNumber(difficulty)  ?
        <div>{`難しさ：${difficulty}`}</div>:
        <div>データがありません</div>}
        <div
        style={{fontFamily:'Kaisei Decol'}}>
          {`${people}人がこの問題を解きました`}</div> 
        </Typography>
        <Typography className='flex mt-10'>
            <FastForwardIcon className='mt-10'/>
            <div className='mt-10'
            style={{color:'blue',fontFamily:'Kaisei Decol'}}>この問題をとく</div>
        </Typography>
      </CardContent>
    </SquareCard>
  );
}