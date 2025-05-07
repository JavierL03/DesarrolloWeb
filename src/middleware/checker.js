const checker = (store) => (next) => (action) => {
     console.log(action);

    if (action.type === 'todos/addTodo' &&
    action.playload.name.toLowerCase().includes("bitcoin")
    ) {
        return alert("No puedes comprar bitcoin");
    }

    if (action.type === 'goals/addGoal' &&
    action.playload.name.toLowerCase().includes("bitcoin")
    ) {
        return alert("No puedes comprar bitcoin");
    }   

    return next(action);
};

export default checker;