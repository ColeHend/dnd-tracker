export const exampleOptions = {
    data: {
      value: [],
      keys: [],
    },
    options: {
      containerClass: "table-container",
      tableClass: "table",
      containStyle: { 
        width: 'auto'
      },
      collapsible: {
        styleClass: "collapsible-table",
        collapseValue: (row,index)=><div>{JSON.stringify(row)} {`index is ${index}`}</div>,
      },
    },
    header: {
      cell: {
        style: {
          class: "header-cell",
          sx: {}
        },
      },
      row: {
        style: {
          class: "header-row",
          sx: {}
        },
      },
    },
    body: {
      cell: {
        style: {
          class: "body-cell",
          sx: {}
        },
      },
      row: {
        style: {
          class: "body-row",
          sx: {}
        },
      },
    },
  };