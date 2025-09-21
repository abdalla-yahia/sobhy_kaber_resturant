'use client'
import * as icon from '@/Utils/Icons'
import { ReactNode } from 'react';
export default function error({ error, reset }: { error: ReactNode, reset: () => void }) {
  
  return (
    <div className="font-sans flex flex-col items-center justify-items-center pb-20 gap-5 sm:p-20">
      <icon.BiSolidErrorAlt className='text-9xl text-red-800' />
      <h2 className="text-3xl font-bold text-red-500">Something Went Wrong! </h2>
      <p className="text-muted">Try Again Later. {error}</p>
      <button className="p-2 bg-accent cursor-pointer rounded text-highlight" onClick={() => reset()}>Reload</button>
    </div>
  )
}
