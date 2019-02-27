import multiLang from './multiLang'

var lang = 'en-US';

multiLang(lang, `/locales/${lang}/translation.json`, true, function (data) {
    document.getElementById('wrap').innerHTML = data.greet;
}, 1000 * 60 * 60);