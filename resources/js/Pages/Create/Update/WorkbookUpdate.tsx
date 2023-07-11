import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { useForm, usePage } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { User } from '@/types';
import InputLabel from "@/Components/InputLabel";
import type { Workbooks } from '@/types/workbooks';
import React from 'react';
import { TextField } from '@mui/material';
import BasicLayout from '@/Layouts/BasicLayout';


type PageProps = {
    title:string;
  }




const WorkbookUpdate = ({auth,flash,title,workbook_id}:Workbooks) => {

    const { data, setData, post, errors } = useForm<PageProps>({
        title: title, 
    });

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("workbook.update",{workbook_id:workbook_id}));
    }
    
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
>
    <BasicLayout>
            { flash && flash.error && (
                <div className='text-center'>
                    <div style={{color:'red'}}>{flash.error}</div>
                </div>
            )}

            <div className='flex flex-col items-center'>
            <form onSubmit={submit}>

            <p className='mt-5'>タイトルを入力してください</p>
                    <InputLabel
                        className="mt-2"
                        htmlFor="permalink"
                        value="問題集のタイトル"
                    />

            <TextField 
            id="title"
            type="title"
            name="title"
            value={data.title}
            className="mt-1 block"
            autoComplete="titlename"
            onChange={(e: { target: { value: string; }; }) => setData("title", e.target.value)}
            variant="filled"
            required

            />
            <div>
            <PrimaryButton className = "mt-3">更新</PrimaryButton>
            </div>
            </form>
            </div>
            </BasicLayout>
        </AuthenticatedLayout>
    )
}

export default WorkbookUpdate;
