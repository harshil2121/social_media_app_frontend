import { withFormik } from "formik";
import * as Yup from "yup";

const formikEnhancer = withFormik({
  validationSchema: Yup.object({
    currentPassword: Yup.string().required("Please Enter Current Password"),
    newPassword: Yup.string().required("Please Enter New Password"),
    confirmPassword: Yup.string()
      .required("Please Re-Enter New Password")
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match"),
  }),

  validateOnMount: true,
  mapPropsToValues: (props) => ({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  }),

  handleSubmit: (values) => {},
  displayName: "CustomValidationForm",
  enableReinitialize: true,
});

export default formikEnhancer;
