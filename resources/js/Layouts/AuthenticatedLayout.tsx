import { useState, PropsWithChildren, ReactNode } from 'react';
import ApplicationLogo2 from '@/Components/ApplicationLogo2';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { User } from '@/types';
import HomeIcon from '@mui/icons-material/Home';
import EmailIcon from '@mui/icons-material/Email';
import NavButton from '@/Components/NavButton';

export default function Authenticated({ user, header, children }: PropsWithChildren<{ user: User, header?: ReactNode }>) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100" style={{ backgroundColor: '#645d5c' }}>
            <nav className='bg-gray-1000'>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="shrink-0 flex items-center">
                                <Link href="/">
                                    <ApplicationLogo2  />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <NavLink href={route('top')} active={route().current('dashboard')}>
                                    <div style={{fontFamily:'Kaisei Decol'}}>Top画面へ</div>
                                    <HomeIcon fontSize='small'/>
                                </NavLink>
                            </div>
                            <div className="hidden space-x-8 sm:-my-px sm:ml-5 sm:flex">
                                <NavLink href={route('query')} active={route().current('dashboard')}>
                                    <div style={{fontFamily:'Kaisei Decol'}}>お問い合わせ</div>
                                    <EmailIcon fontSize='small'/>
                                </NavLink>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ml-10 sm:flex">
                                <Dropdown>
                                    <Dropdown.Trigger>

                                        <button
                                        type="button"
                                        className='mt-5 inline-flex items-center font-bold px-1 pt-1 dark:text-gray-900 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none
                                        hover:border-indigo-400 hover:dark:border-indigo-100 hover:text-gray-900 hover:dark:text-gray-100 hover:focus:border-indigo-700'
                                        style={{fontFamily:'Kaisei Decol'}}
                                        >
                                            アプリ情報
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>

                                        <Dropdown.Link href={route('terms')} method="get" as="button">
                                            利用規約
                                        </Dropdown.Link>
                                        <Dropdown.Link href={route('privacy.policy')} method="get" as="button">
                                            プライバシーポリシー
                                        </Dropdown.Link>

                                    </Dropdown.Content>

                                </Dropdown>
                            </div>

                        </div>

                        <div className="hidden sm:flex sm:items-center sm:ml-6">
                            <div className="ml-3 relative">
                                
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                {user.name}

                                                <svg
                                                    className="ml-2 -mr-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link href={route('profile.edit')}>アカウント情報</Dropdown.Link>
                                        <Dropdown.Link href={route('logout')} method="post" as="button">
                                            ログアウト
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-mr-2 flex items-center sm:hidden">
                            <button
                                onClick={() => setShowingNavigationDropdown((previousState) => !previousState)}
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                            >
                                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                    <path
                                        className={!showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={showingNavigationDropdown ? 'inline-flex' : 'hidden'}
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div className={(showingNavigationDropdown ? 'block' : 'hidden') + ' sm:hidden'}>

                    <div className="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                        <div className="px-4">
                            <div className="font-medium text-base text-gray-800 dark:text-gray-200">
                                {user.name}
                            </div>
                            <div className="font-medium text-sm text-gray-500">{user.email}</div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink href={route('profile.edit')}>アカウント情報</ResponsiveNavLink>
                            <ResponsiveNavLink method="get" href={route('query')} >お問い合わせ</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('terms')}>利用規約</ResponsiveNavLink>
                            <ResponsiveNavLink href={route('privacy.policy')}>プライバシーポリシー</ResponsiveNavLink>
                            <ResponsiveNavLink method="post" href={route('logout')} as="button">
                                ログアウト
                            </ResponsiveNavLink>


                        </div>
                    </div>
                </div>
            </nav>

            <main className='min-h-screen bg-[#f4eee8]'>{children}</main>
            <div className='flex text-center justify-center'>© 2023 ShareLedge. All Rights Reserved.
</div>
        </div>
    );
}
