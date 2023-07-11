import { type } from "os";
import { User } from ".";

export type Workbooks ={
    i:number;
    id: number;
    title: string;
    workbook_id: string;
    user_id: number;
    flash:{
    success: string | null;
    message: string | null;
    error: string | null;
    };
    auth:{
        user:User;
    };    
}

export type WorkbookArray = {
    id: number;
    workbook_id:string;
    title:string;
    workbooks:{
        map(arg0: (workbook: {
            user: {
                name:string;
            }
            i:number;
            id: number;
            title: string;
            workbook_id: string;
            user_id: number;
            name:string;
            is_public:boolean;
            public_result:{
                difficulty:number;
            }
                }, 
        i: number
        
        ) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
}
}
