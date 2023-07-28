import BasicLayout from "@/Layouts/BasicLayout";

const HowToUse3 = () => {
    return(
        <BasicLayout>
            <div className="m-10 flex flex-col justify-start items-start"
            style={{fontFamily:'Kaisei Decol'}}>
            <div style={{fontSize:20,color:'blue'}}>シェアされた問題を解いてみよう</div>
            <div className="mt-10">①トップ画面で左下の望遠鏡のマークをクリック</div>
            <img src="/howto/howto3_1.png"/>
            <div className="mt-10">②次の画面で解きたい問題集を選択します</div><div>何人の人に解かれたのか、難易度はどれくらいかが表示されています</div>
            <img src="/howto/howto3_2.png"/>
            <div className="mt-10">③問題がスタート！頑張ってください！</div>
            <img src="/howto/howto3_3.png"/>
            <div className="mt-10">④解いた問題の難易度を選択します</div><div>自分のランキングを見てみましょう！</div>
            <img src="/howto/howto3_4.png"/>

            </div>

        </BasicLayout>
    )
}

export default HowToUse3; 