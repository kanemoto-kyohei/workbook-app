import PrimaryButton from "@/Components/PrimaryButton";
import BasicLayout from "@/Layouts/BasicLayout";
import { Link } from "@inertiajs/react";
import Button from '@mui/material/Button';
import { fontFamily } from "@mui/system";

type Workbook = {
    workbook:{
    i: number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
    is_public: boolean,
    user:{
        name:string,
        nickname:string;
    }}
}


const ProtectedWorkbookPreStart = ({workbook}:Workbook) => {

    
    return(
        <BasicLayout >
            <div className="flex flex-col justify-center items-center m-8">
                <div
                style={{
                    fontSize:40,
                    fontFamily:'Kaisei Decol'
                }}><div>{workbook.user.nickname ?
                workbook.user.nickname :
                workbook.user.name
            }の</div>
            <div>{workbook.title}</div></div>
           
            <Link 
            className="mt-5"
            href={route('protected.start',{workbook_id:workbook.workbook_id})}             
            ><Button
            style={{
                fontSize:25,
                fontFamily:'Kaisei Decol'}}
                >
                この問題をとく
                </Button>
            </Link>

            <Link 
            className="mt-5"
            href={route('protected.ranking',{workbook_id:workbook.workbook_id})}             
            ><Button
            style={{
                fontSize:25,
                fontFamily:'Kaisei Decol'}}
                >
                ランキングを見る
                </Button>
            </Link>

            </div>
        </BasicLayout>
    )
}

export default ProtectedWorkbookPreStart;