<template>
    <h1>O'ylik</h1>
</template>
<script>
export default{
    mounted(){
        this.$store.dispatch('active',8)
    }
}
</script>