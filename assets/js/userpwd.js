var form = layui.form
//定义密码校验规则
form.verify({
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    samePwd: function (value) {
        if (value === document.querySelector('[name="oldPwd"]').value) {
            return '新旧密码不能相同！'
        }
    },
    rePwd: function (value) {
        if (value !== document.querySelector('[name="newPwd"]').value) {
            return '两次密码不一致！'
        }
    }
})
/* 设置axios统一基地址 */
axios.defaults.baseURL = 'http://127.0.0.1:3007'
//表单提交
document.querySelector('.layui-form').addEventListener('submit', function (e) {
    e.preventDefault()
    const oldPwd = document.querySelector('[name="oldPwd"]').value
    const newPwd = document.querySelector('[name="newPwd"]').value
    axios({
        url: '/my/updatepwd',
        method: 'post',
        data: { oldPwd: oldPwd, newPwd: newPwd },
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    }).then(res => {
        if (res.data.status !== 0) {
            return layer.msg('更新密码失败！')
        }
        layer.msg('更新密码成功！')
        //重置表单
        document.querySelector('[type="reset"]').click()
    })
})

