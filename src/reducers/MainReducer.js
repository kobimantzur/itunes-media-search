import {
  SET_MOVIE,
  SET_SEARCH_RESULTS,
  TERM_CHANGED
} from '../actions/types';

const INITIAL_STATE = {
  selectedMovie: null,
  searchResultList: [],
  term: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type){
    case SET_MOVIE:
    return { ...state, selectedMovie: action.payload }
    case SET_SEARCH_RESULTS:
    return { ...state, searchResultList: action.payload }
    case TERM_CHANGED:
    return { ...state, term: action.payload}
    default:
    return state;
  }
};
