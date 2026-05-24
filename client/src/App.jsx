import AppRoutes
from "./routes/AppRoutes";

import {
  ToastContainer
} from "react-toastify";

import "react-toastify/dist/ReactToastify.css";


function App() {

  return (

    <>

      <ToastContainer

        position="top-right"

        autoClose={3000}

        hideProgressBar={false}

        newestOnTop={false}

        closeOnClick

        pauseOnHover

        draggable

        theme="light"

        toastClassName="custom-toast"

        progressClassName="custom-progress"

      />


      <AppRoutes />

    </>

  );
}

export default App;