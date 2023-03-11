
/* 设置axios统一基地址 */
axios.defaults.baseURL = 'http://127.0.0.1:3007'

//获取用户基本信息
function getUserInfo() {
    axios({
        url: '/my/userinfo',
        method: 'get',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    }).then(res => {
        if (res.data.status !== 0) {
            return layui.layer.msg('获取用户信息失败！')
        }
        // 调用 renderAvatar 渲染用户的头像
        renderAvatar(res.data.data)
    })
}

// 渲染函数
function renderAvatar(user) {
    // 1. 获取用户的名称
    const name = user.nickname || user.username
    document.querySelector('#welcome').innerHTML = `欢迎&nbsp;&nbsp;${name}`
    console.log(document.querySelectorAll('.layui-nav-img'));
    if (user.user_pic !== null) {
        // 渲染用户头像
        document.querySelectorAll('.layui-nav-img').forEach(item => {
            item.src = user.user_pic
        })
        document.querySelectorAll('.text-avatar').forEach(item => {
            item.style.display = 'none'
        })
    } else {
        const first = name[0].toUpperCase()
        document.querySelectorAll('.text-avatar').forEach(item => {
            item.innerHTML = `${first}`
        })
        document.querySelectorAll('.layui-nav-img').forEach(item => {
            item.style.display = 'none'
        })
    }
}
getUserInfo()

//实现点击退出的功能
document.querySelector('#btnLogout').addEventListener('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        // 1. 清空本地存储中的 token
        localStorage.removeItem('token')
        // 2. 重新跳转到登录页面
        location.href = '/login.html'
        // 关闭 confirm 询问框
        layer.close(index)
    })
})