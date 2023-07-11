import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { Workbooks } from '@/types/workbooks';
import type { Work } from '@/types/works';
import Select from "react-select";
import PrimaryButton from "@/Components/PrimaryButton";
import { usePage,useForm } from '@inertiajs/react';
import { useState } from 'react';



const WorkUpdate = ({id,workbook_id,question,options,answer,description,time_to_solve,auth,flash}:Workbooks & Work) => {
    const { data, setData, post, errors } = useForm<Work>({
        workbook_id: workbook_id,
        question: question,
        options: options,
        answer: answer,
        description: description,
        time_to_solve: time_to_solve,
    });
    const [optionArray, setOptionArray] = useState<string[]>(options);

    

    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("work.update",{id:id}))
       }




    const handleOptionChange = (index:number, value:string) => {
        const updatedOptions = [...optionArray];
        updatedOptions[index] = value;
        setOptionArray(updatedOptions);
        setData('options',updatedOptions);
    };

    const handleAddOption = () => {
        if(optionArray.length <5){
        setOptionArray((prevOptions)=> [...prevOptions,''])
        }
    };

    const answers = optionArray.map((_,index)=>({label:(index + 1)}));   

    const time_to_solve_list = [
        { label: 5 },
        { label: 10 },
        { label: 20 },
        { label: 30 },
        { label: 40 },
        { label: 50 },
        { label: 60 },
        { label: 80 },
        { label: 100 },
        { label: 120 },
        { label: 140 },
        { label: 160 },
        { label: 180 },
        { label: 200 },
        { label: 220 },
        { label: 240 },
        { label: 270 },
        { label: 300 },
    ]



    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">ShareKnowladge</h2>}
        >
            <div className='flex flex-col items-center'>
            { flash && flash.error && (
                <div className='text-center'>
                    <div style={{color:'red'}}>{flash.error}</div>
                </div>
            )}
            {  flash.message && (
                <div className='text-center'>
                    <div style={{color:'green'}}>{flash.message}</div>
                </div>
            )}


            <h1 className='mt-4'>問題文を入力してください</h1>

            <textarea
            id = "question"
            name = "question"
            value ={data.question}
            onChange = {(e)=> setData('question',e.target.value)}
            style={{borderRadius: '10p'}}
            required
            />
            
            <h1 className='mt-4'>選択肢を追加して入力してください<span style={{color:'red'}}>（最大５つ）</span></h1>
        {optionArray.map((option,index)=>(
            <>
            <span className="mt-4">{index + 1}</span>
            <textarea
                className="mt-2"
                key = {index}
                value = {option}
                onChange = {(e)=>handleOptionChange(index, e.target.value)}
                required
                ></textarea>
                </>
        ))}
        {optionArray.length < 5 && (
            <PrimaryButton 
                onClick={handleAddOption}
                className = 'mt-2'
                >＋</PrimaryButton>
        )}
        <h1 className="mt-3">正解番号を選択してください</h1>
        <Select
            options = {answers}
            name = 'answer'
            id = 'answer'
            placeholder = {answer}
            onChange={(selectedOption) =>{
                if(selectedOption){
                     setData("answer", selectedOption.label)
                }
             } }
            required
            className="w-70 ml-9"
            />


            <h1 className='mt-4'>解説を入力してください</h1>
            <textarea
            id = "description"
            name = "description"
            value ={data.description}
            onChange = {(e)=> setData('description',e.target.value)}
            style={{borderRadius: '10p'}}
            />

            <h1 className='mt-4'>制限時間を選択してください<span>（任意）</span></h1>
             <div className='flex items-center mb-5'>
             <Select
             options = {time_to_solve_list}
             name = 'time_to_solve'
             id='time_to_solve'
             placeholder = {time_to_solve}
             onChange={(selectedOption) =>{
                if(selectedOption){
                     setData("time_to_solve", selectedOption.label)
            
                }}}
                className="w-70 ml-9"

             />
            <span className="text-lg ml-2">秒</span>
            </div>
            <form onSubmit={submit}>
            <PrimaryButton className='mb-5'>更新する</PrimaryButton>
            </form>


            </div>
        </AuthenticatedLayout>    
    )

}

export default WorkUpdate;