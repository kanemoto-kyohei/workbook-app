import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import BasicLayout from '@/Layouts/BasicLayout';
import { Workbooks } from '@/types/workbooks';


const HowToUse = ({auth}:Workbooks) => {
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
            <BasicLayout>
            <video width="320" height="240" controls>
            <source src="/videos/create.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
            </video>

            </BasicLayout>
        </AuthenticatedLayout>

    )
}

export default HowToUse;