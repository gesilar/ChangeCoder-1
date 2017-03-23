const async = require('async');
const mongoose = require('mongoose');
const http = require('http');
const cheerio = require('cheerio');
const iconv = require("iconv-lite");

const config = require("../config");

const startCatch = () => {
    const db =mongoose.createConnection(config.connectUrl);
    db.on('err', () => {
        console.log(`connect error, info: ${err}`);
    });
    db.on('open', () => {
        console.log(`connected successfully`);
        startPost(db);
    })
};

const SaveArticle = (article, db) => {
    const ArticleScheme = new mongoose.Schema({
        name: String,
        sourceUrl: String,
        chapterList: []
    });
    const ArticleModel = db.model('Article', ArticleScheme);
    const articleEntity = new ArticleModel({
        name: article.name,
        sourceUrl: article.sourceUrl,
        chapterList: article.chapterList
    });
    articleEntity.save().then(function(doc){
        console.log(`${doc.name} has been saved`);
    });
};

const startPost = (db) => {
    const article = {name: "霸天战皇", sourceUrl: "http://www.boluoxs.com/biquge/9/9885/"};
    http.get('http://www.boluoxs.com/biquge/9/9885/', (res) => {
        let html = '';
        article.chapterList = [];
        res.on('data', (data) => {
            html += iconv.decode(data, 'gb2312');
        });
        res.on('end', () => {
            const $ = cheerio.load(html);
            const $chapterList = $('.article li');
            $chapterList.map((index) => {
                const chapter = $($chapterList[index]);
                const option = {};
                option.name = chapter.find('a').text();
                option.url = 'http://www.boluoxs.com/biquge/9/9885/' + chapter.find('a').attr('href');
                article.chapterList.push(option);
            });
            asyncAction(article, db);
        });
    }).on('error', (e) => {
        console.log(`错误: ${e.message}`);
    });
}

const asyncAction = (article, db) => {
    async.eachSeries(article.chapterList, (item, callback) => {
        setTimeout(saveChapter, 100, item, callback);
    }, (err, result) => {
        if (err) {
            console.log(`错误: ${e.message}`);
        } else {
            SaveArticle(article, db);
        }
    });
}

const saveChapter = (chapter, callback) => {
    console.log(chapter.url);
    http.get(chapter.url, (res) => {
        if (res.statusCode === 200) {
            let rawData = '';
            res.on('data', (data) => {
                rawData += iconv.decode(data, 'gb2312');
            });
            res.on('end', () => {
                const $ = cheerio.load(rawData, {decodeEntities: false});
                const content = $('#book_text');
                chapter.content = content.html();
                console.log(`${chapter.name} is OK`);
                callback(null);
            });
        }
    }).on('error', (e) => {
        console.log(`错误: ${e.message}`);
        callback(false);
    });
};

startCatch();