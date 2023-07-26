import {  FormEventHandler } from 'react';
import type { Work } from '@/types/works';
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import  TextField  from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@/Components/InputLabel";



type RouteSelect = {
    is_create:boolean;
    is_add:boolean;
    is_update:boolean;
    id:number;
}


const WorkMakeForm = ({id,workbook_id,question,options,answer,description,time_to_solve,
    is_create,is_add,is_update
    }
    :Work & RouteSelect) => {
    const { data, setData, post } = useForm<Work>({
        workbook_id: workbook_id,
        question: question,
        options: options,
        answer: answer,
        description: description,
        time_to_solve: time_to_solve,
    });
    const [optionArray, setOptions] = useState<string[]>(options);
    const [isGoodForm, setisGoodForm] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState(`${answer}`);
    const [selectedTime, setSelectedTime] = useState(`${time_to_solve}`);


    
    const resetForm = () => {
        setData({
          workbook_id: workbook_id,
          question: '',
          options: [],
          answer: 1,
          description: '',
          time_to_solve: 10,
        });
        setOptions(['','']);
      };

      const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("create.work",{workbook_id:workbook_id}))
        resetForm();
       }

       const endSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("complete",{workbook_id:workbook_id}))
        resetForm();
       }

       const addSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("work.add",{workbook_id:workbook_id}))
        resetForm();
       }

       const updateSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route("work.update",{id:id}))
       }

    const handleOptionChange = (index:number, value:string) => {
        const updatedOptions = [...optionArray];
        updatedOptions[index] = value;
        setOptions(updatedOptions);
        setData('options',updatedOptions);
        setisGoodForm(data.question != null && updatedOptions.length >= 2 && updatedOptions.every(option => option !== '') && data.answer != null);
    };

    const handleAddOption = () => {
        if(optionArray.length <5){
        setOptions((prevOptions)=> [...prevOptions,''])
        }
    };

    const handleRemoveOption =  () => {
        if(optionArray.length >2){
            const updatedOptions = optionArray.filter((_,i)=> i != optionArray.length-1);
            setOptions(updatedOptions);
        } 
    }

    const handleChange = (e: SelectChangeEvent) => {
        setSelectedAnswer(e.target.value)
        setData('answer',Number(e.target.value))
    }

    const handleTimeChange = (e: SelectChangeEvent) => {
        setSelectedTime(e.target.value)
        setData('time_to_solve',Number(e.target.value))
    }


    

    const answerNum = optionArray.map((_,index)=>({label:(index + 1)}));   

    return(
            
            <div className='flex justify-center mt-8'>
            <form onSubmit={submit}>

            <InputLabel
                className="mt-2"
                value="①問題文を入力してください（必須）"
                htmlFor='question'
                style={{fontFamily:'Kaisei Decol'}}
            />


            <TextField
            className='w-80'
            multiline
            margin="normal"
            rows={4}
            variant="filled"
            label="問題文を入力"
            id = "question"
            name = "question"
            value ={data.question}
            onChange = {(e)=> {
                setData('question',e.target.value)
                setisGoodForm(data.question != null && optionArray.length >= 2 && optionArray.every(option => option !== '') && data.answer != null);
            }}
            style={{borderRadius: '10p', backgroundColor:'#f4eee8',whiteSpace: 'pre-wrap'}}
            required 
            />


            <div className='flex flex-col mt-5'>
            <InputLabel
                className="mt-2"
                value="②選択肢を追加してください（必須）"
                htmlFor='question'
                style={{fontFamily:'Kaisei Decol'}}
            />
 
            {optionArray.map((option,index)=>(
            <>
            <div 
            key={index + 1} 
            className="mt-2"
            style={{fontFamily:'Kaisei Decol'}}
            >{`${index + 1}つめ`}</div>
            <TextField
                multiline
                rows={4}
                variant="filled"
                label="選択肢を入力"
                className="my-3"
                key = {index}
                value = {option}
                onChange = {(e)=>handleOptionChange(index, e.target.value)}
                required
                style={{borderRadius: '10p', backgroundColor:'#f4eee8'}}
                ></TextField>

                </>

                
        ))}
        <div className='mt-2 flex flex-row'>
        {optionArray.length < 5 && (
            <Fab
            sx={{ml:1}}
            size='small' 
            color="info" 
            aria-label="add"
            onClick={handleAddOption}
            className = 'mt-2'>
             <AddIcon />
           </Fab>
        )}

        {optionArray.length > 2 && (
            <Fab 
            sx={{ml:1}}
            size='small' 
            color="warning" 
            aria-label="add"
            onClick={handleRemoveOption}
            className = 'mt-2'>
             <DeleteIcon />
           </Fab>
        )}</div></div>

        <div>
        <FormControl sx={{ m: 1, minWidth: 120, mt:3 }}>
        <InputLabel 
            className="my-3"
            value="③正解番号を選択してください（必須）"
            htmlFor='question'
            style={{fontFamily:'Kaisei Decol'}}
        >{is_update ? answer : '正解番号'}</InputLabel>
        <Select
            value = {selectedAnswer}
            name = 'answer'
            id = 'answer'
            onChange={handleChange}  
            required
            className="w-20"
            style={{borderRadius: '10p', backgroundColor:'#f4eee8'}}
            >
        {answerNum.map((option, index) => (
            <MenuItem key={index} value={option.label}>
                {option.label}
            </MenuItem>
            ))}            
        </Select>
        </FormControl>
        </div>

        <div className='mt-5'>
        <InputLabel
                className="my-3"
                value="④解説を入力してください"
                htmlFor='question'
                style={{fontFamily:'Kaisei Decol'}}
            />

        <TextField
            className='mt-5 w-full'
            multiline
            rows={4}
            variant="filled"
            label="解説を入力"
            id = "description"
            name = "description"
            value ={data.description}
            onChange = {(e)=> setData('description',e.target.value)}
            style={{borderRadius: '10p', backgroundColor:'#f4eee8'}}
            />
            </div>
            <div>
            <FormControl sx={{ m: 1, minWidth: 120, mt:3 }}>
                    <InputLabel 
                    className="my-3"
                    value="⑤制限時間を選択してください"
                    htmlFor='question'
                    style={{fontFamily:'Kaisei Decol'}}
        >{is_update ? time_to_solve : '制限時間'}</InputLabel>
             <div className='flex items-center mb-5'>
             <Select
             value = {selectedTime}
             name = 'time_to_solve'
             id='time_to_solve'
             onChange={handleTimeChange}
             className="w-50"
             style={{borderRadius: '10p', backgroundColor:'#f4eee8'}}
            >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={50}>50</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={80}>80</MenuItem>
            <MenuItem value={100}>100</MenuItem>
            <MenuItem value={120}>120</MenuItem>
            <MenuItem value={150}>150</MenuItem>
            <MenuItem value={180}>180</MenuItem>
            <MenuItem value={210}>210</MenuItem>
            <MenuItem value={250}>250</MenuItem>
            <MenuItem value={300}>300</MenuItem>
            <MenuItem value={360}>360</MenuItem>
            </Select>
            <p className="text-lg ml-3">秒</p>

            </div>
            </FormControl>
            </div>
            
            {is_create && <PrimaryButton data-testid="next-button" className='mb-1'>次の問題へ</PrimaryButton>}

            {isGoodForm && is_create &&
            <PrimaryButton data-testid="finish-button" className='mb-5 ml-3'
            onClick={endSubmit}>完了</PrimaryButton>
            }

            {isGoodForm && is_add &&
            <PrimaryButton
            data-testid="add-button" 
            className='mb-5'
            onClick={addSubmit}>追加</PrimaryButton>
            }

            {is_update &&
            <PrimaryButton
            data-testid="update-button" 
            className='mb-5'
            onClick={updateSubmit}>更新</PrimaryButton>
            }
             </form>   
            </div>
            

    )

}

export default WorkMakeForm;
