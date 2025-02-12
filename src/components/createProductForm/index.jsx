import React from "react";
import styles from "../../styles/createProductForm.module.css";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { useNotification } from "../../components/toastNotiffier";
import PropTypes from "prop-types";
import { useProducts } from "../../context/productsContext";

const schema = yup.object().shape({
  name: yup.string().required("El nombre del producto es obligatorio"),
  quantity: yup
    .number()
    .typeError("La cantidad debe ser un número")
    .positive("La cantidad debe ser mayor a 0")
    .integer("La cantidad debe ser un número entero")
    .required("La cantidad es obligatoria"),
});

const CreateProductForm = ({ setOpenModal }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const { notify } = useNotification();
  const { createProduct, loading, refreshProducts } = useProducts();

  const onSubmit = async (data) => {
    try {
      await createProduct(data);
      setOpenModal(false);
      refreshProducts();
    } catch (err) {
      console.error("Error en el registro:", err);
      notify("error", "Error en el registro");
    }
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerCard}>
        <h4 className={styles.titleForm}>Registro de Producto</h4>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.containerInput}>
            <Controller
              name="name"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Nombre del producto"
                  {...field}
                />
              )}
            />
            {errors.name && (
              <p className={styles.textError}>{errors.name.message}</p>
            )}
          </div>

          <div className={styles.containerInput}>
            <Controller
              name="quantity"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <input type="number" placeholder="Cantidad" {...field} />
              )}
            />
            {errors.quantity && (
              <p className={styles.textError}>{errors.quantity.message}</p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading ? "Registrando..." : "Registrar"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default CreateProductForm;

CreateProductForm.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};
