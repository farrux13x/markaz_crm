<template style="background:red">
    <el-row class="mt-20" justify="space-between" >
        <h1>Welcome</h1>
        <el-button @click="change" v-show="toggle">
            <el-icon><Moon /></el-icon>
        </el-button>
        <el-button @click="change" v-show="!toggle">
            <el-icon><Sunny /></el-icon>
        </el-button>
    </el-row>
</template>
<script>
export default{
    data(){
        return{
            toggle:true,
            color:'#fafafa',
            isCollapse:true
        }
    },
    methods:{
        change(){
            this.toggle=!this.toggle
            this.$emit('change',this.toggle)
        }
    }
}
</script>
<style lang="scss">

</style>