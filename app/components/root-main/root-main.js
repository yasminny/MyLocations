import './root-main.scss';
import React from 'react';
// import SongsComp from '../songs/SongsComp';
import {NavLink} from 'react-router-dom';

export default class Root extends React.Component {
  constructor() {
    super();
    this.state = {
      countdownTillLoading: 5,
      // songs: [],
      songsLoading: 'loading',
      // offset: 0,
      // limit: 15
    };
  }

  componentDidMount() {
    this.loadSongs();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.match.params.genre !== this.props.match.params.genre) {
      this.setState({offset: 0}, () => {
        this.loadSongs();
      });
    }
    if (prevState.offset !== this.state.offset) {
      this.loadSongs();
    }
    if (this.catElm) {
      this.catElm.scrollIntoView();
    }
  }

  loadSongs() {
    const genre = this.props.match.params.genre.toString();

    const searchParam = new URLSearchParams(this.props.location.search);
    const searchTarget = searchParam.get('search') ? 'q' : 'tags';

    this.setState({songsLoading: 'loading'});
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://api.soundcloud.com/tracks?client_id=2t9loNQH90kzJcsFCODdigxfp325aq4z&limit=${limit}&offset=${offset}&${searchTarget}=${genre}`);
    xhr.addEventListener('load', () => {
      this.setState({songs: JSON.parse(xhr.responseText), songsLoading: 'loaded'});
    });
    xhr.addEventListener('error', () => {
      this.waitForLoading();
      this.setState({songsLoading: 'error'});
    });
    xhr.send();
  }

  waitForLoading() {
    setTimeout(() => {
      this.setState({countdownTillLoading: this.state.countdownTillLoading - 1});
      if (this.state.countdownTillLoading === 0) {
        this.setState({countdownTillLoading: 5});
        this.loadSongs();
      }
      else {
        this.waitForLoading();
      }
    }, 1000);
  }

  handelCreateSongs() {
    const searchParam = new URLSearchParams(this.props.location.search);
    const isInSearch = searchParam.get('search');
    const songsLength = this.state.songs.length;

    if (isInSearch && songsLength === 0) {
      return <h5>No songs were found for your search</h5>
    }
    return <div>
      <SongsComp
        {...this.props}
        songs={ this.state.songs }
        mode={ 'explore' }
        playlistId={0}
      />
      <div className="page-num">
        <button type="button" className="back" onClick={() => this.prevPage(this)}
                disabled={this.state.offset === 0}>Prev
        </button>
        <p>page {this.state.offset / this.state.limit + 1}</p>
        <button type="button" className="next" onClick={ () => this.nextPage(this)}>Next</button>
      </div>
    </div>
  }

  nextPage() {
    this.setState({
      offset: this.state.offset + this.state.limit
    })
  }

  prevPage() {
    this.setState({
      offset: this.state.offset - this.state.limit
    })
  }

  render() {
    const searchParam = new URLSearchParams(this.props.location.search);
    const viewTitle = searchParam.get('search') ? 'Search' : 'Genre';

    switch (this.state.songsLoading) {
      case 'loading':
        return <div className="loading"><i className="fa fa-spinner fa-pulse fa-3x fa-fw"> </i></div>;

      case 'error':
        return <div>Error! please
          <button type="button" onClick={ this.waitForLoading }>try again</button>
          , or wait {this.state.countdownTillLoading} seconds</div>;

      case 'loaded':
        return (
          <div className="explore-comp">
            <ul className="categories" ref={(cat) => this.catElm = cat }>
              <li>Genres:</li>
              <li><NavLink to="/explore/house" activeClassName="selected-genre">House</NavLink></li>
              <li><NavLink to="/explore/indie" activeClassName="selected-genre">Indie</NavLink></li>
              <li><NavLink to="/explore/pop" activeClassName="selected-genre">Pop</NavLink></li>
              <li><NavLink to="/explore/ambient" activeClassName="selected-genre">Ambient</NavLink></li>
              <li><NavLink to="/explore/dubstep" activeClassName="selected-genre">Dubstep</NavLink></li>
              <li><NavLink to="/explore/trance" activeClassName="selected-genre">Trance</NavLink></li>
            </ul>
            <div className="genre-title">
              {viewTitle}: { this.props.match.params.genre.toString().charAt(0).toUpperCase() + this.props.match.params.genre.toString().slice(1) }</div>
            {this.handelCreateSongs()}
          </div>
        );
    }
  }
}

