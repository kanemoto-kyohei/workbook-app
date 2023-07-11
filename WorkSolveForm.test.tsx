import { render,screen,waitFor } from "@testing-library/react";
import React from "react";
// Top.test.tsx (テストコード)
import WorkSolveForm from "./resources/js/Pages/Parts/WorkSolveForm";
import DisplayPublic from "./resources/js/Pages/Public/DisplayPublic";

import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

jest.mock('@/Pages/Solve/workbookstyle.css', () => ({}));

describe('WorkSolveコンポーネント', () => {
test('問題を解く画面',async()=>{

    const works = [
        {
          i:1,
          num:1,
          id: 1,
          question: 'Question 1',
          options: '["Option 1", "Option 2", "Option 3"]',
          answer: 2,
          description:'test',
          time_to_solve:5,
          workbook_id:'test'
        },
        {
          i:2,
          num:2,
          id: 2,
          question: 'Question 2',
          options: '["Option 1", "Option 2", "Option 3"]',
          answer: 1,
          description:'test2',
          time_to_solve:5,
          workbook_id:'test'

        },
        // 追加の作業を続けることができます
      ];

    render(<WorkSolveForm
        is_public={true}
        works={works}
    />);    

    const user = userEvent.setup()
    const questionButton = screen.getByTestId('1');

    await user.click(questionButton);

    const nextButton = screen.getByTestId('next-button');
    const description = screen.getByTestId('description');
    const judge = screen.getByTestId('judge');
    const questionNum = screen.getByTestId('questionNum');
    expect(questionNum).toHaveTextContent('第1問/2問');
    expect(description).toHaveTextContent('test');
    expect(judge).toHaveTextContent('正解');

    await user.click(nextButton);

    await waitFor(()=>{
      const nextQuestionButton = screen.getByTestId('1');
      user.click(nextQuestionButton);
      const nextQuestionNum = screen.getByTestId('questionNum');
      expect(nextQuestionNum).toHaveTextContent('第2問/2問');
      const afterNextButton = screen.getByTestId('next-button');
      expect(afterNextButton).toHaveTextContent('結果を見る');
      const nextDescription = screen.getByTestId('description');
      const nextJudge = screen.getByTestId('judge');
      expect(nextDescription).toHaveTextContent('test2');
      expect(nextJudge).toHaveTextContent('不正解');
  
  

    })

})

})
