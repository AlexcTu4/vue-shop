import {ref} from 'vue'
import {defineStore} from 'pinia'
import type {IUser} from "@/types/user";
import {useVuelidate} from '@vuelidate/core'
import getValidateRules from "@/utils/ValidateRules";
import router from '@/router'

export const useUserStore = defineStore('user', () => {
    const TTL_MS =  600000; // 10мин
    const userFromLocalStorage = JSON.parse(localStorage.getItem('user'));
    if(userFromLocalStorage && userFromLocalStorage.timeStamp && (new Date().getTime() - userFromLocalStorage.timeStamp) >  TTL_MS){
        userFromLocalStorage.isAuthorized = false;
        localStorage.setItem('user', JSON.stringify(userFromLocalStorage));
    }
    const user: Ref<IUser> = ref(userFromLocalStorage || {});
    const rules = getValidateRules();

    const v$ = useVuelidate(rules, user)

    function auth(){
        v$.value.$validate().then(()=>{
            if(!v$.value.$error){
                if(user.value.email === 'test@test.ru' && user.value.password === 'test'){
                    console.log('succes')
                    user.value.isAuthorized = true;
                    user.value.timeStamp = new Date().getTime();
                    localStorage.setItem('user', JSON.stringify({...user.value, password: ''}));
                    router.push({ path: '/'})
                }
                else{
                    user.value.error = 'Неверный email или пароль'
                }
            }
        });

    }
    return { user, v$, auth }
})
