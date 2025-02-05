import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { FaMagnifyingGlass } from "react-icons/fa6";

export const TableTemplate = ({
  columns = [],  // Ensure columns are defined
  data = [],  // Ensure data is always an array
  setSearchInput,
  showSearch = false,
  showSelectedRows = false,
  varTitle = "Table",
  handleDelete,
  isClearRows = false,
  isDataLoad = false,
  isStyleCompress = false,
  conditionalRowStyles = [],
  fromMonth,
  toMonth,
}) => {

  const [selectedRows, setSelectedRows] = useState([]);

  const handleRowSelected = (state) => {
    setSelectedRows(state.selectedRows);
  };

  useEffect(() => {
    setSelectedRows([]);
  }, [isClearRows]);

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const monthIndexes = months.reduce((acc, month, index) => {
    acc[month] = index;
    return acc;
  }, {});

  const getFilteredColumns = () => {
    const start = monthIndexes[fromMonth];
    const end = monthIndexes[toMonth];

    const orderedMonths = start <= end
      ? months.slice(start, end + 1)
      : [...months.slice(start), ...months.slice(0, end + 1)];

    return columns.filter((col) => {
      if (col.name === "Name" || col.name === "TOTAL") return true;
      return orderedMonths.includes(col.name);
    });
  };

  const filteredColumns = getFilteredColumns();

  return (
    <>
      <div className="d-grid d-lg-flex align-items-center py-2">
        <div className="col ps-2 text-uppercase">
          <h6>{varTitle}</h6>
        </div>
        {showSearch && (
          <div className="col">
            <div className="d-flex align-items-center gap-2">
              <FaMagnifyingGlass className="fs-5" />
              <input
                type="text"
                placeholder="Search here.."
                className="form-control form-control-sm rounded-5"
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
          </div>
        )}
      </div>
      {selectedRows.length > 0 && (
        <div className="py-2 d-flex justify-content-end">
          <button
            className="btn btn-danger btn-sm rounded"
            onClick={() => handleDelete(selectedRows)}
            title="Delete"
          >
            <i className="fa fa-trash" /> Delete
          </button>
        </div>
      )}
      <DataTable
        columns={filteredColumns}
        data={Array.isArray(data) ? data : []} // Ensure data is an array
        selectableRows={showSelectedRows}
        pagination
        fixedHeader
        onSelectedRowsChange={handleRowSelected}
        clearSelectedRows={isClearRows}
        direction="auto"
        fixedHeaderScrollHeight="65dvh"
        responsive
        subHeaderAlign="right"
        subHeaderWrap
        progressPending={isDataLoad}
        progressComponent={<div>Loading...</div>}
        customStyles={
          isStyleCompress
            ? {
                rows: { style: { minHeight: "20px" } },
                cells: { style: { padding: "2px 4px" } },
                headCells: { style: { padding: "2px 6px" } },
              }
            : {}
        }
        conditionalRowStyles={conditionalRowStyles}
      />
    </>
  );
};
