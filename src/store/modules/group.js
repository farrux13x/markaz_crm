const group = {
    state:() =>({
        allGroups:[{
            direction:{title:''}
        }],
        group:{}
    }),
    getters:{
        allGroups(state){
            return state.allGroups
        },
        group(state){
            return state.group
        }
    },
    mutations:{
        allGroups(state,payload){
            state.allGroups = payload
        },
        group(state,payload){
            state.group = payload
        },
        addGroup(state,payload){
            state.allGroups.push(payload)
        },
        saveGroup(state,payload){
            state.allGroups = state.allGroups.map(group =>{
                if(group._id === payload._id){
                    return payload
                }
                return group
            })
        },
        deleteGroup(state,payload){
            state.allGroups = state.allGroups.filter(group => {
                if(group._id === payload) return false
                return group
            })
        }
    },
    actions:{
        allGroups(context){
            context.dispatch('getAxios','group')
            .then(res =>{
                if(res.status === 200){
                    context.commit('allGroups', res.data)
                }
            })
        },
        createGroup(context,payload){
            context.dispatch('postAxios',{
                url:'group/create',
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    // context.allDirections.find(item=>item._id == res.data.direction)
                    context.commit('addGroup', res.data)
                }
            })
        },
        editGroup(context,payload){
            return context.dispatch('getAxios',`group/edit/${payload}`)
        },
        saveGroup(context,payload){
            context.dispatch('postAxios',{
                url:`group/save/${payload._id}`,
                data:payload
            }).then(res =>{
                if(res.status === 200){
                    context.commit('saveGroup', payload)
                }
            })
        },
        deleteGroup(context,payload){
            context.dispatch('deleteAxios',`group/delete/${payload}`)
            .then(res =>{
                if(res.status === 200){
                    context.commit('deleteGroup', payload)
                }
            })    
        }
    }
}

export default group