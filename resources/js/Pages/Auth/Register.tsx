import { useEffect, FormEventHandler, useState } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import  TextField  from '@mui/material/TextField';
import Checkbox from '@/Components/Checkbox';
import { Button } from '@mui/material';
import Modal from '@/Components/Modal';
import Terms from '../Policies/Terms';

export default function Register() {
    const [showModal,setShowModal] = useState(false);
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        nickname:'',
        email: '',
        password: '',
        password_confirmation: '',
        check: false,

    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    const handleClick = () => {
        setShowModal(true);
    };
    
    const handleModalClose = () => {
        setShowModal(false);
    };

    const renderModalContent = () => {
           return <Terms/>
    }




    return (
        <BasicLayout>
            <Head title="Register" />

            <form onSubmit={submit}>
            <div className='flex flex-col justify-center items-center p-10'>

                <div>
                    <InputLabel htmlFor="name" value="お名前" />

                    <TextField
                        id="name"
                        name="name"
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

                <div className='mt-4'>
                    <InputLabel htmlFor="nickname" value="ニックネーム" />

                    <TextField
                        id="nickname"
                        name="nickname"
                        value={data.nickname}
                        className="mt-1 block"
                        sx={{
                            width:{xs:'300px',md:'500px', xl:'600px'}
                        }}
                        autoComplete="nickname"
                        onChange={(e) => setData('nickname', e.target.value)}
                        required
                    />

                    <InputError message={errors.nickname} className="mt-2" />
                </div>


                <div className="mt-4">
                    <InputLabel htmlFor="email" value="メールアドレス" />

                    <TextField
                        id="email"
                        type="email"
                        name="email"
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
                    <InputLabel htmlFor="password" value="パスワード" />

                    <TextField
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block"
                        sx={{
                            width:{xs:'300px',md:'500px', xl:'600px'}
                        }}
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password_confirmation" value="パスワード確認" />

                    <TextField
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block"
                        sx={{
                            width:{xs:'300px',md:'500px', xl:'600px'}
                        }}
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />

                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>
                </div>

                <div className="flex items-center justify-center">
                    <Button
                    onClick = {handleClick}
                    >
                        利用規約を開く
                    </Button>
                </div>

                {showModal && (
                <Modal 
                show={true}
                onClose={handleModalClose}>
                {renderModalContent()}
                </Modal>
               )}


                <div className="block mt-4">
                    <label className="flex items-center justify-center">
                        <Checkbox
                            name="check"
                            checked={data.check}
                            onChange={(e) => setData('check', e.target.checked)}
                            required
                        />
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">利用規約に同意する</span>
                    </label>
                </div>

                

                <div className="flex items-center justify-end mt-4">
                    <Link
                        href={route('login')}
                        className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                    >
                        すでにアカウントを持っていますか？
                    </Link>

                    <PrimaryButton className="mx-4" disabled={processing}>
                        登録する
                    </PrimaryButton>
                </div>
            
            </form>
        </BasicLayout>
    );
}
