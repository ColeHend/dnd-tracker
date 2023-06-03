export type tableOptions = {
    data: {
        value: Array<Object>,
        keys: Array<string>
    },
    options: {
        containerClass: String,
        tableClass: String,
        containStyle: Object,
        collapsible?: {
            styleClass: String,
            collapseValue: Function
        }
    },
    header: {
        search?: {
            style?: {
                class: String,
                sx: Object
            },
            filterFunc: Function
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