import React from "react";
import { Link, Route, Routes } from "react-router-dom";
import Create from "../create/create";
import View from "../view/View";
function Profile(props) {
  return (
    <div>
      <div className="subNav">
        <Link to="view">
          <button>View</button>
        </Link>
        <Link to="create">
          <button>Create</button>
        </Link>
      </div>
      <Routes>
        <Route path="/view" element={<View />}></Route>
        <Route path="/create" element={<Create />}></Route>
      </Routes>
    </div>
  );
}
export default Profile;
