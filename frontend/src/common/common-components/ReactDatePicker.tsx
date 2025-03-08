import Select from "react-select";

import DatePicker from "react-datepicker";
import { useField, useFormikContext } from "formik";
import React from "react";
import { customMonthSelectStyles } from "../types/constants/CommonCustomeStyleObject";
import { months, years } from "../types/constants/CustomDatePickerOptions";

const RenderCustomHeader = ({
  date,
  changeYear,
  changeMonth,
}: any) => {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          paddingRight: "8px",
        }}
      >
        <h5 style={{ color: "white", paddingTop: "7px" }}>
          {date.toLocaleString("default", { month: "long" })}{" "}
          {date.getFullYear().toString()}
        </h5>
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
};

const CustomDatePicker = (object: any) => {
  const { field: fieldType, className, placeholder: dateFormat } = object;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldType.name);

  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => setFieldValue(fieldType.name, val)}
      className={className}
      renderCustomHeader={RenderCustomHeader}
      dateFormat={dateFormat}
    />
  );
};

const CommonDatePicker = (object: any) => {
  const { field: fieldType, className, placeholder: dateFormat } = object;
  const { setFieldValue } = useFormikContext();
  const [field] = useField(fieldType.name);
  console.log(field);

  return (
    <DatePicker
      {...field}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => setFieldValue(fieldType.name, val)}
      className={className}
      dateFormat={dateFormat}
    />
  );
};

export { RenderCustomHeader, CustomDatePicker, CommonDatePicker };
