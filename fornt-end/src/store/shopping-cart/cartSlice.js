import { createSlice } from "@reduxjs/toolkit";


let items = [];
let totalQuantity = 0;
let totalAmount = 0;

try {
  items = localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];
  totalAmount = localStorage.getItem("totalAmount") !== null
    ? JSON.parse(localStorage.getItem("totalAmount"))
    : 0;
  totalQuantity = localStorage.getItem("totalQuantity") !== null
    ? JSON.parse(localStorage.getItem("totalQuantity"))
    : 0;
} catch (error) {
  // التعامل مع الخطأ هنا، مثل تنظيف البيانات أو تعيين قيمة افتراضية
  console.error("خطأ في تحليل البيانات من localStorage:", error);
}


const setItemFunc = (item , totalAmount , totalQuantity) =>{
    localStorage.setItem("cartItems", JSON.stringify(item));
    localStorage.setItem("totalAmount", JSON.stringify(totalAmount));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
}

const initialState = {
  cartItems: items,
  totalQuantity: totalQuantity,
  totalAmount: totalAmount,
};


const cartSlice = createSlice({

    name:'cart',
    initialState,

    reducers: {

        addItem(state , action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );

            state.totalQuantity++;

            if(!existingItem)
            {

                state.cartItems.push(
                    {
                        id:newItem.id,
                        title: newItem.title,
                        image01:newItem.image01,
                        price:newItem.price,
                        quantity: 1,
                        totalPrice:newItem.price,
                    }
                );
            } else{
                existingItem.quantity++;
                existingItem.totalPrice = 
                Number(existingItem.totalPrice) + Number(newItem.price);
            }

            state.totalAmount = state.cartItems.reduce(
                (total , item) => total + Number(item.price) * Number(item.quantity), 0
            );

            setItemFunc(
                state.cartItems.map((item) => item),
                state.totalAmount,
                state.totalQuantity
              );
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.cartItems.find((item) => item.id === id);
            state.totalQuantity--;
      
            if (existingItem.quantity === 1) {
              state.cartItems = state.cartItems.filter((item) => item.id !== id);
            } else {
              existingItem.quantity--;
              existingItem.totalPrice =
                Number(existingItem.totalPrice) - Number(existingItem.price);
            }
      
            state.totalAmount = state.cartItems.reduce(
              (total, item) => total + Number(item.price) * Number(item.quantity),
              0
            );
      
            setItemFunc(
              state.cartItems.map((item) => item),
              state.totalAmount,
              state.totalQuantity
            );
    },
    deleteItem(state, action) {
        const id = action.payload;
        const existingItem = state.cartItems.find((item) => item.id === id);
  
        if (existingItem) {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
          state.totalQuantity = state.totalQuantity - existingItem.quantity;
        }
  
        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + Number(item.price) * Number(item.quantity),
          0
        );
        setItemFunc(
          state.cartItems.map((item) => item),
          state.totalAmount,
          state.totalQuantity
        );
      },
      removeAll(state , action)
      {
        state.cartItems = null;
        state.totalAmount = 0;
        state.totalQuantity = 0;

        localStorage.removeItem('cartItems')
        localStorage.removeItem('totalAmount')
        localStorage.removeItem('totalQuantity')
      }
    }
});


export const cartActions = cartSlice.actions;
export default cartSlice;
