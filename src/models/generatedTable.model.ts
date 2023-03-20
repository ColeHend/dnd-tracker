export type tableOptions = {
    data: {
        value: Array<any>,
        keys: Array<string>
    },
    options: {
        containerClass: String,
        tableClass: String,
        containStyle: Object,
        collapsible?: {
            styleClass: Boolean,
            collapseValue: Function
        }
    },
    header: {
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
            beginValue?: undefined, 
            endValue?: undefined 
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
            beginValue?: undefined, 
            endValue?: undefined 
        }
    }
}