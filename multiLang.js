export default function (lang, url, isAsync, callback, expired) {
    // lang-标识语言的字符串
    // url-请求语言包文件的路径
    // isAsync-是否同步加载语言包
    // callback-语言包返回后执行的函数
    // expired-语言包缓存过期时间

    var needAjax = true; // 是否需要请求语言包
    lang = lang || 'zh-CN'; //当前的语言，默认为中文

    // 查看本地是否有语言包缓存
    var local_lang = localStorage.getItem(`lang_${lang}`);
    // 若本地有语言包缓存则从本地获取语言包
    if (local_lang !== null) {
        // 查看当前语言包是否超出缓存时间，若超出则删除语言包
        if (new Date().getTime() <= localStorage.getItem(`lang_${lang}_expired`)) {
            // 从本地获取语言包，则不需要发送请求获取
            needAjax = false;
            // 是否有需要执行的回调函数，执行或什么都不做
            callback ? callback(JSON.parse(local_lang)) : null;
        } else {
            // 删除本地语言包缓存
            localStorage.removeItem(`lang_${lang}`);
            localStorage.removeItem(`lang_${lang}_expired`);
        }
    }

    // 是否发送请求
    if (needAjax) {
        _ajax(url, isAsync, function (data) {
            // 将获取的语言包缓存到本地并设置过期时间
            localStorage.setItem(`lang_${lang}`, JSON.stringify(data));
            localStorage.setItem(`lang_${lang}_expired`, (new Date().getTime() + expired || 1000 * 60 * 60 * 24 * 7))
            callback ? callback(data) : null;
        });
    }
}

function _ajax(url, isAsync, callback) {
    try {
        // 根据不同浏览器，创建XHR对象
        var xhr;
        if (XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('MSXML2.XMLHTTP.3.0');
        }
        // 是否同步加载语言包
        xhr.open('GET', url, isAsync);

        // 设置HTTP的MIME类型
        if (xhr.overrideMimeType) {
            xhr.overrideMimeType("application/json");
        }

        // 设置回调函数
        xhr.onreadystatechange = function () {
            // 当存在返回数据且有回调函数时，将字符串数据解析为JSON传入回调函数
            xhr.readyState > 3 && callback && callback(JSON.parse(xhr.responseText));
        };

        // 发送GET请求
        xhr.send(null);

    } catch (e) {
        // 输出报错
        console && console.log(e);
    }
}
