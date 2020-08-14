import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import API from "../../utils/API";
import { useParams } from "react-router-dom";
import Favorite from "@material-ui/icons/Favorite";
import Box from "@material-ui/core/Box";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const ExcursionInventory = (props) => {
  const { id } = useParams();

  const [excursion, setExcursion] = useState({});
  const [inventory, setInventory] = useState([]);

  useEffect(() => {
    API.getExcursion(id)
      .then((response) => {
        setExcursion(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
    API.getItems()
      .then((response) => {
        setInventory(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [excursion]);

  const addToExcursion = (id) => {
    excursion.items.push(id);
    let itemObj = { items: excursion.items };
    API.updateExcursionInventory(excursion._id, itemObj)
      .then((response) => {
        setExcursion(response.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            alignItems="center"
            justifyContent="center"
            display="flex"
            p={2}
            mx="auto"
          >
            <h1>{excursion.name}</h1>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
        <h2>Inventory</h2>
          <Box
          /*   alignItems="center"
            justifyContent="center" */
            display="flex"
            p={2}
            mx="auto"
            flexDirection="row"
            flexWrap="wrap"
            p={1}
            m={1}
          >
                  <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Inventory</Typography>
        </AccordionSummary>
        <AccordionDetails>
        <ul>
              {inventory.map((item) => (
                <>
                  <li>
                    {item.name}
                    {item.status === "Wishlist" && (
                      <span>
                        <Favorite></Favorite>
                      </span>
                    )}
                  </li>
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
        </AccordionDetails>
      </Accordion>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <h2>Inventory for {excursion.name}</h2>
          <ul>
            {excursion.items &&
              excursion.items
                .filter((item) => item.status === "Inventory")
                .map((item) => <li>{item.name}</li>)}
          </ul>
          <br></br>
          <h2>Wishlist for {excursion.name}</h2>
          <ul>
            {excursion.items &&
              excursion.items
                .filter((item) => item.status === "Wishlist")
                .map((item) => (
                  <li>
                    {item.name}
                    {item.status === "Wishlist" && (
                      <span>
                        <Favorite></Favorite>
                      </span>
                    )}
                  </li>
                ))}
          </ul>
        </Grid>
      </Grid>
    </div>
  );
};

export default ExcursionInventory;
