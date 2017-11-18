import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import '../assets/scss/home.scss';
const parseQueryString = require('query-string');
import { setMovie } from '../actions';

class Movie extends Component {
  componentWillMount(){
    let ITUNES_FIND_TRACK_BY_ID = 'https://itunes.apple.com/lookup?id=';
    if (!this.props.selectedMovie){
      let trackId = this.props.location.pathname.split('/')[2];
      axios.get(ITUNES_FIND_TRACK_BY_ID + trackId)
      .then((response) => {
        if (response && response.data.resultCount == 1){
          this.props.setMovie(response.data.results[0])
        }
        else{
          //TODO: show general error
        }
      })
    }
  }
  renderMovieDetails(){
    if (this.props.selectedMovie){
      return(
      <div className="row">
        <img src={this.props.selectedMovie.artworkUrl60} />
      </div>
      )
    }
    else{
      return(
      <h2>Loading...</h2>
      )
    }
  }
  render() {
    return(
      <div className="container movie">
        {this.renderMovieDetails()}
      </div>
    );
  }
}
function mapStateToProps({main}){
  const { selectedMovie } = main;
  return {
    selectedMovie: selectedMovie
  }
}
export default connect(mapStateToProps, {setMovie})(Movie);
