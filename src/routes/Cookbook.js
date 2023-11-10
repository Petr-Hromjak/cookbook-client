import RecipeList from "./../bricks/RecipeList";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect} from "react";
import Icon from "@mdi/react";
import {mdiLoading} from "@mdi/js";
import {Alert} from "react-bootstrap";

const CallState = {
  PENDING: 'pending', SUCCESS: 'success', ERROR: 'error',
};

function Cookbook() {
  const [recipeListCall, setRecipeListCall] = useState({
    state: CallState.PENDING,
  });
  const [ingredientListCall, setIngredientListCall] = useState({
    state: CallState.PENDING,
  });
  const [deleteRecipeError, setDeleteRecipeError] = useState('');


  const handleRecipeCreated = (recipe) => {
    if (recipeListCall.state === CallState.SUCCESS) {
      let recipeList = [...recipeListCall.data];

      if (recipe.id) {
        recipeList = recipeList.filter((r) => r.id !== recipe.id);
      }

      setRecipeListCall({
        state: CallState.SUCCESS, data: [...recipeList, recipe]
      });
    }
  }

  const handleRecipeDeleted = (recipeId) => {
    if (recipeListCall.state === CallState.SUCCESS) {
      let recipeList = [...recipeListCall.data];

      if (recipeId) {
        recipeList = recipeList.filter((r) => r.id !== recipeId);
      }

      setRecipeListCall({
        state: CallState.SUCCESS, data: [...recipeList]
      });
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/recipe/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setRecipeListCall({state: CallState.ERROR, error: responseJson});
      } else {
        setRecipeListCall({state: CallState.SUCCESS, data: responseJson});
      }
    }).catch((exception) => setIngredientListCall({state: CallState.ERROR, error: exception}));
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8000/ingredient/list`, {
      method: "GET",
    }).then(async (response) => {
      const responseJson = await response.json();
      if (response.status >= 400) {
        setIngredientListCall({state: CallState.ERROR, error: responseJson});
      } else {
        setIngredientListCall({state: CallState.SUCCESS, data: responseJson});
      }
    }).catch((exception) => setIngredientListCall({state: CallState.ERROR, error: exception}));
  }, []);

  function getChild() {
    if (recipeListCall.state === CallState.SUCCESS && ingredientListCall.state === CallState.SUCCESS) {
      return (<div className="container">
        {deleteRecipeError && <Alert variant="danger">
          Error: {deleteRecipeError}
        </Alert>}
        <RecipeList recipeList={recipeListCall.data} ingredientList={ingredientListCall.data}
                    onComplete={(recipe) => handleRecipeCreated(recipe)} onDelete={(id) => handleRecipeDeleted(id)}
                    onError={(error) => setDeleteRecipeError(error)}/>
      </div>);
    } else if (recipeListCall.state === CallState.ERROR || ingredientListCall.state === CallState.ERROR) {
      return (<div className="alert alert-danger" role="alert">
        <p>
          Nepodařilo se načíst recepty nebo ingredience.
          <br/>
          {JSON.stringify(recipeListCall.error + " " + ingredientListCall.error, null, 2)}
        </p>
      </div>);
    } else {
      return (<div className="vw-100  vh-100 d-flex  justify-content-center  align-items-center">
        <Icon size={2} path={mdiLoading} spin={true}/>
      </div>);
    }
  }

  return (<div className="RecipeList">
    {getChild()}
  </div>);
}

export default Cookbook;
