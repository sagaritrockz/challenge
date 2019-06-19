import { Container } from 'unstated'

const defaultState = {
  selectedList: 1,
  selectedFilter: 'ALL',
  filters: [
    {label: 'All', value: 'ALL'},
    {label: 'Completed', value: 'COMPLETED'},
    {label: 'Active', value: 'ACTIVE'}
  ],
  lists: [
    {
      text: 'Default list',
      id: 1,
      todos: [
        {
          id: 1,
          completed: false,
          text: 'Read README'
        },
        {
          id: 2,
          completed: false,
          text: 'Add one todo'
        },
        {
          id: 3,
          completed: false,
            text: 'Add filters'
          },
          {
            id: 4,
            completed: false,
            text: 'Add multiple lists'
          },
          {
            id: 5,
            completed: false,
            text: 'Optional: add tests'
          }
        ]
    }
  ]
}

export class TodosContainer extends Container {
  constructor (props) {
    super(props)
    this.state = this.readStorage()
  }

  readStorage () {
    if (window && window.localStorage) {
      const state = window.localStorage.getItem('appState')
      if (state) {
        return JSON.parse(state)
      }
    }
    return defaultState
  }

  syncStorage () {
    if (window && window.localStorage) {
      let newState = {...this.state, selectedList: 1, selectedFilter: 'ALL'};
      const state = JSON.stringify(newState)
      window.localStorage.setItem('appState', state)
    }
  }

  getToDoList (listId, filter) {
    const list = this.state.lists.find(list => list.id === listId);
    const res = list.todos.filter(todo => {
      if (filter === 'ACTIVE') {
        return !todo.completed ? true : false;
      }
      else if (filter === 'COMPLETED') {
        return todo.completed ? true : false;
      } else {
        return true;
      }
    })
    return res;
  }

  getList = () => {
    return this.state.lists;
  }

  toggleComplete = async (todoId, listId) => {
    let newList = this.state.lists.find(list => list.id === listId);
    await this.setState(state => {
      const newTodos = newList.todos.map(todo => {
        if (todo.id !== todoId) return todo
        return {
          ...todo,
          completed: !todo.completed
        }
      })
      newList.todos = newTodos
      const lists = state.lists.map(list => {
        return list.id === listId ? newList : list
      });
      return { lists }
    })
    this.syncStorage()
  }

  createTodo = async (text, listId) => {
    let newList = this.state.lists.find(list => list.id === listId);
    await this.setState(state => {
      const item = {
        completed: false,
        text,
        id: newList.todos.length + 1
      }
      newList.todos.push(item);
      const lists = state.lists.map(list => {
        return list.id === listId ? newList : list
      });
      return { lists }
    })
    this.syncStorage()
  }

  createList = async text => {
    await this.setState(state => {
      const item = {
        text,
        todos: [],
        id: state.lists.length + 1
      }

      const lists = state.lists.concat(item)
      return { lists }
    })

   this.syncStorage()
  }

  onListSelect = async listId => {
    await this.setState(state => {
      const selectedList = listId;
      return { selectedList }
    })
  }

  getSelectedList = () => {
    return this.state.selectedList;
  }

  getFilters = () => {
    return this.state.filters;
  }

  getSelectedFilter = () => {
    return this.state.selectedFilter;
  }

  onFilterChange = async (filter, listId) => {
    await this.setState(state => {
      const selectedFilter = filter;
      return { selectedFilter }
    })
  }

}
