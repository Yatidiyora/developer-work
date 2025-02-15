import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import DataTable, { TableStyles } from 'react-data-table-component';
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
      fetchUsers(page);
    }, 500);

    return () => clearTimeout(timer);
  }, [reRender, filterText, colName, sort]);

  const subHeaderComponentMemo = useMemo(() => {
    const handleChange = (value: string) => {
      setFilterText(value === '' ? null : value);
    };

    return (
      <div className="table-header">
        <div className="search-container">
          {!filterTextOff && (
            <div className="search-box">
              <input
                id="search"
                type="text"
                style={{
                  width: searchWidth ??'300px'
                }}
                placeholder={filterDefaultText}
                aria-label="Search Input"
                value={filterText ?? ''}
                onChange={(e) => handleChange(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">
                <AiOutlineSearch />
              </span>
            </div>
          )}
        </div>
        <div className="button-group">
          {refreshOption && (
            <button className="btn-refresh" onClick={() => fetchUsers(page)}>
              Refresh
            </button>
          )}
          {downloadOption && downloadOption.isDownload && (
            <button className="btn-download" onClick={downloadOption.download}>
              Download
            </button>
          )}
        </div>
      </div>
    );
  }, [filterText, page, perPage, colName, sort]);

  const handleSort = async (column: any, sortDirection: any) => {
    setColName(column.id);
    setSort(sortDirection);
  };

  const customStyles: TableStyles = {
    table: {
      style: {
        background: 'transparent',
        // border: '1px solid #00E5FF',
        minHeight: '200px',
        borderRadius: '8px',
      },
    },
    subHeader: {
      style: {
        display: 'flex',
        justifyContent: 'start',
        color: '#ffffff',
        backgroundColor: '#1A1A2E',
        borderTopLeftRadius: '8px',
        borderTopRightRadius: '8px',
      }
    },
    pagination: {
      style: {
        backgroundColor: '#1A1A2E',
        borderBottomLeftRadius: '8px',
        borderBottomRightRadius: '8px',
        color: '#ffffff',
      },
    },
    rows: {
      style: {
        minHeight: '50px',
        color: '#ffffff',
        backgroundColor: '#1A1A2E',
        borderBottom: '1px solid #ffffff', 
        transition: '0.3s',
        '&:hover': {
          backgroundColor: '#162447',
          // transform: 'scale(1.01)',
        },
      },
    },
    headCells: {
      style: {
        background: '#0F3460',
        color: '#00E5FF',
        fontSize: '14px',
        fontWeight: 'bold',
        textTransform: 'uppercase' as 'uppercase', // ✅ Explicitly cast to a valid type
        padding: '12px',
      },
    },
    cells: {
      style: {
        fontSize: '13px',
        padding: '10px',
        color: '#ffffff',
      },
    },
  };
  

  return (
    <div className="data-table-container">
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
        paginationTotalRows={totalRows}
        subHeader={!subHeaderOff}
        subHeaderComponent={subHeaderComponentMemo}
        persistTableHead
        onChangeRowsPerPage={handlePerRowsChange}
        onChangePage={handlePageChange}
        customStyles={customStyles}
      />
    </div>
  );
};

export default {
  component: DynamicDataTable,
};
