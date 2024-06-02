import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {IProduct} from "@/types/product";
import {useFilterStore} from "@/stores/filter";

export const useProductsListStore = defineStore('productsList', () => {
    const products = ref();
    const categoryName: Ref<string> = ref('Все категории')

    function getProductsData(category = 'Все категории', minPrice, maxPrice) {
        console.log(category, minPrice, maxPrice)
        fetch(`${import.meta.env.VITE_BASE_API_URL}products/${category === 'Все категории' ? '' : `category/${category}`}`)
            .then(response => response.json())
            .then(data => {
                let minPriceCatalog;
                let maxPriceCatalog;
                // если хоть один параметр указан, фильтруем товары
                if (!!minPrice || !!maxPrice) {
                    products.value = data.reduce((arr, item) => {
                        if (item.price >= (minPrice || 0) && item.price <= (maxPrice || Infinity)) {
                            arr.push(item);
                        }
                        return arr;
                    }, [])
                } else {
                    products.value = data;
                }
                // если хоть один параметр не указан, ищем мин или макс на основе товаров
                if (!(!!minPrice && !!maxPrice)) {
                    [minPriceCatalog, maxPriceCatalog] = getMaxMinPrice();
                }
                const storeFilter = useFilterStore();
                const {setMaxPrice, setMinPrice} = storeFilter;
                // либо входящие границы выставляем, либо найденные в товарах
                setMinPrice(minPrice || minPriceCatalog);
                setMaxPrice(maxPrice || maxPriceCatalog);
                categoryName.value = category;

            });
    }

    function getMaxMinPrice() {
        return products?.value?.reduce((MinMaxPrice, item) => {
            if (MinMaxPrice[1] < item.price) {
                MinMaxPrice[1] = item.price;
            }
            if (MinMaxPrice[0] > item.price) {
                MinMaxPrice[0] = item.price;
            }
            return MinMaxPrice;
        }, [products?.value[0]?.price || 100000, 0]);
    }

    getProductsData();
    return {products, categoryName, getProductsData}
})
