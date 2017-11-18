import { SET_MOVIE, SET_SEARCH_RESULTS, TERM_CHANGED} from './types';



export const setMovie = (movie) => {
  return (dispatch) => {
        dispatch({
          type: SET_MOVIE,
          payload: movie
        })
        return Promise.resolve()
  }
}

export const setSearchResults = (searchResultList) => {
  return {
        type: SET_SEARCH_RESULTS,
            payload: searchResultList
          }
}


export const termChanged = (term) => {
  return {
    type: TERM_CHANGED,
    payload: term
  }
}
