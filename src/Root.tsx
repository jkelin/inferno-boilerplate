import { Component, SFC } from "inferno";
import { Provider, connect } from 'inferno-redux';
import { createStore } from "redux";
import { Dispatch } from "./store";
import AwsumForm from "./AwsumForm";

const FailingButton = () => <button onClick={() => (undefined as any).x.y.z}>Throw error!</button>;
const ReduxButton = connect(
  null,
  (dispatch: Dispatch) => ({ action: () => dispatch({ type: 'CHANGE_NAME', payload: { name: 'test' } }) })
)(
  (props: { action: () => any }) => <button onClick={props.action}>Redux!</button>
) as any;

export const Root: SFC<{ store: any }> = (props) => (
  <Provider store={props.store}>
    <div class="hello">
      hello world
      <br/>
      <FailingButton />
      <ReduxButton />
      <AwsumForm />
    </div>
  </Provider>
);
