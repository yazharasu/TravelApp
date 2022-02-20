import React from 'react';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
import LocationonOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';
import GoogleMapReact from 'google-map-react';

function Map({ setCoordinates, setBounds, coordinates, places, setChildClicked }) {
  const classes = useStyles();
  const isDesktop = useMediaQuery( '(min-width:600px)' );

  return (  
    <div className={classes.mapContainer} >
        <GoogleMapReact
          bootstrapURLKeys = { { key:'AIzaSyBDv7sVmcgZSb4fa5Yu4s_FEuM1afomrY0' }}
          dafaultCenter = { coordinates }
          center = { coordinates }
          defaultZoom = {14}
          margin={ [50, 50, 50, 50]}
          options={''}
          onChange={ (e) => {
            setCoordinates( { lat: e.center.lat, lng: e.center.lng } );
            setBounds( {ne: e.marginBounds.ne, sw: e.marginBounds.sw } );
          } }
          onChildClick={ (child) => setChildClicked(child) }
          > 
          
          {places?.map( (place, i) => (
            <div 
                className= {classes.markerContainer}
                lat={Number(place.latitude)}
                lng={Number(place.longitude)}
                key={i}            
            >
              {
                !isDesktop ? (
                  <LocationonOutlinedIcon color='primary' fontSize='large' />
                ) : (
                  <Paper elevation={3} className={classes.paper}>
                    <Typography className={classes.Typography} varient='h1' >
                      {place.name}
                    </Typography>
                    <img 
                      className={classes.pointer} 
                      src={place.photo ? place.photo.images.large.url : 'https://thumbs.dreamstime.com/b/empty-wood-table-top-blur-night-pub-restaurant-background-selective-focus-using-mock-up-template-craft-display-your-146982816.jpg'}
                      alt={place.name}
                    />
                    <Rating size='small' name="read-only" value={Number(place.rating)} readOnly> </Rating>
                  </Paper>
                )
              }
            </div>
          ))}
        </GoogleMapReact>
    </div>
  );
};

export default Map;