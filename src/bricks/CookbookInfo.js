import React from "react";
import styles from "../css/cookbook.module.css";

class CookbookInfo extends React.Component {
  render() {
    return (
      <h1 className={styles.cookbookNameHeader}>
          {this.props.cookbook.name}
      </h1>
    );
  }
}

export default CookbookInfo;
