import ErrorObject from '@vuelidate/core'

export default function errorToText(errors:  ErrorObject[]) {
   return  errors.map((item)=>item.$message).join(', ');
}