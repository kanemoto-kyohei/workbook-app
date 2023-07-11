import type { Workbooks } from '@/types/workbooks';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Work, WorkArray,Works} from '@/types/works';
import WorkSolveForm from '@/Pages/Parts/WorkSolveForm';

const PublicStart = ({auth,works}:Workbooks &  { works: Works[] } & Work ) => {
    return(
        <AuthenticatedLayout
        user={auth.user}
        header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight">Dashboard</h2>}
        >
        <WorkSolveForm
        works={works}
        is_public={true}
        ></WorkSolveForm>

       </AuthenticatedLayout> 
    )
}

export default PublicStart;

