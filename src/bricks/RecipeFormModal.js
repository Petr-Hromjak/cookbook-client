import {Modal, Form, Row, Col, Button, Image} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Icon from "@mdi/react";
import {mdiDelete, mdiLoading} from "@mdi/js";

const CallState = {
  INACTIVE: 'inactive', PENDING: 'pending', SUCCESS: 'success', ERROR: 'error',
};

function RecipeFormModal({ingredientList, show, recipe, setAddRecipeShow, onComplete}) {
  const initialFormData = {
    name: "", description: "", imgUri: "", ingredients: []
  }
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(initialFormData);
  const [addRecipeCall, setAddRecipeCall] = useState({
    state: CallState.INACTIVE
  });

  useEffect(() => {
    if (recipe) {
      setFormData({
        name: recipe.name, description: recipe.description, imgUri: recipe.imgUri, ingredients: recipe.ingredients
      })
    }
  }, [recipe]);

  const handleClose = () => {
    setAddRecipeShow({state: false});
    setValidated(false);
    setFormData(initialFormData);
  }

  function handleRemoveIngredient(ingredient) {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === ingredient.id);
      if (index > -1) {
        newData.ingredients.splice(index, 1);
      }
      return newData;
    });
  }

  const setField = (name, val) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      newData[name] = val;
      return newData;
    });
  };

  const setIngredientsField = (ingredientId) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const index = newData.ingredients.findIndex((savedIngredient) => savedIngredient.id === ingredientId);
      if (index <= -1) {
        newData.ingredients.push({id: ingredientId, amount: 0, unit: "ks"})
      }

      return newData;
    });
  };

  const setIngredientUnit = (ingredient, unit) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const foundIngredient = newData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id);
      if (foundIngredient) {
        foundIngredient.unit = unit;
      }
      return newData;
    });
  };

  const setIngredientAmount = (ingredient, amount) => {
    return setFormData((formData) => {
      const newData = JSON.parse(JSON.stringify(formData));
      const foundIngredient = newData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id);
      if (foundIngredient) {
        foundIngredient.amount = amount;
      }
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    const form = e.currentTarget;

    e.preventDefault();
    e.stopPropagation();

    const payload = {
      ...formData, id: recipe ? recipe.id : null
    };

    if (!form.checkValidity()) {
      setValidated(true);
      return;
    }

    setAddRecipeCall({state: CallState.PENDING});
    const res = await fetch(`https://uu-cookbook-server-9e97a7bbe13a.herokuapp.com/recipe/${recipe ? 'update' : 'create'}`, {
      method: "POST", headers: {
        "Content-Type": "application/json",
      }, body: JSON.stringify(payload)
    });

    const data = await res.json();

    if (res.status >= 400) {
      setAddRecipeCall({state: CallState.ERROR, error: data});
    } else {
      setAddRecipeCall({state: CallState.SUCCESS, data});

      if (typeof onComplete === 'function') {
        onComplete(data);
      }

      handleClose();
    }
  };

  return (<>
    <Modal className={"modal-lg"} show={show} onHide={handleClose}>
      <Form noValidate validated={validated} onSubmit={(e) => handleSubmit(e)}>
        <Modal.Header closeButton>
          <Modal.Title>{recipe ? 'Upravit recept' : 'Vytvořit nový recept'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Název</Form.Label>
            <Form.Control
                type="text"
                value={formData.name}
                onChange={(e) => setField("name", e.target.value)}
                required
                maxLength={20}
            />
            <Form.Control.Feedback type="invalid">
              Zadejte název receptu s maximální délkou 20 znaků
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Popis</Form.Label>
            <Form.Control
                type="text"
                value={formData.description}
                onChange={(e) => setField("description", e.target.value)}
                required
                maxLength={10000}
            />
            <Form.Control.Feedback type="invalid">
              Zadejte popis s maximální délkou 10000 znaků
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Obrázek</Form.Label>
            <Form.Control
                type="text"
                value={formData.imgUri}
                onChange={(e) => setField("imgUri", e.target.value)}
                required
            />
            {formData.imgUri && <Image className="img-fluid rounded mx-auto d-block m-3" alt={formData.name}
                                       src={formData.imgUri}/>}
            <Form.Control.Feedback type="invalid">
              Zadejte obrázek pomocí jeho URI adresy
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group as={Col} className="mb-3">
            <Form.Label>Přidat Ingredience</Form.Label>
            <Form.Select
                value={""}
                onChange={(e) => setIngredientsField(e.target.value)}
            >
              <option value="" disabled>Vyber ingredienci k přidání</option>
              {ingredientList.map((ingredient) => <option key={ingredient.id}
                                                          value={ingredient.id}>{ingredient.name}</option>)}
            </Form.Select>
          </Form.Group>

          <Form.Label>Ingredience</Form.Label>
          {formData?.ingredients && formData.ingredients.map((ingredient) => <Row key={ingredient.id}
              className="d-flex flex-row align-items-top mb-2">
            <Form.Label
                className={"col-lg-3 col-form-label fw-bold"}>{ingredientList.find((savedIngredient) => savedIngredient.id === ingredient.id).name}</Form.Label>
            <Form.Group className="col-lg-4">
              <Row className="d-flex flex-row align-items-top">
                <Form.Label className={"col-form-label col-lg-6"}>Množství</Form.Label>
                <div className="col-lg-6">
                  <Form.Control
                      type="number"
                      value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).amount}
                      placeholder={0}
                      onChange={(e) => setIngredientAmount(ingredient, parseFloat(e.target.value))}
                      min={0.01}
                      max={10000}
                      step={".01"}
                      required
                  />
                  <Form.Control.Feedback type="invalid">
                    Zadejte množství v rozsahu 0.01 - 10000
                  </Form.Control.Feedback>
                </div>
              </Row>
            </Form.Group>

            <Form.Group className="col-lg-4">
              <Row className="d-flex flex-row align-items-top">
                <Form.Label className={"col-form-label col-lg-5"}>Jednotky</Form.Label>
                <div className={"col-lg-7"}>
                  <Form.Select
                      type="text"
                      value={formData.ingredients.find((savedIngredient) => savedIngredient.id === ingredient.id).unit}
                      onChange={(e) => setIngredientUnit(ingredient, e.target.value)}
                      required
                  >
                    <option value="ks">ks</option>
                    <option value="kg">kg</option>
                  </Form.Select>
                </div>
              </Row>
            </Form.Group>

            <div className={"col-lg-1 mt-3 mt-lg-0" }>
              <Button className={"w-100 d-flex justify-content-center align-items-top px-1"}
                      variant="btn btn-outline-danger"
                      onClick={() => handleRemoveIngredient(ingredient)}>
                <Icon size={1} style={{verticalAlign: "top"}} path={mdiDelete}/>
              </Button>
            </div>

          </Row>)}

        </Modal.Body>
        <Modal.Footer>
          <div className="d-flex flex-row justify-content-between align-items-center w-100">
            <div>
              {addRecipeCall.state === CallState.ERROR &&
                  <div className="text-danger">Error: {addRecipeCall.error.errorMessage}</div>}
            </div>
            <div className="d-flex flex-row gap-2">
              <Button variant="secondary" onClick={handleClose}>
                Zavřít
              </Button>
              <Button variant="primary" type="submit" disabled={addRecipeCall.state === CallState.PENDING}>
                {addRecipeCall.state === CallState.PENDING ? (
                    <Icon size={0.8} path={mdiLoading} spin={true}/>) : (recipe ? 'Upravit' : 'Vytvořit')}
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  </>)
}

export default RecipeFormModal;