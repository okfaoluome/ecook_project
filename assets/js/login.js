(function () {
    //点击去注册账号的连接
    document.querySelector('#link_reg').addEventListener('click', function () {
        document.querySelector('.login-box').style.display = 'none'
        document.querySelector('.reg-box').style.display = 'block'
    })

    //点击去登录账号的连接
    document.querySelector('#link_login').addEventListener('click', function () {
        document.querySelector('.login-box').style.display = 'block'
        document.querySelector('.reg-box').style.display = 'none'
    })

    //从layui中获取form对象
    const form = layui.form
    //通过form.verify自定义校验规则
    form.verify({
        //我们既支持函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        //自定义了一个pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //校验两次密码输入是否一致的规则
        repwd: function (value) {
            const pwd = document.querySelector('.reg-box [name=password]').value
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    });


    /* 设置axios统一基地址 */
    axios.defaults.baseURL = 'http://127.0.0.1:3007'

    //监听注册表单提交
    document.querySelector('#form_reg').addEventListener('submit', function (e) {
        e.preventDefault()
        let username = document.querySelector('#form_reg [name="username"]').value
        let password = document.querySelector('#form_reg [name="password"]').value
        // console.log(username);
        // console.log(password);
        axios({
            url: '/api/reguser',
            method: 'post',
            data: { username: username, password: password },
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }无效
        }).then(res => {
            // console.log(res)
            if (res.data.status !== 0) {
                return layer.msg(res.data.message);
            }
            layer.msg(res.data.message)
            // 跳转到登录
            document.querySelector('#link_login').click()
        })
    })

    //监听登录表单提交
    document.querySelector('#form_login').addEventListener('submit', function (e) {
        e.preventDefault()
        let username = document.querySelector('#form_login [name="username"]').value
        let password = document.querySelector('#form_login [name="password"]').value
        // console.log(username);
        // console.log(password);
        axios({
            url: '/api/login',
            method: 'post',
            data: { username: username, password: password },
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded'
            // }
        }).then(res => {
            console.log(res)
<<<<<<< HEAD
            if (res.data.status !== 0) {
=======
            if (res.status !== 0) {
>>>>>>> 896976896e7b9719c62844d89711994a11ff37fe
                return layer.msg(res.data.message);
            }
            localStorage.setItem('token', res.data.token)
            layer.msg(res.data.message)
            // 跳转到后台主页
            location.href = '/index.html'
        })
    })
})();