import {defineStore} from 'pinia'
import {computed, ref} from 'vue'
import type {IFilter} from "@/types/filter";
import {useVuelidate} from "@vuelidate/core";
import {helpers, minValue} from '@vuelidate/validators'
import {useProductsListStore} from "@/stores/productsList";


export const useFilterStore = defineStore('filter', () => {

    const defaultFilter = {
        category: 'Все категории',
        minPrice: 0,
        maxPrice: 0,
        userInputMinPrice: false,
        userInputMaxPrice: false,
    };
    /**
     * данные для фильра по категориям
     */
    const categoriesData: Ref<string[]> = ref(['Все категории']);

    /**
     * выбранные фильтры
     */
    const filterData: Ref<IFilter> = ref(Object.assign({}, defaultFilter));
    /**
     * выбранная мин цена
     */
    const filterMinValue = computed<number>(() => filterData.value.minPrice);

    /**
     * флаг загрузки
     */
    const loading = ref(false);

    const storeProductsList = useProductsListStore();
    const {getProductsData} = storeProductsList;

    const rules = {
        maxPrice: {
            minValue: helpers.withMessage('Цена ниже мин. цены', minValue(filterMinValue))
        },
        minPrice: {
            minValue: helpers.withMessage('Цена ниже мин. цены', minValue(0))
        }
    }
    const v$ = useVuelidate(rules, filterData);

    function getCategoryData() {
        fetch(`${import.meta.env.VITE_BASE_API_URL}products/categories`)
            .then(response => response.json())
            .then(data => {
                categoriesData.value = ['Все категории', ...data]
            });
    }

    function setMinPrice(value) {
        filterData.value.minPrice = value;
        filterData.value.userInputMinPrice = false;
    }

    function setMaxPrice(value) {
        filterData.value.maxPrice = value;
        filterData.value.userInputMaxPrice = false;
    }


    async function reset() {
        loading.value = true;
        filterData.value = Object.assign({}, defaultFilter);
        await getProductsData();
        loading.value = false;

    }

    function apply() {
        v$.value.$validate().then(async () => {
            if (!v$.value.$error) {
                loading.value = true;
                await getProductsData(filterData.value.category, filterData.value.userInputMinPrice ? filterData.value.minPrice : undefined, filterData.value.userInputMaxPrice ? filterData.value.maxPrice : undefined);
                loading.value = false;
            }
        });
    }


    getCategoryData();
    return {categoriesData, filterData, v$,loading, reset, setMaxPrice, setMinPrice, apply,}
})
