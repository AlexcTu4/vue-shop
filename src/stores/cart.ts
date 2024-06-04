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
        return Object.keys(obj).map((key, index) => {
            return {
                ...obj[key],
                totalPrice: parseFloat((obj[key].price * obj[key].qty).toFixed(2)),
                index: index + 1
            }
        })
        }
    );
    const cartCount = computed(() => cartProductMap.value.size);
    const cartTotalPrice = computed(() => {
        return  cartProducts.value.reduce((summ, item)=> {
            return  parseFloat((summ + item.totalPrice).toFixed(2))
        }, 0)
    });


    function add(product: IProduct, qty: number) {
        return new Promise((resolve, reject)=>{
            // Тут должен быть запрос на сервер на добавление товара. Сделал вероятность ошибки ответа от сервера
            setTimeout(()=>{
                if(getRandomBool()){
                    const item = cartProductMap.value.get(product.id + '');

                    if (item) {
                        item.qty++;
                    } else {
                        cartProductMap.value.set(product.id + '', {...product, qty: 1});
                    }
                    localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
                    resolve(true);
                }
                else{
                    reject('Ошибка добавления товара в корзину');
                }
            }, 500)
        })


    }

    function setQty(product: ICartProduct){

        if(product.qty === 0){
            cartProductMap.value.delete(product.id + '')
        }
        else{
            cartProductMap.value.set(product.id + '', {...product, qty: product.qty});
        }

        localStorage.setItem('cart', JSON.stringify(Object.fromEntries(cartProductMap.value)))
    }

    function isInCart(product: IProduct) {
        return !!cartProductMap.value.get(product.id + '');
    }

    async function order(){
        return  new Promise((resolve, reject)=>{
            // Тут должен быть запрос на сервер на создание заказа. Сделал вероятность ошибки ответа от сервера
            setTimeout(()=>{
                if(getRandomBool()){
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

    function getRandomBool(){
        return !!(Math.floor(Math.random() * 5));
    }



    return {cartProducts, cartCount, cartTotalPrice, cartProductMap,  add, setQty, isInCart, order, clearCart}
})
