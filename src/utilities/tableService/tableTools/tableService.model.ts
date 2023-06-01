export default interface props {
    data: {
        value: Array<Object>,
        keys: Array<string>
    },
    state: {
        tableData: Array<Object>,
        setTableData: any
    }
    options: {
        containerClass: String,
        tableClass: String,
        containStyle: Object,
        collapsible?: {
            styleClass?: String,
            collapseValue?: any
        }
    },
    header: {
        styleClass?: String,
        search?: {
            style?: {
                class: String,
                sx: Object
            },
            filterFunc: any
        }
        cell: {
            value: Array<String>,
            style: {
                class: String,
                sx: Object
              },
        },
        row: {
            style: {
                class: String,
                sx: Object
              },
              headerValue?: String,
            beginValue?: any, 
            endValue?: any 
        },
    },
    body: {
        cell: {
            style: {
                class: String,
                sx: Object
              },
        },
        row: {
            style: {
                class: String,
                sx: Object
              },
            beginValue?: any, 
            endValue?: any 
        }
    }
}