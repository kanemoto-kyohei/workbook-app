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
            value='問題を作る'
            imgURL = '/images/create.png'
            />
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-start'>
            <Link
            href={route('workbook.select')}>
            <FadeinButton
            value='作った問題を解く'
            imgURL = '/images/solve.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-end '>
            <Link
            href={route('display.public')}>
            <FadeinButton
            value='シェアされた問題を見る'
            imgURL = '/images/public.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all'>
            <Link
            href={route('workbook.analyse_display')}>
            <FadeinButton
            value='成績を振り返る'
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
            value='問題を作る'
            imgURL = '/images/create.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-center md:justify-center'>
            <Link
            href={route('workbook.display')}>
            <FadeinButton
            value='問題を編集する'
            imgURL = '/images/edit.png'
            />
            </Link>
            </div>
            <div className='scale-100 p-6 flex motion-safe:hover:scale-[1.01] transition-all justify-center md:justify-start'>
            <Link
            href={route('workbook.public')}>
            <FadeinButton
            value='問題を公開する'
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
