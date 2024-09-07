import { configureStore } from '@reduxjs/toolkit';
import MovieReducer from './slicers/movie.slice';

export const store = configureStore({
    reducer: {
        MovieReducer
    },
});

export type MVProRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
