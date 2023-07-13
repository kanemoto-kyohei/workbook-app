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
import { color } from 'framer-motion';

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


export default function BasicCard({value,sub,imgURL}:{value:string,sub:string,imgURL:string}) {
  return (
    <SquareCard 
    sx={{
       minWidth: { xs:130,sm:150,md:160,lg:200,xl:210 },
       height: { xs:130,sm:150,md:160,lg:200,xl:210 }
       }}>
      <CardContent>
        <Typography
        sx={{
        fontFamily:'Kaisei Decol',
        fontSize:20,
        fontWeight:'bold',
        color:'#D2B48C'}}>
          {value}
        </Typography>
        <Typography
        sx={{
        fontFamily:'Kaisei Decol',
        fontSize:10,
        color:'#8B4513'}}>
          {sub}
        </Typography>
        <Typography>
        <img src={imgURL} alt="Image" />        
        </Typography>
      </CardContent>
    </SquareCard>
  );
}