import React, {useContext, useState} from 'react';
import Context from '../Context';

function TodoForm() {
    const {dispatch} = useContext(Context);
    const [todo, setTodo] = useState('');

    function handleChange(e) {

        setTodo(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!todo) {
            alert('输入内容');
            return;
        }
        dispatch({
            type: 'add', data: {
                text: todo,
                isCompleted: false
            }
        });
        setTodo('');
    }


    return (
        <form className="todo_input row" onSubmit={handleSubmit}>
            <div className="col-md-12">
                <div className="input-group">
                    <input className="form-control"
                           autoFocus={true}
                           value={todo}
                           onChange={handleChange}
                           placeholder="new todo"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary" type="submit">Add</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

export default TodoForm;
