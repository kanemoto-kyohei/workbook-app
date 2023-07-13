import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import { useForm, usePage } from '@inertiajs/react';
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { User } from '@/types';
import InputLabel from "@/Components/InputLabel";
import type { Workbooks } from '@/types/workbooks';
import React from 'react';
import { TextField } from '@mui/material';

type FormData = {
    title: string;
  };

  type FlashProps = {
    message: string | null;
    error: string | null;
  };

  type PageProps = {
    auth:{
        user:User;
    }
    flash:FlashProps;
  }



const Title = ({auth,flash}:PageProps) => {

    const { data, setData, post, errors } = useForm<FormData>({
        title: "", 
    });

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("create.title"));
    }
    
    return (
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
>
            <BasicLayout>
            <div className='flex flex-col items-center p-10'>
            <form onSubmit={submit}>

            {flash.error && (
                <div className='text-center'>
                    <div style={{color:'red'}}>{flash.error}</div>
                </div>
            )}
            
                    <InputLabel
                        className="mt-2"
                        htmlFor="permalink"
                        value="問題集のタイトル"
                        style={{fontFamily:'Kaisei Decol'}}
                    />

                    <TextField
                    id="title"
                    rows={1}
                    type="title"
                    name="title"
                    value={data.title}
                    className="mt-1 block"
                    autoComplete="titlename"
                    onChange={(e: { target: { value: string; }; }) => setData("title", e.target.value)}
                    defaultValue="タイトル"
                    helperText="問題集のタイトルを記入してください."
                    variant="filled"
                    required
                        />

                    <div>
                    <PrimaryButton className = "mt-3">次へ</PrimaryButton>
                    </div>
                    </form>
                    </div>
                </BasicLayout>
            </AuthenticatedLayout>
    )
}

export default Title;

