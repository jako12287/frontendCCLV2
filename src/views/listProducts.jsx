import React, { useState } from "react";
import ProductsTable from "../components/customTable";
import { useProducts } from "../context/productsContext";
import styles from "../styles/listProducts.module.css";
import Modal from "../components/modal";
import CreateProductForm from "../components/createProductForm";
const ListProducts = () => {
  const { products } = useProducts();
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className={styles.container}>
      <h2>Lista de Productos</h2>

      <ProductsTable
        data={products}
        onOpenModal={() => setOpenModal(!openModal)}
      />

      {openModal && (
        <Modal isOpen={openModal} onClose={() => setOpenModal(!openModal)}>
          <CreateProductForm setOpenModal={setOpenModal} />
        </Modal>
      )}
    </div>
  );
};

export default ListProducts;
