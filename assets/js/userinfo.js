//通过form.verify自定义校验规则
const form = layui.form
form.verify({
    //我们既支持函数式的方式，也支持下述数组的形式
    //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
    //自定义了一个pwd的校验规则
    nickname: function (value) {
        if (value.length > 6) {
            return '昵称长度必须在 1 ~ 6 个字符之间！'
        }
    }
});


/* 设置axios统一基地址 */
axios.defaults.baseURL = 'http://127.0.0.1:3007'
//获取用户信息的函数
function initUserInfo() {
    axios({
        url: '/my/userinfo',
        method: 'get',
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    }).then(res => {
        //成功回调
        // console.log(res)
        form.val('formUserInfo', res.data.data)
    })
}
//调用函数
initUserInfo()

//重置表单信息
document.querySelector('#btnReset').addEventListener('click', function (e) {
    e.preventDefault()
    initUserInfo()
})

//发起请求更新用户信息
document.querySelector('.layui-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const id = document.querySelector('[name="id"]').value
    const nickname = document.querySelector('[name="nickname"]').value
    const email = document.querySelector('[name="email"]').value
    axios({
        url: '/my/userinfo',
        method: 'post',
        data: { id: id, nickname: nickname, email: email },
        // headers 就是请求头配置对象
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    }).then(res => {
        //成功回调
        // console.log(res)
        if (res.data.status !== 0) {
            return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        window.parent.getUserInfo()
    })
})