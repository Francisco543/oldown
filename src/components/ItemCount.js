import React from "react";
import styled from "@emotion/styled";
import { Box, Button, Typography } from "@mui/material";
import { HiPlusSm, HiMinusSm } from "react-icons/hi";
import { useState } from "react";
import { useMyContext } from "../context/CartContext";
import { useWidgetCartContext } from "../context/WidgetCartContext";
import { useAlert } from "../context/AlertContext";

const Container = styled(Box)`
  display: flex;
  flex-direction: column;
  width: 190px;
  height: 150px;
  align-items: center;
`;

const Subcontainer = styled(Box)`
  display: flex;
  width: 170px;
  justify-content: space-between;
  background-color: white;
  border: 1px solid #e3e0e0;
  align-items: center;
  border-radius: 3px;
  margin-top: 30px;
`;

const ItemCount = ({
  product,
  detailCounter,
  setDetailCounter,
  eliminateButton,
  isFromDetail,
  products,
  setProducts,
  setProductDetail,
}) => {
  const [counter, setCounter] = useState(1);
  const [cart, setCart] = useMyContext([]);
  const [, setAlert] = useAlert();
  const [widgetCounter, setWidgetCounter] = useWidgetCartContext(0);
  
  const plusCounter = () => {
    if (counter < product.stock && !detailCounter) {
      setCounter(counter + 1);
    } else if (detailCounter < product.stock) {
      setDetailCounter(detailCounter + 1);
    }
  };
  const minCounter = () => {
    if (counter > 1 && !detailCounter) {
      setCounter(counter - 1);
    } else if (detailCounter > 1) {
      setDetailCounter(detailCounter - 1);
    }
  };
  const onAdd = async () => {
    if (counter <= product.stock) {
      const itemExist = cart.find((item) =>
        item.title === product.title ? true : false
      );
      let newCart;
      setWidgetCounter(widgetCounter + counter);
      if (itemExist) {
        newCart = cart.map((item) => {
          if (item.title === product.title) {
            return { ...item, quantity: item.quantity + counter };
          }
          return item;
        });
      } else {
        newCart = [
          ...cart,
          {
            title: product.title,
            quantity: counter,
            price: product.price,
            image: product.pictureUrl,
          },
        ];
      }
      const newProductsList = products.map((producto) => {
        if (producto.title === product.title) {
          return { ...product, stock: producto.stock - counter };
        }
        return producto;
      });
      setProducts(newProductsList);

      setCart(newCart);
      if (isFromDetail) {
        setProductDetail({ ...product, stock: product.stock - counter });
        eliminateButton(false);
      }
    } else {
      setAlert({ show: true, message: "No stock" });
    }
  };
  return (
    <Container>
      <Subcontainer>
        <HiMinusSm
          onClick={() => minCounter()}
          color={"blue"}
          style={{ cursor: "pointer" }}
        />
        <Typography>{counter}</Typography>
        <HiPlusSm
          onClick={() => plusCounter()}
          color={"blue"}
          style={{ cursor: "pointer" }}
        />
      </Subcontainer>
      <Button
        variant="outlined"
        disabled={product.stock === 0}
        sx={{ marginTop: 4, fontSize: 12 }}
        onClick={onAdd}
      >
        Agregar producto
      </Button>
    </Container>
  );
};

export default ItemCount;
