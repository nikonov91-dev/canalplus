import { PayloadAction, SerializedError } from '@reduxjs/toolkit';


export type CommonState = {
    isFetching: boolean;
    error: SerializedError | null;
  };
  
  export const isFetching = <T extends CommonState>(state: T) => {
    state.isFetching = true;
    state.error = null;
  };

  export const error = <T>(
    state: CommonState,
    action: PayloadAction<
      unknown,
      string,
      { arg: T; requestId: string; aborted: boolean; condition: boolean },
      SerializedError
    >
  ) => {
    state.isFetching = false;
    state.error = action.error;
  };