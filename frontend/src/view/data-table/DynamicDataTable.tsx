import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import DataTable from 'react-data-table-component';
import { AiOutlineSearch } from 'react-icons/ai';
import { TableRequireData } from '../../common/types/interface/TableTypes';

export const DynamicDataTable: FunctionComponent<TableRequireData> = (props) => {
  const {
    columns,
    tableDataGetApi,
    filterDefaultText,
    reRender,
    downloadOption,
    subHeaderOff,
    searchWidth,
    filterTextValue,
    refreshOption,
    uniqIdentifier,
    filterTextOff,
  } = props;
  let { keyword, size, offset, columnName, colOrder } = {
    keyword: '',
    size: 10,
    offset: 0,
    columnName: '',
    colOrder: '',
  };
  if (filterTextValue) {
    const { keyword: key, size: sz, offset: os, colName: cn, colOrder: co } = filterTextValue;
    keyword = key;
    size = sz;
    offset = os;
    columnName = cn;
    colOrder = co;
  }
  const [data, setData] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [perPage, setPerPage] = useState(size ?? 10);
  const [page, setPage] = useState(offset ? offset / size + 1 : 1);
  const [filterText, setFilterText] = useState<string | null>(keyword ?? '');
  const [colName, setColName] = useState(columnName ?? '');
  const [sort, setSort] = useState(colOrder ?? '');

  const fetchUsers = async (page: number) => {
    const offset = (page - 1) * perPage;
    try {
      const response = await tableDataGetApi(
        filterText === 'null' ? null : filterText,
        perPage,
        offset,
        colName,
        sort,
      );
      setData(response.result);
      setTotalRows(response.total);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePageChange = (page: number) => {
    setPage(page);
    fetchUsers(page);
  };

  const handlePerRowsChange = async (newPerPage: number, page: number) => {
    const offset = (page - 1) * newPerPage;
    try {
      const response = await tableDataGetApi(
        filterText === 'null' ? null : filterText,
        newPerPage,
        offset,
        colName,
        sort,
      );
      setData(response.result);
      setPerPage(newPerPage);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers(page); // fetch page  of users
    }, 500);

    return () => clearTimeout(timer);
  }, [reRender, filterText, colName, sort]);

  const subHeaderComponentMemo = useMemo(() => {
    const handleChange = (value: string) => {
      setFilterText(value === '' ? null : value);
    };

    return (
      <div className="d-flex align-items-center justify-content-between data-search">
        <div className="d-flex">
          {!filterTextOff && (
            <div className="m-input-icon">
              <input
                id="search"
                type="text"
                placeholder={filterDefaultText}
                aria-label="Search Input"
                value={filterText ?? ''}
                onChange={(e) => handleChange(e.target.value)}
                style={searchWidth ? { minWidth: searchWidth } : undefined}
                className="form-control d-inline-block w-search"
              />
              <span className="m-input-icon-l">
                <AiOutlineSearch />
              </span>
            </div>
          )}
        </div>
        <div className="justify-content-end d-flex">
          {refreshOption && (
            <div>
              <button className="btn btn-primary" onClick={() => fetchUsers(page)} type="button">
                Refresh
              </button>
            </div>
          )}
          {downloadOption && (
            <div>
              {downloadOption.isDownload && (
                <button
                  type="button"
                  value="button"
                  onClick={downloadOption.download}
                  className="btn btn-primary"
                >
                  Download
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }, [filterText, page, perPage, colName, sort]);

  const handleSort = async (column: any, sortDirection: any) => {
    setColName(column.id);
    setSort(sortDirection);
  };

  const customStyles = {
    table: {
      style: {
        minHeight: '260px',
      },
    },
    rows: {
      style: {
        minHeight: '50px', // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: '1px', // override the cell padding for head cells
        paddingRight: '1px',
        background: '#f1f1f1',
        fontSize: '13px',
      },
    },
    cells: {
      style: {
        paddingLeft: '1px', // override the cell padding for data cells
        paddingRight: '1px',
        fontSize: '13px',
      },
    },
  };

  return (
    <div>
      {subHeaderOff !== undefined && subHeaderOff ? (
        <DataTable
          columns={columns}
          data={data}
          onSort={handleSort}
          keyField={uniqIdentifier ?? 'id'}
          sortServer
          pagination
          defaultSortFieldId={colName ?? undefined}
          defaultSortAsc={colOrder === 'desc' ? false : colOrder === 'asc' ? true : undefined}
          paginationPerPage={perPage}
          paginationDefaultPage={offset ? offset / size + 1 : undefined}
          paginationRowsPerPageOptions={[10, 20, 50, 100]}
          paginationServer
          paginationTotalRows={totalRows}
          persistTableHead
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          customStyles={customStyles}
        />
      ) : (
        <DataTable
          columns={columns}
          data={data}
          onSort={handleSort}
          keyField={uniqIdentifier ?? 'id'}
          sortServer
          pagination
          defaultSortFieldId={colName ?? undefined}
          defaultSortAsc={colOrder === 'desc' ? false : colOrder === 'asc' ? true : undefined}
          paginationPerPage={perPage}
          paginationRowsPerPageOptions={[10, 20, 50, 100]}
          paginationServer
          paginationDefaultPage={offset ? offset / size + 1 : undefined}
          paginationTotalRows={totalRows}
          subHeader
          subHeaderComponent={subHeaderComponentMemo}
          persistTableHead
          onChangeRowsPerPage={handlePerRowsChange}
          onChangePage={handlePageChange}
          customStyles={customStyles}
        />
      )}
    </div>
  );
};

export default {
  component: DynamicDataTable,
};
