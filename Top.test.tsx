import {fireEvent, render,screen, waitFor } from "@testing-library/react";
import React from "react";
// Top.test.tsx (テストコード)
import WorkMakeForm from "./resources/js/Pages/Parts/WorkMakeForm";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';
import { act } from "react-dom/test-utils";



const user = userEvent.setup();


test('Top画面',async()=>{
    

    render(<WorkMakeForm 
        id={0} 
        workbook_id={''} 
        question={''} 
        options={['','']} 
        answer={1} 
        description={''} 
        time_to_solve={5} 
        is_add={true} 
        is_create={true} 
        is_update={true}/>);
    
    
    const nextButton = screen.getByRole('button',{name: /次の問題へ/i});

    const questionInput = screen.getByRole('textbox', { name: /問題文を入力/i });
    const optionInputs = screen.getAllByRole('textbox', { name: /選択肢を入力/i });
    const firstOption =optionInputs[0];
    const secondOption =optionInputs[1];


    expect(nextButton).toHaveTextContent("次の問題へ");

    await userEvent.type(questionInput, 'test');     
    await userEvent.type(firstOption, 'test'); 
    await userEvent.type(secondOption, 'test'); 

  
    await waitFor(() => {
      expect(questionInput).toHaveValue('test');
      expect(firstOption).toHaveValue('test');
      expect(secondOption).toHaveValue('test');

      const completeButton = screen.getByRole('button',{name: /完了/i});
      expect(completeButton).toHaveTextContent("完了");

      const addButton = screen.getByRole('button',{name: /追加/i});
      expect(addButton).toHaveTextContent("追加");

      const updateButton = screen.getByRole('button',{name: /更新/i});
      expect(updateButton).toHaveTextContent("更新");



    });    

})

