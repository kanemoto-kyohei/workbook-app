import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import type { Works } from '@/types/works';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import BasicLayout from '@/Layouts/BasicLayout';
import { FaCrown } from 'react-icons/fa';
import CrownIcon from '@/Pages/Parts/CrownIcon';

type Public_Result = {
    public_results:{
        map(arg0: (public_result: {
            i:number;
            id: number;
            workbook_id: string;
            result:number;
            difficulty:number;
            user:{
                name:string;
                nickname:string;
            }
        }, 
        i: number
        
        ) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
}
}


const DisplayRanking = ({works,public_results,auth,flash}:WorkbookArray & Workbooks & Public_Result & {works:Works[]}) => {
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <BasicLayout>
        {public_results.map((public_result,i)=>{
            return (
                <div key={i} className='flex justify-center mt-5'>
                <CrownIcon 
                rank={i}
                name= {public_result.user.nickname != null ?
                    public_result.user.nickname:
                    public_result.user.name}
                score={Math.ceil(public_result.result / works.length * 100)}/>
                </div>
            )
        })}
        </BasicLayout>
        </AuthenticatedLayout>
    )
}

export default DisplayRanking;