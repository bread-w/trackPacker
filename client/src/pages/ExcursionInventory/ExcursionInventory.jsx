import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";
import { useParams } from "react-router-dom";

const ExcursionInventory = props => {
  const { id } = useParams();

  const [excursion, setExcursion] = useState({});
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    API.getExcursion(id)
      .then(response => {
        setExcursion(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
    API.getItems()
      .then(response => {
        setInventory(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, [excursion]);

  const addToExcursion = id => {
    excursion.items.push(id);
    let itemObj = { items: excursion.items };
    API.updateExcursionInventory(excursion._id, itemObj)
      .then(response => {
        setExcursion(response.data.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>{excursion.name} Excursion</h1>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>Inventory</h2>
          <ul>
            {inventory.map(item => (
              <>
                <li>{item.name}</li>
                <button
                  onClick={() => {
                    addToExcursion(item._id);
                  }}
                >
                  Add to Excursion
                </button>
              </>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>Inventory for {excursion.name}</h2>
          <ul>
            {excursion.items &&
              excursion.items
                .filter(item => item.status === "Inventory")
                .map(item => <li>{item.name}</li>)}
          </ul>
          <br></br>
          <h2>Wishlist for {excursion.name}</h2>
          <ul>
          {excursion.items &&
              excursion.items
                .filter(item => item.status === "Wishlist")
                .map(item => <li>{item.name}</li>)}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExcursionInventory;
