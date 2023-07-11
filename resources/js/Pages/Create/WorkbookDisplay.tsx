import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import {ContentsBar} from "@/Pages/Parts/ContentsBar";
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import BasicLayout from '@/Layouts/BasicLayout';


type Workbook = {
    i: number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
}

const WorkbookDisplay = ({workbooks,auth,flash}:WorkbookArray & Workbooks) => {
    const [showModal, setShowModal] =  useState(false);
    const [selectedWork, setSelectedWork] = useState<Workbook | null>(null);

    
    const handleDeleteClick = (workbook:Workbook) => {
        setShowModal(true);
        setSelectedWork(workbook);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedWork(null);
    };

    const renderModalContent = () => {
        if(!selectedWork) return null;
        return (
        <div className='flex flex-col items-center p-10'>
        <div>本当にこの問題集を削除しますか</div>
        <div>{selectedWork.title}</div>
        <Link 
        style = {{color:'red',textDecoration:'underline'}}
        href={route('workbook.delete',{workbook_id:selectedWork.workbook_id})}        
        >削除</Link>
        </div>
        )
        
    }

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        {  flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}
        <BasicLayout>

        {workbooks.map((workbook,i)=>{
            return (
                <div className='mt-8'>
                <div className='flex justify-center'>
                <ContentsBar
                workbook_id={workbook.workbook_id}
                i={i}
                value={workbook.title}
                id={0}
                publicate='null'
                onDeleteClick={()=>handleDeleteClick(workbook)}
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
            </BasicLayout>

        </AuthenticatedLayout> 
    )
}
export default WorkbookDisplay;