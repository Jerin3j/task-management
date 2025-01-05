import React from 'react'
import { Progress } from './Progress'
import { Complete } from './Complete'
import { Todos } from './Todos'

export const TodosView = () => {
  return (
    <section className='h-screen flex flex-col items-center gap-2'>
        <div className=" h-0.5 w-[95%] bg-[#0000001A] mt-14"></div>
        <div className="w-[95%] flex justify-evenly">
            <h1 className="text-sm font-semibold text-[#00000099]">Task Name</h1>
            <h1 className="text-sm font-semibold text-[#00000099]">Due On</h1>
            <h1 className="text-sm font-semibold text-[#00000099]">Task Status</h1>
            <h1 className="text-sm font-semibold text-[#00000099]">Task Category</h1>
        </div>
       <div className="flex flex-col gap-3 w-full items-center">      
         <Todos/>
         <Progress/>
         <Complete/>
       </div>
    </section>
  )
}
