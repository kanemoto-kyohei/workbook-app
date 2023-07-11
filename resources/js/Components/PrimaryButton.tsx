import { ButtonHTMLAttributes } from 'react';

export default function PrimaryButton({ className = '', disabled, children, ...props }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center px-6 py-3  bg-[#FAF0E6] border border-transparent rounded-md font-semibold text-sm text-[#A0522D] uppercase tracking-widest hover:bg-gray-700 dark:hover:bg-[#FFEFD5] focus:bg-gray-200 active:transform active:translate-y-0.5 focus:outline-solid focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150  ${
                    disabled && 'opacity-25'
                } ` + className
            }
            style={{fontFamily:'Kaisei Decol',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
                     }}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
