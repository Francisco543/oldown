

const calcularTotal = (cart) => {
   const total =  cart.reduce((acc,producto) => {return acc + (producto.quantity * producto.price)},0);
  
   return total
}

export {calcularTotal}