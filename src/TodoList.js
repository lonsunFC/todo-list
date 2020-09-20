import React, {useState} from 'react';

function List({todo, index, delTodo, setCompleted}) {
    return (
        <div className="todo_cont row">
            <div className="col-md-12">
                <ul className="list-group">
                    <li className="list-group-item">
                        <span className={todo.isCompleted ? 'isline' : ''}>{todo.text}</span>

                        <span className="float-right btn btn-danger btn-sm"
                              onClick={() => delTodo(index)}>del</span>
                        <span className="float-right btn btn-primary btn-sm"
                              onClick={() => setCompleted(index)}>Completed</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}

function Form({addTodo}) {
    const [val, setVal] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        if (!val) {
            return;
        }
        addTodo({
            text: val,
            isCompleted: false
        });
        setVal('');
    }

    return (
        <form className="todo_input row" onSubmit={handleSubmit}>
            <div className="col-md-12">
                <div className="input-group">
                    <input className="form-control"
                           value={val}
                           onChange={e => setVal(e.target.value)}
                           placeholder="new todo"/>
                    <div className="input-group-append">
                        <button className="btn btn-primary">Add</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

function TodoList() {
    const [todo, setTodo] = useState([
        {
            text: 'js',
            isCompleted: false
        },
        {
            text: 'vue',
            isCompleted: false
        },
        {
            text: 'react',
            isCompleted: false
        }
    ]);

    function addTodo(el) {
        setTodo([...todo, el]);
    }

    function delTodo(index) {
        const newTodo = [...todo];
        newTodo.splice(index, 1);
        setTodo(newTodo);
    }

    function setCompleted(index) {
        const newTodo = [...todo];
        newTodo[index].isCompleted = true;
        setTodo(newTodo);
    }


    return (
        <div className="todo_wrap">
            <h1>todos</h1>
            <Form addTodo={addTodo}/>
            <br/>
            <div className="todo_cont row">
                <div className="col-md-12">
                    <ul className="list-group">
                        {todo.map((el, index) => <List
                            key={index}
                            todo={el}
                            delTodo={delTodo}
                            setCompleted={setCompleted}
                            index={index}/>)
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default TodoList;