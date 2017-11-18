import { SET_MOVIE } from './types';



export const setMovie = (movie) => {
  return (dispatch) => {
        dispatch({
          type: SET_MOVIE,
          payload: movie
        })
        return Promise.resolve()
      }
  }
