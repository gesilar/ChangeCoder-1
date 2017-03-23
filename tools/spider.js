const async = require('async');
const mongoose = require('mongoose');
const http = require('http');
const cheerio = require('cheerio');
const iconv = require("iconv-lite");

const config = require("../config");

const startCatch = (article) => {
    const db =mongoose.createConnection(config.connectUrl);
    
    db.on('err', () => {
        console.log(`connect error, info: ${err}`);
    });
    db.on('open', () => {
        console.log(`connected successfully`);
        SaveArticle(article, db);
    })
};

const SaveArticle = (article, db) => {
    const ArticleScheme = new mongoose.Schema({
        name: String,
        sourceUrl: String
    });
    const ArticleModel = db.model('Article', ArticleScheme);
    const ChapterScheme = new mongoose.Schema({
        name: String,
        sourceUrl: String,
        content: String,
        articleId: mongoose.Schema.ObjectId
    });
    const ChapterModel = db.model('Chapter', ChapterScheme);
    const articleEntity = new ArticleModel({
        name: article.name,
        sourceUrl: article.sourceUrl
    });
    articleEntity.save().then(function(doc){
        if (doc) {
            console.log(`${doc.name} has been saved`);
            asyncEachSeries(article.chapterList, doc._id, db, ChapterModel);
        } else {
            console.log(`save error`);
        }
        
    });
};

const SaveChapter = (chapter, articleId, db, ChapterModel, callback) => {
    const chapterEntity = new ChapterModel({
        name: chapter.name,
        sourceUrl: chapter.sourceUrl,
        content: chapter.content,
        articleId: articleId
    });

    chapterEntity.save().then(function(doc){
        if (doc) {
            callback(null);
            console.log(`${doc.name} has been saved`);
        } else {
            callback(false);
            console.log(`save error`);
        }
    })
};

const startPost = () => {
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
            console.log(article.chapterList.length);
            //asyncAction(article);
            asyncParallelLimit(article);
        });
    }).on('error', (e) => {
        console.log(`startPost错误: ${e}`);
    });
}

const asyncEachSeries = (chapterList, articleId, db, ChapterModel) => {
    console.log(`章结数为:${chapterList.length}`);
    async.eachSeries(chapterList, (item, done) => {
        SaveChapter(item, articleId, db, ChapterModel, done);
    }, (err, result) => {
        if (err) {
            console.log(`错误: ${e.message}`);
        } 
        console.log(`save success`);
    });
}

const asyncParallelLimit = (article) => {
    const task = article.chapterList.map((item, index) => {
        return function(callback) {
            getChapterContent(item, callback);
        }
    });
    console.time('parallel');
    async.parallelLimit(task, 100, (err, results) => {
        if (err) {
           console.log(`asyncParallel错误: ${err}`); 
        } else {
            article.chapterList = results;
            console.log(`get article chapterlist length : ${results.length}`);
            startCatch(article);
        }
        console.timeEnd("parallel");  
    });
}

const getChapterContent = (chapter, callback) => {
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
                callback(null, chapter);
            });
        }
    }).on('error', (e) => {
        console.log(`${chapter.name}:${chapter.url}getContent错误: ${e}`);
        callback(e, null);
    });
}

startPost();