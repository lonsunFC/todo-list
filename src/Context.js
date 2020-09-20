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