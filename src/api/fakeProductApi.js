let products = [
  { id: 1, name: 'Laptop', description: 'A powerful laptop', quantity: 5 },
  { id: 2, name: 'Phone', description: 'A smart phone', quantity: 10 },
];

export const getProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 500);
  });
};

export const updateProduct = (updatedProduct) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = products.findIndex(p => p.id === updatedProduct.id);
      if (updatedProduct.quantity < 0) {
        reject(new Error('Quantity cannot be less than 0'));
      } else {
        products[index] = { ...products[index], ...updatedProduct };
        resolve(products[index]);
      }
    }, 500);
  });
};
