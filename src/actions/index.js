import axios from 'axios';

import { SET_MOVIE,
  SET_SEARCH_RESULTS,
  TERM_CHANGED,
  ERROR,
  ITUNES_SEARCH_BY_TERM_URL,
  ITUNES_FIND_TRACK_BY_ID,
  LOADING } from './types';



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

export const searchArtwork = (term) => {
  return (dispatch) => {
    dispatch({type: LOADING, payload: true })
    let urlWithParams = ITUNES_SEARCH_BY_TERM_URL + term + "&media=movie";
    axios.get(urlWithParams)
    .then((response) => {
      if (response && response.data){
        if (response.data.results.length > 0){
          dispatch({type: SET_SEARCH_RESULTS, payload: response.data.results})
        }
        else {
          dispatch({type: ERROR, payload: "No movies/videos were found"})
        }
      }
      else {
        dispatch({type: ERROR, payload: "An error has occurred, Please try again later"})
      }
    })
    .catch((ex) => {
      dispatch({type: ERROR, payload: "An error has occurred, Please try again later"})
    })
  }
}

export const findTrackById = (trackId) => {
  return (dispatch) => {
    axios.get(ITUNES_FIND_TRACK_BY_ID + trackId)
    .then((response) => {
      if (response && response.data.resultCount == 1){
        dispatch({type: SET_MOVIE,  payload: response.data.results[0] })
      }
      else{
        dispatch({type: ERROR, payload: "An error has occurred, Please try again later"})
      }
    })
    .catch(() => {
      dispatch({type: ERROR, payload: "An error has occurred, Please try again later"})
    })
  }
}
