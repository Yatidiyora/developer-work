import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import {
  ROLE_MODAL_FIELDS,
  USER_MODAL_FIELDS,
} from "../../../common/types/constants/FormikConstants";
import { ACTION_TYPE } from "../../../common/types/enum/CommonEnum";
import { userRolesCustomStyles } from "../../../common/types/constants/CommonCustomeStyleObject";
import { trackPromise } from "react-promise-tracker";
import ManageRoleApi from "../../../api/ManageRoleApi";
import ManageUserApi from "../../../api/ManageUserApi";
import {
  PermissionsType,
  Role,
  RoleModalProps,
  RolePermissions,
  RolePermissionsResponse,
  TogglerType,
} from "../../../common/types/interface/RoleModal.interface";
import RolePermissionToggleColumns from "../../pages/admin-settings/roles/RolePermissionToggleColumns";
import PermissionsApi from "../../../api/PermissionsApi";

const RoleModal = (props: RoleModalProps) => {
  const { action, setAction, stateChange, modalTitle } = props;
  const [cleasrSelected, setCleasrSelected] = useState(false);
  const [toggler, setToggler] = useState<TogglerType>({
    availablePermissions: {},
    assignedPermissions: {},
  });
  const userRolesInstance = ManageRoleApi.getManageRoleInstance();
  const userInstance = ManageUserApi.getManageUserInstance();
  const permissionInstance = PermissionsApi.getInstance();

  const [selectedRoles, setSelectedRoles] = useState<RolePermissions[]>([]);

  const handleLeftChange = ({
    selectedRows,
  }: {
    selectedRows: any[];
  }) => {
    setSelectedRoles(selectedRows);
  };

  const handleRightChange = ({
    selectedRows,
  }: {
    selectedRows: any[];
  }) => {
    setSelectedRoles(selectedRows);
  };

  const changeRoles = (
    changePermissions: RolePermissions[],
    changeDirectionRight: boolean
  ) => {
    let availablePermissions = { ...toggler.availablePermissions };
    let assignedPermissions = { ...toggler.assignedPermissions };
    if (changeDirectionRight) {
      changePermissions
        .map(({ id }) => id)
        .forEach((key) => {
          delete availablePermissions[key]; // Delete the key from the copied object
        });
      changePermissions.map((perm) => {
        assignedPermissions = {
          ...assignedPermissions,
          [perm.id]: {
            name: perm.name,
            view: perm.view,
            edit: perm.edit,
            delete: perm.delete,
          },
        };
      });
    } else {
      changePermissions.map((perm) => {
        availablePermissions = {
          ...availablePermissions,
          [perm.id]: {
            name: perm.name,
            view: perm.view,
            edit: perm.edit,
            delete: perm.delete,
          },
        };
      });
      changePermissions
        .map(({ id }) => id)
        .forEach((key) => {
          delete assignedPermissions[key]; // Delete the key from the copied object
        });
    }
    setToggler({
      availablePermissions,
      assignedPermissions,
    });
  };

  const handleClickTransferRightRoles = () => {
    changeRoles(selectedRoles, true);
    setCleasrSelected(!cleasrSelected);
  };
  const handleClickTransferLeftRoles = () => {
    changeRoles(selectedRoles, false);
    setCleasrSelected(!cleasrSelected);
  };

  const {
    ROLE_NAME: {
      fieldTitle: rolenameFieldTitle,
      objectTitle: rolenameObjectTitle,
      placeholder: rolenamePlaceholder,
    },
  } = ROLE_MODAL_FIELDS;

  const handleClose = () => {
    setAction(undefined);
  };

  const availableColumn = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      wrap: true,
      sortable: false,
    },
  ];

  const assignedColumns = RolePermissionToggleColumns({ setToggler });

  const getUserRoles = async (size: number, offSet: number) => {
    return await trackPromise(userRolesInstance.getRoles(size, offSet));
  };

  const getUserById = async (id: string | undefined) => {
    return await trackPromise(userInstance.getUserById(id));
  };

  const defaultPermissions = async () => {
    const allPermissions: RolePermissionsResponse = await trackPromise(
      permissionInstance.getAllRolePermissions()
    );
    return allPermissions;
  };
  const getRole = async (allPermissions: RolePermissions[]) => {
    if (action.actionType === ACTION_TYPE.EDIT && action.role.id) {
      const role = await trackPromise(
        userRolesInstance.getRoleById(action.role.id)
      );
      console.log("role: ", role);

      const rolePermissionsIds = role.result.permissions
        ? role.result.permissions?.map((row) =>
            row.permissionId ? row.permissionId : ""
          )
        : [];
      const rolePermissions = role.result.permissions ?? [];
      let availablePermissions: PermissionsType = {};
      allPermissions.forEach((perm) => {
        if (!rolePermissionsIds.includes(perm.id)) {
          availablePermissions = {
            ...availablePermissions,
            [perm.id]: {
              name: perm.name,
              view: false,
              edit: false,
              delete: false,
            },
          };
        }
      });
      let assignedPermissions: PermissionsType = {};
      rolePermissions.forEach((perm) => {
        assignedPermissions = {
          ...assignedPermissions,
          [perm.permissionId]: {
            name: perm.permissionName,
            view: perm.view,
            edit: perm.edit,
            delete: perm.delete,
          },
        };
      });
      setToggler({ availablePermissions, assignedPermissions });
    }
  };

  useEffect(() => {
    const getDetails = async () => {
      const defaultRolePerm = await defaultPermissions();
      if (action.role.id) {
        getRole(defaultRolePerm.result);
      } else {
        let availablePermissions: PermissionsType = {};
        defaultRolePerm.result.forEach((perm) => {
          availablePermissions = {
            ...availablePermissions,
            [perm.id]: {
              name: perm.permissionName,
              view: false,
              edit: false,
              delete: false,
            },
          };
        });
        setToggler({
          availablePermissions,
          assignedPermissions: {},
        });
      }
    };
    getDetails();
  }, []);

  return (
    <Modal className="role-modal" show={action ? true : false} size="lg" onHide={handleClose}>
      <Modal.Header className="default-filter__header" closeButton>
        <Modal.Title style={{ fontSize: "16px", fontWeight: "bold" }}>
          {modalTitle}{" "}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <Formik
            initialValues={action.role}
            onSubmit={(values) => {
              console.log(values);
              const permissions = Object.entries(toggler.assignedPermissions).map(([key, value]) => {return {
                roleId: action.role.id,
                permissionName: value.name,
                permissionId: key,
                view: value.view || false,
                edit: value.edit || false,
                delete: value.delete || false,
              }});
              const role = {
                name: values[rolenameObjectTitle],
                permissions,
              };
              if (action.actionType === ACTION_TYPE.ADD) {
                const addRole = async () => {
                  await trackPromise(
                    userRolesInstance.addNewRole(JSON.stringify(role))
                  );
                  stateChange();
                  setAction(undefined);
                };
                addRole();
              } else {
                const updateUser = async () => {
                  await trackPromise(
                    userRolesInstance.updateRole(
                      action.role.id,
                      JSON.stringify(role)
                    )
                  );
                  setAction(undefined);
                  stateChange();
                };
                updateUser();
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form className="p-4" onSubmit={handleSubmit}>
                <Row className="mb-3 align-items-center">
                  {/* Label */}
                  <Col md={2}>
                    <Form.Label>{rolenameFieldTitle}</Form.Label>
                  </Col>
                  {/* Input Field */}
                  <Col md={5}>
                    <Form.Control
                      className="input-field"
                      name={rolenameObjectTitle}
                      placeholder={rolenamePlaceholder}
                      onChange={handleChange}
                      value={values[rolenameObjectTitle]}
                    />
                    <ErrorMessage
                      name={rolenameObjectTitle}
                      component="div"
                      className="text-danger"
                    />
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col lg={5}>
                    <Form.Group>
                      <div className="search-filter">
                        <DataTable
                          title="Available Permissions"
                          columns={availableColumn}
                          data={Object.entries(toggler.availablePermissions).map(([key, value]) => {
                            return {
                              id: key,
                              ...value,
                            };
                          })}
                          selectableRows
                          onSelectedRowsChange={handleLeftChange}
                          clearSelectedRows={cleasrSelected}
                          // persistTableHead
                          customStyles={userRolesCustomStyles}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={1}>
                    <Form.Group style={{ height: "100%", marginTop: "300%" }}>
                      <div>
                        <div className="my-3 ">
                          <button
                            style={{ background: "#E0E0E0" }}
                            type="button"
                            onClick={handleClickTransferRightRoles}
                            className="btn btn-light"
                          >
                            <i>
                              <GoChevronRight />
                            </i>
                          </button>
                        </div>
                        <div className="my-3">
                          <button
                            style={{ background: "#E0E0E0" }}
                            type="button"
                            onClick={handleClickTransferLeftRoles}
                            className="btn btn-light"
                          >
                            <i>
                              <GoChevronLeft />
                            </i>
                          </button>
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group>
                      <div className="search-filter">
                        <DataTable
                          title="Assigned Permissions"
                          columns={assignedColumns}
                          data={Object.entries(toggler.assignedPermissions).map(([key, value]) => {
                            return {
                              id: key,
                              ...value,
                            };
                          })}
                          selectableRows
                          onSelectedRowsChange={handleRightChange}
                          clearSelectedRows={cleasrSelected}
                          // persistTableHead
                          customStyles={userRolesCustomStyles}
                        />
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button className="action-button" type="submit">
                    {action?.actionType === ACTION_TYPE.EDIT ? "Apply" : "Save"}
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RoleModal;
