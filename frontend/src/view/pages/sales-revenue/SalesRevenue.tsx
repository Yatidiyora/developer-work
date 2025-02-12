import * as am5 from "@amcharts/amcharts5";
import React, { useEffect, useState } from "react";
import { Button, Col, Row, Form } from "react-bootstrap";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import { ErrorMessage, Field, Formik, Form as FormikForm } from "formik";
import * as Yup from "yup";
import { DefaultCustomSelect } from "../../../common/common-components/ReactSelectComponent";
import {
  CommonDatePicker,
  CustomDatePicker,
} from "../../../common/common-components/ReactDatePicker";
import { years } from "../../../common/types/constants/CustomDatePickerOptions";
import { simpleColumnSeriesChart } from "../../common/charts/ColumnSeriesChart";
import { CHART_ROOT_TAGS } from "../../../common/types/constants/ChartRootTagsConstants";
import { ColumnSeriesProps } from "../../../common/types/interface/ChartRender.interface";
import { salesRevenueRecords } from "../../../test/test-objects/TestObjects";
import SalesRevenueApi from "../../../api/SalesRevenueApi";
import { DATE_CATEGORY_TYPE } from "../../../common/types/enum/CommonEnum";

const categoryOptions = [
  { value: "ELECTRONICS", label: "Electronics" },
  { value: "CLOTHING", label: "Clothing" },
  { value: "BEAUTY_PERSONAL_CARE", label: "Beauty Personal Care" },
  { value: "BOOKS", label: "Books" },
  { value: "FURNITURE", label: "Furniture" },
  { value: "HOME_APPLIANCES", label: "Home Appliances" },
  { value: "SPORTS_OUTDOORS", label: "Sports Outdoors" },
];

const subCategoryOptions = {
  electronics: [
    { value: "smartphones", label: "Smartphones" },
    { value: "laptops", label: "Laptops" },
  ],
  clothing: [
    { value: "men", label: "Men" },
    { value: "women", label: "Women" },
  ],
  furniture: [
    { value: "chairs", label: "Chairs" },
    { value: "tables", label: "Tables" },
  ],
};

const dateOptions = [
  { value: "year", label: "Year" },
  { value: "month", label: "Month" },
  { value: "date", label: "Date" },
  { value: "range", label: "Range" },
];

const monthOptions = [
  { value: 1, label: "January" },
  { value: 2, label: "February" },
  { value: 3, label: "March" },
  { value: 4, label: "April" },
  { value: 5, label: "May" },
  { value: 6, label: "June" },
  { value: 7, label: "July" },
  { value: 8, label: "August" },
  { value: 9, label: "September" },
  { value: 10, label: "October" },
  { value: 11, label: "November" },
  { value: 12, label: "December" },
];

const SearchSchema = Yup.object().shape({
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string(),
  dateType: Yup.string().required("Date type is required"),
  startDate: Yup.date().when("dateType", {
    is: "range",
    then: (schema) => schema.required("Start date is required"),
  }),
  endDate: Yup.date().when("dateType", {
    is: "range",
    then: (schema) => schema.required("End date is required"),
  }),
  year: Yup.number().when("dateType", {
    is: "year",
    then: (schema) => schema.required("Year is required"),
  }),
  month: Yup.number().when("dateType", {
    is: "month",
    then: (schema) => schema.required("Month is required"),
  }),
  date: Yup.date().when("dateType", {
    is: "date",
    then: (schema) => schema.required("Date is required"),
  }),
});

