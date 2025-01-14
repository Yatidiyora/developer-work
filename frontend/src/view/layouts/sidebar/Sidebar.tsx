import { Link } from "react-router-dom";
import {
  SidebarConfig,
  SidebarType,
} from "../../../common/types/interface/Layouts.interface";
import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import React from "react";

const Sidebar = ({
  collapse,
  setCollapse,
  config,
  openDropdowns,
  toggleDropdown,
}: SidebarType) => {
  const initialRenderPath =
    "/" + window.location.pathname.split("/").filter((path) => path)[0];

  const [activePath, setActivePath] = useState(initialRenderPath ?? "");
  console.log(activePath);
  const renderMenuItem = (item: SidebarConfig) => {
    if (item.children) {
      const isOpen = openDropdowns[item.label] || false;
      return (
        <li className="sidebar-item" key={item.label}>
          <a
            className="sidebar-link__box"
            onClick={(e) => {
              e.preventDefault();
              toggleDropdown(item.label);
              if (item.onClick) item.onClick();
            }}
          >
            <div style={{ display: "flex", flexDirection: "row" }}>
              {item.icon && (
                <i style={{ paddingRight: "10px" }}>
                  <item.icon />
                </i>
              )}
              <div className="link-title">{item.label}</div>
            </div>
            {!collapse && (
              <button
                style={{ background: "none", border: "none" }}
                type="button"
              >
                {" "}
                <span
                  className={`ms-2 ${
                    isOpen
                      ? "bi bi-chevron-compact-up"
                      : "bi bi-chevron-compact-down"
                  }`}
                  style={{
                    color: '#33FFEC'
                  }}
                ></span>
              </button>
            )}
          </a>
          <ul className={`sidebar-submenu ${isOpen && !collapse ? "show" : ""}`}>
            {item.children.map((child, index) => {
              const onClickFunction = child.onClick ? child.onClick : () => {};
              return (
                <div>
                  <div className="sidebar-arrow"></div>
                  <li
                    key={index}
                    className={`sidebar-subitem ${
                      activePath === child.path ? "active" : ""
                    }`}
                  >
                    <Link
                      className="sidebar-sublink"
                      to={child.path}
                      onClick={() => {
                        onClickFunction();
                        setActivePath(child.path);
                      }}
                    >
                      {child.icon && (
                        <i style={{ paddingRight: "10px" }}>
                          <child.icon />
                        </i>
                      )}
                      <div>{child.label}</div>
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </li>
      );
    }
    const onClickFunction = item.onClick ? item.onClick : () => {};

    return (
      <li className="sidebar-item" key={item.label}>
        <Link
          className={`sidebar-link ${item.path === activePath ? "active" : ""}`}
          to={item.path ?? "/"}
          onClick={() => {
            onClickFunction();
            if (item.path) {
              setActivePath(item.path);
            }
          }}
        >
          {item.icon && (
            <i style={{ paddingRight: "10px", height: "25px" }}>
              <item.icon />
            </i>
          )}{" "}
          <div className="link-title">{item.label}</div>
        </Link>
      </li>
    );
  };

  return (
    <div 
      className="sidebar" 
      style={{
        backgroundImage: "url('/images/sidebar-bg.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
      }}>
      <div
        style={{
          fontSize: "35px",
          display: "flex",
          flexDirection: "row",
          cursor: '',
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "end",
            justifyItems: "center",
            width: "100%",
            marginRight: "-10px",
          }}
        >
          <button
            type="button"
            className="sidebar_toggler"
            style={{
              paddingInline: "0px",
              paddingTop: "0px",
              paddingBottom: "0px",
              marginRight: collapse ? "-39px" : "-21px",
              background: "#00E5FF",
              ...(!collapse
                ? { borderTopLeftRadius: "6px" }
                : { borderTopRightRadius: "6px" }),
              ...(!collapse
                ? { borderBottomLeftRadius: "6px" }
                : { borderBottomRightRadius: "6px" }),
              ...(!collapse
                ? { borderLeft: "1px solid #D2D2D2", borderRight: "none" }
                : { borderLeft: "none", borderRight: "1px solid #D2D2D2" }),
              borderTop: "1px solid #D2D2D2",
              borderBottom: "1px solid #D2D2D2",
            }}
            onClick={() => {
              setCollapse(!collapse);
              // setCollapseToLocally(!collapse);
            }}
            title="Menu"
          >
            {collapse ? (
              <MdChevronRight style={{ marginTop: "-8px" }} size={18} />
            ) : (
              <MdChevronLeft style={{ marginTop: "-8px" }} size={18} />
            )}
          </button>
        </div>
      </div>
      <nav>
        <ul className="sidebar-menu">
          {config.map((item) => renderMenuItem(item))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
