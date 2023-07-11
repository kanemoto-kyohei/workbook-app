import type { Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { Result } from '@/types/results';
import { Work, WorkArray,Works} from '@/types/works';
import { Button, IconButton } from '@mui/material';
import  SendIcon  from '@mui/icons-material/Send';
import Rating from '@/Pages/Parts/Rating';
import BasicLayout from '@/Layouts/BasicLayout';


const PublicResultDisplay = ({auth,workbook_id,result,works}:Workbooks & Result & {works:Works[]}) => {
    const [rating,setRating] = useState<number | null>(null);
    const [showRanking,setShowRanking] = useState(false);
    const { post,setData } = useForm({
        difficulty:rating,
        workbook_id:workbook_id,
    });


    const handleRatingChange = (value: number | null) =>{
        setRating(value);
        setShowRanking(true);
    }

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("public.ranking",{workbook_id:workbook_id}))
    }

    function backSubmit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("display.public_with_difficulty"))
    }


    return(
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <BasicLayout>
        <div className='flex flex-col justify-center items-center'>
        <div
        style={{fontFamily:'Kaisei Decol',
        fontSize:50}}
        >結果</div>
        <div
        style={{fontFamily:'Kaisei Decol',
        fontSize:60,
        textShadow: '2px 2px 4px rgba(150, 100, 0, 0.5)',
        }}
        >{Math.ceil(result/(works.length)*100)}点/100点</div>
        <div
        style={{fontFamily:'Kaisei Decol',
        fontSize:18}}
        >この問題集の難易度はどれくらいでしたか</div>
        <Rating onChange = {handleRatingChange}/>
        {showRanking &&
        <>
        <form onSubmit={submit}>
        <PrimaryButton
        className='m-5'
        onClick={()=>setData('difficulty',rating)}>
            あなたの順位を見ますか？
        </PrimaryButton>
        </form>
        <form onSubmit={backSubmit}>
        <PrimaryButton
        onClick={()=>setData('difficulty',rating)}>                
            一覧に戻る
        </PrimaryButton>
        </form>
        </>
        }
        </div>
        </BasicLayout>
        

    </AuthenticatedLayout>
    )

}

export default PublicResultDisplay;