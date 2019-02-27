export default function (lang, url, isAsync, callback, expired) {
    var needAjax = true;
    lang = lang || 'zh-CN';

    var local_lang = localStorage.getItem(`lang_${lang}`);
    if (local_lang !== null) {
        if (new Date().getTime() <= localStorage.getItem(`lang_${lang}_expired`)) {
            needAjax = false;
            callback ? callback(JSON.parse(local_lang)) : null;
        } else {
            localStorage.removeItem(`lang_${lang}`);
            localStorage.removeItem(`lang_${lang}_expired`);
        }
    }

    if (needAjax) {
        _ajax(url, isAsync, function (data) {
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
            xhr.readyState > 3 && callback && callback(JSON.parse(xhr.responseText));
        };

        // 发送GET请求
        xhr.send(null);

    } catch (e) {
        console && console.log(e);
    }
}