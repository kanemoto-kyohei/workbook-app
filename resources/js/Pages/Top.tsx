import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import PrimaryButton from "@/Components/PrimaryButton";
import {FadeinButton} from "@/Pages/Parts/Animation/FadeinButton";
import { Head,Link } from '@inertiajs/react';
import { PageProps } from '@/types';
import React, { ReactNode, useState } from 'react';
import Loading from './Parts/Loading';
import { Workbooks } from '@/types/workbooks';






export default function Top({ auth,flash }: Workbooks) {
    const [showMenu,setShowMenu] = useState(false);

    const handleClick = () => {
        setShowMenu(true);
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        {!showMenu &&
        <BasicLayout>
        <div className='mt-10'>
        {flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}

          <div className='grid grid-cols-2 gap-1 lg:gap-2'>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-end '>
            <FadeinButton
            onClick={handleClick}
            value='作る'
            sub='自分だけの問題を作成、編集、公開する'
            imgURL = '/images/create.png'
            />
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-start'>
            <Link
            href={route('workbook.select')}>
            <FadeinButton
            value='解く'
            sub='作成した問題を解いてみる'
            imgURL = '/images/solve.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-end '>
            <Link
            href={route('display.public')}>
            <FadeinButton
            value='見る'
            sub='他のユーザが公開した問題を覗いてみる'
            imgURL = '/images/public.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all'>
            <Link
            href={route('workbook.analyse_display')}>
            <FadeinButton
            value='分析する'
            sub='解いた問題の成績を振り返る'
            imgURL = '/images/analyse.png'
            />
            </Link>
            </div>
            </div>
            </div> 
            </BasicLayout>
        }

            {showMenu && 
            <BasicLayout>
            <div className='mt-16'>
            <div className='grid grid-cols-1 gap-1 md:grid-cols-3'>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-center md:justify-end'>
            <Link
            href={route('title')}>
            <FadeinButton
            value='作る'
            sub='自分だけの問題を作成する'
            imgURL = '/images/create.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-center md:justify-center'>
            <Link
            href={route('workbook.display')}>
            <FadeinButton
            value='編集する'
            sub='自分だけの問題のタイトルや内容を編集する'
            imgURL = '/images/edit.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-center md:justify-start'>
            <Link
            href={route('workbook.public')}>
            <FadeinButton
            value='公開する'
            sub='作成した問題を公開、非公開にする'
            imgURL = '/images/publicate.png'
            />
            </Link>
            </div>
            </div>
            </div>
            </BasicLayout>}




        </AuthenticatedLayout>
    );
}
