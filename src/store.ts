import { createStore, combineReducers } from "redux";
import { FormState, reducer as formReducer } from "redux-form";

export interface Action<T> {
  type: string;
  payload?: T;
}
export type Dispatch = <T>(action: Action<T>) => Action<T>;

export interface CustomState {
  name?: string;
}

const reducer = function(state: CustomState = {}, action: Action<any>) {
  switch (action.type) {
    case 'CHANGE_NAME':    
      return {
        ...state,
        name: action.payload.name
      };
    default:
      return {
        ...state,
        name: 'TOM'
      };
  }
};

interface RootState {
  custom: CustomState;
  form: FormState;
}

const rootReducer = combineReducers({
  custom: reducer,
  form: formReducer
})

export const store = createStore(
  rootReducer,
  process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);
