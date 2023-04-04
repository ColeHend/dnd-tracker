// require imports are for the react table generator
// npm i @material-ui/core @mui/icons-material @mui/material @mui/styled-engine-sc sass typescript
import { exampleOptions } from "./tableTools/exampleTable";
import GeneratedTable from "./tableTools/tableService";
import config from "./tableConfig.model";
import props from "./tableTools/tableService.model";

export default class TableService {
    constructor(private tableOptions: props) {
        this.tableOptions = JSON.parse(JSON.stringify(exampleOptions));
    }
    public generateTable(config: config) {
        const {key_name, state, collapsible, table,search, header, newColumn} = config;
        this.tableOptions = JSON.parse(JSON.stringify(exampleOptions));
        if (header) {
            this.tableOptions.header.row.headerValue = header;
        }
        if (newColumn) {
            this.tableOptions.header.row.endValue = newColumn.name;
            this.tableOptions.body.row.endValue = newColumn.value;
        }
        if (search && collapsible) {
            this.setCoreOptions(key_name, state, collapsible,search);
        }else if (collapsible && !search) {
            this.setCoreOptions(key_name, state, collapsible);
        }  else if (search && !collapsible) {
            this.setCoreOptions(key_name, state, undefined,search);
        } else {
            this.setCoreOptions(key_name, state);
        }
            
        if (table) {
            this.setTableStyle(table ?? { containerClass:"DefaultContainer",tableClass:"DefaultTable",containStyle:{}}, table?.header, table?.body);
        }
        return GeneratedTable(this.tableOptions);
    }

    private setCoreOptions(key_name: Array<[string, string]>, data: any, collapsible?: any ,search?: any) {
        const { tableData, setTableData } = data;
        key_name.forEach((key, index) => {
            this.tableOptions.data.keys[index] = key[0];
            this.tableOptions.header.cell.value[index] = key[1];
        });
        this.tableOptions.data.value = data.tableData;
        this.tableOptions.state.tableData = tableData;
        this.tableOptions.state.setTableData = setTableData;
        if (collapsible) {
            this.tableOptions.options.collapsible = collapsible;
        }
        if (search) {
            this.tableOptions.header.search = search
        }
    }
    private setTableStyle(table:any,header?: any, body?: any) {
        this.tableOptions.options.containerClass = table.containerClass;
        this.tableOptions.options.tableClass = table.tableClass;
        this.tableOptions.options.containStyle = table.containStyle;
        if (header) {
            this.tableOptions.header.cell.style.class = header.cell.style.class;
            this.tableOptions.header.cell.style.sx = header.cell.style.sx;
            this.tableOptions.header.row.style.class = header.row.style.class;
            this.tableOptions.header.row.style.sx = header.row.style.sx;
        }
        if (body) {
            this.tableOptions.body.cell.style.class = body.cell.style.class;
            this.tableOptions.body.cell.style.sx = body.cell.style.sx;
            this.tableOptions.body.row.style.class = body.row.style.class;
            this.tableOptions.body.row.style.sx = body.row.style.sx;
        }
    }
}