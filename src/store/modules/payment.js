
const payment = {
    state:()=>({
        allPayment:[],
        payment:{}
    }),
    getters:{
        allPayment(state){
            return state.allPayment
        },
        payment(state){
            return state.payment
        }
    },
    mutations:{
        allPayment(state,payload){
            state.allPayment = payload
        },
        payment(state,payload){
            state.payment = payload
        },
        addPayment(state,payload){
            state.allPayment.push(payload)
        },
        savePaymant(state,payload){
            state.allPaymants = state.allPaymants.map(paymant =>{
                if(paymant._id === payload._id){
                    return payload
                }
                return paymant
            })
        },
        // delete(state,payload){
        //     state.allPaymants = state.allPaymants.filter(paymant => {
        //         if(paymant._id === payload) return false
        //         return paymant
        //     })
        // }
    },
    actions:{
        allPayment(context){
            context.dispatch('getAxios','payment')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allPayment', res.data)
                }
            })
        },
        createPayment(context,payload){
            context.dispatch('postAxios',{
                url:'payment/create',
                data:payload
            })
            .then(res =>{
            if(res.status === 200){
                context.commit('addPayment', res.data)
            }
            })
        },
        editPaymant(context,payload){
            return context.dispatch('getAxios',`paymant/edit/${payload}`)
        },
        savePaymant(context,payload){
            context.dispatch('postAxios',{
                url:`paymant/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('savePaymant', payload)
                }
            })
        },
        // deletePaymant(context,payload){
        //     context.dispatch('deleteAxios',`paymant/delete/${payload}`)
        //     .then(res =>{
        //         if(res.status === 200){
        //             context.commit('delete', payload)
        //         }
        //     })    
        // }
    }

}
export default payment