import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import '../assets/scss/home.scss';
import { setMovie, termChanged, setSearchResults } from '../actions';


class Home extends Component {
  constructor(props){
    super(props)
    this.readMoreClicked = this.readMoreClicked.bind(this)
  }
  termChanged(termVal){
    this.props.termChanged(termVal.target.value);
  }
  searchArtwork(){
    let urlWithParams = "https://itunes.apple.com/search?term=" + this.props.term + "&media=movie";
    axios.get(urlWithParams)
    .then((response) => {
      if (response && response.data){
        if (response.data.results.length > 0){
          this.props.setSearchResults(response.data.results);
        }
        else {
          //TODO: show no results message
        }
      }
      else {
        //TODO: show general error
      }
    })
    .catch((ex) => {

    })
  }
  readMoreClicked(movie){
    this.props.setMovie(movie)
    .then(() => {
      this.props.history.push('/movie/' + movie.trackId);
    })
  }
  renderMovies(){
    if (this.props.searchResultList.length > 0){
        return(
        <div className="table-responsive">
        <table className="table">
          <thead>
          <tr>
            <th></th>
            <th>NAME</th>
            <th>GENRE</th>
            <th>PRICE</th>
            <th></th>
          </tr>
          </thead>
          <tbody>
        {this.props.searchResultList.map((movie, index) => {
            return (
              <tr key={index} className="movie">
              <td className="index"><h4>{index + 1}</h4></td>
              <td className="name">
                <img src={movie.artworkUrl60} />
                <span>{movie.trackCensoredName}</span>
              </td>
              <td className="genre"> {movie.primaryGenreName}</td>
              <td className="price"><span>{movie.trackPrice} </span><small>{movie.currency}</small></td>
              <td className="read-more"><button className="btn btn-primary" onClick={() => this.readMoreClicked(movie)}>Read More</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
        </div>
    )
    }
  }
  render() {
    return(
      <div className="container home">
        <div className="row">
        <div id="custom-search-input">
              <div className="input-group col-md-12">
                  <input value={this.props.term} onChange={this.termChanged.bind(this)} type="text" className="form-control input-lg" placeholder="Lets find some artwork" />
                  <span className="input-group-btn">
                      <button className="btn btn-info btn-lg" type="button" onClick={() => {this.searchArtwork()}}>
                          <i className="glyphicon glyphicon-search"></i>
                      </button>
                  </span>
              </div>
          </div>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({main}){
  const { searchResultList, term } = main;
  return {
    searchResultList: searchResultList,
    term: term
  }
}
export default connect(mapStateToProps, { setMovie, setSearchResults, termChanged })(Home);
