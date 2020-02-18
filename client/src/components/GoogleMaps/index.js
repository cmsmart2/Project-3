import React, {useState} from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from "react-google-maps";
import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng
  } from "react-places-autocomplete";

function Map(){
    const [selectedPlace, setSelectedPlace] =useState(null);
    const [address, setAddress] = React.useState("");
    const [coordinates, setCoordinates] = React.useState({
        lat: 39.106667,
        lng: -94.676392
    });
    
    const center = coordinates
    console.log(address)
    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);
        setAddress(value);
        setCoordinates(latLng);
    };        
    return(
        <div>
            <PlacesAutocomplete
                value={address}
                onChange={setAddress}
                onSelect={handleSelect}
                >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                    {/* <p>Latitude: {coordinates.lat}</p>
                    <p>Longitude: {coordinates.lng}</p> */}
                    <input {...getInputProps({ placeholder: "Type address" })} />
                    <div>
                        {loading ? <div>...loading</div> : null}

                        {suggestions.map(suggestion => {
                        const style = {
                            backgroundColor: suggestion.active ? "#41b6e6" : "#fff"
                        };
                        console.log(suggestions);

                        return (
                            <div {...getSuggestionItemProps(suggestion, { style })}>
                            {suggestion.description}
                            </div>
                        );
                        })}
                    </div>
                    </div>
                )}
                </PlacesAutocomplete>

            <GoogleMap 
                defaultZoom={10} 
                center={center}
            >
                    <Marker 
                        position={
                        new window.google.maps.LatLng(coordinates.lat, coordinates.lng)} 
                        onClick={()=>{
                            setSelectedPlace(address);
                        }}
                    />
                    {selectedPlace && (
                        <InfoWindow
                        position ={{
                            lat: coordinates.lat,
                            lng: coordinates.lng
                        }}
                        onCloseClick={() => {
                            setSelectedPlace(null);
                        }}
                        >
                            <div>{address}</div>
                        </InfoWindow>
                    )}
                </GoogleMap>
            </div>
    );
}

const WrappedMap = withScriptjs (withGoogleMap(Map))

export default WrappedMap;