import React, {Component} from 'react'
import axios from 'axios';
import { connect } from 'react-redux';
import '../assets/scss/home.scss';
import { setMovie } from '../actions';


class Home extends Component {
  constructor(props){
    super(props)
    this.state = {
      term: 'why him',
      moviesList: [],
    }
    this.readMoreClicked = this.readMoreClicked.bind(this)
  }
  componentDidMount(){
      this.searchArtwork();
  }
  termChanged(termVal){
    this.setState({term: termVal.target.value})
  }
  searchArtwork(){
    let urlWithParams = "https://itunes.apple.com/search?term=" + this.state.term + "&media=movie";
    axios.get(urlWithParams)
    .then((response) => {
      if (response && response.data){
        if (response.data.results.length > 0){
          this.setState({moviesList: response.data.results})
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
    if (this.state.moviesList.length > 0){
        return(
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
        {this.state.moviesList.map((movie, index) => {
            return (
              <tr key={index} className="movie">
              <td className="index"><h4>{index + 1}</h4></td>
              <td className="name">
                <img src={movie.artworkUrl60} />
                <span>{movie.trackCensoredName}</span>
              </td>
              <td className="genre"> {movie.primaryGenreName}</td>
              <td className="price"><span>{movie.trackPrice}$</span></td>
              <td className="read-more"><button className="btn btn-primary" onClick={() => this.readMoreClicked(movie)}>Read More</button></td>
              </tr>
            )
          })}
          </tbody>
        </table>
    )
    }
  }
  render() {
    return(
      <div className="container home">
        <div className="row">
        <div id="custom-search-input">
              <div className="input-group col-md-12">
                  <input value={this.state.term} onChange={this.termChanged.bind(this)} type="text" className="form-control input-lg" placeholder="Lets find some artwork" />
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

export default connect(null, { setMovie })(Home);
