import { ErrorMessage, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import { Button, Col, Form, Row } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import DataTable from "react-data-table-component";
import { USER_MODAL_FIELDS } from "../../../common/types/constants/FormikConstants";
import {
  RolesByUserId,
  UserModalProps,
} from "../../../common/types/interface/UserModal.interface";
import { ACTION_TYPE } from "../../../common/types/enum/CommonEnum";
import { userRolesCustomStyles } from "../../../common/types/constants/CommonCustomeStyleObject";
import { trackPromise } from "react-promise-tracker";
import ManageRoleApi from "../../../api/ManageRoleApi";
import ManageUserApi from "../../../api/ManageUserApi";
import { Role } from "../../../common/types/interface/RoleModal.interface";

const UserModal = (props: UserModalProps) => {
  const { action, setAction, stateChange, modalTitle } = props;
  const [cleasrSelected, setCleasrSelected] = useState(false);
  const userRolesInstance = ManageRoleApi.getManageRoleInstance();
  const userInstance = ManageUserApi.getManageUserInstance();

  const [roles, setRoles] = useState<{
    availableRoles: Role[];
    assignedRoles: Role[];
  }>({
    availableRoles: [
      // {
      //   name: "Admin",
      //   id: "1",
      // },
      // {
      //   name: "Admin2",
      //   id: "2",
      // },
      // {
      //   name: "Admin3",
      //   id: "3",
      // },
      // {
      //   name: "Admin4",
      //   id: "4",
      // },
      // {
      //   name: "Admin5",
      //   id: "5",
      // },
      // {
      //   name: "Admin6",
      //   id: "6",
      // },
    ],
    assignedRoles: [],
  });

  const [selectedRoles, setSelectedRoles] = useState<Role[]>([]);

  const handleLeftChange = ({ selectedRows }: { selectedRows: Role[] }) => {
    setSelectedRoles(selectedRows);
  };

  const handleRightChange = ({ selectedRows }: { selectedRows: Role[] }) => {
    setSelectedRoles(selectedRows);
  };

  const changeRoles = (changeRoles: Role[], changeDirectionRight: boolean) => {
    const availableRoles = roles.availableRoles;
    const assignedRoles = roles.assignedRoles;
    let remainedAvailableRoles: Role[];
    let updatedAssignedRoles: Role[];
    if (changeDirectionRight) {
      remainedAvailableRoles = availableRoles.filter(
        ({ id }) => !changeRoles.map(({ id }) => id).includes(id)
      );
      updatedAssignedRoles = [...assignedRoles, ...changeRoles];
    } else {
      remainedAvailableRoles = [...availableRoles, ...changeRoles];
      updatedAssignedRoles = assignedRoles.filter(
        ({ id }) => !changeRoles.map(({ id }) => id).includes(id)
      );
    }
    setRoles({
      availableRoles: remainedAvailableRoles,
      assignedRoles: updatedAssignedRoles,
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
    },
  } = USER_MODAL_FIELDS;

  const handleClose = () => {
    setAction(undefined);
  };

  const UserAvailableRoleColumns = [
    {
      name: "Name",
      selector: (row: any) => row.name,
      wrap: true,
      sortable: false,
    },
    {
      name: "Description",
      selector: (row: any) => row.description,
      wrap: true,
      sortable: false,
    },
  ];

  const getUserRoles = async (size: number, offSet: number) => {
    return await trackPromise(userRolesInstance.getRoles(size, offSet));
  };

  const getUserById = async (id: string | undefined) => {
    return await trackPromise(userInstance.getUserById(id));
  };

  const getUser = async (allRoles: Role[]) => {
    if (action.actionType === ACTION_TYPE.EDIT && action.user.id) {
      const user = (await getUserById(action.user.id)).result;
      const userRoles = user.roles?.map(({ roleId }) => roleId);
      const availableRoles = allRoles.filter(
        ({ id }) => !userRoles.includes(id)
      );
      const assignedRoles = allRoles.filter(({ id }) => userRoles.includes(id));
      setRoles({ availableRoles, assignedRoles });
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      const allRoles = await getUserRoles(1000, 0);

      if (action.actionType === ACTION_TYPE.EDIT) {
        await getUser(allRoles.result);
      } else {
        setRoles({
          availableRoles: allRoles.result.map(({ id, name, description }) => {
            return { id, name, description };
          }),
          assignedRoles: [],
        });
      }
    };
    loadUserData();
  }, []);

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
              const user = {
                userName: values.userName,
                firstName: values.firstName,
                lastName: values.lastName,
                email: values.email,
                roleIds: roles.assignedRoles.map(({ id }) => id),
              };
              if (action.actionType === ACTION_TYPE.ADD) {
                const addUser = async () => {
                  await trackPromise(userInstance.addNewUser(JSON.stringify(user)));
                  stateChange();
                  setAction(undefined);
                };
                addUser();
              } else {
                const updateUser = async () => {
                  await trackPromise(userInstance.updateUser(action.user.id, JSON.stringify(user)));
                  setAction(undefined);
                  stateChange();
                };
                updateUser();
              }
            }}
          >
            {({ handleChange, handleSubmit, values }) => (
              <Form className="p-4" onSubmit={handleSubmit}>
                <Row className="mb-3">
                  <Col md={6}>
                    <Form.Group>
                      <Form.Label>{usernameFieldTitle}</Form.Label>
                      <Form.Control
                        className="input-field"
                        name={usernameObjectTitle}
                        placeholder={usernamePlaceholder}
                        onChange={handleChange}
                        value={values[usernameObjectTitle]}
                      />
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
                      <Form.Control
                        className="input-field"
                        name={firstNameObjectTitle}
                        placeholder={firstNamePlaceholder}
                        onChange={handleChange}
                        value={values[firstNameObjectTitle]}
                      />
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
                      <Form.Control
                        className="input-field"
                        name={lastNameObjectTitle}
                        placeholder={lastNamePlaceholder}
                        onChange={handleChange}
                        value={values[lastNameObjectTitle]}
                      />
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
                      <Form.Control
                        className="input-field"
                        name={emailObjectTitle}
                        placeholder={emailPlaceholder}
                        onChange={handleChange}
                        value={values[emailObjectTitle]}
                      />
                      <ErrorMessage
                        name={emailObjectTitle}
                        component="div"
                        className="text-danger"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={5}>
                    <Form.Group>
                      <div className="search-filter">
                        <DataTable
                          title="Available roles"
                          columns={UserAvailableRoleColumns}
                          data={roles?.availableRoles ?? []}
                          selectableRows
                          onSelectedRowsChange={handleLeftChange}
                          clearSelectedRows={cleasrSelected}
                          persistTableHead
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
                  <Col md={5}>
                    <Form.Group>
                      <div className="search-filter">
                        <DataTable
                          title="Assigned roles"
                          columns={UserAvailableRoleColumns}
                          data={roles?.assignedRoles ?? []}
                          selectableRows
                          onSelectedRowsChange={handleRightChange}
                          clearSelectedRows={cleasrSelected}
                          persistTableHead
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

export default UserModal;
