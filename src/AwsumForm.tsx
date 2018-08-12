import { Component, ComponentClass } from 'inferno';
import Field from 'redux-form/lib/Field';
import { InjectedFormProps, reduxForm } from 'redux-form';

class AwsumForm extends Component<InjectedFormProps, { tb?: string }> {
  render() {
    const MyField = Field as any;

    return (
      <form onSubmit={this.props.handleSubmit as any}>
        hello worldsssss
        <MyField component="input" type="text" name="tb" />
        <button type="submit">Submit!</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'contact',
  onSubmit: (data: any) => console.warn(data)
})(AwsumForm as any) as any;
