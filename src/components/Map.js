import React from 'react';
import '../css/Map.css'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import socketIOClient from "socket.io-client";

import scriptLoader from 'react-async-script-loader';

const defaultMapOptions = {
    fullscreenControl: false,
    draggable: false,
    mapTypeControl: false,
    mapTypeControlOptions: false,
    panControlOptions: false,
    zoomControlOptions: false,
    rotateControlOptions: false,
    streetViewControl: false,
    scaleControlOptions: false,
    streetViewControlOptions: false
};

// backgroundColor, center, clickableIcons, controlSize, disableDefaultUI, disableDoubleClickZoom,
//  draggable, draggableCursor, draggingCursor, , , gestureHandling,
//   heading, keyboardShortcuts, , , mapTypeId, maxZoom, minZoom, noClear,
//    panControl, , restriction, rotateControl, , 
// scaleControl, , scrollwheel, streetView, , , styles, tilt, zoom, zoomControl,
  
const MapWithAMarker = withGoogleMap(props =>
    <GoogleMap
        bootstrapURLKeys={{key: process.env.REACT_APP_MAPS_API_KEY, libraries: 'places'}}
        defaultZoom={16}
        defaultOptions={defaultMapOptions}
        center={{ lat: props.lat, lng: props.lng }}
    >
        <Marker
            position={{ lat: props.lat, lng: props.lng }}
        />
    </GoogleMap>
);

class Map extends React.Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: "http://192.168.0.12:3000",
            lat: 0,
            lng: 0
        };
        this.setupSocket = this.setupSocket.bind(this);
    }
    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        this.setupSocket(socket);
    }
    setupSocket(socket) {
        var self = this;
        socket.on("coord_update", function (data) {
            console.log(data);
            data = JSON.parse(data);
            console.log(data.lat + ' ' + data.lon);
            self.setState({lat: parseFloat(data.lat), lng: parseFloat(data.lon)});
        });
    }
    render() {
        const { isScriptLoaded, isScriptLoadSucceed } = this.props;

        return (
            <div className='map-container'>
                { isScriptLoadSucceed && <MapWithAMarker
                        lat={this.state.lat}
                        lng={this.state.lng}
                        containerElement={<div style={{ height: `100%`, width: '100%' }} />}
                        mapElement={<div style={{ height: `100%`, width: '100%' }} />}
                    />
                }
            </div>
        );
    }
}

export default scriptLoader("https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_MAPS_API_KEY)(Map);