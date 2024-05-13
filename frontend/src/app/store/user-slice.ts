import { createSlice } from '@reduxjs/toolkit';

type UserState = {
  changeInTodos: number;
};

const initialState: UserState = {
  changeInTodos: 0,
};

console.log('Slice created-----!');

export const userSlice = createSlice({
  name: 'todo',
  initialState: initialState,
  reducers: {
    incrementOwnTodoNumber: (state) => {
      state.changeInTodos++;
    },
    decrementOwnTodoNumber: (state) => {
      state.changeInTodos--;
    },
  },
});

export const { incrementOwnTodoNumber, decrementOwnTodoNumber } = userSlice.actions;
