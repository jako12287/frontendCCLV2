import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { fetchCreateProduct, fetchProducts } from "../services/api";
import { useAuth } from "./authContext";
import { useNotification } from "../components/toastNotiffier";

const ProductsContext = createContext();

export const useProducts = () => useContext(ProductsContext);

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { notify } = useNotification();

  const getProducts = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await fetchProducts(token);
      setProducts(response.products || []);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      notify("error", "Error al obtener productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  }, [token]);

  const createProductHandler = async (productData) => {
    if (!token) {
      notify("error", "No tienes permisos para crear productos");
      return;
    }

    setLoading(true);
    try {
      const newProduct = await fetchCreateProduct(productData, token);
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    } catch (error) {
      console.error("Error al crear producto:", error);
      notify("error", "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        refreshProducts: getProducts,
        createProduct: createProductHandler,
        loading,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
