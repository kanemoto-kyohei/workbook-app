import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import {ContentsBar} from "@/Pages/Parts/ContentsBar";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { Box, Button } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';
import BasicLayout from '@/Layouts/BasicLayout';


type Workbook = {
    i: number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
    is_public: boolean
}

type Public = {
    is_public:boolean;
}

const WorkbookDisplay = ({workbooks,auth,flash}:WorkbookArray & Workbooks & Public) => {
    const [showModal, setShowModal] =  useState(false);
    const [selectedWork, setSelectedWork] = useState<Workbook | null>(null);
    
    const handlePublicateClick = (workbook:Workbook) => {
        setShowModal(true);
        setSelectedWork(workbook);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedWork(null);
    };

    async function handleGetLinkClick(workbook:Workbook) {
        // この部分を適切なリンク形式に修正してください。
        const textToCopy = `https://shareledge-72d491ceb1b6.herokuapp.com/protected/solve/pre/start/${workbook.workbook_id}`;
    
        try {
            await navigator.clipboard.writeText(textToCopy);
            console.log('リンクをコピーしました！');
        } catch (err) {
            console.error('リンクのコピーに失敗しました', err);
        }
    }
    


    const renderModalContent = () => {
        if(!selectedWork) return null;
        return (
        <div className='flex flex-col items-center p-10'>
        {selectedWork.is_public ? 
         <> 
         <h1>問題集を非公開にしますか</h1>
         <h2>{selectedWork.title}</h2>
         <Link 
         style = {{color:'red',textDecoration:'underline'}}
         href={route('workbook.private',{workbook_id:selectedWork.workbook_id})}  
         >非公開</Link>
        </> :
        <>
        <h1>本当にこの問題集を公開しますか</h1>
        <h2>{selectedWork.title}</h2>
        <Link
        style = {{color:'green',textDecoration:'underline'}}
        href={route('workbook.publicate',{workbook_id:selectedWork.workbook_id})}  
        >公開</Link>
         </> 
        }
        </div>
       
        )
        
    }

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >

        <BasicLayout>
        {  flash.success && (
            <div className='text-center m-5'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}

        {  flash.error && (
            <div className='text-center m-5'>
                <div style={{color:'red'}}>{flash.error}</div>
            </div>
        )}



        {workbooks.map((workbook,i)=>{
            return (
                <Grid container justifyContent="center" alignItems="center">
                <div className='flex justify-between mt-8'>
                <ContentsBar
                i={i}
                id={0}
                workbook_id='null'
                publicate={workbook.is_public ? '非公開にする' : 'このアプリに公開する'}
                publicateClick={()=>handlePublicateClick(workbook)}
                getLinkClick={()=>handleGetLinkClick(workbook)}
                value={workbook.title}/>
                
               {showModal && (
                <Modal 
                show={true}
                onClose={handleModalClose}>
                {renderModalContent()}
                </Modal>
               )}

                </div>
                </Grid>
                )
            })}
            </BasicLayout>

        </AuthenticatedLayout> 
    )
}
export default WorkbookDisplay;