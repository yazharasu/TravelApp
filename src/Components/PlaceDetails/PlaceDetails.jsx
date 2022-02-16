import React, {useEffect} from 'react'
import useStyles from './styles';
import { Box, Typography, Button, Card, CardMedia, CardContent, CardActions, Chip} from "@material-ui/core";
import LocationOnIcon from '@material-ui/icons/LocationOn';
import PhoneIcon from '@material-ui/icons/Phone';
import Rating from '@material-ui/lab/Rating';

const PlaceDetails = ( {place, selected, refProp} ) => {
  const classes = useStyles();
    
  if (selected) refProp?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
  return (
    <Card elevation={6}>
      <CardMedia
          style= { {height:180} }
          image={ place.photo ? place.photo.images.large.url : '../Assets/restaurant_img.jpg'}
          title = { place.name }
      />

      <CardContent>
        <Typography gutterBottom varient='h6'>{place.name}</Typography>
        <Box display='flex' justifyContent='space-between'>
          <Rating value={Number(place.rating)} readOnly />
          <Typography gutterBottom variant='subtitle2'>out of {place.num_reviews} reviews</Typography>
        </Box>

        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle2'>Price</Typography>
          <Typography gutterBottom variant='subtitle2'>{place.price_level}</Typography>
        </Box>
        <Box display='flex' justifyContent='space-between'>
          <Typography variant='subtitle2'>Ranking</Typography>
          <Typography gutterBottom variant='subtitle2'>{place.ranking}</Typography>
        </Box>

        {place?.cuisine?.map( ( {name} ) => (
          <Chip key={name} size='small' label={name} className={classes.chip}></Chip>
        ) )}

        {place?.address && ( 
          <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
            <LocationOnIcon /> {place.address}
          </Typography>
        ) }

        {place?.phone && ( 
          <Typography gutterBottom variant='body2' color='textSecondary' className={classes.subtitle}>
            <PhoneIcon /> {place.phone}
          </Typography>
        ) }

        <CardActions>
          <Button size='small' color='primary' onClick={ () => window.open( place.web_url, '_blank') }>
            Trip Advisor
          </Button>
          <Button size='small' color='primary' onClick={ () => window.open( place.website, '_blank') }>
            Website
          </Button>
        </CardActions>

      </CardContent> 
    </Card>
    
    
  )
}

export default PlaceDetails;