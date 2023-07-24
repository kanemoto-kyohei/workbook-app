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
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

type Public_Result = {
            i:number;
            id: number;
            workbook_id: string;
            result:number;
            difficulty:number;
            user:{
                name:string;
                nickname:string;
        i: number
        
}
}


const DisplayRanking = ({works,public_results,auth,flash}:WorkbookArray & Workbooks  & {public_results:Public_Result[],works:Works[]}) => {
    const [page,setPage] = useState<number>(1);
    const itemsPerPage = 6;

    const handleOnChange = (e: any,value: any) => {
        setPage(value)
    }

    const startIndex = (page -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;;

    const displayResults=public_results.slice(startIndex,endIndex);

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <BasicLayout>
        {displayResults.map((public_result,i)=>{
            return (
                <div key={i} className='flex justify-center mt-5'>
                <CrownIcon 
                rank={i + (page-1)*itemsPerPage}
                name= {public_result.user.nickname != null ?
                    public_result.user.nickname:
                    public_result.user.name}
                score={Math.ceil(public_result.result / works.length * 100)}/>
                </div>
            )
        })}

        <div className='flex flex-col justify-center items-center mt-5'>

        <Stack spacing={2}>
        <Pagination 
        count={Math.ceil(public_results.length/itemsPerPage)} 
        page={page}
        onChange={handleOnChange}
        variant="outlined" />
        </Stack>
        </div>
        </BasicLayout>
        </AuthenticatedLayout>
    )
}

export default DisplayRanking;