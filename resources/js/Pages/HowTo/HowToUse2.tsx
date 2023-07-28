import BasicLayout from "@/Layouts/BasicLayout";

const HowToUse2 = () => {
    return(
        <BasicLayout>
            <div className="m-10 flex flex-col justify-start items-start"
            style={{fontFamily:'Kaisei Decol'}}>
            <div style={{fontSize:20,color:'orange'}}>作った問題を解いてみよう</div>
            <div className="mt-10">①トップ画面で右上の本のマークをクリック</div>
            <img src="/howto/howto2_1.png"/>
            <div className="mt-10">②次の画面で解きたい問題集を選択</div>
            <img src="/howto/howto2_2.png"/>
            <div className="mt-10">③問題がスタート！頑張ってください！</div>
            <img src="/howto/howto2_3.png"/>
            <div className="mt-10">④といた問題の成績はトップ画面右下のグラフマークをクリックして</div><div>振り返ることができます</div>
            <img src="/howto/howto2_4.png"/>

            </div>

        </BasicLayout>
    )
}

export default HowToUse2; 