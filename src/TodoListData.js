import {useEffect, useState} from 'react';

export function getTodoListData(context, key = 'state') {
    const data = localStorage.getItem(key);
    return data && JSON.parse(data).todos.length ? JSON.parse(data) : context;
}

export function SetTodoListData([state, dispatch], key = 'state') {
    // useEffect(() => localStorage.setItem(key, JSON.stringify(state)), [key, state]);
    const [count, setCount] = useState(0);
    useEffect(()=>{
        setCount(x => x + 1)
    }, [state]);
    useEffect(function () {
        if(count > 1) {
            console.log('state', state);
            localStorage.setItem(key, JSON.stringify(state))
        }
    }, [count, key, state]);
    return {
        state,
        dispatch
    };
}
