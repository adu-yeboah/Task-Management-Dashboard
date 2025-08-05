import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  status: 'all' | 'todo' | 'in-progress' | 'done';
  searchQuery: string;
};

const initialState: FilterState = {
  status: 'all',
  searchQuery: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setStatusFilter(state, action: PayloadAction<FilterState['status']>) {
      state.status = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    resetFilters(state) {
      state.status = 'all';
      state.searchQuery = '';
    },
  },
});

export const { setStatusFilter, setSearchQuery, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;