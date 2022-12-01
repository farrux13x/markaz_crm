<template>
    <div>
        <el-row justify="space-between" class="mb-20">
            <h1>Kassa</h1>
            <el-button type="primary" @click="(toggle=!toggle,toggleBtn = true,payment={})">
                <el-icon>
                    <Plus/>
                </el-icon>
                qo'shish
            </el-button>
        </el-row>
        <el-dialog v-model="toggle" width="500px" title="Kassa">
            <el-form v-model="payment">
                <el-form-item label="o'quvchi">
                    <el-select v-model="payment.pupil" placeholder="tanlash">
                        <el-option v-for="item of pupils"
                        :key="item._id"
                        :label="item.name"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="Gruppa">
                    <el-select v-model="payment.group" placeholder="tanlash">
                        <el-option v-for="item of groups"
                        :key="item._id"
                        :label="item.title"
                        :value="item._id"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="summa">
                    <el-input-number v-model="payment.summa"/>
                </el-form-item>
                <el-form-item label="kun">
                    <el-date-picker
                        v-model="payment.data"
                        type="date"
                        placeholder="Pick a day"
                    />
                </el-form-item>
                <el-form-item label="to'lov turi">
                    <el-select v-model="payment.typepayment" placeholder="tanlash">
                        <el-option v-for="item,index of type"
                        :key="index"
                        :label="item"
                        :value="item"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="izoh">
                    <el-input
                        :rows="2"             
                        v-model="payment.comment"
                        type="textarea"
                        placeholder="Please input"
                        />
                </el-form-item>
                <el-form-item>
                    <el-button v-show="toggleBtn" @click="add" type="primary">
                        Saqlash
                    </el-button>
                    <el-button v-show="!toggleBtn" type="primary" @click="change">Change</el-button>
                </el-form-item>
            </el-form>
            {{payment}}
        </el-dialog>
        
        {{allPayment}}

        <el-table :data="allPayment" height="481">
            <el-table-column label="Guruh" prop='group.title' />
            <el-table-column label="O'quvchi" prop='pupil.name' />
            <el-table-column label="summa" prop="historysumma[0].summa"/>
            <el-table-column label="kun">
                <template #default="scope">
                    {{format(scope.row.historysumma[0].data)}}
                </template>
            </el-table-column>
            <el-table-column label="to'lov turi" prop="historysumma[0].typepayment" />
            <el-table-column label="Izoh" prop="historysumma[0].comment" />
            <el-table-column align="right">
            <template #default="scope">
                <el-button size="small" @click="handleEdit(scope.row._id)"
                    >Edit
                </el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.row._id)"
                    >Delete
                </el-button
                >
            </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default{
    data(){
        return{
            toggle:false,
            toggleBtn:true,
            type:['naqd','plastik','online'],
            payment:{
                group:"",
                pupil:"",
                summa:0,
                data:'',
                typepayment:'',
                comment:''
            }
        }
    },
    methods:{
        format(data){
            let forma = new Date(data)
            return `${forma.getFullYear(data)}.${forma.getMonth(data)+1}.${forma.getDay(data)} ${forma.getHours(data)}:${forma.getMinutes(data)}`
        },
        add(){
            this.$store.dispatch('createPayment',this.payment)
            this.toggle = !this.toggle
        },
        change(){
            this.$store.dispatch("savePaymant",this.group)
            this.toggle = !this.toggle
            this.payment = {}
        },
        handleDelete(id){
            this.$store.dispatch('deletePaymant',id)
            // this.allPayment.forEach(element => {
            //     if(element.group._id === id){
            //         this.$store.dispatch('delete')
            //     }
            // })
        },
        handleEdit(id){
            this.toggleBtn = false
            this.$store.dispatch('editPaymant', id)
            .then(res =>{
                if(res.status === 200){
                    this.payment = res.data
                    this.payment.status = res.data.status.toString()
                    this.toggle = true
                }
            })
        }
    },
    computed:{
        groups(){
            return this.$store.getters.allGroups
        },
        pupils(){
            return this.$store.getters.allPupils
        },
        allPayment(){
            return this.$store.getters.allPayment
        }
    },
    mounted(){
        this.$store.dispatch('active',7)
    }
}
</script>