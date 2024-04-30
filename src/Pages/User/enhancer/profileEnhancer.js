import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string().trim().max(60).required("Please enter username"),
    email: Yup.string()
      .trim()
      .email("The email you have entered is invalid")
      .max(60)
      .required("Please enter email"),
    phone: Yup.string()
      .trim()
      .min(10)
      .max(10)
      .required("Please enter phone number"),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    username: "",
    email: "",
    phone: "",
    logo: null,
    status: "",
  }),
  handleSubmit: () => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
