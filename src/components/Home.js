import React, {Component} from 'react'
import { connect } from 'react-redux';
import '../assets/scss/home.scss';
import { setMovie, termChanged, searchArtwork } from '../actions';
import ReactLoading from 'react-loading';

class Home extends Component {
  constructor(props){
    super(props)
    this.readMoreClicked = this.readMoreClicked.bind(this)
  }
  termChanged(termVal){
    this.props.termChanged(termVal.target.value);
  }
  searchArtwork(){
    this.props.searchArtwork(this.props.term);
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
    else if(this.props.isLoading){
      return(
        <div className="loader">
          <ReactLoading type="bars" color="#444" />
        </div>
      )
    }
    else if(this.props.errorMessage.length > 0){
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
      <div className="container home">
        <div className="row">
        <h1>Itunes Movies Search</h1>
        <div className="search">
              <div className="input-group col-md-12">
                  <input value={this.props.term} onChange={this.termChanged.bind(this)} type="text" className="form-control input-lg" placeholder="Let's search a movie" />
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
  const { searchResultList, term, errorMessage, isLoading } = main;
  return {
    searchResultList: searchResultList,
    term: term,
    errorMessage: errorMessage,
    isLoading: isLoading
  }
}
export default connect(mapStateToProps, { setMovie, termChanged, searchArtwork })(Home);
