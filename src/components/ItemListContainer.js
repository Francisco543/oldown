import { useAlert } from "../context/AlertContext";
import { Alert } from "@mui/material";
import { Box, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ItemList from "./ItemList";
import { Drawer, Chip } from "@mui/material";
import { useState } from "react";
import { useEffect } from "react";
import { getItemsByCondition, getItems } from "../app/api";
import { useProducts } from "../context/ProductsContext";
import { Link, useParams } from "react-router-dom";
import { MdKeyboardArrowRight } from "react-icons/md";

const AlertBox = styled(Box)`
  position: absolute;
  top: 100px;
  width: 200px;
  height: 200px;
`;

const DivContainer = styled(Box)`
  display: grid;
  grid-template-columns: ${(props) =>
    props.opendrawer ? "1fr 1fr" : "1fr 1fr 1fr"};
  column-gap: 20px;
  padding: 0px 40px;
  margin-bottom: 100px;
  @media (max-width: 1155px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (max-width: 870px) {
    grid-template-columns: 1fr;
  }
`;

const ItemListContainer = ({ isLanding = false }) => {
  const [value, setValue] = useState("0");
  const { id } = useParams();
  const [, setProducts] = useProducts(null);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [alert, setAlert] = useAlert();

  useEffect(() => {
    if (alert.show) {
      setTimeout(() => {
        setAlert({});
      }, 2000);
    }
  }, [alert]);

  useEffect(() => {
    const getItemsSelect = async () => {
      if (id == "0") {
        const items = await getItems();
        setProducts(items);
        setValue(id);
      } else {
        const items2 = await getItemsByCondition(id);
        setValue(id);
        setProducts(items2);
      }
    };
    getItemsSelect();
  }, [id]);
  return (
    <Box sx={{ display: "flex", width: "100%", height: "100%" }}>
      <Drawer
        sx={{
          marginTop: "100px",
          width: openDrawer ? "300px" : "0px",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            marginTop: "100px",
            width: "300px",
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={openDrawer && !isLanding}
      >
        <Box
          sx={{
            height: "100%",
            width: "100%",
            backgroundColor: "#ccccc",
            position: "relative",
            padding: "30px",
          }}
          onMouseLeave={() => setOpenDrawer(false)}
        >
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            Categorias
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              marginTop: "50px",
            }}
          >
            <Link to={"/category/0"} style={{ textDecoration: "none" }}>
              <Chip
                label="Todos"
                variant={id == "0" ? "contained" : "outlined"}
                sx={{ cursor: "pointer", width: "100%" }}
              />
            </Link>
            <Link to={"/category/muebles"} style={{ textDecoration: "none" }}>
              <Chip
                label="Muebles"
                variant={id == "muebles" ? "contained" : "outlined"}
                sx={{ cursor: "pointer", width: "100%" }}
              />
            </Link>
            <Link to={"/category/ropa"} style={{ textDecoration: "none" }}>
              <Chip
                label="Ropa"
                variant={id == "ropa" ? "contained" : "outlined"}
                sx={{ cursor: "pointer", width: "100%" }}
              />
            </Link>
            <Link
              to={"/category/tecnologia"}
              style={{ textDecoration: "none" }}
            >
              <Chip
                label="Tecnologia"
                variant={id == "tecnologia" ? "contained" : "outlined"}
                sx={{ cursor: "pointer", width: "100%" }}
              />
            </Link>
            <Link
              to={"/category/zapatillas"}
              style={{ textDecoration: "none" }}
            >
              <Chip
                label="Zapatillas"
                variant={id == "zapatillas" ? "contained" : "outlined"}
                sx={{ cursor: "pointer", width: "100%" }}
              />
            </Link>
          </Box>
        </Box>
      </Drawer>
      {!openDrawer && !isLanding && (
        <Box
          sx={{
            display: "flex",
            width: "50px",
            height: "auto",
            borderRight: "1px solid lightgrey",
            justifyContent: "center",
            marginTop: "100px",
          }}
          onMouseEnter={() => setOpenDrawer(true)}
        >
          <MdKeyboardArrowRight size={32} style={{ marginTop: "30px" }} />
        </Box>
      )}
      <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <DivContainer opendrawer={openDrawer}>
          <AlertBox>
            {alert.show ? <Alert severity="info">{alert.message}</Alert> : null}
          </AlertBox>
          <ItemList />
        </DivContainer>
      </Box>
    </Box>
  );
};

export default ItemListContainer;
