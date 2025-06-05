export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        value: [],
    },
   reducers: {
      addTodo: (state, action) => {
             console.log(action.payload);
              state.value.push(action.payload);
           fetch('http://localhost:3001/tasks/addTask', {
           method: "POST",
           headers: {
               "Content-Type": "application/json",
               "Authorization": "123456"
    },
               body: JSON.stringify(action.payload)
               }).catch((err) => {
               console.log(err);
    });
    },
      initAddTodo: (state, action) => {
    console.log(action.payload);
    state.value.push(action.payload);
},
removeTodo: (state, action) => {
    state.value = state.value.filter((task)=>task_id!==action.payload);
    fetch('http://localhost:3001/tasks/removeTask/'+action.payload,{
    method: "DELETE",
    reducers: {
         "Content-Type": "application/json",
               "Authorization": "123456"
               
    },
        initAddTodo: (state, action) => {
            console.log( action.payload);
            state.value.push (action.payload)
        },
        
        removeTodo: (state, action) => {
            console.log( action.payload);
            state.value = state.value.filter((todo) => todo.name !== action.payload.name);
        }

    }

})

export const { addTodo, initAddTodo, removeTodo } = todoSlice.actions;
export const selectTodos = (state) => state.todos.value;

export default todoSlice.reducer;