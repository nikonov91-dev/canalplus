import * as React from 'react';
import { Button, Alert, Snackbar } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../common/hooks';
import { toggleSnackbar } from '../slices/snackReducer';

export default function PositionedSnackbar() {
  const state = useAppSelector(({ snackReducer }) => snackReducer.value);
  const dispatch = useAppDispatch();
  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={state}
        onClose={() => dispatch(toggleSnackbar(false))}
        message="JSON-Server connection error"
      >
        <Alert onClose={() => dispatch(toggleSnackbar(false))} severity="error" sx={{ width: '100%' }}>
          Cannot connect to JSON-Server. Please launch it locally with "npm run jserver".
        </Alert>
      </Snackbar>
    </div>
  );
}
