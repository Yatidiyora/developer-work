import React from "react";
import { Col, Row } from "react-bootstrap";

const CustomerDetailsComponent = (props: any) => {
  const { customerDetails={} } = props;
  const { customerName="", userName="", email="", firstName="",lastName="", contactType="", contactInfo="", lastActiveDate="" } = customerDetails;
  return (
    <div>
      {/* Page Header */}
      <div className="details-container">
        <Row>
          <Col className="row-title">Customer Name</Col>
          <Col className="row-value">{customerName}</Col>
          <Col className="row-title">User Name</Col>
          <Col className="row-value">{userName}</Col>
        </Row>
        <Row>
          <Col className="row-title">Email Address</Col>
          <Col className="row-value">{email}</Col>
          <Col className="row-title">First Name</Col>
          <Col className="row-value">{firstName}</Col>
        </Row>
        <Row>
          <Col className="row-title">Last Name</Col>
          <Col className="row-value">{lastName}</Col>
          <Col className="row-title">Contact Type</Col>
          <Col className="row-value">{contactType}</Col>
        </Row>
        <Row>
          <Col className="row-title">Mobile Number</Col>
          <Col className="row-value">{contactInfo}</Col>
          <Col className="row-title">Last Active Date</Col>
          <Col className="row-value">{lastActiveDate}</Col>
        </Row>
      </div>
    </div>
  );
};

export default CustomerDetailsComponent;
