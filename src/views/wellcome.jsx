import React from "react";
import styles from "../styles/wellcome.module.css"

const Wellcome = () => {
  return (
    <div className={styles.container}>
      <h1>Bienvenido a CCL</h1>
      <p>Aquí puedes gestionar tus productos de manera fácil y eficiente.</p>
    </div>
  );
};

export default Wellcome;
