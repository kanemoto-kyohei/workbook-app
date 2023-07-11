import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

type Time = {
  time_to_solve:number;
  num:number;
  onTimerFinish: ()=> void;
}

const ProgressBar = ({time_to_solve,num,onTimerFinish}:Time) => {
  const [progress, setProgress] = useState(100);
  const [timeNum,setTimeNum] = useState(time_to_solve);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if(timeNum>0){
    interval = setInterval(() => {
      setProgress(prevProgress => prevProgress - (100/time_to_solve));
    }, 960*time_to_solve/(time_to_solve+1));
  
    interval = setInterval(() => {
      setTimeNum(prevNum => prevNum - 1);
    }, 1000);}
    
    return () => {
      clearInterval(interval);
    };
  }, [num]);


  if(timeNum<=0){
    onTimerFinish();
  }





  return (
    <Box component="div"
      sx={{ 
      width: {xs:300,sm:400,md:450,lg:500}, 
      height: 20, 
      backgroundColor: '#ccc' }}
      >
      <div
        style={{
          width: `${progress}%`,
          height: '100%',
          backgroundColor: timeNum<5 ? 'red':'blue',
          boxShadow: '0px 1px 4px rgba(0, 0, 0, 1)',
          transition: 'width 1s linear'
        }}
      />
      <span
      className='flex'
      >残り時間{timeNum}秒</span>

    </Box>
  );
};

export default ProgressBar;
