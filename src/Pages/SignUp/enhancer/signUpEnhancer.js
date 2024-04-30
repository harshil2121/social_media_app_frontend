import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object().shape({
    username: Yup.string()
      .max(20)
      .trim()
      .matches(/^[a-zA-Z ]/, "Please enter valid username")
      .required("Please enter username"),
    email: Yup.string()
      .trim()
      .email("The email you have entered is invalid")
      .max(60)
      .required("Please enter email"),
    password: Yup.string().min(8).max(16).required("Please enter password"),
    phone: Yup.string()
      .min(10, "Please enter a valid mobile number")
      .trim()
      .max(10, "Please enter a valid mobile number")
      .matches(/^[0-9 +]*$/, "Please enter valid mobile number")
      .required("Please enter mobile number"),
  }),
  validateOnMount: true,
  mapPropsToValues: (props) => ({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    // logo: [],
    // address_line1: "",
    // postal_code: "",
    // city: "",
    // state: "",
  }),
  handleSubmit: async (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
