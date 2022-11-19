<template>
  <div :class="{'white common-layout':toggle,'black common-layout':!toggle}">
    <el-container>
    <el-aside :class="{'white ':toggle,'blacka':!toggle}" :width="`${tog?'230px':'58px'}`">      
      <AsideSide :class="{'white ':toggle,'black':!toggle}" :toggle="toggle"/>
    </el-aside>
    <el-container>
      <el-header>
        <HeaderSide @change="(item) =>{toggle = item}"/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideSide from './components/AsideSide.vue';
import HeaderSide from './components/HeaderSide.vue';

export default {
  data(){
    return{
      toggle:true
    }
  },
  components:{
    AsideSide,
    HeaderSide
  },
  computed:{
    tog(){
      return this.$store.getters.tog
    }
  },
  mounted(){
    if(this.$cookies.isKey('tog')){
      this.$store.dispatch('tog',this.$cookies.get('tog'))
    }
    this.$store.dispatch('allDirections')
    this.$store.dispatch('allPupils')
    this.$store.dispatch('allWorkers')
    this.$store.dispatch('allGroups')
    this.$store.dispatch('allSpendings')
  }
}
</script>

<style lang="scss">
@import '@/styles/app.scss';
</style>
