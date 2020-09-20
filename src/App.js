import React, {useEffect, useContext, useReducer} from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import Context from './Context';
import reducer from './reducer';
import {getTodoListData, SetTodoListData} from './TodoListData';

function App() {
    // 读取
    const listData = getTodoListData(useContext(Context), 'state');

    // `todos` will be a state manager to manage state.
    const api = SetTodoListData(
        useReducer(reducer, listData)
    );

    return (
        <div className="todo_wrap">
            <h1>todos</h1>
            <Context.Provider value={api}>
                <TodoForm/>
                <br/>
                <TodoList/>
            </Context.Provider>
        </div>
    );
}

export default App;
