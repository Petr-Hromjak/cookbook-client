import {useContext} from "react";
import Table from "react-bootstrap/Table";
import {shortenText} from "../helpers/common";
import Icon from "@mdi/react";
import {mdiPencilOutline} from "@mdi/js";
import RecipeDelete from "./RecipeDelete";
import UserContext from "./../UserProvider"

function RecipeTableList(props) {
  const {isAuthorized} = useContext(UserContext);

  return (<Table>
    <thead>
    <tr>
      <th>Název receptu</th>
      <th>Popis receptu</th>
    </tr>
    </thead>
    <tbody>
    {props.recipeList.map((recipe) => {
      return (<tr key={recipe.id}>
        <td>{recipe.name}</td>
        <td>{shortenText(recipe.description, 240)}</td>
        {isAuthorized && <td>
          <div className="d-flex flex-row align-items-center gap-2">
            <Icon
                size={0.8}
                path={mdiPencilOutline}
                style={{color: 'orange', cursor: 'pointer'}}
                onClick={() => props.handleAddRecipeShow(recipe)}
            />
            <RecipeDelete recipe={recipe} onDelete={(id) => props.onDelete(id)}
                          onError={(error) => props.onError(error)}/>
          </div>
        </td>}
      </tr>);
    })}
    </tbody>
  </Table>);
}

export default RecipeTableList;
