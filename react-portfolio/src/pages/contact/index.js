import React, { useState } from "react";
import emailjs from "emailjs-com";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const ContactUs = () => {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs.sendForm('service_m9nd8qd', 'template_qs7jvgn', e.target, '9ZoS0emdIOVmjNYXs')
      .then((result) => {
        console.log(result.text);
        setSuccessMessage('Email sent successfully!');
        setErrorMessage('');
      })
      .catch((error) => {
        console.error(error.text);
        setErrorMessage('Failed to send email.');
        setSuccessMessage('');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <HelmetProvider>
      <h1>Vasudeva rao</h1>
      <Container>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{meta.title} | Contact</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>
        <Row className="sec_sp">
          <Col lg="12"></Col>
          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:vasudevsanchapu@gmail.com`}>vasudevsanchapu@gmail.com</a>
              <br />
              <br />
              {contactConfig.hasOwnProperty("YOUR_FONE") && (
                <p>
                  <strong>Phone:</strong> {contactConfig.YOUR_FONE}
                </p>
              )}
            </address>
            <p>{contactConfig.description}</p>
          </Col>
          <Col lg="7" className="d-flex align-items-center">
            <form onSubmit={sendEmail} className="contact__form w-100">
              <Row>
                <Col lg="6" className="form-group">
                  <label>
                    Email:
                    <input
                      className="form-control"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </label>
                </Col>
                <Col lg="6" className="form-group">
                  <label>
                    Name:
                    <input
                      className="form-control rounded-0"
                      id="email"
                      type="text"
                      name="subject"
                      placeholder="Name"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      required
                    />
                  </label>
                </Col>
              </Row>
              <label>
                Message:
                <textarea
                  className="form-control rounded-0"
                  id="message"
                  name="message"
                  placeholder="Message"
                  rows="5"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </label>
              <br />
              <Row>
                <Col lg="12" className="form-group">
                  <button className="btn ac_btn" type="submit" disabled={loading}>
                    {loading ? "Sending..." : "Send"}
                  </button>
                </Col>
              </Row>
              {successMessage && <Alert variant="success">{successMessage}</Alert>}
              {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
            </form>
          </Col>
        </Row>
      </Container>
      <div></div>
    </HelmetProvider>
  );
};
