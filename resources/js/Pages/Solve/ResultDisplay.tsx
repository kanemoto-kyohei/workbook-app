import type { Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { Result } from '@/types/results';
import { Work, WorkArray,Works} from '@/types/works';
import { Button, IconButton } from '@mui/material';
import  SendIcon  from '@mui/icons-material/Send';
import BasicLayout from '@/Layouts/BasicLayout';


const ResultDisplay = ({auth,workbook_id,result,works}:Workbooks & Result & {works:Works[]}) => {
    return(
    <AuthenticatedLayout
    user={auth.user}
    header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
    >
        <BasicLayout>
        <div className='flex flex-col items-center justify-center mt-5'>
        <div
        style={{fontFamily:'Kaisei Decol',
                fontSize:50}}
        >結果</div>
        <p 
        style={{fontFamily:'Kaisei Decol',
                fontSize:60,
                textShadow: '2px 2px 4px rgba(150, 100, 0, 0.5)',
                }}
        className='mb-5'
        >{Math.ceil(result/(works.length)*100)}点/100点</p>
        <Link 
        href={route('top')}        
        >
        <PrimaryButton>
            トップ画面に戻る
        </PrimaryButton>
        </Link>
        </div>
        </BasicLayout>

    </AuthenticatedLayout>
    )

}

export default ResultDisplay;