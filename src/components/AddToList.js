import React from 'react'

import styled from 'styled-components'

const AddToList = ({ onAdd, placeholder, listId }) => {
  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      onAdd(e.target.value, listId)
      e.target.value = '';
    }
  }

  return (
    <Input
      type='text'
      onKeyPress={handleKeyPress}
      placeholder={`Add new ${placeholder}...`}
    />
  )
}

const Input = styled.input`
  background: #3b4049;
  color: #fff;
  border: none;
  border-radius: 3px;
  padding: 10px 18px;
  font-size: 20px;
  height: 20px;
  width: 250px;
  margin-bottom: 16px;

  &::placeholder {
    color: #8d96a8;
  }
`

export default AddToList
