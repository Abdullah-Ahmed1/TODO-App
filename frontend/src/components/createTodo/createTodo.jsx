import React from 'react'
import {InputAccordion} from './accordion'

export const CreateTodo = ({refreshTodos}) => {
  return (
    <> 
      <InputAccordion  refreshTodos = {refreshTodos}/>
    </>
  )
}

