### 第一版
##### 添加样式文件

可以直接通过link引用bootstrap，这里选择用`yarn add bootstrap@4 `

##### 布局

整理分为2部分，form表单输入和ul展示区域。因此将整个功能拆分成2个函数组件。

##### 父组件

TodoList组件中利用useState定义好数据

```javascript
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
```

列表展示通过map遍历将父组件的内容传递给List组件

```javascript
<ul className="list-group">
    {todo.map((el, index) => <List
    key={index}
    todo={el}
    index={index}/>)
    }
</ul>
```

##### List组件

List组件根据父组件传递的值渲染数据，它本身只有2个事件操作，删除和改变完成状态。所以需要在map时将父组件的2个方法传递过来。

```javascript
function List({todo, index, delTodo, setCompleted}) {
    return (
        <li className="todo_cont row">
            <div className="list-group-item col-md-12">
                <span className={todo.isCompleted ? 'isline' : ''}>{todo.text}</span>

                <span className="float-right btn btn-danger btn-sm"
                      onClick={() => delTodo(index)}>del</span>
                <span className="float-right btn btn-primary btn-sm"
                      onClick={() => setCompleted(index)}>Completed</span>
            </div>
        </li>
    );
}
```

##### Form组件

Form组件只进行新增操作，定义Form组件中input元素的value值变量，submit时将新增的数据传给父组件。

```html
<input className="form-control"
                           value={val}
                           onChange={e => setVal(e.target.value)}
                           placeholder="new todo"/>
```

不写onChange事件会导致报错


### 第二版
##### **Contexts** 

定义一个全局状态，无需在子组件上传参，子组件内直接读取

```javascript
import {createContext} from 'react';

const Context = createContext({
    todos: [
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
    ]
});

export default Context;
```

##### **Reducer**

将第一版的父组件的操作事件通过useReducer，进行分离

```javascript
export default function reducer(state, action) {
    switch (action.type) {
        case 'add':
            return {
                todos: [...state.todos, action.data]
            };
        case 'del':
            return {
                todos: [...action.data]
            };
        case 'completed':
            return {
                todos: [...action.data]
            };
    }
}
```

##### 读取数据

```javascript
//App
    const listData = getTodoListData(useContext(Context), 'state');

// TodoListData
export function getTodoListData(context, key = 'state') {
    const data = localStorage.getItem(key);
    return data && JSON.parse(data).todos.length ? JSON.parse(data) : context;
}
```

##### 存数据和监听数据变化

```javascript
//App
const api = SetTodoListData(useReducer(reducer, listData), 'state');

// TodoListData
export function SetTodoListData([state, dispatch], key = 'state') {
    useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state]);
    return {
        state,
        dispatch
    };
}
```

useEffect监听listData的变化

##### 传递给子组件值和操作方法

```html
<Context.Provider value={api}>
    <TodoForm/>
    <br/>
    <TodoList/>
</Context.Provider>
```

##### 子组件读写

```javascript
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

dispatch({
    type: 'add', data: {
        text: todo,
        isCompleted: false
    }
});
```
SetTodoListData 不大写会报错
https://blog.csdn.net/jiaojsun/article/details/105359643
