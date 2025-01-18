import { ErrorMessage, Field, Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsChevronRight, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { MARGIN_DEFAULT_FILTER_FIELDS, USER_MODAL_FIELDS } from "../../../common/types/constants/FormikConstants";
import Select from "react-select";
import {
  customMonthSelectStyles,
  marginDefaultSelectCss,
} from "../../../common/types/constants/CommonCustomeStyleObject";
import { useMemo } from "react";
import {
  months,
  years,
} from "../../../common/types/constants/CustomDatePickerOptions";
import React from 'react';

const UserModal = (props: any) => {
    const { action, setAction, stateChange, modalTitle } = props;

    const {
      USER_NAME: {
        fieldTitle: usernameFieldTitle,
        objectTitle: usernameObjectTitle,
        placeholder: usernamePlaceholder,
      },
      FIRST_NAME: {
        fieldTitle: firstNameFieldTitle,
        objectTitle: firstNameObjectTitle,
        placeholder: firstNamePlaceholder,
      },
      LAST_NAME: {
        fieldTitle: lastNameFieldTitle,
        objectTitle: lastNameObjectTitle,
        placeholder: lastNamePlaceholder,
      },
      EMAIL: {
        fieldTitle: emailFieldTitle,
        objectTitle: emailObjectTitle,
        placeholder: emailPlaceholder,
      }
    } = USER_MODAL_FIELDS;
  
    const handleClose = () => {
      setAction(undefined);
    };
  
    return (
      <Modal show={action ? true : false} size="lg" onHide={handleClose}>
        <Modal.Header className="default-filter__header" closeButton>
          <Modal.Title style={{ fontSize: "16px", fontWeight: "bold" }}>
            {modalTitle}{" "}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
          <Formik
        initialValues={action.user}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ handleChange, handleSubmit, values }) => (
          <Form className="p-4" onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{usernameFieldTitle}</Form.Label>
                  <Form.Control name={usernameObjectTitle} placeholder={usernamePlaceholder} onChange={handleChange} value={values[usernameObjectTitle]}/>
                  <ErrorMessage
                        name={usernameObjectTitle}
                        component="div"
                        className="text-danger"
                      />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{firstNameFieldTitle}</Form.Label>
                  <Form.Control name={firstNameObjectTitle} placeholder={firstNamePlaceholder} onChange={handleChange} value={values[firstNameObjectTitle]} />
                  <ErrorMessage
                        name={usernameObjectTitle}
                        component="div"
                        className="text-danger"
                      />
                </Form.Group>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{lastNameFieldTitle}</Form.Label>
                  <Form.Control name={lastNameObjectTitle} placeholder={lastNamePlaceholder} onChange={handleChange} value={values[lastNameObjectTitle]} />
                  <ErrorMessage
                        name={lastNameObjectTitle}
                        component="div"
                        className="text-danger"
                      />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>{emailFieldTitle}</Form.Label>
                  <Form.Control name={emailObjectTitle} placeholder={emailPlaceholder} onChange={handleChange} value={values[emailObjectTitle]} />
                  <ErrorMessage
                        name={emailObjectTitle}
                        component="div"
                        className="text-danger"
                      />
                </Form.Group>
              </Col>
            </Row>
  
            <Row className="mb-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Generator Master Grouping</Form.Label>
                  <Form.Select name="generator" onChange={handleChange} value={values.generator}>
                    <option>Select</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>Account</Form.Label>
                  <Form.Select name="account" onChange={handleChange} value={values.account}>
                    <option>Select</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
  
            <Button type="submit" variant="warning" className="w-100">Apply</Button>
          </Form>
        )}
      </Formik>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

export default UserModal