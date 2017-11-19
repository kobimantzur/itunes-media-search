import React, {Component} from 'react'
import { connect } from 'react-redux';
import '../assets/scss/home.scss';
import { setMovie, termChanged, searchArtwork, setSearchType } from '../actions';
import ReactLoading from 'react-loading';

class Home extends Component {
  constructor(props){
    super(props)
    this.readMoreClicked = this.readMoreClicked.bind(this)
    this.handleSearchType = this.handleSearchType.bind(this);
  }
  termChanged(termVal){
    this.props.termChanged(termVal.target.value);
  }
  handleSearchType(event){
    this.props.setSearchType(event.target.value);
  }
  searchArtwork(){
    this.props.searchArtwork(this.props.term, this.props.searchType);
  }
  readMoreClicked(movie){
    this.props.setMovie(movie)
    .then(() => {
      this.props.history.push('/movie/' + movie.trackId);
    })
  }
  searchKeyPressed(event){
    if (event.charCode == 13){
      this.searchArtwork();
    }
  }
  renderMovies(){
    if (this.props.searchResultList.length > 0){
        return(
        <div className="table results">
          <div className="head">
            <div className="table-row">
              <div className="cell">NAME</div>
              <div className="cell">GENRE</div>
              <div className="cell">PRICE</div>
              <div className="cell"></div>
            </div>
          </div>
          <div className="body">
        {this.props.searchResultList.map((movie, index) => {
            return (
                <div key={index} className="table-row movie">
                <div className="col-xs-12 cell name">
                  <img className="col-xs-3" src={movie.artworkUrl60} />
                  <span className="col-xs-9">{movie.trackCensoredName}</span>
                </div>
                <div className="cell genre"><b>Genre </b> {movie.primaryGenreName}</div>
                <div className="cell price"><b>Price </b> <span>{movie.trackPrice} </span><small>{movie.currency}</small></div>
                <div className="cell read-more"><button className="btn btn-primary" onClick={() => this.readMoreClicked(movie)}>Read More</button></div>
                </div>
            )
          })}
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
          <div className="radio">
              <label>
                <input type="radio"
                name="movie"
                onChange={this.handleSearchType}
                value="movie"
                checked={this.props.searchType === 'movie'}/> Movie
              </label>
              <label>
                <input type="radio"
                name="tvShow"
                value="tvShow"
                onChange={this.handleSearchType}
                checked={this.props.searchType === 'tvShow'} /> TV-Show
              </label>
            </div>
          <div className="search-bar">
                <div className="input-group col-md-12">
                    <input value={this.props.term} onKeyPress={this.searchKeyPressed.bind(this)} onChange={this.termChanged.bind(this)} type="text" className="form-control input-lg" placeholder="Let's search a movie" />
                    <span className="input-group-btn">
                        <button className="btn btn-info btn-lg" type="button" onClick={() => {this.searchArtwork()}}>
                            <i className="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
          </div>
          {this.renderMovies()}
        </div>
      </div>
    );
  }
}
function mapStateToProps({main}){
  const { searchResultList, term, errorMessage, isLoading, searchType } = main;
  return {
    searchResultList: searchResultList,
    term: term,
    errorMessage: errorMessage,
    isLoading: isLoading,
    searchType: searchType
  }
}
export default connect(mapStateToProps, { setMovie, termChanged, searchArtwork, setSearchType })(Home);
