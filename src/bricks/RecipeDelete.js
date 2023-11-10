import Icon from '@mdi/react';
import Confirmation from './Confirmation';
import {mdiTrashCanOutline} from '@mdi/js';
import {useState} from 'react';

const CallState = {
  INACTIVE: 'inactive', PENDING: 'pending', SUCCESS: 'success', ERROR: 'error',
};

export default function RecipeDelete({recipe, onDelete, onError}) {
  const [deleteRecipeCall, setDeleteRecipeCall] = useState({
    state: CallState.INACTIVE
  });

  const handleDelete = async () => {
    if (deleteRecipeCall.state === CallState.PENDING) return

    setDeleteRecipeCall({state: CallState.PENDING});

    const res = await fetch(`https://uu-cookbook-server-9e97a7bbe13a.herokuapp.com/recipe/delete`, {
      method: "POST", headers: {
        "Content-Type": "application/json"
      }, body: JSON.stringify({id: recipe.id})
    });

    const data = await res.json();

    if (res.status >= 400) {
      setDeleteRecipeCall({state: CallState.ERROR, error: data});

      if (typeof onError === 'function') onError(data.errorMessage);

    } else {
      setDeleteRecipeCall({state: CallState.SUCCESS, data});

      if (typeof onDelete === 'function') {
        onDelete(recipe.id);
      }
    }
  }

  return (<Confirmation
          title="Smazat recept"
          message="Opravdu si přejete smazat recept?"
          confirmText="Smazat"
          onConfirm={handleDelete}
      >
        <div>
          <Icon
              path={mdiTrashCanOutline}
              style={{cursor: 'pointer', color: 'red'}}
              size={1}
          ></Icon>
        </div>
      </Confirmation>)
}