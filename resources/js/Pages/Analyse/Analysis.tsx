import React from "react"
import ResultLine from '@/Pages/Parts/ResultLine'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import type { WorkbookArray, Workbooks } from '@/types/workbooks';
import BasicLayout from "@/Layouts/BasicLayout";
import { Box } from "@mui/system";


type Result = {
    result:number;
    created_at:Date;
    date:Date;
}
type Work = {
    question:string;
}
type Workbook = {
    title:string;
    result:Result[];
    work:Work[];
}


type AnalysisProps = {
    workbook: Workbook;
  };



const Analysis = ({auth,workbook}:AnalysisProps & Workbooks) => {
    const data = workbook.result.map((result, index) => ({
        x: `${index + 1}回目`,
        y: Math.ceil((result.result / workbook.work.length) * 100)
      }));
    data.unshift({ x: '0', y: 0 });
    

    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <BasicLayout>
        {workbook.result.length > 0 ? 
        <ResultLine data={[{ id: workbook.title, color: 'hsl(266, 50%, 50%)', data }]}/>:
        <div className="flex flex-col items-center justify-center p-10">
        <Box
        component='div'
        sx={{color:'red',
        fontFamily:'Kaisei Decol'}}
        >この問題はまだ解かれていません
        </Box>
        <div className="mt-5"><img src='/images/analyse.png'/></div>
        </div>}
        </BasicLayout>
        </AuthenticatedLayout>
    )


}

export default Analysis; 

