import { useState } from 'react';
import {  useForm } from '@inertiajs/react';
import { Works} from '@/types/works';
import PrimaryButton from '@/Components/PrimaryButton';
import ProgressBar from '@/Pages/Parts/ProgressBar';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import LensOutlinedIcon from '@mui/icons-material/LensOutlined';
import { Button } from '@mui/material';
import '@/Pages/Solve/workbookstyle.css'
import BasicLayout from '@/Layouts/BasicLayout';


const WorkSolveForm = ({works,is_public,is_protected}:{is_protected?:boolean} & {is_public:boolean} & { works: Works[] }) => {
    const [num,setNum] = useState(0);
    const [correctNum,setCorrectNum] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);
    const [isButtonClick,setIsButtonClick] = useState(true);
    const [showDescription,setShowDescription]=useState(false);
    const [showProgress, setShowProgress] = useState(true);

    const {post, setData} = useForm({
        result:correctNum,
    });
    const handleNextClick = ( works:Works[]) => {
        if(num+1<works.length){
        setNum(num+1);
        setIsButtonClick(true);
        setShowDescription(false);
        setShowProgress(true);
        setIsCorrect(false);

        }else if(is_public){
        post(route("public.result",{workbook_id:work.workbook_id}))
        }else if(is_protected){
        post(route("protected.result",{workbook_id:work.workbook_id}))
        }else if(!is_public){
        post(route("workbook.result",{workbook_id:work.workbook_id}))   
        }

    };

    const work = works[num];
    const options:string[] = JSON.parse(work.options);

    const correctSound = new Audio('/sounds/correctSound.mp3');
    const incorrectSound = new Audio('/sounds/incorrectSound.mp3');
    const myVoice = new Audio('/sounds/myvoice.mp3');

    const handleOptionClick =  (i:number) => {
        if(i === work.answer && isButtonClick){
        setCorrectNum(correctNum + 1);
        setIsCorrect(true);
        setData('result', correctNum+1);
        correctSound.play();
    }else if(i != work.answer && isButtonClick){
        incorrectSound.play();
    }
    setIsButtonClick(false);
    setShowDescription(true);
    setShowProgress(false);
    };

    const handleTimerFinish = () =>{
        setShowProgress(false);
        setIsButtonClick(false);
        setShowDescription(true);

    }

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        if(is_public){
        post(route("public.result",{workbook_id:work.workbook_id}))}
        else if(is_protected){
        post(route("protected.result",{workbook_id:work.workbook_id}))}  
        else{
            post(route("workbook.result",{workbook_id:work.workbook_id}))}  
        }
    
      
    return(
        <BasicLayout>
        <div className='flex flex-col items-center justify-center sm:p-20'
        style={{fontFamily:'Kaisei Decol'}}>
        <div
        data-testid="questionNum"
        >{`第${num +1}問/${works.length}問`}</div>

        {showProgress && <ProgressBar 
        time_to_solve={work.time_to_solve} 
        num={num}
        onTimerFinish = {handleTimerFinish}
        />}

        <div className='mt-5 p-5'>{work.question}</div>
        {options.map((option,i)=>{
            const styleCorrect = work.answer===i+1 ? true : false;
            const IconComponent = styleCorrect ? LensOutlinedIcon :ClearOutlinedIcon;
            return (
                <div className='mt-3'>
                <Button
                data-testid={i}
                sx = {{
                    width:{xs:300,sm:350,md:500}
                }}
                variant="outlined"
                onClick={()=>{handleOptionClick(i+1)}}
                >
                {showDescription && <IconComponent />}

                <div>{`${i + 1}:${option}`}</div>
                </Button>

                
                </div>
            )
        })}
        {showDescription && <div className='mt-5'>
        <PrimaryButton 
        data-testid="next-button"
        onClick={()=>{handleNextClick(works)}}
        className='mt-5'
        >
        {works.length>num+1 ? '次の問題へ' : '結果を見る'}
        </PrimaryButton>
        </div>}

        <form onSubmit={submit}>
            <PrimaryButton className='mt-5'>
                終了する
            </PrimaryButton>
        </form>
        
        {showDescription && 
            <>
            <div data-testid='judge' className={`mt-5 ${isCorrect ? 'correct' : 'incorrect'}`} >
                {isCorrect ? '正解' : '不正解'}</div>
                <div>正解番号：{work.answer}</div>
            <div data-testid='description' className='mt-5 p-5'>{work.description}</div>
            </>
            }
            </div>
        </BasicLayout>

    )
}

export default WorkSolveForm;

