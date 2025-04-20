import NavLink from './nav-link';
import { FileText } from 'lucide-react'
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default function  header(){
  return (
    <nav className='container flex items-center justify-between py-4 lg:px-8 px-2 mx-auto'>
        <div className='flex lg:flex-1'>
            <NavLink href='/' className='flex items-center gap-1 lg:gap-2 shrink-0'>
                <FileText className='w-5 h-5 lg:w-8 lg:h-8 text-gray-900' /> 
                <span className='font-extrabold lg:text-xl text-gray-900'>SummariseIt</span>
            </NavLink>
        </div> 
        <div className='flex lg:justify-center gap-4 lg:gap-12 lg:items-center'>
            <SignedIn>
                <NavLink href='/dashboard'>Your Summaries</NavLink>
            </SignedIn>
        </div>
        <div className='flex lg:justify-end lg:flex-1'>
            <SignedIn>
                <div className='flex gap-4 items-center'>
                    <NavLink href='/upload'>Upload a PDF</NavLink>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>
            </SignedIn>
            <SignedOut>
                <NavLink href='/sign-in'>Sign In</NavLink>
            </SignedOut>
        </div>
    </nav>
  )
}