import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import BasicLayout from '@/Layouts/BasicLayout';

type Workbook = {
    workbook:{
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
    }

}
const Complete = ({auth,flash,workbook}:WorkbookArray & Workbooks & Workbook) => {
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <BasicLayout>
        {  flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}

        <div className='flex flex-col justify-center items-center p-10'>

        <Link
        href={route('workbook.start',{workbook_id:workbook.workbook_id})}
        ><PrimaryButton >
          早速問題を解く  
        </PrimaryButton></Link>

        <Link
        className='mt-5'
        href={route('top')}
        ><PrimaryButton >
            トップ画面に戻る
        </PrimaryButton></Link>
        </div>
        </BasicLayout>
        </AuthenticatedLayout>

        
    )
}

export default Complete;