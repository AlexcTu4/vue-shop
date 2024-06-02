import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {ICartProduct} from "@/types/cartProduct";
import type {IProduct} from "@/types/product";
import {Exception} from "sass";


export const useCartStore = defineStore('cart', () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    const cartProductMap: Ref<Map<ICartProduct>> = ref(new Map(Object.entries(cartFromLocalStorage || {}) ));
    const cartProducts = computed<ICartProduct[]>(() => Object.fromEntries(cartProductMap.value));


    function add(product: IProduct, qty: number) {
        // const item = cartProducts.value.find((item)=> item.id === product.id);
        const item = cartProductMap.value.get(product.id);

        if (item) {
            item.qty++;
        } else {
            // cartProducts.value.push({...product, qty: 1});
            cartProductMap.value.set(product.id, {...product, qty: 1});
        }
        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
    }

    function remove(product: IProduct, qty: number) {
        // const item = cartProducts.value.find((item)=> item.id === product.id);
        const item = cartProductMap.value.get(product.id);

        if (item) {
            if (item.qty === 1) {
                cartProductMap.value.delete(product.id);
            } else {
                item.qty--;
            }
            localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
        } else {
            new Exception(`${product.title} отсутствует в корзине`)
        }
    }

    function isInCart(product: IProduct) {
        return !!cartProductMap.value.get(product.id);
    }

    function getCount() {
        return cartProductMap.value.size;
    }


    return {cartProducts, add, remove, isInCart, getCount}
})
