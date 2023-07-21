import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import type { Works } from '@/types/works';
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import BasicLayout from '@/Layouts/BasicLayout';
import { FaCrown } from 'react-icons/fa';
import CrownIcon from '@/Pages/Parts/CrownIcon';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Button } from '@mui/material';

type Protected_Result = {
        result: number;
        nickname: string;
        i: number,
        }



const DisplayProtectedRanking = ({works,protected_results}:WorkbookArray & Workbooks & {protected_results:Protected_Result[],works:Works[]}) => {
    const [page,setPage] = useState<number>(1);
    const itemsPerPage = 6;

    const handleOnChange = (e: any,value: any) => {
        setPage(value)
    }

    const startIndex = (page -1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;;

    const displayResults=protected_results.slice(startIndex,endIndex);

    return(
        <BasicLayout>
        {displayResults.map((protected_result,i)=>{
            return (
                <div key={i} className='flex justify-center mt-5'>
                <CrownIcon 
                rank={i + (page-1)*itemsPerPage}
                name= {protected_result.nickname != null ?
                    protected_result.nickname:
                    `名無しさん${i}`}
                score={Math.ceil(protected_result.result / works.length * 100)}/>
                </div>
            )
        })}
        <div className='flex flex-col justify-center items-center mt-5'>
         <Stack spacing={2}>
        <Pagination 
        count={Math.ceil(protected_results.length/itemsPerPage)} 
        page={page}
        onChange={handleOnChange}
        variant="outlined" />
        </Stack>
        <Link 
        className='mt-5'
        href={route('top.layout')}>
        <Button>
            クイズを作成してみる</Button></Link></div>
        </BasicLayout>
    )
}

export default DisplayProtectedRanking;