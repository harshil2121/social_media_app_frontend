import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    description: Yup.string(),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    description: "",
    files: [],
  }),
  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
