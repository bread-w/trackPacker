import React, { useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Favorite from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
import Checkbox from "@material-ui/core/Checkbox";
import API from "../../utils/API";

const Inventory = () => {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  useEffect(() => {
    showItems();
  }, []);
  const showItems = () => {
    API.getItems()
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  const handleChange = ({ target: { value } }) => {
    setNewItem(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    API.addItem(newItem).then((response) => {
      setItems([...items, response.data.data]);
    });
  };

  const deleteItem = (id) => {
    API.deleteItem(id)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    API.getItems()
      .then((res) => {
        setItems(res.data.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-basic"
          label="Add New Item"
          variant="outlined"
          name="newItem"
          placeholder="Add an Item"
          onChange={handleChange}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
          color="secondary"
        >
          Add to Inventory
        </Button>
        <FormControlLabel
          control={
            <Checkbox
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              name="wishlist"
              id="wishlist"
            />
          }
          label="Add to Wishlist"
        />
      </form>
      <ul>
        {items.map((item) => (
          <div>
            <li>{item.name}</li>
            <button
              onClick={() => {
                deleteItem(item._id);
              }}
            >
              Delete Item
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Inventory;
