<template>
    <div>
        
        <el-menu
        :default-active="`${active}`"
        :collapse="isCollapse"
        :class="{'white el-menu-vertical-demo':toggle,'aa el-menu-vertical-demo':!toggle}"
        >
            <el-radio-group v-model="isCollapse" size="small" border="true" style="margin-bottom: 20px">
                <el-radio-button v-show="tog" @click="toga(false)" :label="true"><el-icon size="16px"><ArrowLeft /></el-icon></el-radio-button>
                <el-radio-button  v-show="!tog" @click="toga(true)" :label="false"><el-icon size="16px"><ArrowRight/></el-icon></el-radio-button>
            </el-radio-group>
            <el-menu-item index="1" @click="$router.push('/')">
                <el-icon><House /></el-icon>
                <span>Home</span>
            </el-menu-item>
            <el-menu-item index="2" @click="$router.push('/workers')">
                <el-icon color="white"><SuitcaseLine /></el-icon>
                <span>xodimlar bo'limi</span>
            </el-menu-item>
            <el-menu-item index="3" @click="$router.push('/direction')">
                <el-icon color="red"><Aim /></el-icon>
                <span>yo'nalish</span>
            </el-menu-item>
            <el-menu-item index="4" @click="$router.push('/group')">
                <el-icon><Connection default/></el-icon>
                <span>kurslar/guruh</span>
            </el-menu-item>
            <el-menu-item index="5" @click="$router.push('/students')">
                <el-icon><User /></el-icon>
                <span>o'quvchilar</span>
            </el-menu-item>
            <el-menu-item index="6" @click="$router.push('/outlay')">
                <el-icon><Sell /></el-icon>
                <span>chiqimlar bo'limi</span>
            </el-menu-item>
            <el-menu-item index="7" @click="$router.push('/cash')">
                <el-icon><Wallet /></el-icon>
                <span>kassa</span>
            </el-menu-item>
            <el-menu-item index="8" @click="$router.push('/salary')">
                <el-icon><Money /></el-icon>
                <span>xodimlarga oylik berish</span>
            </el-menu-item>
            <el-menu-item index="9" @click="$router.push('/pay')">
                <el-icon color="white"><Memo /></el-icon>
                <span>hisobot bo'limi</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>
<script>
export default{
    props:['toggle'],
    data(){
        return{
            // toga:'',
            isCollapse:false
        }
    },
    computed:{
        active(){
            return this.$store.getters.active
        },
        tog(){
            return this.$store.getters.tog
        }
    },
    methods:{
        toga(value){
            this.$cookies.set('tog',value)
            setTimeout(()=>{this.$store.dispatch('tog',value)}, 250);
        }
    },
    mounted(){
        if(this.$cookies.isKey('tog')){
            this.$store.dispatch('tog',this.$cookies.get('tog'))
        }
    }
}
</script>
<style lang="scss">
.el-menu-vertical-demo.black{
    background: black;
}
.el-menu-vertical-demo.aa{
    border-right-width: 0px;
    background-color: #677da5;
    .el-menu-item {
        color: white;
    }
    .el-menu-item:hover {
            color:black;
            background-color: #8190ac;
        }
}

</style>