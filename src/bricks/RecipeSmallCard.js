import React from "react";
import Card from "react-bootstrap/Card";
import Icon from "@mdi/react";
import {mdiChefHat, mdiPencilOutline, mdiReceipt} from "@mdi/js";
import {shortenText} from "../helpers/common";
import RecipeDelete from "./RecipeDelete";
import UserContext from "./../UserProvider"

class RecipeSmallCard extends React.Component {
  static contextType = UserContext

  render() {
    const {isAuthorized} = this.context;

    return (<Card>
      <Card.Img className="card-img-top" alt={this.props.recipe.name} src={this.props.recipe.imgUri}/>
      <Card.Body>
        <Card.Title>
          <div className="row no-gutters px-3">
            <div className="col-2 p-1">
              <Icon className="vertical-align-text-bottom" path={mdiChefHat} size={1} color="grey"/>
            </div>
            <div className="col-10 p-1">
              {this.props.recipe.name}
            </div>
          </div>
        </Card.Title>
        <div className="row no-gutters px-3 mb-3">
          <div className="col-2 p-1">
            <Icon className="vertical-align-text-bottom" path={mdiReceipt} size={1} color="grey"/>
          </div>
          <div className="col-10 p-1">
            {shortenText(this.props.recipe.description, 70)}
          </div>
        </div>
        <ul className="list-group">
          {this.props.recipe.ingredients.slice(0, 5).map((ingredient) => {
            const foundIngredient = this.props.ingredientList.find((ingredientInList) => ingredientInList.id === ingredient.id);
            return <li className="list-group-item" key={foundIngredient.id}>{foundIngredient.name}</li>;
          })}
          {this.props.recipe.ingredients.length > 5 && <li className="list-group-item">atd.</li>}
        </ul>
      </Card.Body>
      {isAuthorized && <Card.Footer>
        <div className="d-flex flex-row justify-content-end align-items-center gap-2">
          <Icon
              size={0.8}
              path={mdiPencilOutline}
              style={{color: 'orange', cursor: 'pointer'}}
              onClick={() => this.props.handleAddRecipeShow(this.props.recipe)}
          />
          <RecipeDelete recipe={this.props.recipe} onDelete={(id) => this.props.onDelete(id)}
                        onError={(error) => this.props.onError(error)}/>
        </div>
      </Card.Footer>}
    </Card>);
  }
}

export default RecipeSmallCard;
