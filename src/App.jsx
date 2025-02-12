import React, { Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/index";
import NotificationContainer from "./components/toastNotiffier";
import { AuthProvider } from "./context/authContext";
import { ProductsProvider } from "./context/productsContext";
import Loader from "./components/loader";

function App() {
  return (
    <Suspense fallback={<Loader/>}>
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
