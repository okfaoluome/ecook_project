// 1.1 获取裁剪区域的 DOM 元素
var $image = $('#image')
// 1.2 配置选项
const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
}

// 1.3 创建裁剪区域
$image.cropper(options)

//为上传按钮绑定点击事件
document.querySelector('#btnChooseImage').addEventListener('click', function () {
    document.querySelector('#file').click()
})

/* 设置axios统一基地址 */
axios.defaults.baseURL = 'http://127.0.0.1:3007'

document.querySelector('#file').addEventListener('change', function (e) {
    const filelist = e.target.files
    console.log(filelist[0]);
    if (filelist.length === 0) {
        return layer.msg('请选择照片！')
    }
    //拿到用户选择的文件
    const file = filelist[0]
    // 根据选择的文件，创建一个对应的 URL 地址：
    const newImgURL = URL.createObjectURL(file)
    // 先`销毁`旧的裁剪区域，再`重新设置图片路径`，之后再`创建新的裁剪区域`：
    $image
        .cropper('destroy')      // 销毁旧的裁剪区域
        .attr('src', newImgURL)  // 重新设置图片路径
        .cropper(options)        // 重新初始化裁剪区域


})

document.querySelector('#btnUpload').addEventListener('click', function () {
    const dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
            width: 100,
            height: 100
        })
        .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    axios({
        url: '/my/update/avatar',
        method: 'post',
        data: { avatar: dataURL },
        headers: {
            Authorization: localStorage.getItem('token') || ''
        }
    }).then(res => {
        if (res.data.status !== 0) {
            layer.msg('更新头像失败！')
        }
        layer.msg('更新头像成功')
        window.parent.getUserInfo()
    })
})