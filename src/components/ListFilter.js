import React from 'react'

import styled from 'styled-components'

const ListFilter = ({ list, onChange, value, listId }) => {
  const onSelectionChange = e => {
    onChange(e.target.value, listId)
  }

  return (
    <Select
      onChange={onSelectionChange}
      value={value}
    >
      {list.map(item => <option key={item.value} value={item.value} >{item.label}</option>)}
    </Select>
  )
}

const Select = styled.select`
  background: #3b4049;
  color: #8d96a8;
  border: none;
  border-radius: 3px;
  padding: 0px 18px;
  font-size: 20px;
  height: 40px;
  width: 250px;
  margin-bottom: 16px;
  margin-left: 10px;

  option {
    color: white;
    display: flex;
    white-space: pre;
    min-height: 20px;
    padding: 0px 2px 1px;
  }
`;

export default ListFilter
