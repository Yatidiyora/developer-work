import { FieldProps, FormikProps } from "formik";
import React from "react";
import { FaCaretDown } from "react-icons/fa";
import Select, { components, DropdownIndicatorProps, GroupBase } from "react-select";
import { OptionType } from "../types/interface/Common.interface";
import { customSelectStyles, marginDefaultSelectCss } from "../types/constants/CommonCustomeStyleObject";

const DefaultCustomSelect = ({
  field,
  form,
  options,
  placeholder,
}: {
  field: FieldProps["field"];
  form: FormikProps<any>;
  options: OptionType[];
  placeholder?: string;
}) => {
  const defaultOption = options?.find((option) => option.value === field.value);
  const error = form.errors[field.name];
  const touched = form.touched[field.name];
  const isError = error && touched;
  return (
    <Select
      options={options}
      value={defaultOption ?? undefined} // Ensures controlled component behavior
      onChange={(option) =>
        form.setFieldValue(field.name, option ? option.value : "")
      }
      onBlur={() => form.setFieldTouched(field.name, true)}
      placeholder={placeholder || "Select..."}
      styles={{
        ...marginDefaultSelectCss,
        control: (base) => ({
          ...base,
          borderColor: isError ? "red" : base.borderColor, // Apply red border on error
          "&:hover": { borderColor: isError ? "red" : "1px solid #ccc" }, // Red border on hover if error exists
          border: "1px solid #ccc", // Default border color
          boxShadow: "none", // Remove the box shadow when focused or hovered
          padding: "0",
          backgroundColor: "#F5F5F5",
          transition: "all 0.3s ease",
        }),
      }}
    />
  );
};

const DefaultSelect = ({
  setSelectedOption,
  defaultOption,
  options,
  placeholder,
}: {
  setSelectedOption: (value: any) => {};
  defaultOption: OptionType;
  options: OptionType[];
  placeholder?: string;
}) => {
  return (
    <Select
      options={options}
      value={defaultOption ?? undefined} // Ensures controlled component behavior
      onChange={(option) =>
        setSelectedOption(option)
      }
      // onBlur={() => form.setFieldTouched(field.name, true)}
      placeholder={placeholder || "Select..."}
      styles={customSelectStyles}
    />
  );
}

const DropdownIndicator = (props: DropdownIndicatorProps<{
  value: string;
  label: string;
}, false, GroupBase<OptionType>>) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaCaretDown style={{ color: "black", fontSize: "16px", paddingRight: '2px', paddingTop: '5px' }} size={16}/>
    </components.DropdownIndicator>
  );
};

export { DefaultCustomSelect, DefaultSelect, DropdownIndicator };

