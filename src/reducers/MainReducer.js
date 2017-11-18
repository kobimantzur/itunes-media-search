import {
  SET_MOVIE
} from '../actions/types';

const INITIAL_STATE = {
  selectedMovie: null
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case SET_MOVIE:
    return { ...state, selectedMovie: action.payload }
    default:
    return state;
  }
};
