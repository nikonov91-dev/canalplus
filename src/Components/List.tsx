import React, { useEffect } from 'react';
import moment from 'moment';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { fetchList } from '../slices/apiReducer';
import { MovieData } from '../common/types';

import { Grid, Typography, List, ListItem, Card, CardMedia, CardContent, Box, Rating } from '@mui/material';

const no_movie_poster = 'https://www.prokerala.com/movies/assets/img/no-poster-available.jpg';

export default function MovieList() {
  const dispatch = useAppDispatch();
  const { list, isFetching: isListFetching } = useAppSelector(({ apiReducer }) => apiReducer);
  useEffect(() => {
    dispatch(fetchList());
  }, [dispatch]);
  const formatDate = (d: string): string => moment(d, 'YYYY-MM-DD').format('YYYY');
  return (
    <Grid
      container
      justifyContent="center"
      sx={{ mt: '10px' }}
    >
      <List sx={{ width: '100%', maxWidth: '800px', bgcolor: 'background.paper' }}>
        {list.length ? (
          list.map((e: MovieData, i: number) => (
            <ListItem>
              <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  sx={{ width: '200px' }}
                  image={e.poster_path || no_movie_poster}
                  alt={e.title}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent
                    sx={{ display: 'flex', flex: '1 0 auto', flexDirection: 'column', justifyContent: 'space-between' }}
                  >
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography gutterBottom variant="h5" component="div" children={e.title} />
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        children={`Original title: ${e.original_title}`}
                      />
                      <Typography variant="body2" color="text.secondary" children={e.overview} />
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        children={`Released: ${formatDate(e.release_date)}`}
                      />
                      <Rating name="read-only" value={e.vote_average / 2} readOnly />
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </ListItem>
          ))
        ) : (
          <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary" children={`The list of Movies is empty`} />
              </CardContent>
            </Card>
          </ListItem>
        )}
      </List>
    </Grid>
  );
}
