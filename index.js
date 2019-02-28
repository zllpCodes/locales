import multiLang from './multiLang' //引入多语言实现模块

var lang = 'en-US'; // 假设当前选择的语言是英语，改变此变量的值切换语言包

// 传入参数，调用多语言设置函数
// 参数为：language, url, isAsync, callback, expiredTime
multiLang(lang, `/locales/${lang}/translation.json`, true, function (data) {
    document.getElementById('wrap').innerHTML = data.greet;
}, 1000 * 60 * 60);
