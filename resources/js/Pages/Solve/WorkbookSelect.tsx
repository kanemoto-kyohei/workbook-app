import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import {ContentsBar} from "@/Pages/Parts/ContentsBar";
import { Button } from '@mui/material';
import FastForwardIcon from '@mui/icons-material/FastForward';


type Workbook = {
    i: number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
}

const WorkbookSelect = ({workbooks,auth,flash}:WorkbookArray & Workbooks) => {
    const [showModal, setShowModal] =  useState(false);
    const [selectedWork, setSelectedWork] = useState<Workbook | null>(null);

    
    const handleSelect = (workbook:Workbook) => {
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
        <div
        style={{fontFamily:'Kaisei Decol'}}>この問題集を解き始めますか</div>
        <div
        style={{fontFamily:'Kaisei Decol'}}>{selectedWork.title}</div>
        <Link 
        style = {{color:'blue',textDecoration:'underline'}}
        href={route('workbook.start',{workbook_id:selectedWork.workbook_id})}        
        ><Button>
            スタート
            </Button>
        </Link>
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
                <div className='flex justify-center mt-5'>
                <div className='mt-3'>
                <ContentsBar 
                i={i}
                id={0}
                workbook_id='null'
                publicate='null'
                value={workbook.title}
                onClick={()=>handleSelect(workbook)}
                />
                </div>

                
               {showModal && (
                <Modal 
                show={true}
                onClose={handleModalClose}>
                {renderModalContent()}
                </Modal>
               )}

                </div>
                )
            })}
        </BasicLayout>
        </AuthenticatedLayout> 
    )
}
export default WorkbookSelect;