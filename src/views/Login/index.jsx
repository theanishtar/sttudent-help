import React, { useEffect } from "react";
import { Image, Form, Row, Col, Container, Toast } from "react-bootstrap";
import imgStudent from "../../assets/img/hero1.jpg";
import "./index.scss";
import { useLogin } from "@/hooks";

const Login = () => {
  const { handleGoogle, error } = useLogin();

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      google.accounts.id.renderButton(document.getElementById("btnLogin"), {
        type: "standard",
        theme: "filled_blue",
        size: "large",
        text: "signin_with",
        shape: "pill",
        width: "500",
      });

      // google.accounts.id.prompt()
    }
  }, [handleGoogle]);

  return (
    <div className="wrapper">
      <Container className="formLogin">
        <Row className="rowLogin">
          <Col lg={6} className="sideImg d-lg-block d-none">
            <Image className="imgLogin" src={imgStudent} alt=""></Image>
          </Col>
          <Col lg={6} className="rightSlideLogin">
            <h1>Đăng nhập</h1>
            <Form.Group className="mb-0 d-sm-flex justify-content-center ">
              {/* {error && <p style={{ color: "red" }}>{error}</p>}
                {loading ? <div>Loading....</div> : <div id="btnLogin"></div>} */}
              <div id="btnLogin"></div>
            </Form.Group>
            <small className="text-danger mt-5">
              {error && error.response.data.message}
            </small>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;
