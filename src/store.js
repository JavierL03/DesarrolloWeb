import {configureStore} from '@reduxjs/toolkit';
import todoReducer from './slices/todoSlice';
import goalReducer from './slices/goalSlice';
import { Logger } from './middleware/logger';
import checker from './middleware/checker';

export default configureStore({
    reducer: {
        todos: todoReducer,
        goals: goalReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(Logger, checker),
});