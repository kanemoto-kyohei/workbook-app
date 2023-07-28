import BasicLayout from "@/Layouts/BasicLayout";

const HowToUse4 = () => {
    return(
        <BasicLayout>
            <div className="m-10 flex flex-col justify-start items-start"
            style={{fontFamily:'Kaisei Decol'}}>
            <div style={{fontSize:20,color:'orange'}}>始めてみよう！</div>
            <div className="mt-10">①新規登録をしてアカウントを作成しましょう</div>
            <img src="/howto/howto4_1.png"/>
            <div className="mt-10">②名前、ニックネーム、メールアドレス、パスワードを入力</div>
            <div className="mt-10">③利用規約に同意して登録</div>
            <img src="/howto/howto4_2.png"/>
            <div className="mt-10">④登録ができたら、まずは一問問題を作ってみましょう</div>
            <img src="/howto/howto1_1.png"/>

            </div>

        </BasicLayout>
    )
}

export default HowToUse4; 