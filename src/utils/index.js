import {BASE_URL} from '../constants/app';
export const getImageProducts = (imageName) => {
    return `${BASE_URL}/assets/uploads/products/${imageName}`
}