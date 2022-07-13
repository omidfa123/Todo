import _ from 'lodash';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react';

interface DispatchContextProps {
  children: ReactNode;
}

type DispatchContext = {
  state: any;
  dispatch: (action: any) => void;
};

interface Itodo {
  id: string;
  title: string;
  description: string;
  date: string;
  priority: string | number;
  priorityColor: string;
  status: string | number;
  StatusColor: string;
}

const DispatchContext = createContext({} as DispatchContext);

const reducer = (state: any, action: any) => {
  switch (action.type) {
    case 'OpenModal':
      return {
        ...state,
        isModalOpen: true,
        isEdit: [action.payload, ''],
        isView: [false, ''],
      };
    case 'CloseModal':
      return { ...state, isModalOpen: false };
    case 'DrawerOpen':
      return { ...state, isDrawerOpen: true };
    case 'DrawerClose':
      return { ...state, isDrawerOpen: false };
    case 'AddTodo':
      return {
        ...state,
        todos: [...state.todos, action.payload],
        originalTodos: [...state.todos, action.payload],
      };
    case 'DeleteTodo': {
      const todos = state.todos.filter(
        (todo: Itodo) => todo.id !== action.payload
      );
      return { ...state, todos, originalTodos: todos };
    }
    case 'EditTodo': {
      return { ...state, isEdit: [true, action.payload] };
    }
    case 'UpdateTodo': {
      const todos = state.todos.map((todo: Itodo) => {
        if (todo.id === action.payload.id) {
          return action.payload;
        }
        return todo;
      });
      return { ...state, todos, originalTodos: todos };
    }
    case 'ViewTodo': {
      return { ...state, isView: [true, action.payload] };
    }
    case 'SortByPriorityHight': {
      const todos = _.orderBy(state.todos, ['priority'], ['desc']);
      return { ...state, todos };
    }
    case 'SortByPriorityLow': {
      const todos = _.orderBy(state.todos, ['priority'], ['asc']);
      return { ...state, todos };
    }
    case 'SortByPriorityNone': {
      const todos = state.originalTodos;
      return { ...state, todos };
    }
    case 'Search': {
      if (action.payload === '') {
        const todos = state.originalTodos;
        return { ...state, todos };
      } else {
        const todos = state.todos.filter((todo: Itodo) => {
          return todo.title.includes(action.payload);
        });
        return { ...state, todos };
      }
    }
    case 'Filter': {
      switch (action.payload) {
        case 10:
          const copy = _.cloneDeep(state.originalTodos);
          const todos = copy.filter((todo: Itodo) => {
            return todo.priority === 10;
          });
          return { ...state, todos };
        case 20:
          const copyTodos = _.cloneDeep(state.originalTodos);
          console.log(copyTodos);
          const todosByMid = copyTodos.filter((todo: Itodo) => {
            return todo.priority === 20;
          });
          return { ...state, todos: todosByMid };
        case 30:
          const copyTodo = _.cloneDeep(state.originalTodos);
          console.log(copyTodos);
          const todosByHight = copyTodo.filter((todo: Itodo) => {
            return todo.priority === 30;
          });
          return { ...state, todos: todosByHight };
        case 40:
          return { ...state, todos: state.originalTodos };
      }
    }
  }
};

const initialState: any = {
  isModalOpen: false,
  isDrawerOpen: false,
  todos: [],
  originalTodos: [],
  isEdit: [false, ''],
  isView: [false, ''],
  filterByPriority: [],
};
export function DispatchProvider({ children }: DispatchContextProps) {
  const [state, dispatch] = useReducer(reducer, initialState) as any;
  return (
    <DispatchContext.Provider value={{ state, dispatch }}>
      {children}
    </DispatchContext.Provider>
  );
}

export function useDispatchContext() {
  return useContext(DispatchContext);
}
