const API_URL = "http://localhost:4000";
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error("Credenciales inválidas");

    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const fetchProducts = async (token) => {
  try {
    const response = await fetch(`${API_URL}/api/product`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API response (products):", response);

    if (!response.ok) throw new Error("Error al obtener productos");

    return response.json();
  } catch (error) {
    console.error("Error en fetchProducts:", error);
    return { products: [] }; 
  }
};


export const fetchCreateProduct = async (productData, token) => {
  try {
    const response = await fetch(`${API_URL}/api/product`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) throw new Error("Error al crear el producto");

    return response.json();
  } catch (error) {
    console.error("Error en fetchCreateProduct:", error);
    throw error;
  }
};