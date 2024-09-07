import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMovie } from '../../models';

const initialState: {
    movies: IMovie[] | null;
} = {
    movies: null
};

export const movieSlice = createSlice({
    name: 'movie-slicer',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.movies = action.payload
            return state;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setMovies } = movieSlice.actions;

export default movieSlice.reducer;
