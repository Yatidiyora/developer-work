export interface ColumnTypeOne {
  name: string;
  cell: (row: any) => JSX.Element;
  selector?: (row: any) => any;
  wrap?: boolean;
  sortable?: boolean;
}
export interface ColumnTypeTwo {
  name: string;
  selector: (row: any) => any;
  wrap: boolean;
  sortable: boolean;
  button?: boolean;
  cell?: (row: any) => JSX.Element;
}

export interface TableRequireData {
  columns: (ColumnTypeOne | ColumnTypeTwo)[];
  tableDataGetApi: (
    name: string | null,
    page: number,
    rows: number,
    colName: string,
    sort: string,
  ) => Promise<any>;
  filterDefaultText: string;
  reRender: boolean;
  subHeaderOff?: boolean;
  downloadOption?: { isDownload: boolean; download: () => Promise<void> };
  refreshOption?: boolean;
  searchWidth?: string;
  filterTextValue?: {
    keyword: string;
    size: number;
    offset: number;
    colName: string;
    colOrder: string;
  };
  uniqIdentifier?: string;
  filterTextOff?: boolean;
}
export interface SingleSelectableTableRequireData {
  columns: (ColumnTypeOne | ColumnTypeTwo)[];
  tableDataGetApi: (
    name: string,
    page: number,
    rows: number,
    colName: string,
    sort: string,
  ) => Promise<any>;
  filterDefaultText: string;
  reRender: boolean;
  setSelected: any;
  searchWidth?: string;
  checkbox?: {
    titleName: string;
    defaultValue: boolean;
    setIncludeAll: (value: any) => void;
    toggleStatus: () => void;
  };
}
export interface SelectableTableRequireData {
  columns: (ColumnTypeOne | ColumnTypeTwo)[];
  tableDataGetApi: (
    name: string,
    page: number,
    rows: number,
    colName: string,
    sort: string,
  ) => Promise<any>;
  filterDefaultText: string;
  reRender: boolean;
  setSelectedRows: (value: any) => void;
  rowDisabledCriteria: (row: any) => boolean;
  searchWidth?: string;
  subHeaderOff?: boolean;
  subHeaderOption?: {
    searchText: boolean;
    isDownload: boolean;
    isDelete: boolean;
    deleteBtnName?: string;
    deleteModalHeading?: string;
    deleteModalMessage?: string;
  };
  actionOption?: {
    deleteMethod: () => Promise<void> | undefined;
    downloadMethod?: Promise<void> | undefined;
  };
  uniqIdentifier?: string;
}
