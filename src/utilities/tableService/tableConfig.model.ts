export default interface config {
    key_name: [string,string][];
    state: { tableData: any[]; setTableData: any };
    collapsible?: {
        styleClass: string;
        collapseValue: (row:any,index:number)=>any;
      };
    table?: {
        containerClass: string;
        tableClass: string;
        containStyle: {};
        header: {
            cell: {
              style: {
                class: string;
                sx: {};
              };
            };
            row: {
              style: {
                class: string;
                sx: {};
              };
            };
          };
        body: {
            cell: {
              style: {
                class: string;
                sx: {};
              };
            };
            row: {
              style: {
                class: string;
                sx: {};
              };
            };
          };
      };
    search?: { filterFunc: ()=>Object[] };
    header?: string;
    newColumn?:{
      name:string;
      value:(row:Object)=>React.FunctionComponent;
    }
}