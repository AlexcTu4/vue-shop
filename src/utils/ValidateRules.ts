import {required, email, helpers} from '@vuelidate/validators'

export default function getValidateRules() {
    return {
        password: {
            required: helpers.withMessage('Заполните поле', required)
        },
        email: {
            email: helpers.withMessage('Некорректный email', email),
            required: helpers.withMessage('Заполните поле', required)
        }
    }
}