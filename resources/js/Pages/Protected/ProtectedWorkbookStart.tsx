import type { Workbooks } from '@/types/workbooks';
import { Work, WorkArray,Works} from '@/types/works';
import WorkSolveForm from '@/Pages/Parts/WorkSolveForm';
import BasicLayout from '@/Layouts/BasicLayout';

const ProtectedWorkbookStart = ({auth,works}:Workbooks &  { works: Works[] } & Work ) => {
    return(<>
        
        <WorkSolveForm
        works={works}
        is_public={false}
        is_protected={true}
        ></WorkSolveForm>

        </>)
}

export default ProtectedWorkbookStart;
