import { createStore, combineReducers, Store } from 'redux';
import { FormState, reducer as reduxFormReducer } from 'redux-form';

export interface Action<T> {
  type: string;
  payload?: T;
}
export type Dispatch = <T>(action: Action<T>) => Action<T>;

export interface CustomState {
  name?: string;
}

const customReducer = function (state: CustomState = {}, action: Action<any>) {
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

export interface RootState {
  custom: CustomState;
  form: FormState;
}

export type RootStore = Store<RootState, any>;

export function generateStore() {
  console.debug('Generating store');

  const rootReducer = combineReducers({
    custom: customReducer,
    form: reduxFormReducer
  });

  const store = createStore(
    rootReducer,
    process.env.NODE_ENV === 'development' && (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store as any as RootStore;
}
