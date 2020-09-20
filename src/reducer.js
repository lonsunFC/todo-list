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
