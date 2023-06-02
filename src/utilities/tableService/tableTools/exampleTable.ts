import props from "./tableService.model";
export const exampleOptions:props = {
    data: {
      value: [],
      keys: [],
    },
    state: {
      tableData: [],
      setTableData: () => {},
    },
    options: {
      containerClass: "default-table-container",
      tableClass: "default-table",
      containStyle: { 
        width: '30vw',
      }
    },
    header: {
      styleClass: "default-header",
      cell: {
        value: [],
        style: {
          class: "default-header-cell",
          sx: {}
        },
      },
      row: {
        style: {
          class: "default-header-row",
          sx: {}
        },
      },
    },
    body: {
      cell: {
        style: {
          class: "default-body-cell",
          sx: {}
        },
      },
      row: {
        style: {
          class: "default-body-row",
          sx: {}
        },
      },
    },
  };