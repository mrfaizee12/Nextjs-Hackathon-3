// // Product Schema:

// Copy
// Edit
// export default {
//   name: 'product',
//   type: 'document',
//   fields: [
//     { name: 'name', type: 'string', title: 'Product Name' },
//     { name: 'price', type: 'number', title: 'Price' },
//     { name: 'stock', type: 'number', title: 'Stock Level' },
//     { name: 'category', type: 'string', title: 'Category' },
//     { name: 'image', type: 'image', title: 'Product Image' }
//   ]
// };


// // Order Schema:

// export default {
//   name: 'order',
//   type: 'document',
//   fields: [
//     { name: 'customerId', type: 'string', title: 'Customer ID' },
//     { name: 'products', type: 'array', of: [{ type: 'reference', to: [{ type: 'product' }] }], title: 'Products' },
//     { name: 'paymentStatus', type: 'string', title: 'Payment Status' },
//     { name: 'orderDate', type: 'datetime', title: 'Order Date' }
//   ]
// };