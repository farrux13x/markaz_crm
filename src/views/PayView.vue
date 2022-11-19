<template>
    <h1>hisobot bo'limi</h1>
</template>
<script>
export default{
    mounted(){
        this.$store.dispatch('active',9)
    }
}
</script>