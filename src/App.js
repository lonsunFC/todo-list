import React from 'react';

function App() {
    return (
        <div className="todo_wrap">
            <h1>todos</h1>
            <div className="todo_input row">
                <div className="col-md-12">
                    <div className="input-group">
                        <input className="form-control" placeholder="Enter new todo" value=""/>
                        <div className="input-group-append">
                            <button className="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="todo_cont row">
                <div className="col-md-12">
                    <ul className="list-group">
                        <li className="list-group-item">
                            <span>111</span>

                            <span className="float-right btn btn-danger btn-sm">
                                del
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default App;
