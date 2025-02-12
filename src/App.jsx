import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import NotificationContainer from "./components/toastNotiffier";
import { AuthProvider } from "./context/authContext";
import { ProductsProvider } from "./context/productsContext";

function App() {
  console.log("aca esta app");
  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      <NotificationContainer />
      <AuthProvider>
        <ProductsProvider>
          <RouterProvider router={router} />
        </ProductsProvider>
      </AuthProvider>
    </Suspense>
  );
}

export default App;
