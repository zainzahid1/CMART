import axios from '../../axios-orders';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure();

const initState = {
    orders: [],
    totalPrice: 0,
    totalQuantities: 0
}

const CartReducer = (state = initState, action) => {
    let findPro;
    let index;
    switch(action.type){
        case 'ADD_TO_CART':
            const {c,quantity} = action.payload;
            const check = state.orders.find(pr => pr.id === c.id);
            if(check){
                toast.info("Item is already added into te cart ")
                return state;
            } else {
                const Tprice = state.totalPrice + c.price * quantity;
                const Tquantities = state.totalQuantities + quantity;
                c.quantity = quantity;
                const data = {
                    customer_id: localStorage.getItem('Id'),
                    name: c.name,
                    price: c.price,
                    description: c.description,
                    quantity: quantity,
                    total: c.price * quantity,
                    productId : c.id
                }
                axios.post('/UserPortal/CartItems/cart_items.php', data )
                    .then((response) => {
                      console.log(response.data);
                    })
                return {
                    ...state, orders: [...state.orders, c],
                    totalPrice: Tprice, 
                    totalQuantities: Tquantities,
                }
               
    
            }
           

        case 'INC':
            
          findPro = state.orders.find(product => product.id === action.payload);
          index = state.orders.findIndex(product => product.id === action.payload);

          findPro.quantity += 1;
          state.orders[index] = findPro;
          const updatedQuantity = {
            customer_id: localStorage.getItem('Id'),
            quantity: action.payload2 + 1,
            product_id : action.payload,
            total: ((findPro.price) * (action.payload2 + 1))
        }
        axios.post('/UserPortal/CartItems/item_increment.php', updatedQuantity )
            .then((response) => {
              console.log(response.data);
            })
          return {
              ...state,
              totalPrice : state.totalPrice - (-findPro.price) , totalQuantities: state.totalQuantities + 1,
          }
         
      

        case "DEC":
        findPro = state.orders.find(product => product.id === action.payload);
        index = state.orders.findIndex(product => product.id === action.payload);
        const updatedQuantity2 = {
            customer_id: localStorage.getItem('Id'),
            quantity: action.payload3 - 1,
            product_id : action.payload,
            total: ((findPro.price) * (action.payload3 - 1))
        }
        axios.post('/UserPortal/CartItems/item_increment.php', updatedQuantity2 )
            .then((response) => {
              console.log(response.data);
            })

        if(findPro.quantity > 1){
           findPro.quantity -= 1;
           state.orders[index] = findPro;

         
           return {
               ...state,
               totalPrice: state.totalPrice - findPro.price, totalQuantities: state.totalQuantities - 1,
           }
        } else {
            return state;
        }
       
        case 'REMOVE':
        findPro = state.orders.find(product => product.id === action.payload);
        const filtered = state.orders.filter(product => product.id !== action.payload);
        const data = {
            customer_id: localStorage.getItem('Id'),
            quantity: state.totalQuantities,
            total: state.totalPrice,
            productId : action.payload
        }
        axios.post('/UserPortal/CartItems/remove_cart_items.php', data )
        .then((response) => {
          console.log(response.data);
        }) 
        return {
            ...state,
            orders: filtered,
            totalPrice: state.totalPrice - findPro.price * findPro.quantity, totalQuantities: state.totalQuantities - findPro.quantity
        }
        case 'EMPTY':
        return {
            ...state,
            orders: [],
            totalPrice: 0, totalQuantities: 0,

        }
        default: 
        return state;
    }

}
export default CartReducer;