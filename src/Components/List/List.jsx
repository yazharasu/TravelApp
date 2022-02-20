import React , { useState, useEffect,  createRef } from 'react';
import { CircularProgress, Grid, Typography, InputLabel, MenuItem, FormControl, Select} from '@material-ui/core';
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails.jsx';

const List = ( { places, type, setType, rating, setRating, childClicked, isLoading, sortby, setSortby } ) => {
  const classes = useStyles();
  const [elRef, setElref] = useState([]);
  

  useEffect(() => {
    setElref( (refs) => Array(places?.length).fill().map( (_, i) => refs[i] || createRef() ) );
  }, [places, sortby, rating, type]);

  return (
    <div className={classes.container}>
      <Typography className={classes.titletxt} varient='h3'>Hotels, Restaurants & Attractions around you..</Typography>

      {isLoading ? (
          <div className={classes.loading}>
            <CircularProgress size='3rem' />
          </div>
        ) : (
          <div>
            <FormControl className={classes.formcontrol}>
              <InputLabel>Type</InputLabel>
              <Select value={type} onChange= { (e) => setType(e.target.value) } >
                <MenuItem value='restaurants'>Restaurants</MenuItem>
                <MenuItem value='hotels'>Hotels</MenuItem>
                <MenuItem value='attractions'>Attractions</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formcontrol}>
              <InputLabel>Rating</InputLabel>
                <Select value={rating} onChange= { (e) => setRating(e.target.value)} >
                  <MenuItem value={0}>Show all</MenuItem>
                  <MenuItem value={3}>Above 3.0</MenuItem>
                  <MenuItem value={4}>Above 4.0</MenuItem>
                  <MenuItem value={4.5}>Above 4.5</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formcontrol}>
              <InputLabel>Sort by</InputLabel>
                <Select value={sortby} onChange= { (e) => setSortby(e.target.value)} >
                  <MenuItem value='sort-by-popularity'>Popularity</MenuItem>
                  <MenuItem value='sort-by-rating'>Rating</MenuItem>
                </Select>
            </FormControl>
            <Grid container spacing= {3} className= { classes.list }>
              {places?.map( (place, i) => (
                  <Grid ref={elRef[i]} key={i} item xs={12} >
                    <PlaceDetails 
                      place= {place} 
                      selected= { Number(childClicked) === i }
                      refProp ={ elRef[i] }
                    />
                  </Grid >  
                ) )
              }
            </Grid >
          </div>
      )
      }
    </div>
  )
}

export default List;