import React from 'react'
import { Header } from '../components/Header'
import { TodosView } from '../components/TaskListVIew/TodosView'

export const Home = () => {
  return (
    <div className='min-h-screen'>
    <Header/>
    <TodosView/>
    </div>
  )
}
