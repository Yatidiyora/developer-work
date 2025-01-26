import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const CustomerDetailsComponent = (props: any) => {
  const { customerDetails } = props;
  return (
    <div>
      {/* Page Header */}
      <div className="details-container">
        <Row>
          <Col className="row-title">Customer Name</Col>
          <Col className="row-value">Yati Diyora</Col>
          <Col className="row-title">User Name</Col>
          <Col className="row-value">ydiyora</Col>
        </Row>
        <Row>
          <Col className="row-title">Email Address</Col>
          <Col className="row-value">yatidiyora13@gmail.com</Col>
          <Col className="row-title">First Name</Col>
          <Col className="row-value">Yati</Col>
        </Row>
        <Row>
          <Col className="row-title">Last Name</Col>
          <Col className="row-value">Diyora</Col>
          <Col className="row-title">Contact Type</Col>
          <Col className="row-value">Mobile Number</Col>
        </Row>
        <Row>
          <Col className="row-title">Mobile Number</Col>
          <Col className="row-value">123456789</Col>
          <Col className="row-title">Last Active Date</Col>
          <Col className="row-value">2024-12-09</Col>
        </Row>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
