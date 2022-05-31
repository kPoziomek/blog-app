import { Box, Button, Typography } from '@mui/material';
import { useReducer, useEffect, useRef } from 'react';

const initialState = {
  isRunning: false,
  time: 0,
};

export const StopWatch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const ref = useRef(0);

  useEffect(() => {
    if (!state.isRunning) {
      return;
    }
    ref.current = setInterval(() => dispatch({ type: 'tick' }), 1000);

    return () => {
      clearInterval(ref.current);
      ref.current = 0;
    };
  }, [state.isRunning]);

  return (
    <Box className="container">
      <Typography variant="h6" component="h2" sx={{ mx: 2, my: 2 }}>
        StopWatch Reducer
      </Typography>
      <Typography
        id="modal-modal-description"
        component="h2"
        variant="h3"
        sx={{ mx: 2, my: 2 }}
      >
        {state.time ? state.time : '0'}
      </Typography>

      <Button
        color="secondary"
        variant="outlined"
        onClick={() => dispatch({ type: 'start' })}
      >
        Start
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        sx={{ mx: 2 }}
        onClick={() => dispatch({ type: 'stop' })}
      >
        Stop
      </Button>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => dispatch({ type: 'reset' })}
      >
        Reset
      </Button>
    </Box>
  );
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'start':
      return { ...state, isRunning: true };
    case 'stop':
      return { ...state, isRunning: false };
    case 'reset':
      return { ...state, isRunning: false, time: 0 };
    case 'tick':
      return { ...state, time: state.time + 1 };

    default:
      throw new Error();
  }
};
