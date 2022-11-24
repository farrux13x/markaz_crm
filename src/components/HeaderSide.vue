<template style="background:red">
    <el-row class="mt-20" justify="space-between" >
        <div>
            {{time()}}
        </div>
        <el-button class="moon" @click="change" v-show="toggle">
            <el-icon><Moon /></el-icon>
        </el-button>
        <el-button class="sunny" @click="change" v-show="!toggle">
            <el-icon><Sunny /></el-icon>
        </el-button>
    </el-row>
</template>
<script>
export default{
    data(){
        return{
            a:'',
            toggle:true,
            color:'#fafafa',
            isCollapse:true,
            month:['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr']
        }
    },
    methods:{
        change(){
            this.toggle=!this.toggle
            this.$emit('change',this.toggle)
        },
        time(){
            let day = new Date()
            return `${day.getDate()} ${this.month[day.getMonth()]} ${day.getFullYear()}`
        }
    },
}
</script>