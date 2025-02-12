import React, { createContext, useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { fetchCreateProduct, fetchProducts, fetchDeleteProduct, fetchUpdateProductQuantity, fetchProductById } from "../services/api";
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
      notify("success", "Producto creado exitosamente");
    } catch (error) {
      console.error("Error al crear producto:", error);
      notify("error", "Error al crear producto");
    } finally {
      setLoading(false);
    }
  };

  const deleteProductHandler = async (productId) => {
    if (!token) {
      notify("error", "No tienes permisos para eliminar productos");
      return;
    }

    setLoading(true);
    try {
      await fetchDeleteProduct(productId, token);
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== productId));
      notify("success", "Producto eliminado exitosamente");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      notify("error", "Error al eliminar producto");
    } finally {
      setLoading(false);
    }
  };

  const updateProductQuantityHandler = async (productId, newQuantity) => {
    if (!token) {
      notify("error", "No tienes permisos para actualizar productos");
      return;
    }

    setLoading(true);
    try {
      const updatedProduct = await fetchUpdateProductQuantity(productId, newQuantity, token);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === productId ? { ...product, quantity: newQuantity } : product
        )
      );
      notify("success", "Cantidad de producto actualizada");
    } catch (error) {
      console.error("Error al actualizar cantidad del producto:", error);
      notify("error", "Error al actualizar cantidad del producto");
    } finally {
      setLoading(false);
    }
  };

  const getProductById = async (productId) => {
    if (!token) {
      notify("error", "No tienes permisos para ver productos");
      return null;
    }

    setLoading(true);
    try {
      const product = await fetchProductById(productId, token);
      return product;
    } catch (error) {
      console.error("Error al obtener producto por ID:", error);
      notify("error", "Error al obtener producto");
      return null;
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
        deleteProduct: deleteProductHandler,
        updateProductQuantity: updateProductQuantityHandler,
        getProductById,
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
