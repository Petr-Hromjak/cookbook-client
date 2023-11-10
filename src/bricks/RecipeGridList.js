import React from "react";
import RecipeBigCard from "./RecipeBigCard";
import RecipeSmallCard from "./RecipeSmallCard";

class RecipeGridList extends React.Component {
  render() {
    function getRecipeList(recipeList, ingredientList, handleAddRecipeShow,onDelete,onError, isBigCard) {

      if (isBigCard) {
        return (<div className="row">
          {recipeList.map((recipe) => <div key={recipe.id} className="col-12 d-flex"
                                           style={{paddingBottom: "16px"}}>
            <RecipeBigCard key={recipe.id}
                           recipe={recipe}
                           ingredientList={ingredientList}
                           handleAddRecipeShow={handleAddRecipeShow}
                           onDelete={(id) => onDelete(id)}
                           onError={(error) => onError(error)}
            />
          </div>)}
        </div>);
      } else {
        return (<div className="row">
          {recipeList.map((recipe) => <div key={recipe.id} className="col-12 col-md-6 col-xl-4 col-xxl-3 d-flex"
                                           style={{paddingBottom: "16px"}}>
            <RecipeSmallCard key={recipe.id}
                             recipe={recipe}
                             ingredientList={ingredientList}
                             handleAddRecipeShow={handleAddRecipeShow}
                             onDelete={(id) => onDelete(id)}
                             onError={(error) => onError(error)}
            />
          </div>)}
        </div>);
      }
    }

    return getRecipeList(this.props.recipeList, this.props.ingredientList, this.props.handleAddRecipeShow,this.props.onDelete, this.props.onError, this.props.isBigCard);
  }
}

export default RecipeGridList;
