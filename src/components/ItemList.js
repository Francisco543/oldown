import React, { useEffect } from "react";
import { useState } from "react";
import Item from "./Item";
import { Skeleton, Box } from "@mui/material";
import { productsArray } from "../data/Array";
import styled from "@emotion/styled";
import { getItems } from "../app/api";
import { useProducts } from "../context/ProductsContext";

const DivContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 20px;
`;

const ItemList = () => {
  const [products, setProducts] = useProducts();

  useEffect(() => {
   
    const getItemsFromApi = async () => {
      const products = await getItems();
      setProducts(products);
    };
    if (!products.length) {
      getItemsFromApi();
    }
  }, []);

  return (
    <>
      {products.length
        ? products?.map((object, index) => {
            return (
              <Item
                properties={object}
                key={index}
                products={products}
                setProducts={setProducts}
              />
            );
          })
        : [1, 2, 3, 4, 5, 6].map(() => {
            return (
              <DivContainer sx={{ marginTop: "100px" }}>
                <Skeleton
                  variant="rectangular"
                  sx={{ width: "330px", height: "471px" }}
                />
              </DivContainer>
            );
          })}
    </>
  );
};

export default ItemList;
