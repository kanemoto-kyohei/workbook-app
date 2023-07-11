import type { Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { WorkArray } from '@/types/works';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import {ContentsBar} from "@/Pages/Parts/ContentsBar";
import BasicLayout from '@/Layouts/BasicLayout';


type Work = {
    i?:number;
    id: number;
    workbook_id: string;
    question: string;
    options: string[];
    answer: number;
    description: string;
    time_to_solve: number;

}

const WorkDisplay = ({auth,flash,works,workbook_id}:Workbooks & WorkArray ) => {
    const [showModal, setShowModal] =  useState(false);
    const [selectedWork, setSelectedWork] = useState<Work | null>(null);
    
    const handleDeleteClick = (work:Work) => {
        setShowModal(true);
        setSelectedWork(work);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedWork(null);
    };

    const renderModalContent = () => {
        if(!selectedWork) return null;
        return (
        <div className='flex flex-col items-center p-10'>
        <h1>本当にこの問題を削除しますか</h1>
        <Link 
        style = {{color:'red',textDecoration:'underline'}}
        href={route('work.delete',{id:selectedWork.id})}        
        >削除</Link>
        </div>
        )
        
    }



    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >

        { flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}
        <BasicLayout>

        {works.map((work,i)=>{
            return (
                <div className='mt-8'>
                <div className='flex flex-col justify-center items-center'>
                <ContentsBar
                workbook_id='null'
                i={i}
                id={work.id}
                publicate='null'
                value={`第${i+1}問: ${work.question}`}
                onDeleteClick = {()=>handleDeleteClick(work)}
                />
                
                
               {showModal && (
                <Modal 
                show={true}
                onClose={handleModalClose}>
                {renderModalContent()}

                </Modal>
               )}
               </div>
                </div>

            )
        })}
        <div className='flex flex-col items-center mt-12'>
        <Link href={route('work.addmake',{workbook_id:workbook_id})}>
            <Fab 
            size='small' 
            color="info" 
            aria-label="add"
            >
             <AddIcon />
            </Fab>
            </Link>
            </div>
            </BasicLayout>
        </AuthenticatedLayout> 
    )
}
export default WorkDisplay;