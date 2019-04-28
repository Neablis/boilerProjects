// actions
export const INCREASE = 'INCREASE';
export const DECREASE = 'DECREASE';

// Action creators
export const increase = () => {
  return {
    type: INCREASE,
  };
};

export const decrease = () => {
  return {
    type: DECREASE,
  };
};
