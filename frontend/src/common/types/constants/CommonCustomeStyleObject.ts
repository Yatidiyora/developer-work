import { StylesConfig } from "react-select";
import { OptionType } from "../interface/Common.interface";

export const marginDefaultSelectCss: StylesConfig<OptionType, false> = {
  control: (provided) => ({
    ...provided,
    width: "110px",
    height: "25px",
    minHeight: "20px",
    border: "1px solid #ccc", // Default border color
    boxShadow: "none", // Remove the box shadow when focused or hovered
    borderRadius: "5px",
    padding: "0",
    // backgroundColor: "#F5F5F5",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid #ccc", // Disable border change on hover
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
    // height: "25px",
    display: "flex",
    alignItems: "center",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    // display: 'none',
    // padding: "0",
    // height: "25px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    // borderRadius: "10px",
    marginTop: "5px",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#F58233"
      : state.isFocused
      ? "rgb(225 208 196)"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#000000",
    fontSize: "10px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }),
};

export const customSelectStyles: StylesConfig<OptionType, false> = {
  control: (provided, state) => ({
    ...provided,
    width: "115px",
    height: "25px",
    minHeight: "20px",
    border: "1px solid #ccc", // Default border color
    boxShadow: "none", // Remove the box shadow when focused or hovered
    borderRadius: "5px",
    padding: "0",
    backgroundColor: "rgb(249 249 249 / 50%)",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid #ccc", // Disable border change on hover
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
    height: "25px",
    display: "flex",
    alignItems: "center",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0",
    height: "25px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    marginTop: "5px",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#F58233"
      : state.isFocused
      ? "rgb(225 208 196)"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#000000",
    fontSize: "10px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }),
};

export const customMonthSelectStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    width: "75px",
    height: "25px",
    minHeight: "20px",
    border: "1px solid #ccc", // Default border color
    boxShadow: "none", // Remove the box shadow when focused or hovered
    borderRadius: "5px",
    padding: "0",
    backgroundColor: "#F5F5F5",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "1px solid #ccc", // Disable border change on hover
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0 8px",
    height: "25px",
    display: "flex",
    alignItems: "center",
  }),
  input: (provided) => ({
    ...provided,
    margin: "0",
    padding: "0",
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: "10px",
    margin: "0",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    display: "none",
    padding: "0",
    height: "25px",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "10px",
    marginTop: "5px",
    overflow: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#EC955A"
      : state.isFocused
      ? "#f0f0f0"
      : "#ffffff",
    color: state.isSelected ? "#ffffff" : "#000000",
    fontSize: "10px",
    padding: "10px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  }),
};

export const userRolesCustomStyles = {
  table: {
    style: {
      minHeight: "260px",
    },
  },
  rows: {
    style: {
      minHeight: "50px", // override the row height
      background: "#F8F9FA",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      background: "#f1f1f1",
      fontSize: "16px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
      fontSize: "16px",
    },
  },
};
