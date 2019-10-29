import React from "react";
import useAuthProvider from "../../hooks/useAuthProvider";
import axios from "axios";

const playerApi = require( "../../lib/proto/coffeehaus_player_api_pb" );

let AUTHORIZE_URI: string = "http://localhost:8080/account/player/authorize-uri";

function PortalPage() {
    const { token } = useAuthProvider();

    const [ authorizationUri, setAuthorizationUri ] = React.useState( "" );
    const [ authorizationCode, setAuthorizationCode ] = React.useState( "" );
    const [ clicked, setClicked ] = React.useState( false );

    React.useEffect( () => {
        const authInfo = new playerApi.AuthInfo();
        authInfo.setToken( token );

        const authorizationUriRequest = new playerApi.AuthorizationUriRequest();
        authorizationUriRequest.setAuth( authInfo );
        authorizationUriRequest.addServices( playerApi.MusicStreamingService.SPOTIFY );

        const data = authorizationUriRequest.serializeBinary();

        axios.post( AUTHORIZE_URI, data, {
            headers: {
                "Content-Type": "application/x-protobuf"
            },
            responseType: "arraybuffer"
        } )
            .then( response => {
                const authorizationUriResponse = playerApi.AuthorizationUriResponse.deserializeBinary( response.data );
                setAuthorizationUri( authorizationUriResponse.getServiceUriList()[ 0 ] )
            } )
            .catch( ( e ) => {
                console.warn( "Error: ", e );
            } );

        setClicked(false);
        console.log(authorizationUri);

    }, [] );

    console.log(authorizationUri);

    return (
        <div className="button__container">
            <button
                type="button"
                className="button"
                onClick={() => setClicked(true)}>
                Sign in to Spotify
            </button>
        </div>
    )
}

export default PortalPage;
