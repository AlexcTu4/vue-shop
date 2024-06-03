import {computed, ref} from 'vue'
import {defineStore} from 'pinia'
import type {ICartProduct} from "@/types/cartProduct";
import type {IProduct} from "@/types/product";
import {Exception} from "sass";
import {useFilterStore} from "@/stores/filter";


export const useCartStore = defineStore('cart', () => {
    const cartFromLocalStorage = JSON.parse(localStorage.getItem('cart'));
    const cartProductMap: Ref<Map<ICartProduct>> = ref(new Map(Object.entries(cartFromLocalStorage || {})));
    const cartProducts = computed<ICartProduct[]>(() => {
        const obj = Object.fromEntries(cartProductMap.value);
        return Object.keys(obj).map((key) => {
            return {...obj[key],totalPrice: parseFloat((obj[key].price * obj[key].qty).toFixed(2))}
        })
        }
    );
    const cartCount = computed(() => cartProductMap.value.size);
    const cartTotalPrice = computed(() => {
        return  cartProducts.value.reduce((summ, item)=> {
            console.log(summ, item.totalPrice);
            return  parseFloat((summ + item.totalPrice).toFixed(2))
        }, 0)
    });


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

    function setQty(product: ICartProduct){

        // const item = cartProducts.value.find((item)=> item.id === product.id);
        const item = cartProductMap.value.get(product.id);
        if(product.qty === 0){

        }
        else{
            cartProductMap.value.set(product.id, {...product, qty: product.qty});
        }


        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
    }

    function isInCart(product: IProduct) {
        return !!cartProductMap.value.get(product.id);
    }

    function getCount() {
        return cartProductMap.value.size;
    }

    async function order(){
        return  new Promise((resolve, reject)=>{
            // Тут должен быть запрос на сервер на создание заказа
            setTimeout(()=>{
                if(Math.floor(Math.random() * 2)){
                    resolve(true);
                }
                else{
                    reject('Ошибка создания заказа');
                }
            }, 1000)

        });

    }

    function clearCart(){
        cartProductMap.value.clear();
        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
    }



    return {cartProducts, cartCount, cartTotalPrice,  add, setQty, isInCart, order, clearCart}
})
