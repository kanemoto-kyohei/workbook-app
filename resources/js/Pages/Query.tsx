import { useEffect, FormEventHandler } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import  TextField  from '@mui/material/TextField';
import Checkbox from '@/Components/Checkbox';

export default function Query() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        content: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('query.send'));
    };

    return (
        <BasicLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
            <div className='flex flex-col justify-center items-center p-10'>

                <div>

                    <TextField
                        id="name"
                        name="name"
                        label="お名前(法人名）"
                        value={data.name}
                        className="mt-1 block"
                        sx={{
                            width:{xs:'300px',md:'500px', xl:'600px'}
                        }}
                        autoComplete="name"
                        onChange={(e) => setData('name', e.target.value)}
                        required
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>



                <div className="mt-4">

                    <TextField
                        id="email"
                        type="email"
                        name="email"
                        label="有効なメールアドレス"
                        value={data.email}
                        className="mt-1 block"
                        sx={{
                            width:{xs:'300px',md:'500px', xl:'600px'}
                        }}
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">

                <TextField
                    id="content"
                    multiline
                    rows={4} 
                    label="問い合わせの内容を記入してください"           
                    name="content" // プロパティ名を content に変更
                    value={data.content}
                    className="mt-1 block"
                    sx={{
                      width: { xs: '300px', md: '500px', xl: '600px' }
                    }}
                    autoComplete="new-password"
                    onChange={(e) => setData('content', e.target.value)}
                    required
                    />
                    <InputError message={errors.content} className="mt-2" />
                </div>
                

                    <PrimaryButton className="my-4" disabled={processing}>
                        送信
                    </PrimaryButton>
                </div>
            
            </form>
        </BasicLayout>
    );
}
