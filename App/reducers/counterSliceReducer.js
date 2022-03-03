import { createSlice } from '@reduxjs/toolkit';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/** example of using redux-toolkit @EXPERIMENTAL */
const {
  actions: { increment, decrement },
  reducer: counterSliceReducer,
} = createSlice({
  name: 'counterSliceReducer',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
  },
});

export const useCounterSlice = () => {
  const dispatch = useDispatch();
  /** used to select state */
  const count = useSelector((state) => state.counterSliceReducer);
  const up = useCallback(() => dispatch(increment()), [dispatch]);
  const down = useCallback(() => dispatch(decrement()), [dispatch]);
  return { count, up, down };
};

export default counterSliceReducer;
