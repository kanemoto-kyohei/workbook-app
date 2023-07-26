import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import AverageRating from '@/Pages/Parts/AverageRating';
import {PublicDisplayCard} from '@/Pages/Parts/Animation/PublicDisplayCard';
import SearchBar from '@/Pages/Parts/SearchBar';
import { Button } from '@mui/material';


type User = {
    name:string;
    nickname:string;
}

type PublicResult = Array<{difficulty:number}>

type Workbook = {
    i: number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
    user:User;
    public_result:PublicResult;
}

const DisplayPublic = ({workbooks,auth,flash}:Workbooks & {workbooks:Workbook[]}) => {
    const [showModal, setShowModal] =  useState(false);
    const [selectedWork, setSelectedWork] = useState<Workbook | null>(null);
    const [searchText,setSearchText] = useState<string>('')
    const [sortOrder, setSortOrder] = useState<'asc'|'desc'|null>(null);

    
    const handleSelect = (workbook:Workbook) => {
        setShowModal(true);
        setSelectedWork(workbook);
    }

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedWork(null);
    };

    const renderModalContent = () => {
        if(!selectedWork) return null;
        return (
        <div className='flex flex-col items-center p-10'
        style={{fontFamily:'Kaisei Decol'}}>
        <div>この問題集を解き始めますか</div>
        <div>{selectedWork.title}</div>
        <Link 
        style = {{color:'blue',textDecoration:'underline'}}
        href={route('public.start',{workbook_id:selectedWork.workbook_id})}        
        ><Button>
            スタート
            </Button>
        </Link>
        </div>
        )
        
    }

    const handleSearch = (text:string) => {
        setSearchText(text);
    }

    const handleSort = (order:'asc'|'desc'|null)=>{
        setSortOrder(order);
    }

    const filteredWorkbooks = useMemo(() => {
        const sortedWorkbooks = [...workbooks];
      
        if (sortOrder) {
          sortedWorkbooks.sort((a, b) => {
            const aTotalDifficulty = calculateTotalDifficulty(a);
            const bTotalDifficulty = calculateTotalDifficulty(b);
            const aDifficulty = aTotalDifficulty / a.public_result.length;
            const bDifficulty = bTotalDifficulty / b.public_result.length;
            return sortOrder === 'asc' ? aDifficulty - bDifficulty : bDifficulty - aDifficulty;
          });
        }

        // 以下の部分を追加
        function calculateTotalDifficulty(workbook:Workbook) {
          let totalDifficulty = 0;
          workbook.public_result.forEach((public_result) => {
            if (public_result.difficulty != null) {
              totalDifficulty += public_result.difficulty;
            }
          });
          return totalDifficulty;
        }
          
        if (searchText) {
          return sortedWorkbooks.filter((workbook) => {
            const { title, user } = workbook;
            const name = user?.name ?? '';
            const nickname = user?.nickname ?? '';
    
            return (
              title.includes(searchText) ||
              name.includes(searchText) ||
              nickname.includes(searchText)
            );
          });
        } else {
          return sortedWorkbooks;
        }
      }, [workbooks, searchText, sortOrder]);

      
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        {  flash.success && (
            <div className='text-center'>
                <div style={{color:'green'}}>{flash.success}</div>
            </div>
        )}
        <SearchBar
        onSort={handleSort}
        onSearch={handleSearch}/>
          <div className='grid grid-cols-12 gap-1 md:gap-3 lg:gap-6'>

        {filteredWorkbooks.map((workbook,i)=>{
            let totalDifficulty = 0;
            {workbook.public_result.map((public_result)=>{
                if(public_result.difficulty != null){
                    totalDifficulty += public_result.difficulty;
                }
            })}


            return (
                <>
                  <div className='mb-20 grid col-span-12 col-start-3 sm:col-span-6 md:col-span-4 lg:col-span-3'>
                  <div className='mt-2 mb-8'>
                <PublicDisplayCard
                name={workbook.user.nickname != null ? 
                    `${workbook.user.nickname}の${workbook.title}` : 
                    `${workbook.user.name}の${workbook.title}`}
                value={totalDifficulty/workbook.public_result.length}
                difficulty={(totalDifficulty/workbook.public_result.length).toFixed(1)}
                people={workbook.public_result.length}
                onClick = {()=>handleSelect(workbook)}
                
                />
                </div>
                </div>
               {showModal && (
                <div className='grid'>
                <Modal 
                show={true}
                onClose={handleModalClose}>
                {renderModalContent()}
                </Modal>
                </div>
               )}
                
                </>
                );
            })}
            </div>

        </AuthenticatedLayout> 
    )
}
export default DisplayPublic;