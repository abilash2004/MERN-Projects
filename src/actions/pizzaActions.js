import axios from "axios";
export const getAllPizzas = () => async dispatch => {

    dispatch({ type: 'GET_PIZZAS_REQUEST' })

    try {
        const response = await axios.get('https://pizzzaa.onrender.com/api/pizzas/getallpizzas')
        console.log(response);
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: response.data })

    } catch (error) {
        dispatch({ type: 'GET_PIZZAS_FAILED', payload: error })
    }

}

export const filterPizzas = (searchkey, category) => async dispatch => {


    dispatch({ type: 'GET_PIZZAS_REQUEST' })

    try {
        var filteredPizzas;
        const response = await axios.get('https://pizzzaa.onrender.com/api/pizzas/getallpizzas')
        filteredPizzas = response.data.filter(pizza => pizza.name.toLowerCase().includes(searchkey))

        if (category != 'all') {
            filteredPizzas = response.data.filter(pizza => pizza.category.toLowerCase() == category)

        }
        dispatch({ type: 'GET_PIZZAS_SUCCESS', payload: filteredPizzas })
    } catch (error) {
        dispatch({ type: 'GET_PIZZAS_FAILED', payload: error })
    }

}

export const addPizza = (pizza) => async dispatch => {
    dispatch({ type: 'ADD_PIZZA_REQUEST' })
    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/pizzas/addpizza', { pizza })
        console.log(response);
        dispatch({ type: 'ADD_PIZZA_SUCCESS' })
    } catch (error) {
        dispatch({ type: 'ADD_PIZZA_FAILED', payload: error })
    }
}

export const editPizza = (editedpizza) => async dispatch => {
    dispatch({ type: 'EDIT_PIZZA_REQUEST' })
    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/pizzas/editpizza', { editedpizza })
        console.log(response);
        dispatch({ type: 'EDIT_PIZZA_SUCCESS' })
        window.location.href = '/admin/pizzaslist'
    } catch (error) {
        dispatch({ type: 'EDIT_PIZZA_FAILED', payload: error })
    }
}

export const deletePizza = (pizzaid) => async dispatch => {

    try {
        const response = await axios.post('https://pizzzaa.onrender.com/api/pizzas/deletepizza', { pizzaid })
        alert('Pizza Deleted Successfully')
        console.log(response);
        window.location.reload()
    } catch (error) {
        alert('Something went wrong')
        console.log(error);
    }


}