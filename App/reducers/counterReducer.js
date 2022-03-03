import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
/**
 *  constants for internal use only dont use this outside of this file
 *  use action creator instead
 */
const Types = {
  COUNTER_PLUS_ONE: 'COUNTER_PLUS_ONE',
  COUNTER_MINUS_ONE: 'COUNTER_MINUS_ONE',
};
/** describe initial state */
const initialState = {
  count: 0,
};
/** action cretor */
const counterPlusOne = () => {
  return {
    type: Types.COUNTER_PLUS_ONE,
  };
};
const counterMinusOne = () => {
  return {
    type: Types.COUNTER_MINUS_ONE,
  };
};
/** Hook to use inside component body */
export const useCounter = () => {
  const dispatch = useDispatch();
  /** used to select state */
  const { count } = useSelector((state) => state.counterReducer);
  const up = useCallback(() => dispatch(counterPlusOne()), [dispatch]);
  const down = useCallback(() => dispatch(counterMinusOne()), [dispatch]);
  return { count, up, down };
};
/** reducer to handle state update */
export default function counterReducer(state = initialState, action) {
  switch (action.type) {
    case Types.COUNTER_PLUS_ONE:
      return {
        ...state,
        count: state.count + 1,
      };
    case Types.COUNTER_MINUS_ONE:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
}
