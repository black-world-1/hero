<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <el-row>
        <el-col>
          <el-button type="primary" @click="addCateList">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <zk-table
        class="zktable"
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        border
        show-index
      >
        <template slot="isok" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="(scope.row.cat_deleted) === false"
            style="color:lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color:red"></i>
        </template>
        <!-- 排序 -->
        <template slot="order" slot-scope="scope">
          <el-tag type="primary" v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <!-- 操作 -->
        <template slot="opt" slot-scope>
          <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
        </template>
      </zk-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="querinfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="querinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
    <!-- 添加商品对话框 -->
    <el-dialog title="添加商品" :visible.sync="addCateDialogVisible" width="50%" @close="addCateFormClose">
      <el-form
        ref="addCateFormRef"
        :model="addCateForm"
        :rules="addCateFormRules"
        label-width="100px"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- <span class="demonstration">hover 触发子菜单</span> -->
          <el-cascader
            v-model="cascaderModel"
            :options="parentsList"
            :props="{ expandTrigger: 'hover' ,value:'cat_id',label:'cat_name',children:'children', checkStrictly : true}"
            @change="handleChange"
            clearable
          ></el-cascader>
          </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catelist: [],
      querinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name'
        },
        {
          label: '是否有效',
          type: 'template',
          template: 'isok'
        },
        {
          label: '排序',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          type: 'template',
          template: 'opt'
        }
      ],
      addCateDialogVisible: false,
      addCateForm: {
        // 将要添加分类的名称
        cat_name: '',
        // 父级分类的ID
        cat_pid: 0,
        // 分类的等级，默认添加的是1级分类
        cat_level: 0
      },
      parentsList: [],
      cascaderModel: [],
      addCateFormRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories', {
        params: this.querinfo
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品列表失败')
      }
      // console.log(res)
      this.catelist = res.data.result
      // 为总数据条数赋值
      this.total = res.data.total
    },
    handleSizeChange(newsize) {
      this.querinfo.pagesize = newsize
      this.getCateList()
    },
    handleCurrentChange(newnum) {
      this.querinfo.pagenum = newnum
      this.getCateList()
    },
    addCateList() {
      this.addCateDialogVisible = true
      this.getparentsList()
    },
    addCateFormClose() {
      this.$refs.addCateFormRef.resetFields()
    },
    async getparentsList() {
      const { data: res } = await this.$http.get('categories', {
        params: { type: 2 }
      })
      if (res.meta.status !== 200) return this.$message.error('获取父级分类数据失败')
      this.parentsList = res.data
    },
    handleChange() {
      console.log(this.cascaderModel)
      if (this.cascaderModel.length > 0) {
        this.addCateForm.cat_pid = this.cascaderModel[this.cascaderModel.length - 1]
        this.addCateForm.cat_level = this.cascaderModel.length
        return
      } else {
        this.addCateForm.cat_pid = 0
        this.addCateForm.cat_level = 0
      }
    },
    async addCate() {
      this.$refs.addCateFormRef.validate(async vaild => {
        if (!vaild) return
        const { data: res } = await this.$http.post('categories', this.addCateForm)
        if (res.meta.status !== 201) {
          return this.$message.error('添加失败')
        }
        this.$message.success('添加成功')
        this.getCateList()
        this.addCateDialogVisible = false
      })
    }
  }
}
</script>
<style lang="less" scoped>
.zktable {
  margin-top: 15px;
}
.el-cascader{
  width: 100%;
}

</style>
