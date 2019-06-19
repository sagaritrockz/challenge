import React from 'react'

import styled from 'styled-components'

const ListItem = ({ text, completed, onClick, isEditable, id, listId }) => {
  if (isEditable) {
    return (
      <Wrapper isEditable={isEditable}>
        <code onClick={onClick}>
          [{completed ? 'x' : '  '}] <Text completed={completed}>{text}</Text>
        </code>
      </Wrapper>
    )
  } else {
    return (
      <Wrapper onClick={onClick} id={id} listId={listId} >
        <Text>{text}</Text>
      </Wrapper>
    )
  }
}

const Wrapper = styled.p`
  font-size: 18px;
  cursor: pointer;
  background-color: ${props => (!props.isEditable && props.id === props.listId ? '#4CAF50' : 'none')};
  padding: 5px;
  border-radius: 5px;
  margin: 5px 0px !important;
`

const Text = styled.span`
  text-decoration: ${props => (props.completed ? 'line-through' : 'none')};
`

export default ListItem
