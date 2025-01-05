import React from 'react'

export const Progress = () => {
  return (
    <div className="progress-box h-56 w-[95%] rounded-3xl bg-[#F1F1F1] relative">
    <div className="header w-full h-10 bg-[#85D9F1] rounded-3l  rounded-t-3xl flex items-center justify-between px-4">
        <h1 className="font-semibold">In-Progress (3)</h1>
        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" width="12" height="12" viewBox="0 0 256 256" xmlSpace="preserve">
      <defs>
      </defs>
      <g style={{ stroke: 'none', strokeWidth: 0, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'none', fillRule: 'nonzero', opacity: 1 }} transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
          <path d="M 90 24.25 c 0 -0.896 -0.342 -1.792 -1.025 -2.475 c -1.366 -1.367 -3.583 -1.367 -4.949 0 L 45 60.8 L 5.975 21.775 c -1.367 -1.367 -3.583 -1.367 -4.95 0 c -1.366 1.367 -1.366 3.583 0 4.95 l 41.5 41.5 c 1.366 1.367 3.583 1.367 4.949 0 l 41.5 -41.5 C 89.658 26.042 90 25.146 90 24.25 z" style={{ stroke: 'none', strokeWidth: 1, strokeDasharray: 'none', strokeLinecap: 'butt', strokeLinejoin: 'miter', strokeMiterlimit: 10, fill: 'rgb(0,0,0)', fillRule: 'nonzero', opacity: 1 }} transform=" matrix(1 0 0 1 0 0)" strokeLinecap="round"/>
      </g>
  </svg>
    </div>
    <h1 className="absolute top-1/2 left-1/2 ">No tasks in progress</h1>
</div>
  )
}
