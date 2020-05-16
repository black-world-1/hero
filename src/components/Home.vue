<template>
  <el-container class="home-container">
    <el-header class="home-header">
      <div>
        <img src="../assets/heima.png" alt />
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="isTrue ? '64px' : '200px'" class="home-aside">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu background-color="#333744" text-color="#fff" active-text-color="#ffd04b" unique-opened :collapse="isTrue" :collapse-transition="false" router :default-active="activePath" >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i :class="iconsObj[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveNavState('/' + subItem.path)">
              <template slot="title"></template>
              <i class="el-icon-orange"></i>
              <span>{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="home-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: [],
      iconsObj: {
        125: 'el-icon-user-solid',
        103: 'el-icon-star-on',
        101: 'el-icon-s-goods',
        102: 'el-icon-s-order',
        145: 'el-icon-s-data'
      },
      isTrue: false,
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.menuList = res.data
      // this.$http.get('menus').then((val) => {
      //   console.log(val)
      // })
    },
    toggleCollapse() {
      this.isTrue = !this.isTrue
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>
<style lang="less" scoped>
.home-container {
  height: 100%;
}
.home-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: aliceblue;
  font-size: 20px;
  padding-left: 0;
  > div {
    display: flex;
    align-items: center;
    span {
      margin: 15px;
    }
  }
}
.home-aside {
  background-color: #333744;
  .el-menu{
    border-right: none;
  }
}
.home-main {
  background-color: #eaedf1;
}
.toggle-button {
  background-color: #4A5064;
  font-size: 12px;
  color: #fff;
  cursor: pointer;
  text-align: center;
  letter-spacing: 0.2em;
  line-height: 24px;
}
</style>
