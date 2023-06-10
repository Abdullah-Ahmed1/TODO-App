import React from 'react'
import {InputAccordion} from './parts'

export const CreateTodo = ({refreshTodos, handleSubmit,todo,handleChangeTodo ,openBackdrop}) => {
  return (
    <> 
      <InputAccordion  data-testid="accordion" refreshTodos = {refreshTodos} handleSubmit = {handleSubmit} todo = {todo} handleChangeTodo={handleChangeTodo} openBackdrop={openBackdrop} />
    </>
  )
}

