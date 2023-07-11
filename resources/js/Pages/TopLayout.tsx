import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import '@/Pages/TopLayout.css';
import { motion } from "framer-motion"
import TopLayoutEm from '@/Pages/TopLayoutEm'

export default function TopLayout({ children }: PropsWithChildren) {
    return (
        <>

        <div className="xs:fixed xs:top-0 xs:right-0 p-6 text-right">
                    
                     
                
        </div>

        <TopLayoutEm/>
        </>
    )
}
