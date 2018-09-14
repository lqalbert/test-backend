
const Config = {
  // 图片上传设置
  uploadConfig: {
    action: '', // 必填参数 图片上传地址
    // 必选参数 res是一个函数，函数接收response为上传成功时候服务器返回数据
    // 你必须把返回的数据中包含的图片地址 return回去
    res: (response) => {
      return response.data.fullurl
    },
    methods: 'POST', // 可选参数 图片上传方式，默认为post
    token: '', // 可选参数 如果需要token验证，假设你的token有存放在sessionStorage中
    name: 'avatar', // 可选参数 文件的参数名 默认为img
    size: '2048',
    accept: 'image/jpeg,image/png,image/jpg,image/gif', // 可选参数 可上传的图片格式
    start: () => {}, // 可选参数接受一个函数，开始上传数据时会触发
    end: () => {}, // 可选参数，接收一个函数上传数据完成（成功或者失败）时会触发
    success: () => {}, // 可选参数，接收一个函数，上传数据成功时会触发
    error: () => {}// 可选参数，接收一个函数，上传数据中断时会触发
  },
  // 一下所有设置都和vue-quill-editor本身所对应
  placeholder: '请编写产品描述', // 可选参数 富文本框内的提示语
  theme: 'snow', // 可选参数 富文本编辑器的风格
  toolOptions: [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    [{ 'header': 1 }, { 'header': 2 }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],
    [{ 'indent': '-1' }, { 'indent': '+1' }],
    [{ 'direction': 'rtl' }],
    [{ 'size': ['small', false, 'large', 'huge'] }],
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],
    [{ 'color': [] }, { 'background': [] }],
    [{ 'align': [] }],
    ['clean'],
    ['link', 'image']
  ], // 可选参数  选择工具栏的需要哪些功能  默认是全部
  handlers: {} // 可选参数 重定义的事件，比如link等事件
}

export default Config
