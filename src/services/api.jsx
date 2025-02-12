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
console.log("api auth",response)
    if (!response.ok) throw new Error("Credenciales inválidas");

    return response.json();
  } catch (error) {
    console.error(error);
  }
};
