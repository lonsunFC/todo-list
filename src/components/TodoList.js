import React, {useContext} from 'react';
import Context from '../Context';

function TodoList() {
    const {state, dispatch} = useContext(Context);

    function delTodo(index) {
        const newTodo = [...state.todos];
        newTodo.splice(index, 1);
        dispatch({
            type: 'del', data: newTodo
        });
    }

    function setCompleted(index) {
        const newTodo = [...state.todos];
        newTodo[index].isCompleted = true;
        dispatch({
            type: 'completed', data: newTodo
        });
    }

    return (
        <div className="todo_cont row">
            <div className="col-md-12">
                <ul className="list-group">
                    {state.todos.map((el, i) => (
                        <li key={i} className="list-group-item">
                            <span className={el.isCompleted ? 'isline' : ''}>{el.text}</span>

                            <span className="float-right btn btn-danger btn-sm"
                                  onClick={() => delTodo(i)}>del</span>
                            <span className="float-right btn btn-success btn-sm" style={{marginRight: 10}}
                                  onClick={() => setCompleted(i)}>Completed</span>

                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoList;
