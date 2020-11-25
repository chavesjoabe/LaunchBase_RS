//a variavel express chama o express para dentro do projeto
//a variavel server adiciona a funcionalidade do express no projeto
const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require("./data")

server.use(express.static('public'))

server.set('view engine', 'njk')

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true,
})

server.get('/', function(req, res) {

    const about = {
        avatar: "https://avatars2.githubusercontent.com/u/59907815?s=400&u=16f4eb2bb285c7fe628c759619fa3ef5069a9e0e&v=4",
        name: "Joabe Chaves",
        role: "Aluno do Bootcamp LaunchBase",
        description: 'Aspirante a programador FullStack e estudante da <a href="http://rocketseat.com.br" target="_blank">Rocketseat',
        link: [
            { name: "Github", url: "https://github.com/chavesjoabe" },
            { name: "instagram", url: "https://www.instagram.com/joabechaves/" },
            { name: "LinkedIn", url: "https://www.linkedin.com/in/joabe-chaves-3b8493165/" }
        ]
    }


    return res.render('about', { about });
})

server.get('/portfolio', function(req, res) {
    return res.render('portfolio', { items: videos })
})

server.get('/video', function(req,res){
    const id = req.query.id;

    const video = videos.find(function(video){
        return video.id == id;
      
    })
    if(!video){
        res.send("video not found")
    }
    return res.render("video", {item: video });
})

server.listen(5000, function() {
    console.log('iniciei o servidor')
})