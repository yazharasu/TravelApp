import react, { useEffect, useState } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'
import Header from './Components/Header/Header';
import List from './Components/List/List';
import Map from './Components/Map/Map';
import PlaceDetails from './Components/PlaceDetails/PlaceDetails';
import { getPlacesData } from './api';

function App() {

  const [places, setPlaces] = useState( [ ] );
  const [coordinates, setCoordinates] = useState({ });
  const [bounds, setBounds] = useState( {} );
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState(0);
  const [childClicked, setChildClicked] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sortby, setSortby] = useState('sort-by-popularity');
  const [filteredPlaces, setFilteredPlaces] = useState( [] );

  useEffect( () => {
    navigator.geolocation.getCurrentPosition( ({ coords: {latitude, longitude} })  => {
      setCoordinates( { lat: latitude, lng: longitude }); 
    })
  }, [])

  useEffect( () => {
      setIsLoading(true);
      getPlacesData(type, bounds.sw, bounds.ne )
        .then( (data) => {
          setPlaces( data?.filter( (place) => place.name && place.num_reviews >0 )); 
          setIsLoading(false);
          console.log(places)
        })
      
    }, [coordinates, bounds, type]
  );

  useEffect( () => {
    const filtered_places = (rating !== 0) ? places?.filter( single_place => Number(single_place.rating) >= rating)  : places;
    setFilteredPlaces(filtered_places);
    setChildClicked('');
  }, [places, rating])

  useEffect(() => {
    (sortby === 'sort-by-popularity') ? places?.sort( (a, b) => Number(a.num_reviews) - Number(b.num_reviews) ).reverse() 
      : places?.sort( (a, b) => Number(a.rating) - Number(b.rating) ).reverse();
      setChildClicked('');
    }, [places, sortby]
  );

    return (
      <>
        <CssBaseline />
        <Header setCoordinates={setCoordinates} />
        <Grid container spacing={3} style={ { width: '100%' } }>
            <Grid item  xs={12} md={4} >
              <List places={filteredPlaces}
                    type={type}
                    setType={setType}
                    rating = {rating}
                    setRating = {setRating}
                    childClicked = {childClicked}
                    isLoading={ isLoading }
                    sortby ={ sortby } 
                    setSortby ={setSortby}
              />  
            </Grid> 
            <Grid item xs={12} md={8} >
              <Map setCoordinates = {setCoordinates}
                    setBounds={setBounds}
                    coordinates ={coordinates}
                    places= {filteredPlaces}
                    setChildClicked = {setChildClicked}
              />
            </Grid>
        </Grid> 
      </>
    )
}

export default App;
