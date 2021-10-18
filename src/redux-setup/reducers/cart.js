import { ADD_TO_CART, DELETE_CART_ITEM, UPDATE_CART } from "../../constants/action-type";

const initState = {
    items: [],
}

const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return addItem(state, action.payload)
        case DELETE_CART_ITEM:
            return deleteItem(state, action.payload)
        case UPDATE_CART: 
            return updateCart(state, action.payload)
        case 'SYNC_CART':
            return { ...state, items: action.payload }
        default:
            return state
    }
}

const updateCart = (state, payload) => {
    const items = state.items;
    const {id, qty} = payload;
    const index = items.findIndex((item) => 
        item._id === id
    )  
    const newItems = [...items]
    newItems[index].qty = qty;
    localStorage.setItem('cart_items', JSON.stringify(newItems))
    // const newItems = items.map((item) => {
    //     if(item._id === id){
    //         item.qty = qty
    //     }
    //     return item
    // })
    return {...state, items: newItems}
}

const addItem = (state, payload) => {
    const items = state.items;
    let isProductExists = false;
    const addedItems = items.map((item) => {
        if (item._id === payload._id) {
            item.qty += payload.qty
            isProductExists = true
        }
        return item

    })
    const newItems = isProductExists ? addedItems : [...items, payload]
    localStorage.setItem('cart_items', JSON.stringify(newItems))
    return { ...state, items: newItems }
}

const deleteItem = (state, payload) => {
    const items = state.items;
    const newItems = items.filter((item) => {
        return item._id !== payload.id
    })
    localStorage.setItem('cart_items', JSON.stringify(newItems))
    return { ...state, items: newItems }
}

export default cartReducer