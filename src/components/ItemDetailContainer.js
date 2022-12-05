import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import ItemDetail from "./ItemDetail";
import { productsArray } from "../data/Array";
import { getItemById } from "../app/api";
import { useProducts } from "../context/ProductsContext";

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [products, setProducts] = useProducts();
  useEffect(() => {
    const getItemByIdApi = async () => {
      let product = await getItemById(id);
      const productStock = products.find(
        (producto) => producto.id === product.id
      ).stock;
      product = { ...product, stock: productStock };
      setProductDetail(product);
    };
    getItemByIdApi();
  }, []);
  return (
    <>
      {productDetail ? (
        <ItemDetail
          products={products}
          setProducts={setProducts}
          productDetail={productDetail}
          setProductDetail={setProductDetail}
        />
      ) : null}{" "}
    </>
  );
};

export default ItemDetailContainer;
