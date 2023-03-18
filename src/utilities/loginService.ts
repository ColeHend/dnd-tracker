import { setLocalInfo } from "./utilities";

const { clearLocalInfo } = require('./utilities');
export default class LoginService {
    public loginDefault = { user_id: 0, username: "", password: "" };
    public registerDefault = {
        username: "",
        password: "",
        passwordConf: ""
    };
    private errors: any;
    private SERVER_URL: string = process.env.SERVER_URL || "http://localhost:4000";
    constructor(private axios: any, private URL?: string ) {
        this.SERVER_URL = this.URL ? this.URL : process.env.SERVER_URL || "http://localhost:4000";
    }

    public loginValidate = (values: any) => {
        this.errors = {};
        if (!values.username) {
            this.errors.username = "Required";
        }
        if (!values.password) {
            this.errors.password = "Required";
        }
        return this.errors;
    };

    public registerValidate = (values: any) => {
        this.errors = {};
        if (!values.username) {
            this.errors.username = "Required";
        }
        if (!values.password) {
            this.errors.password = "Required";
        }
        if (!values.passwordConf) {
            this.errors.passwordConf = "Required";
        }
        if (values.password !== values.passwordConf) {
            this.errors.passwordConf = "Passwords do not match";
        }
        return this.errors;
    };


    public async login(username: string, password: string, toExecuteBefore?: Function, toExecuteAfter?: Function) {
        if (toExecuteBefore) {
            toExecuteBefore();
        }

        return this.axios.post(this.SERVER_URL + "/login", { username, password }).then((res: any) => {
            setLocalInfo(
                res.data.user_id,
                res.data.username,
                res.data.user_password
            );
            console.log("Submitted! res: ", res);

            if (toExecuteAfter) {
                toExecuteAfter(res);
            }
            return res;
        }).catch((err: any) => console.error(err))
    }

    public async register(username: string, password: string, toExecuteBefore?: Function, toExecuteAfter?: Function) {
        if (toExecuteBefore) {
            toExecuteBefore();
        }
        
        return this.axios.post(this.SERVER_URL + "/register", { username, password }).then((res: any) => {
            if (toExecuteAfter) {
                toExecuteAfter(res);
            }
            return res;
        }).catch((err: any) => console.error(err))
    }

    public async logout(toExecuteBefore?: Function, toExecuteAfter?: Function) {
        clearLocalInfo();
        if (toExecuteBefore) {
            toExecuteBefore();
        }

        return this.axios.post(`${this.SERVER_URL}/logout`).then((res: any) => {
            if (toExecuteAfter) {
                toExecuteAfter(res);
            }
            return res;
        }).catch((err: any) => console.error(err))
    }

}