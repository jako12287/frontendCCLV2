import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProducts } from "../context/productsContext";
import styles from "../styles/detailProduct.module.css";

const DetailProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    getProductById,
    updateProductQuantity,
    deleteProduct,
    refreshProducts,
  } = useProducts();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("");
  const [operation, setOperation] = useState("add");

  useEffect(() => {
    const loadProduct = async () => {
      const fetchedProduct = await getProductById(id);
      if (fetchedProduct) {
        setProduct(fetchedProduct?.product);
      } else {
        navigate("/list-products");
      }
    };
    loadProduct();
  }, [id, navigate, getProductById]);

  const handleQuantityChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleUpdateQuantity = async () => {
    if (!quantity || isNaN(quantity)) return;

    const newQuantity =
      operation === "add"
        ? product.quantity + Number(quantity)
        : product.quantity - Number(quantity);

    if (newQuantity < 0) {
      alert("No puedes tener una cantidad negativa");
      return;
    }

    await updateProductQuantity(id, newQuantity);
    refreshProducts();
    navigate("/list-products");
  };

  const handleDeleteProduct = async () => {
    const confirmDelete = window.confirm(
      "¿Estás seguro de eliminar este producto?"
    );
    if (confirmDelete) {
      try {
        await deleteProduct(id);
        refreshProducts();
        navigate("/list-products");
      } catch (error) {
        console.error("Error eliminando producto:", error);
      }
    }
  };

  if (!product) return <p className={styles.loading}>Cargando producto...</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Detalle del Producto</h1>
      <div className={styles.card}>
        <h2>{product.name}</h2>
        <p className={styles.quantity}>Cantidad: {product.quantity}</p>
        <div className={styles.actions}>
          <div className={styles.actionRadio}>
            <label className={styles.radio}>
              <input
                type="radio"
                name="operation"
                value="add"
                checked={operation === "add"}
                onChange={() => setOperation("add")}
              />
              Entrada (+)
            </label>
            <label className={styles.radio}>
              <input
                type="radio"
                name="operation"
                value="subtract"
                checked={operation === "subtract"}
                onChange={() => setOperation("subtract")}
              />
              Salida (-)
            </label>
          </div>
          <input
            type="number"
            className={styles.input}
            value={quantity}
            onChange={handleQuantityChange}
            placeholder="Cantidad"
          />

          <button className={styles.updateBtn} onClick={handleUpdateQuantity}>
            Actualizar Cantidad
          </button>
        </div>
        <button className={styles.deleteBtn} onClick={handleDeleteProduct}>
          Eliminar Producto
        </button>
      </div>
    </div>
  );
};

export default DetailProduct;
