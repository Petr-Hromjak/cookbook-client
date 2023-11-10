import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {Row, Image} from "react-bootstrap";
import {mdiChefHat, mdiPencilOutline, mdiReceipt} from "@mdi/js";
import styles from "../css/recipe.module.css";
import RecipeDelete from "./RecipeDelete";
import UserContext from "./../UserProvider"

class RecipeBigCard extends React.Component {
  static contextType = UserContext

  render() {
    const {isAuthorized} = this.context;
    return (<div className={styles.bigRecipe}>
          <Card className={styles.bigRecipeCard}>
            <Card.Header>
              <Row>
                <div className="col-10">
                  <h2 className={styles.bigRecipeName}>
                    <Icon path={mdiChefHat} size={1} color="grey"/>{" "}
                    {this.props.recipe.name}
                  </h2>
                </div>
                {isAuthorized && <div className="col-2 d-flex flex-row justify-content-end align-items-center gap-3">
                  <Icon
                      size={1}
                      path={mdiPencilOutline}
                      style={{color: 'orange', cursor: 'pointer'}}
                      onClick={() => this.props.handleAddRecipeShow(this.props.recipe)}
                  />
                  <RecipeDelete recipe={this.props.recipe} onDelete={(id) => this.props.onDelete(id)}
                                onError={(error) => this.props.onError(error)}/>
                </div>}
              </Row>
            </Card.Header>
            <Card.Body className={styles.bigRecipeBody}>
              <div className={styles.recipeContent}>
                <div className={styles.recipeDescription}>
                  <div className={styles.bigRecipeDescriptionIcon}>
                    <Icon path={mdiReceipt} size={1} color="grey"/>{" "}
                  </div>
                  <div className={styles.bigRecipeDescriptionText}>
                    {this.props.recipe.description}
                  </div>
                </div>
              </div>
              <Image alt={this.props.recipe.name} src={this.props.recipe.imgUri} className={styles.bigRecipeImage}/>
            </Card.Body>

          </Card>
        </div>);
  }
}

export default RecipeBigCard;
