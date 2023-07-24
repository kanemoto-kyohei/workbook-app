import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import { Workbooks } from '@/types/workbooks';

const PrivacyPolicy = ({auth}:Workbooks) =>{
    return(
            <BasicLayout>
            <div 
                className='p-10' 
                style={{ 
                    fontFamily:'Kaisei Decol',
                    overflowY: 'auto', // Vertical scrolling
                    maxHeight: '80vh', // This is an example value, you can set it to your needs
                }}
            >

                <div className='p-10' style={{fontFamily:'Kaisei Decol'}}>
            <div>【プライバシーポリシー】</div>
                <div className='m-2'>1.取得する個人情報</div>
                <div>ShareLedge（以下「当サービス」）では、以下の個人情報を取得する場合があります。
            
                <ul>
                    <li>・名前: 利用者のフルネームを取得することがあります。</li>
                    <li>・ニックネーム: 利用者の識別やコミュニケーションの目的で使用するため、ニックネームを取得することがあります。</li>
                    <li>・メールアドレス: 重要なお知らせやサービス提供に関する連絡のため、メールアドレスを取得することがあります。</li>
                </ul>
            </div>
            <div className='m-2'>2.個人情報の利用目的</div>
            <div>当サービスは、取得した個人情報を以下の目的で利用します。</div>
            <ul>
                <li>・サービス提供: 当サービスが提供するサービスを適切に提供するため、個人情報を利用します。</li>
                <li>・連絡や通知: 重要なお知らせやサービスに関する連絡をするため、個人情報を利用します。</li>
                <li>・カスタマイズ: 利用者のニーズや要望に合わせたカスタマイズを行うため、個人情報を利用します。</li>
                <li>・サービス改善: サービスの品質向上や新たな機能の開発に役立つ情報を収集し、分析するため、個人情報を利用します。</li>
            </ul>
            <div className='m-2'>3.個人情報の第三者への提供</div>
            <div>当サービスは、法的な要求や規制に基づく場合を除き、利用者の個人情報を第三者に提供しません。</div>
            <div className='m-2'>4.個人情報の管理と保護</div>
            <div>当サービスは、利用者の個人情報を適切に管理し、適切なセキュリティ対策を実施して保護します。個人情報の不正アクセス、紛失、漏洩などを防止するため、適切な技術的・組織的な対策を講じます。</div>
            <div className='m-2'>5.Googleアナリティクスの使用について</div>
            <div>当サービスでは、利用状況の分析やサービス改善のためにGoogleアナリティクスを使用しています。Googleアナリティクスは、Cookieや匿名の識別子などを通じて、利用者の情報を収集します。収集された情報は匿名であり、個人を特定することはできません。Googleアナリティクスの詳細な情報収集や利用については、Googleのプライバシーポリシーをご確認ください。</div>
            <div className='m-2'>6.未成年者の個人情報の取得</div>
            <div>当サービスは、未成年者から個人情報を意図的に取得することはありません。未成年者が個人情報を提供する場合は、保護者の同意を得るようお願いします。</div>
            <div className='m-2'>7.プライバシーポリシーの変更</div>
            <div>当サービスは、プライバシーポリシーを必要に応じて改定する場合があります。重要な変更がある場合は、利用者に通知することがあります。</div>
            </div>
            </div>
            </BasicLayout>
    )
}

export default PrivacyPolicy;