import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index"

function App() {
  console.log("aca esta app");
  return (
    <Suspense fallback={<h1>Cargando</h1>}>
     <RouterProvider router={router} />
    </Suspense>
  );
}

export default App;
