import React from 'react'

export const Todos = () => {
  return (
    <div className="todo-box h-72 w-[95%] rounded-3xl bg-[#F1F1F1] relative">
    <div className="header w-full h-10 bg-[#FAC3FF] rounded-3l  rounded-t-3xl flex items-center justify-between px-4">
        <h1 className="font-semibold">Todo (3)</h1>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="12" height="12" viewBox="0 0 256 256" xmlSpace="preserve">
      <defs>
      </defs>
      <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0)" strokeLinecap="round"/>
      </g>
  </svg>
    </div>
    <div className="border-b py-1.5 border-[#0000001A]">
        <div className="add-todo flex items-center ml-3 gap-1">
        <svg width="18" height="19" viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 8.68164H9.75V4.18164C9.75 3.76689 9.414 3.43164 9 3.43164C8.586 3.43164 8.25 3.76689 8.25 4.18164V8.68164H3.75C3.336 8.68164 3 9.01689 3 9.43164C3 9.84639 3.336 10.1816 3.75 10.1816H8.25V14.6816C8.25 15.0964 8.586 15.4316 9 15.4316C9.414 15.4316 9.75 15.0964 9.75 14.6816V10.1816H14.25C14.664 10.1816 15 9.84639 15 9.43164C15 9.01689 14.664 8.68164 14.25 8.68164Z" fill="#7B1984"/>
         <mask id="mask0_2038_7499" style={{maskType:"luminance"}} maskUnits="userSpaceOnUse" x="3" y="3" width="12" height="13">
         <path fill-rule="evenodd" clip-rule="evenodd" d="M14.25 8.68164H9.75V4.18164C9.75 3.76689 9.414 3.43164 9 3.43164C8.586 3.43164 8.25 3.76689 8.25 4.18164V8.68164H3.75C3.336 8.68164 3 9.01689 3 9.43164C3 9.84639 3.336 10.1816 3.75 10.1816H8.25V14.6816C8.25 15.0964 8.586 15.4316 9 15.4316C9.414 15.4316 9.75 15.0964 9.75 14.6816V10.1816H14.25C14.664 10.1816 15 9.84639 15 9.43164C15 9.01689 14.664 8.68164 14.25 8.68164Z" fill="white"/>
         </mask>
         <g mask="url(#mask0_2038_7499)">
         <rect y="0.431641" width="18" height="18" fill="#7B1984"/>
         </g>
         </svg>
         <h1 className="capitalise text-bold">Add task</h1>
        </div>
    </div>
    <h1 className="absolute top-1/2 left-1/2">No todos available</h1>
</div>
  )
}
