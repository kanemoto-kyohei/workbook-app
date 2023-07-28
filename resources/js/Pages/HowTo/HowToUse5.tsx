import BasicLayout from "@/Layouts/BasicLayout";

const HowToUse5 = () => {
    return(
        <BasicLayout>
            <div className="m-10 flex flex-col justify-start items-start"
            style={{fontFamily:'Kaisei Decol'}}>
            <div style={{fontSize:20,color:'gray'}}>ShareLedgeとは</div>
            <div className="mt-10">ShareLedgeはユーザーが知識や情報を共有し、交流するためのプラットフォームです</div>
            <div className="mt-5">'Knowledge'「知識」と'Share'「共有する」を組み合わせ、'ShareLedge'と命名しました</div>
            <div className="mt-5">自分だけの勉強に役立てる</div>
            <div className="mt-5">仲間の中だけで問題やクイズを出しあって楽しむ</div>
            <div className="mt-5">問題を公開して、知識を広く共有する</div>
            <div className="mt-5">全く知らない人と、知識を通してつながる</div>
            <div className="mt-10">楽しみ方は人それぞれです</div>
            <div className="mt-5">このアプリが皆様の豊かな生活の一助になれますことを心より願っています</div>
            <div className="mt-10 flex justify-end">ShareLedge開発者</div>
            </div>

        </BasicLayout>
    )
}

export default HowToUse5; 