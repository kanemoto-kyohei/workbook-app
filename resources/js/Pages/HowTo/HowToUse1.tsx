import BasicLayout from "@/Layouts/BasicLayout";

const HowToUse1 = () => {
    return(
        <BasicLayout>
            <div className="m-10 flex flex-col justify-start items-start"
            style={{fontFamily:'Kaisei Decol'}}>
            <div style={{fontSize:20,color:'green'}}>問題を作成・編集・公開しよう</div>
            <div className="mt-10">①トップ画面で左上の鉛筆マークをクリック</div>
            <img src="/howto/howto1_1.png"/>
            <div className="mt-10">②次の画面で一番左の鉛筆マークをクリック</div>
            <img src="/howto/howto1_2.png"/>
            <div className="mt-10">③問題集のタイトルを入力します</div>
            <img src="/howto/howto1_3.png"/>
            <div className="mt-10">④問題を作成していきます。問題文、選択肢２つ以上、正解番号は必須です</div>
            <div >完成したら「完了」ボタンを押してください</div>
            <img src="/howto/howto1_4.png"/>
            <div className="mt-10">⑤作った問題集を編集するときは、先ほどの画面の消しゴムマークをクリック</div>
            <img src="/howto/howto1_5.png"/>
            <div className="mt-10">⑥問題集が並んでいるので、編集したい問題集の右側にあるゴミ箱と鉛筆マークで</div><div>削除やタイトルの変更ができます</div>
            <img src="/howto/howto1_11.png"/>
            <div className="mt-10">⑦一つ一つの問題を編集したいときは青文字の「この問題を編集する」をクリック</div>
            <img src="/howto/howto1_7.png"/>
            <div className="mt-10">個々の問題を編集、削除できます。下の+ボタンを押すと、新しい問題を追加できます</div>
            <img src="/howto/howto1_8.png"/>
            <div className="mt-10">⑧作った問題を公開したいときは、先ほどの画面の噴水マークをクリック</div>
            <img src="/howto/howto1_9.png"/>
            <div>アプリに問題を公開したり、共有リンクを取得して、限定的に公開したりすることもできます</div>
            <img src="/howto/howto1_10.png"/>

            </div>

        </BasicLayout>
    )
}

export default HowToUse1; 