import React from 'react'

import styled from 'styled-components'

import ListItem from './ListItem'

const List = ({ items, onClick, isEditable, listId }) => {
  return (
    <Wrapper>
      {items.map(item => {
        const onItemClick = e => {
          onClick(item.id, listId)
        }
        return <ListItem key={item.id} {...item} onClick={onItemClick} isEditable={isEditable} listId={listId} />
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default List