const SearchExpandableRow = (props) => {
  const { title, setSearchValues } = props;
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const initialValues = {
    category: "",
    subCategory: "",
    dateType: "",
    startDate: "",
    endDate: "",
    year: "",
    month: "",
    date: "2025-01-31",
    startMonth: "",
    startYear: "",
    endMonth: "",
    endYear: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setSearchValues(values);
    console.log("Form Submitted:", values);
    setSubmitting(true); // Ensure Formik knows the submission is complete
  };

  return (
    <div className={`expandable-container ${isExpanded ? "expanded" : ""}`}>
      <Row className="align-items-center">
        <Col>
          <div
            onClick={toggleExpand}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div>{title}</div>
            <button className="icon-button">
              {isExpanded ? (
                <AiOutlineUp size={20} color="#33FFEC" />
              ) : (
                <AiOutlineDown size={20} color="#33FFEC" />
              )}
            </button>
          </div>
        </Col>
      </Row>
      <div className="expandable-content">
        <div style={{ width: "100%" }}>
          <Formik
            initialValues={initialValues}
            validationSchema={SearchSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue }) => (
              <FormikForm>
                <Row>
                  <Col style={{ marginBottom: "10px" }} md={3}>
                    <Form.Group>
                      <Form.Label className="default-filter-form__label">
                        {"Category"}
                      </Form.Label>
                      <Field
                        name="category"
                        component={DefaultCustomSelect}
                        options={categoryOptions}
                        placeholder="Select Category"
                      />
                    </Form.Group>
                  </Col>
                  {values.category && (
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="default-filter-form__label">
                          {"Sub Category"}
                        </Form.Label>
                        <Field
                          name="subCategory"
                          component={DefaultCustomSelect}
                          options={subCategoryOptions[values.category]}
                          placeholder="Select Sub Category"
                        />
                      </Form.Group>
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col md={3}>
                    <Form.Group>
                      <Form.Label className="default-filter-form__label">
                        {"Select Date Search Category"}
                        <span className="astrict">*</span>
                      </Form.Label>
                      <Field
                        name="dateType"
                        component={DefaultCustomSelect}
                        options={dateOptions}
                        placeholder="Select Date Type"
                      />
                    </Form.Group>
                  </Col>
                  {values.dateType === "year" && (
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="default-filter-form__label">
                          {"Year"}
                          <span className="astrict">*</span>
                        </Form.Label>
                        <Field
                          name="year"
                          component={DefaultCustomSelect}
                          options={years}
                          placeholder="Select Year"
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {values.dateType === "month" && (
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="default-filter-form__label">
                          {"Month"}
                          <span className="astrict">*</span>
                        </Form.Label>
                        <Field
                          name="month"
                          component={DefaultCustomSelect}
                          options={monthOptions}
                          placeholder="Select Month"
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {values.dateType === "date" && (
                    <Col md={2}>
                      <Form.Group>
                        <Form.Label className="default-filter-form__label">
                          {"Date"}
                          <span className="astrict">*</span>
                        </Form.Label>
                        <Field
                          className="custom-placeholder form-control"
                          placeholder="YYYY-MM-DD"
                          name="date"
                          component={CommonDatePicker}
                        />
                      </Form.Group>
                    </Col>
                  )}
                  {values.dateType === "range" && (
                    <>
                      <Col md={2}>
                        <Form.Group>
                          <Form.Label className="default-filter-form__label">
                            {"Start Date"}
                            <span className="astrict">*</span>
                          </Form.Label>
                          <Field
                            className="custom-placeholder form-control"
                            placeholder="YYYY-MM-DD"
                            name="startDate"
                            component={CustomDatePicker}
                          />
                        </Form.Group>
                      </Col>
                      <Col md={2}>
                        <Form.Group>
                          <Form.Label className="default-filter-form__label">
                            {"End Date"}
                            <span className="astrict">*</span>
                          </Form.Label>
                          <Field
                            className="custom-placeholder form-control"
                            placeholder="YYYY-MM-DD"
                            name="endDate"
                            component={CustomDatePicker}
                          />
                        </Form.Group>
                      </Col>
                    </>
                  )}
                </Row>
                <Button
                  type="submit"
                  // disabled={isSubmitting}
                  style={{ marginTop: "30px" }}
                >
                  Search
                </Button>
              </FormikForm>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

const SalesRevenue = () => {
  const [searchValues, setSearchValues] = useState<any>();
  const [salesRevenue, setSalesRevenue] = useState<any>([]);
  console.log("salesRevenue: ", salesRevenue);

  const salesRevenueInstance = SalesRevenueApi.getSalesRevenueInstance();

  const stats = salesRevenue?.reduce(
    (acc, record) => {
      // Update revenue min and max
      acc.revenue.min = Math.min(acc.revenue.min, record.productRevenue);
      acc.revenue.max = Math.max(acc.revenue.max, record.productRevenue);

      // Update salesOrder min and max
      acc.salesOrder.min = Math.min(acc.salesOrder.min, record.salesOrder);
      acc.salesOrder.max = Math.max(acc.salesOrder.max, record.salesOrder);

      return acc;
    },
    {
      revenue: { min: Infinity, max: -Infinity }, // Initialize revenue min and max
      salesOrder: { min: Infinity, max: -Infinity }, // Initialize salesOrder min and max
    }
  );



  const seriesProps: ColumnSeriesProps[] = [
    {
      fontSize: "12px",
      gridVisible: true,
      yStroke: am5.color(0x808080),
      strokeDasharray: [4, 4],
      strokeOpacity: 0.2,
      yFill: am5.color('#535B9E'),
      min: 0,
      max: stats.revenue.max + (stats.revenue.min / 10),
      numberFormat: "'$'#",
      boundschanged: 20,
      name: "ProductRevenue",
      valueYField: "productRevenue",
      yVisible: true,
      categoryXField: "subCategoryType",
      stroke: am5.color("#535B9E"),
      fill: am5.color("#535B9E"),
      shadowBlur: 1,
      colWidth: 35,
      cornerRadiusTL: 25,
      cornerRadiusTR: 25,
      fillProps: {
        stops: [
          { color: am5.color("#535B9E"), opacity: 1 },
          { color: am5.color("#8792E9"), opacity: 1 },
          { color: am5.color("#8792E9"), opacity: 1 },
        ],
        rotation: 360,
      },
      tooltip: "Revenue: ${productRevenue}\nSales Orders: {salesOrder}",
    },
    {
      opposite: true,
      fontSize: "12px",
      gridVisible: false,
      yStroke: am5.color(0x808080),
      strokeDasharray: [4, 4],
      strokeOpacity: 0.2,
      yFill: am5.color('#FFA45F'),
      min: 0,
      max: stats.salesOrder.max + (stats.salesOrder.max / 10),
      name: "SalesOrders",
      valueYField: "salesOrder",
      yVisible: true,
      categoryXField: "subCategoryType",
      stroke: am5.color("#FFA45F"),
      fill: am5.color("#FFA45F"),
      shadowOffsetX: 2,
      shadowOffsetY: 2,
      shadowBlur: 1,
      colWidth: 35,
      cornerRadiusTL: 25,
      cornerRadiusTR: 25,
      fillProps: {
        stops: [
          { color: am5.color("#E68747"), opacity: 1 },
          { color: am5.color("#FEC9A4"), opacity: 1 },
          { color: am5.color("#FEC9A4"), opacity: 1 },
        ],
        rotation: 360,
      },
    },
  ];

  useEffect(() => {
    let root1: am5.Root;
    root1 = simpleColumnSeriesChart(
      salesRevenue,
      CHART_ROOT_TAGS.SALES_REVENUE_TAG,
      "subCategoryType",
      seriesProps
    );

    return () => {
      root1.dispose();
    };
  }, [salesRevenue]);
  useEffect(() => {
    const searchRevenue = async () => {
      const orderCategoryType = searchValues?.category;
      const subCategoryType = searchValues?.subCategory;
      const rangeValue = { categoryType: searchValues?.dateType };
      console.log('searchValues?.dateType:', searchValues?.dateType);
      console.log('Object.values(DATE_CATEGORY_TYPE):', Object.values(DATE_CATEGORY_TYPE));
      
      if (
        searchValues?.dateType &&
        Object.values(DATE_CATEGORY_TYPE).slice(0,-1).includes(searchValues?.dateType)
      ) {
        rangeValue["rangeValue"] = searchValues[searchValues?.dateType];
      } else if (searchValues?.dateType === DATE_CATEGORY_TYPE.RANGE) {
        rangeValue["rangeValue"] = [
          searchValues["startDate"],
          searchValues["endDate"],
        ];
      }
      const dateCategory = {
        ...rangeValue,
      };
      const searchObject = {
        orderCategoryType,
        subCategoryType,
        dateCategory,
      };
      const salesRevenue = await salesRevenueInstance.getSalesRevenue(JSON.stringify(searchObject));
      setSalesRevenue(salesRevenue.result);
    };
    searchValues && searchRevenue();
  }, [searchValues]);
  return (
    <div className="containt-management">
      <div className="containt-management-header">
        <SearchExpandableRow
          title={"Search Sales Revenue"}
          setSearchValues={setSearchValues}
        />
      </div>
      <div className="graph-container">
        <div
          id={CHART_ROOT_TAGS.SALES_REVENUE_TAG}
          style={{ width: "100%", height: "300px" }}
        />
      </div>
    </div>
  );
};

export default SalesRevenue;
