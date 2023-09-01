import { Button, TextField } from "@mui/material";
import { Formik } from "formik";
import { useNavigate } from "react-router";
import * as Yup from "yup";

const Login = () => {
  const navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    userName: Yup.string().email("Invalid email").required("Required"),
  });
  return (
    <>
  
      <Formik
        initialValues={{ userName: "" }}
        validationSchema={SignupSchema}
        onSubmit={(values, { setSubmitting }) => {
          navigate("/dashboard");
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form onSubmit={handleSubmit}>
            <div className="login_container">
            <div className="main_header_text">Quiz Now</div>
              <div className="login_container_box">
                <div className="sub_header_font">
                  <h5>Login </h5>
                </div>
                <div className="login_input">
                  <TextField
                    size="small"
                    label="Email"
                    variant="outlined"
                    placeholder="Email"
                    value={values.userName}
                    name="userName"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <p className="error_text small_font">
                    {errors.userName && touched.userName && errors.userName}
                  </p>
                </div>
                <div>
                  <p className="small_font">
                    Note : This quiz will be auto submitted after 30 mins. Once
                    you login
                  </p>
                </div>
                <div className="login_button">
                  <Button variant="contained" type="submit" size="small">
                    Login
                  </Button>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default Login;
