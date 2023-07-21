import * as React from 'react';
import Card from '@mui/material/Card';
import {CardContent} from '@mui/material';
import Button from '@mui/material/Button';
import { Fab, IconButton, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { height } from '@mui/system';
import { red } from '@mui/material/colors';
import { Link } from '@inertiajs/react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Work } from '@/types/works';
import FastForwardIcon from '@mui/icons-material/FastForward';
import TimelineIcon from '@mui/icons-material/Timeline';
import { useState } from 'react';
import InsertLinkIcon from '@mui/icons-material/InsertLink';


const StickCard = styled(Card)`
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



export default function StickTypeCard({value,i,id,workbook_id,publicate,onClick,publicateClick,getLinkClick}:
  {value:string,i:number,id:number,workbook_id:string,publicate:string,onClick:()=>void,publicateClick:()=>void,getLinkClick:()=>void}) {
  const [getLink,setGetLink] = useState(false);

  const handleDeleteClick = () => {
    onClick();
  }

  const handlePublicateClick = () => {
    publicateClick();
  }

  const handleGetLinkClick = () => {
    getLinkClick();
    setGetLink(true)
  }


  
  function truncateText(value:string, maxLength:number) {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    }
    return value;
  }
    return(
        <StickCard    
        sx={{ 
          minWidth: { xs:280,md:350,lg:400 },
          height: 140,
          fontFamily:'Kaisei Decol'}}>
        <CardContent>
        <Typography
        sx={{fontFamily:'Kaisei Decol'}}>{truncateText(value,35)}</Typography>
        
        {id != 0 &&<div className='flex flex-row justify-end mt-5'>
              <Link
                className='ml-1'
                style = {{color:'blue', textDecoration: 'underline'}}
                key={i}
                href={route('work.edit',{id:id})}
                >
                <Fab 
                size='small' 
                color="inherit" 
                aria-label="edit">
                <EditIcon />
                </Fab>               
                </Link>
                <Fab
                style={{ color: 'red' }}
                size="small"
                aria-label="delete"
                onClick={handleDeleteClick}
                ><DeleteIcon/></Fab>
                </div>}

        {workbook_id != 'null' &&<>
        <div className='flex flex-row justify-start mt-2'>
        <FastForwardIcon/>
              <Link 
                href={route('work.display',{workbook_id: workbook_id})}
                style={{color:'blue',
                fontFamily:'Kaisei Decol'}}>
                  この問題を編集する
                </Link>
                </div>
                <div className='flex justify-end'>
                <Link
                key={i}
                href={route('workbook.edit',{workbook_id: workbook_id})}
                >                
                <Fab 
                style={{color:'blue'}}
                size='small' 
                color="inherit" 
                aria-label="edit">
                <EditIcon />
                </Fab>               
                </Link>
                <Fab
                className='ml-5'
                style={{ color: 'red' }}
                size="small"
                aria-label="delete"
                onClick={handleDeleteClick}
                ><DeleteIcon/></Fab>
                </div>
                </>
                }

        {workbook_id == 'null' && id===0 && !value.includes('分析する') && publicate == 'null' &&
        <div className='mt-5 flex flex-row'>
        <FastForwardIcon/><div style={{color:'blue',fontFamily:'Kaisei Decol'}}>この問題をとく</div>
        </div>}

        {value.includes('分析する') && 
        <div>
          <FastForwardIcon/><TimelineIcon className='mt-5 ml-2'/>

        </div>}

        {publicate == '非公開にする' && 
        <div>
          <FastForwardIcon />
                <Button
                variant="text"
                style = {{color:'red',
                 textDecoration: 'underline',
                 minWidth:'120px',
                 fontFamily:'Kaisei Decol'}}
                key={i}
                onClick={handlePublicateClick}
                >{publicate}
                </Button>
        </div>}

        {publicate == 'このアプリに公開する' && 
        <div>
          <FastForwardIcon />
                <Button
                variant="text"
                style = {{
                  color:'green', 
                  textDecoration: 'underline',
                  minWidth:'120px',
                  fontFamily:'Kaisei Decol'}}
                key={i}
                onClick={handlePublicateClick}
                >{publicate}
                </Button>
        </div>}
                  
        {getLink && publicate != 'null' && 
        <div className='flex flex-row'><FastForwardIcon/><div
        style = {{
          color:'yellowgreen', 
          textDecoration: 'underline',
          minWidth:'120px',
          fontFamily:'Kaisei Decol'}}
        >リンクをコピーしました！</div></div>}

        {!getLink && publicate != 'null' &&
        <div><FastForwardIcon />
        <Button
        style = {{
          color:'blue', 
          textDecoration: 'underline',
          minWidth:'120px',
          fontFamily:'Kaisei Decol'}}
        onClick={handleGetLinkClick}>共有リンクをコピーする</Button>
        <InsertLinkIcon
        style = {{
          color:'blue', 
          }}
          /></div>}


      </CardContent>
      </StickCard>

    );
}