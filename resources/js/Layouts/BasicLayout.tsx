import { Link } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function BasicLayout({ children }: PropsWithChildren) {
    return (
<div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-[#f4eee8] ">            
<div>
        <Link href="/top">
        <ApplicationLogo />
        </Link>
            </div>

            <div className="w-full max-w-custom mt-8 pb-12 bg-white shadow-lg rounded-lg mb-8"> 
            {children}
            </div>
        </div>
    );
}
