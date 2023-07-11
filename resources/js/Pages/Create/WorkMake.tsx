import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import { useEffect, FormEventHandler } from 'react';
import InputLabel from '@/Components/InputLabel';
import type { Workbooks } from '@/types/workbooks';
import type { Work } from '@/types/works';
import PrimaryButton from "@/Components/PrimaryButton";
import WorkMakeForm from "@/Pages/Parts/WorkMakeForm";
import { usePage,useForm } from '@inertiajs/react';
import { useState } from 'react';



const WorkMake = ({workbook_id,auth,flash}: Workbooks) => {

  return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        > 

        {flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}
        {flash.error && (
            <div className='text-center'>
                <div style={{color:'red'}}>{flash.error}</div>
            </div>
        )}
    <BasicLayout>
        <WorkMakeForm
        id={0} 
        workbook_id={workbook_id}
        question=''
        options={['','']}
        answer={1}
        description=''
        time_to_solve={10}
        is_create={true}
        is_add={false}
        is_update={false}
        />



        </BasicLayout>
        </AuthenticatedLayout>
  )
}

export default WorkMake;