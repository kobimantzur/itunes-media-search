import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../assets/scss/movie.scss';
import { setMovie, findTrackById } from '../actions';
import ReactLoading from 'react-loading';

class Movie extends Component {

  componentWillMount(){
    if (!this.props.selectedMovie){
      let trackId = this.props.location.pathname.split('/')[2];
      this.props.findTrackById(trackId);
    }
  }

  renderMovieDetails(){
    if (this.props.selectedMovie){
      let artworkImageUrl = this.props.selectedMovie.artworkUrl100.split("/source")[0] + '/source/200x200.jpg';
      return(
      <div className="row">
        <aside className="col-xs-12 col-sm-3">
          <img src={artworkImageUrl} />
          <a target="_blank" href={this.props.selectedMovie.previewUrl} className="btn btn-primary">Watch the trailer!</a>
          <Link to="/" className="btn btn-danger">Back</Link>
          <a href={this.props.selectedMovie.trackViewUrl} className="btn btn-success">{this.props.selectedMovie.trackHdPrice} <small>{this.props.selectedMovie.currency}</small></a>
        </aside>
        <div className="col-xs-12 col-sm-9 movie-details">
          <h2>{this.props.selectedMovie.trackCensoredName}</h2>
          <h3>About</h3>
          <p>{this.props.selectedMovie.longDescription}</p>
          <h3>Information</h3>
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>Directed By</b></td>
                <td>{this.props.selectedMovie.artistName}</td>
              </tr>
              <tr>
                <td><b>Country</b></td>
                <td>{this.props.selectedMovie.country}</td>
              </tr>
              <tr>
                <td><b>Genre</b></td>
                <td>{this.props.selectedMovie.primaryGenreName}</td>
              </tr>
              <tr>
                <td><b>Advisory</b></td>
                <td>{this.props.selectedMovie.contentAdvisoryRating}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      )
    }
    else if(this.props.isLoading){
      return(
      <div className="loader">
        <ReactLoading type="bars" color="#444" />
      </div>
      )
    }
    else{
      return(
      <div>
        <h2>Oops..</h2>
        <div className="alert alert-danger"> {this.props.errorMessage} </div>
      </div>
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
  const { selectedMovie, errorMessage, isLoading } = main;
  return {
    selectedMovie: selectedMovie,
    errorMessage: errorMessage,
    isLoading: isLoading
  }
}
export default connect(mapStateToProps, { setMovie, findTrackById })(Movie);
