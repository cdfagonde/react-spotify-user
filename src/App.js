import React, { Component } from "react";
import * as $ from "jquery";
import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Painel from "./Painel";
// import logo from "./logo.svg";
import "./App.css";

const spotify_logo = "https://image.flaticon.com/icons/png/512/174/174872.png";

class App extends Component {
  constructor() {
    super();
    this.state = {
      token     : null,
      user      : null,
      playlists : null
    };
    this.getCurrentUser = this.getCurrentUser.bind(this);
    this.getPlaylists = this.getPlaylists.bind(this);
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      // this.getCurrentlyPlaying(_token);
      this.getCurrentUser(_token);
      this.getPlaylists(_token);
    }
    // Preparamos nova execução
    // setTimeout( this.setRefreshTime, 1000 );
  }

  getCurrentUser(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // console.log("data", data);
        if(data) {
          this.setState({
            user: data
          });
        }
      } 
    });
  }

  getPlaylists(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/playlists?limit=50",
      type: "GET",
      beforeSend: (xhr) => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        // console.log("data", data);
        if(data) {
          this.setState({
            playlists: data
          });
        }
      } 
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={spotify_logo} className="App-logo" alt="logo" />
          <br/>
          {!this.state.token && (
            <a className="btn btn--loginApp-link"
               href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
            > Login to Spotify </a>
          )}
          {this.state.token && (
            <Painel user={this.state.user} playlists={this.state.playlists}  />
          )}
        </header>
      </div>
    );
  }
}

export default App;
