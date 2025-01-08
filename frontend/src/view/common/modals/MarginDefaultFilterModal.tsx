import { Field, Formik } from "formik";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";
import styled from "styled-components";
import { Form, Button, Row, Col } from "react-bootstrap";
import { BsChevronRight, BsToggleOff, BsToggleOn } from "react-icons/bs";
import { BsChevronLeft } from "react-icons/bs";
import { MARGIN_DEFAULT_FILTER_FIELDS } from "../../../common/types/constants/FormikConstants";
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

const MarginDefaultFilterModal = (props: any) => {
  const { show, setShow, stateChange, modalTitle, initialValues } = props;

  const {
    DURATION_INTERVAL: {
      fieldTitle: durationFieldTitle,
      objectTitle: durationObjectTitle,
      placeholder: durationPlaceholder,
      fieldType: durationFieldType,
    },
    CUSTOM_DATE: {
      fieldTitle: customDateFieldTitle,
      objectTitle: customDateObjectTitle,
      placeholder: customDatePlaceholder,
      fieldType: customDateFieldType,
      dateFormat: customDateFormat,
    },
  } = MARGIN_DEFAULT_FILTER_FIELDS;

  const handleClose = () => {
    setShow(false);
  };

  const renderCustomHeader = useMemo(() => {
    return ({
      date,
      changeYear,
      changeMonth,
      decreaseMonth,
      increaseMonth,
      prevMonthButtonDisabled,
      nextMonthButtonDisabled,
    }: any) => (
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: "8px",
          }}
        >
          {/* Navigation Buttons */}
          <button
            onClick={decreaseMonth}
            disabled={prevMonthButtonDisabled}
            style={{
              padding: "0.25rem 0.5rem",
              marginLeft: 8,
              cursor: prevMonthButtonDisabled ? "not-allowed" : "pointer",
              background: "none",
              border: "none",
            }}
          >
            <i>
              <BsChevronLeft size={15} />
            </i>
          </button>
          <h5 style={{ color: "white", paddingTop: "7px" }}>
            {date.toLocaleString("default", { month: "long" })}{" "}
            {date.getFullYear().toString()}
          </h5>
          <button
            onClick={increaseMonth}
            disabled={nextMonthButtonDisabled}
            style={{
              padding: "0.25rem 0.5rem",
              cursor: nextMonthButtonDisabled ? "not-allowed" : "pointer",
              background: "none",
              border: "none",
            }}
          >
            <i>
              <BsChevronRight size={15} />
            </i>
          </button>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingInline: "1.5rem",
          }}
        >
          <Select
            options={months}
            value={months[date.getMonth()]}
            onChange={(option: any) => changeMonth(option?.value)}
            styles={customMonthSelectStyles}
          />

          <Select
            options={years}
            value={years.find((year) => year.value === date.getFullYear())}
            onChange={(option: any) => changeYear(option?.value)}
            styles={customMonthSelectStyles}
          />
        </div>
      </div>
    );
  }, []);

  return (
    <Modal show={show} size="lg" onHide={handleClose}>
      <Modal.Header className="default-filter__header" closeButton>
        <Modal.Title style={{ fontSize: "16px", fontWeight: "bold" }}>
          {modalTitle}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
        <Formik
      initialValues={initialValues}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {({ handleChange, handleSubmit, values }) => (
        <Form className="p-4" onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Duration/Interval</Form.Label>
                <Form.Select name="duration" onChange={handleChange} value={values.duration}>
                  <option>Select Duration</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Custom Date</Form.Label>
                <Form.Control type="date" name="date" onChange={handleChange} value={values.date} />
              </Form.Group>
            </Col>
          </Row>

          <h5>Location</h5>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group>
                <Form.Label>Global/Region</Form.Label>
                <Form.Select name="region" onChange={handleChange} value={values.region}>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Branch</Form.Label>
                <Form.Select name="branch" onChange={handleChange} value={values.branch}>
                  <option>Select Branch</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5>Account</h5>
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
            <Col md={4}>
              <Form.Group>
                <Form.Label>Street Address</Form.Label>
                <Form.Select name="address" onChange={handleChange} value={values.address}>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5>Category</h5>
          <Row className="mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>TSDF/Group</Form.Label>
                <Form.Select name="tsdfGroup" onChange={handleChange} value={values.tsdfGroup}>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>TSDF/Facility</Form.Label>
                <Form.Select name="tsdfFacility" onChange={handleChange} value={values.tsdfFacility}>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group>
                <Form.Label>Waste Type</Form.Label>
                <Form.Select name="wasteType" onChange={handleChange} value={values.wasteType}>
                  <option>Select</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <h5>Individual</h5>
          <Row className="mb-3">
            <Col md={12}>
              <Form.Group>
                <Form.Label>Team Member</Form.Label>
                <Form.Select name="teamMember" onChange={handleChange} value={values.teamMember}>
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
export default MarginDefaultFilterModal;
