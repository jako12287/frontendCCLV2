import React, { Suspense } from "react";

function App() {
  console.log("aca esta app");
  return (
    <Suspense fallback={<h1>Cargando</h1>}>
      <h1 style={{ border: "1px solid red" }}>CCL FRONTEND</h1>
    </Suspense>
  );
}

export default App;
