import React from 'react'
import { Provider, Subscribe } from 'unstated'

import styled from 'styled-components'

import { TodosContainer, ListsContainer } from './store'

import List from './components/List'
import AddToList from './components/AddToList'
import ListFilter from './components/ListFilter'

function App () {
  return (
    <Provider>
      <Wrapper>
        <Subscribe to={[TodosContainer]}>
          {lists => {
            const list = lists.getList()
            const selectedList = lists.getSelectedList();
            const selectedFilter = lists.getSelectedFilter();
            const filters = lists.getFilters();
            const todoList = lists.getToDoList(selectedList, selectedFilter);
            return (
              <React.Fragment>
                <ListsWrapper>
                  <AddToList onAdd={lists.createList} placeholder='list'/>
                  <List items={list} onClick={lists.onListSelect} isEditable={false} listId={selectedList} />
                </ListsWrapper>
                <TodosWrapper>
                  <AddToList onAdd={lists.createTodo} listId={selectedList} placeholder='todo'/>
                  <ListFilter list={filters} onChange={lists.onFilterChange} value={lists.selectedFilter} listId={selectedList} />
                  <List items={todoList} onClick={lists.toggleComplete} isEditable={true} listId={selectedList} />
                </TodosWrapper>
              </React.Fragment>
            )
          }}
        </Subscribe>
      </Wrapper>
    </Provider>
  )
}

const Wrapper = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  font-size: 24px;
  color: white;
`

const TodosWrapper = styled.div`
  max-width: 800px;
  margin: 10px;
  border: 1px solid
  padding: 10px;
`

const ListsWrapper = styled.div`
  max-width: 310px;
  margin: 10px;
  border: 1px solid;
  padding: 10px;
`

export default App
