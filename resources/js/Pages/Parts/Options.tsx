import PrimaryButton from "@/Components/PrimaryButton";
import Select from "react-select";
import type { Workbooks } from '@/types/workbooks';
import type { Works } from '@/types/works';
import { useState } from 'react';


export const Options = ({options}:{ options: string[] }):JSX.Element => {

    const [optionValue, setOptions] = useState<string[]>(options);

    const handleOptionChange = (index:number, value:string) => {
        const updatedOptions = [...optionValue];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
    };

    const handleAddOption = () => {
        if(optionValue.length <5){
        setOptions((prevOptions)=> [...prevOptions,''])
        }
    };

    const answers = optionValue.map((_,index)=>({label:(index + 1)}));   


    return(
        <>
        <h1 className='mt-4'>選択肢を追加して入力してください<span style={{color:'red'}}>（最大５つ）</span></h1>
        {optionValue.map((option,index)=>(
            <>
            <span className="mt-4">{index + 1}</span>
            <textarea
                className="mt-2"
                key = {index}
                value = {option}
                onChange = {(e)=>handleOptionChange(index, e.target.value)}
                ></textarea>
                </>
        ))}
        {options.length < 5 && (
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
            placeholder = {'正解番号を選択してください'}
            onChange={(selectedOption) =>
                     setData("answer", selectedOption.label)
                          }
                required
                className="w-70 ml-9"
            />
        </>
    )


}