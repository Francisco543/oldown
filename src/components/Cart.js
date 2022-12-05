import React from "react";
import { Avatar, Box, Modal, Typography } from "@mui/material";
import styled from "@emotion/styled";
import ProductsInCart from "./ProductsInCart";
import { useMyContext } from "../context/CartContext";
import { Button } from "@mui/material";
import { useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useForm } from "react-hook-form";
import { calcularTotal } from "../utils";

const ContainerProducts = styled(Box)`
  display: flex;
  flex-direction: column;
  padding: 10px;
  justify-content: center;
  align-items: center;
`;

const BuyButton = styled(Button)`
  width: 100px;
  height: 40px;
  margin-top: 30px;
`;

const ControlForm = styled(FormControl)`
  width: 70%;
`;

const ModalContainer = styled(Box)`
  width: 50%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background-color: #ebebeb;
  height: 50%;
`;

const Cart = () => {
  const [cart] = useMyContext(null);
  const [openModal, setOpenModal] = useState();
  const [checkout, setCheckout] = useState(false);
console.log(cart)
  const { register, getValues, handleSubmit } = useForm();
const [pagar,setPagar] = useState(false)
  const handleBuy = () => {
    setOpenModal(true);
  };

  const onSubmit = () => {
    const values = getValues();
    const total = calcularTotal(cart);
    const order = {
      buyer: { email: values.email, phone: values.phone, name: values.name },
      items: cart,
      total: total,
      date: new Date(),
    };
    //createItem(order);
    setCheckout(true);
  };

  const handlePagar = () => {}

  return (
    <>
      {openModal && (
        <Modal open={openModal} onClose={() => setOpenModal(false)}>
          {!checkout ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalContainer>
                <AiFillCloseCircle
                  cursor="pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  style={{ position: "absolute", right: "20px", top: "20px" }}
                ></AiFillCloseCircle>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                    height: "100%",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Typography variant="h5">COLOQUE SUS DATOS</Typography>
                  <ControlForm>
                    <InputLabel htmlFor="my-input">Email</InputLabel>
                    <Input
                      {...register("email", { required: true })}
                      id="my-input"
                      aria-describedby="my-helper-text"
                    />
                  </ControlForm>
                  <ControlForm>
                    <InputLabel htmlFor="my-input">
                      Nombre y apellido
                    </InputLabel>
                    <Input
                      {...register("name", { required: true })}
                      id="my-input"
                      aria-describedby="my-helper-text"
                    />
                  </ControlForm>
                  <ControlForm>
                    <InputLabel htmlFor="my-input">
                      Numero de telefono
                    </InputLabel>
                    <Input
                      {...register("phone", { required: true })}
                      id="my-input"
                      aria-describedby="my-helper-text"
                    />
                  </ControlForm>
                  <Box sx={{ display: "flex", gap: "20px" }}>
                    <Button type="submit">Siguiente</Button>
                    <Button
                      onClick={() => {
                        setOpenModal(false);
                      }}
                    >
                      Cancelar
                    </Button>
                  </Box>
                </Box>
              </ModalContainer>
            </form>
          ) : (
            <Box>
              <ModalContainer>
                <Box sx={{display:'flex', justifyContent:'center',alignItems:'center', height:'100%', flexDirection:'column'}}>
                <AiFillCloseCircle
                  cursor="pointer"
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  style={{ position: "absolute", right: "20px", top: "20px" }}
                />
                <Box sx={{overflowY:'scroll', display:'flex', justifyContent:'flex-start', alignItems:'flex-start', flexDirection:'column', gap:'20px', width:'100%', padding:'30px', maxHeight:'70%'}}>
                 
                  {cart.map((item, index)=>{
                    return(
                      <Box key={index} sx={{display:'flex', gap:'20px', alignItems:'center', width:'100%'}} >
                          <Typography variant="body1">{index + 1}</Typography>
                        <Avatar size={70} src={item.image}></Avatar>
                        <Typography variant="body1">{item.title}</Typography>
                        <Typography variant="body2">x {item.quantity}</Typography>
                        <Typography variant="body2"> {item.quantity * item.price}</Typography>
                      </Box>
                    )
                  })}
              
                </Box>
                <Box sx={{ display:'flex', gap:'20px', justifyContent:'space-between', width:'100%', padding:'10px'}}>
                  <Typography  variant="h6">Total: ${calcularTotal(cart).toFixed(2)}</Typography>
                  <Button onClick={handlePagar}>Pagar</Button>
                  </Box>
                </Box>
              </ModalContainer>
            </Box>
          )}
        </Modal>
      )}
      {cart ? (
        <ContainerProducts>
          <ProductsInCart />
          {cart.length ? (
            <BuyButton
              onClick={handleBuy}
              color={"secondary"}
              variant="contained"
            >
              Buy
            </BuyButton>
          ) : (
            <Typography>Empty</Typography>
          )}
        </ContainerProducts>
      ) : (
        <Typography>No tienes ningun producto en el carrito.</Typography>
      )}
    </>
  );
};

export default Cart;
