import React from 'react';
import '../css/Map.css'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import socketIOClient from "socket.io-client";
import { FaArrowAltCircleLeft } from 'react-icons/fa';
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
            lat: 0,
            lng: 0
        };
        this.setupSocket = this.setupSocket.bind(this);
    }
    componentDidMount() {
        const {endpoint} = {
            response: 0,
            endpoint: "http://192.168.0.12:3069"
        };
        this.socket = socketIOClient(endpoint);
        this.setupSocket();
    }
    componentWillUnmount() {
        this.socket.close()
    }
    setupSocket() {
        var self = this;
        this.socket.on("coord_update", function (data) {
            data = JSON.parse(data);
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
                <div className="back-button">
                    <FaArrowAltCircleLeft style={{ color: "#C3073F", display: 'table', margin: '0 auto' }} size={40} onClick={this.props.goHome} />
                </div>
            </div>
        );
    }
}

export default scriptLoader("https://maps.googleapis.com/maps/api/js?key=" + process.env.REACT_APP_MAPS_API_KEY)(Map);