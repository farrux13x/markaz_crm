<template>
<div>
    hello
</div>
</template>

<script>

export default {
    computed:{
        allWorkers(){
            return this.$store.getters.allWorkers
        },
        allGroups(){
            return this.$store.getters.allGroups
        }
    },
    mounted(){
        this.$store.dispatch('active',1)
    }
}
</script>
