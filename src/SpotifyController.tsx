import React, {Component} from "react";
import axios from 'axios'

let AUTHORIZE_URL: string = 'http://localhost:8080/account/authorize';

interface State {
    authorizationUri: string
    authorizationCode: string
}

class SpotifyController extends Component<State> {

    state = {
        authorizationUri: '',
        authorizationCode: ''
    };

    componentDidMount(): void {
        this.getAuthorizationUri();
        this.testPause();
    }

    getAuthorizationUri = () => {
        axios.get(AUTHORIZE_URL)
            .then(response => {
                this.setState({
                    authorizationUri: response.data as string
                })
            })
            .catch((e) => {
                console.warn("Error: ", e);
            })
    };

    testPause = () => {
        let code: string = window.location.search.substring(window.location.search.indexOf('?'), window.location.search.indexOf('&'));

        if (code.length > 10) {
            axios.post(AUTHORIZE_URL.concat(code))
                .then(response => {
                    console.log(response.data);
                })
                .catch((e) => {
                    console.warn("Error:", e);
                })
        }

    };

    handleClick = () => {
        window.location.replace(this.state.authorizationUri);
    };

    render() {
        return (
            <div className="button__container">
                <button
                    type="button"
                    className="button"
                    onClick={this.handleClick}>
                    Sign in to Spotify
                </button>
            </div>
        );
    };
}

export default SpotifyController;