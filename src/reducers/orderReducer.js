import axios from 'axios';

export const placeOrder = (token, subtotal) => async (dispatch, getState) => {
    dispatch({ type: 'PLACE_ORDER_REQUEST' });

    const currentUser = getState().loginUserReducer.currentUser;
    const cartItems = getState().cartReducer.cartItems;

    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/orders/placeorer', {
            token,
            subtotal,
            currentUser,
            cartItems,
        });

        dispatch({ type: 'PLACE_ORDER_SUCCESS' });
        console.log(response);
    } catch (error) {
        dispatch({ type: 'PLACE_ORDER_FAILED', payload: error.message });
        console.log(error);
    }
};



export const getUserOrders = () => async (dispatch, getState) => {

    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: 'GET_USER_ORDERS_REQUEST' })

    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/orders/getuserorders', { userid: currentUser._id })


        console.log(response);

        dispatch({ type: 'GET_USER_ORDERS_SUCCESS', payload: response.data })
    } catch (error) {
        dispatch({ type: 'GET_USER_ORDERS_FAILED', payload: error })
    }

}
export const getAllOrders = () => async (dispatch, getState) => {
    const currentUser = getState().loginUserReducer.currentUser;

    dispatch({ type: 'GET_ALLORDERS_REQUEST' });

    try {
        const response = await axios.get('https://pizzzaa.onrender.com/api/orders/getallorders');

        console.log(response);
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: response.data });
    } catch (error) {
        dispatch({ type: 'GET_ALLORDERS_FAILED', payload: error });
    }
};


export const deliverOrder = (orderid) => async dispatch => {



    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/orders/deliverorder', { orderid })
        console.log(response);
        alert('Order Delivered')
        const orders = await axios.get('https://pizzzaa.onrender.com/api/orders/getallorders')
        dispatch({ type: 'GET_ALLORDERS_SUCCESS', payload: orders.data })
    } catch (error) {
        console.log(error);
    }


}

export const placeOrderReducer = (state = {}, action) => {


    switch (action.type) {
        case 'PLACE_ORDER_REQUEST': return {
            loading: true
        }
        case 'PLACE_ORDER_SUCCESS': return {
            loading: false,
            success: true
        }
        case 'PLACE_ORDER_FAILED': return {
            loading: false,
            error: action.payload
        }
        default: return state
    }

}


export const getUserOrdersReducer = (state = { oredrs: [] }, action) => {

    switch (action.type) {
        case 'GET_USER_ORDERS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_USER_ORDERS_SUCCESS': return {
            loading: false,
            orders: action.payload
        }
        case 'GET_USER_ORDERS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}


export const getAllOrdersReducer = (state = { oredrs: [] }, action) => {

    switch (action.type) {
        case 'GET_ALLORDERS_REQUEST': return {
            loading: true,
            ...state
        }
        case 'GET_ALLORDERS_SUCCESS': return {
            loading: false,
            orders: action.payload
        }
        case 'GET_ALLORDERS_FAILED': return {
            error: action.payload,
            loading: false
        }
        default: return state
    }

}

