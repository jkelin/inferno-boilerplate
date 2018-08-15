import { Component, ComponentClass } from 'inferno';
import { withFormik, FormikProps, Field } from 'formik';

import styles from './style/form.less';

console.warn(styles);

interface FormData {
  tb?: string;
}

class AwsumForm extends Component<FormikProps<FormData>> {
  render() {
    return (
      <form onSubmit={this.props.handleSubmit as any}>
        hello worldsssss
        <Field component="input" type="text" name="tb" />
        <button type="submit" class={styles.test} >Submit!</button>
      </form>
    );
  }
}

export default withFormik({
  handleSubmit: (data: FormData) => console.warn(data)
})(AwsumForm);
