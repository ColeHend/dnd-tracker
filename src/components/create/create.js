// @ts-nocheck

import { Button } from "@mui/material";
import React, { useContext } from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { UserContext } from "../../App";
function Create(props) {
 
  const mySwal = withReactContent(Swal)


  function createAProject() {
    
  }

  return (
   <div>
    <Button
    sx={{ color: "white" }}
     onClick={}     
    >create Project
    </Button>
   </div>
  );
}
export default Create;
