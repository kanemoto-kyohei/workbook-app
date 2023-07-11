import { type } from "os";

export type Work = {
    i?:number;
    id?: number;
    workbook_id: string;
    question: string;
    options: string[];
    answer: number;
    description: string;
    time_to_solve: number;
  };

export type WorkArray = {
    id: number;
    works:{
        map(arg0: (work: {
            i:number;
            id: number;
            workbook_id: string;
            question: string;
            options: string[];
            answer: number;
            description: string;
            time_to_solve: number;
    
        }, 
        i: number
        
        ) => import("react/jsx-runtime").JSX.Element): import("react").ReactNode;
}
}

type Works = {
    i:number;
    num:number;
    question: string;
    options: string;
    answer: number;
    description: string;
    time_to_solve: number;
    workbook_id:string;

    works?:{
        i:number;
        id: number;
        workbook_id: string;
        question: string;
        options: Array<string>;
        answer: number;
        description: string;
        time_to_solve: number;
        num:number;
        
    }
}
