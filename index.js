const axios = require("axios");//axios viene utilizzato per fare chiamate all'API di google
const open = require("open");
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
}); //Dichiarazione processi di input e output

readline.question('Che canzone vuoi cercare? ', async songName => {
    let songsArray = []
    const res = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?&q=${songName}&chart=mostPopular&key=AIzaSyDz6PlezRvpnx78ys-2QCWx5O_S0LO-Z2w`) // Chiamata all'API di google
        .catch(err => console.log(`Error ${err.response.status}, ${err.response.statusText}`))// In caso di errore nel processo allora l'applicazione non andrà in crash ma resterà attiva mandando l'errore alla console
    await res.data.items.filter(result => {
        if (result.id.kind = 'youtube#video') {
            songsArray.push(result)
        }
    }) // Scartiamo i canali e teniamo solo i video inserendoli nell'array dichiarato alla linea 9
    open(`https://www.youtube.com/watch?v=${songsArray[0].id.videoId}`) // Apriamo il broswer con il link del video completo
    console.log("Fatto!")
    readline.close(); // chiusura applicazione
});