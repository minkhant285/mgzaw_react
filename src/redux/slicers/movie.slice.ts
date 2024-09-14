import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICategory, IMovie } from '../../models';

const initialState: {
    movies: IMovie[] | null;
    categories: ICategory[] | null;
    activeCategory: string;
    pageCount: number;
    currentPage: number;
} = {
    movies: null,
    categories: null,
    activeCategory: '0',
    pageCount: 0,
    currentPage: 0
};

export const movieSlice = createSlice({
    name: 'movie-slicer',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<IMovie[]>) => {
            state.movies = action.payload;
            return state;
        },
        setCategories: (state, action: PayloadAction<ICategory[]>) => {
            state.categories = action.payload;
            return state;
        },
        setActiveCategory: (state, action: PayloadAction<string>) => {
            state.activeCategory = action.payload;
            return state;
        },
        setPageCount: (state, action: PayloadAction<number>) => {
            state.pageCount = action.payload;
            return state;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
            return state;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setMovies, setCategories, setActiveCategory, setCurrentPage, setPageCount } = movieSlice.actions;

export default movieSlice.reducer;
