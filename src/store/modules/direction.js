const direction = {
    state:() =>({
        allDirections:[],
        direction:{}
    }),
    getters:{
        allDirections(state){
            return state.allDirections
        },
        direction(state){
            return state.direction
        }
    },
    mutations:{
        allDirections(state,payload){
            state.allDirections = payload
        },
        direction(state,payload){
            state.direction = payload
        },
        addDirection(state,payload){
            state.allDirections.push(payload)
        },
        saveDirection(state,payload){
            state.allDirections = state.allDirections.map(direction =>{
                if(direction._id === payload._id){
                    return payload
                }
                return direction
            })
        },
        deleteDirection(state,payload){
            state.allDirections = state.allDirections.filter(direction => {
                if(direction._id === payload) return false
                return direction
            })
        }
    },
    actions:{
        allDirections(context){
            context.dispatch('getAxios','direction')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allDirections', res.data)
                }
            })
        },
        createDirection(context,payload){
            context.dispatch('postAxios',{
                url:'direction/create',
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('addDirection', res.data)
                }
            })
        },
        editDirection(context,payload){
            return context.dispatch('getAxios',`direction/edit/${payload}`)
        },
        saveDirection(context,payload){
            context.dispatch('postAxios',{
                url:`direction/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('saveDirection', payload)
                }
            })
        },
        deleteDirection(context,payload){
            context.dispatch('deleteAxios',`direction/delete/${payload}`)
            .then(res =>{
                if(res.status === 200){
                    context.commit('deleteDirection', payload)
                }
            })    
        }
    }
}

export default direction