import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import {ContentsBar} from "@/Pages/Parts/ContentsBar";
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
                <div className='mt-5'>

                <div className='flex justify-center'>
                <Link 
                key={workbook.id}
                href={route('workbook.analysis',{workbook_id: workbook.workbook_id})}
                >
                <div className='flex justify-between'>

                <ContentsBar 
                value={`${workbook.title}を分析する`}
                i={i}
                workbook_id='null'                
                id={0}
                publicate='null'
                />
                </div>
                </Link>
                </div>
                </div>
                )
            })}
                </BasicLayout>

        </AuthenticatedLayout> 
    )
}
export default WorkbookDisplay;