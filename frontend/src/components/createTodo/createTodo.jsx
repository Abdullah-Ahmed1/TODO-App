import React from 'react'
import {InputAccordion} from './parts'

export const CreateTodo = ({refreshTodos}) => {
  return (
    <> 
      <InputAccordion  data-testid="accordion" refreshTodos = {refreshTodos}/>
    </>
  )
}

