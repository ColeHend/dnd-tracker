import { Box, Button } from '@mui/material';
import React, { PropsWithChildren } from 'react';
import { Link, Route, Routes } from "react-router-dom";
export interface customRoute {
    path: string;
    element: any;
    tabname?: string;
}

interface props {
    routes: Array<customRoute>;
    style?: {
        button: {
            sx: any;
        };
        box: {
            sx: any;
        };
    }

}
function RouteService(props: PropsWithChildren<props>) {
    const children = props.routes;
    const childrenNumber: number = children.filter((child: any) => child.tabname).length;
    const boxSX = props.style?.box.sx ?? { display: 'flex', alignItems: 'center', textAlign: 'center', background: 'inherit' }
    return (
        <>
            {childrenNumber > 0 ?
                (
                    <Box sx={boxSX}>
                        {
                            children.map((child: any, index: number) => {
                                return (
                                    child.tabname ?
                                    (
                                        <Link key={child.path} to={child.path} style={{ textDecoration: 'none' }}>
                                            <Button
                                                sx={props.style?.button.sx ?? {}}
                                                variant="text"
                                            >
                                                {child.tabname}
                                            </Button>
                                        </Link>
                                    ) : null
                                )
                            })
                        }

                    </Box>
                ) : null
            }
            <Routes>
                {children.map((route: customRoute) => (<Route {...route}></Route>))}
            </Routes>
        </>
    );
};

export default RouteService;