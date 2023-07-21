import type { Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import React, { useState } from 'react';
import { Link, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Modal from '@/Components/Modal';
import { Result } from '@/types/results';
import { Work, WorkArray,Works} from '@/types/works';
import { Button, IconButton } from '@mui/material';
import  SendIcon  from '@mui/icons-material/Send';
import Rating from '@/Pages/Parts/Rating';
import BasicLayout from '@/Layouts/BasicLayout';
import InputLabel from '@/Components/InputLabel';
import  TextField  from '@mui/material/TextField';




const ProtectedResultDisplay = ({auth,workbook_id,result,works}:Workbooks & Result & {works:Works[]}) => {
    const [showRanking,setShowRanking] = useState(false);
    const { data,post,setData } = useForm({
        nickname:'',
        workbook_id:workbook_id,
    });


    function submit(e: { preventDefault: () => void; }) {
        e.preventDefault();
        post(route("protected.ranking",{workbook_id:workbook_id}))
    }



    return(
        <BasicLayout>
        <div className='flex flex-col justify-center items-center'>
        <div
        style={{fontFamily:'Kaisei Decol',
        fontSize:50}}
        >結果</div>
        <div
        style={{fontFamily:'Kaisei Decol',
        fontSize:60,
        textShadow: '2px 2px 4px rgba(150, 100, 0, 0.5)',
        }}
        >{Math.ceil(result/(works.length)*100)}点/100点</div>

        <div
        className='mt-5'>
        <InputLabel htmlFor="nickname" value="あなたのニックネームは？" />


        <TextField
        id="nickname"
        name="nickname"
        value={data.nickname}
        className="mt-1 block"
        sx={{
            width:{xs:'300px',md:'500px', xl:'600px'}
        }}
        autoComplete="nickname"
        onChange={(e) => {setData('nickname', e.target.value);
        setShowRanking(true);}
        }
        required></TextField>
        </div>

        {showRanking &&
        <>
        <form onSubmit={submit}>
        <PrimaryButton
        className='m-5'
        >
            あなたの順位を見ますか？
        </PrimaryButton>
        </form>
        </>
        }
        </div>
        </BasicLayout>
        

    )

}

export default ProtectedResultDisplay;