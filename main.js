let suits = ["Pik", "Herz", "Karo", "Kreuz"];
let wert = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();
let players = new Array();
let currentPlayer = 0;

function deckErstellen() {
    deck = new Array();
    for (let i = 0 ; i < wert.length; i++)
    {
        for(let x = 0; x < suits.length; x++)
        {
            let weight = parseInt(wert[i]);
            if (wert[i] === "J" || wert[i] === "Q" || wert[i] === "K")
                weight = 10;
            if (wert[i] === "A")
                weight = 11;
            let card = { Value: wert[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}

function händeAusteilen()
{
    // abwechselndes Austeilen von Karten an jeden Spieler
    // jeweils 2 Karten
    for(let i = 0; i < 2; i++)
    {
        for (let x = 0; x < players.length; x++)
        {
            let card = deck.pop();
            players[x].Hand.push(card);
            renderCard(card, x);
            updatePoints();
        }
    }

    updateDeck();
}

let currentPlayer = 0;
function hitMe()
{
    // pop eine Karte aus dem Stapel an den aktuellen Spieler.
    // überprüfen, ob die neuen Punkte des aktuellen Spielers über 21 liegen.
    let card = deck.pop();
    players[currentPlayer].Hand.push(card);
    renderCard(card, currentPlayer);
    updatePoints();
    updateDeck();
    check();
}

function bleiben()
{
    // weiter zum nächsten Spieler, falls vorhanden ist...
    if (currentPlayer !== players.length-1) {
        document.getElementById('Spieler' + currentPlayer).classList.remove('active');
        currentPlayer += 1;
        document.getElementById('Spieler' + currentPlayer).classList.add('active');
    }

    else {
        end();
    }
}

function check()
{
    if (players[currentPlayer].Points > 21)
    {
        document.getElementById('status').innerHTML = 'players: ' + players[currentPlayer].ID + ' verloren';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
}
function end()
{
    let Gewinner = -1;
    let score = 0;

    for(let i = 0; i < players.length; i++)
    {
        if (players[i].Points > score && players[i].Points < 22)
        {
            Gewinner = i;
        }

        score = players[i].Points;
    }

    document.getElementById('status').innerHTML = 'Gewinner: Spieler  ' + players[Gewinner].ID;
    document.getElementById("status").style.display = "inline-block";
}


function updateDeck()
{
    document.getElementById('Deckzahl').innerHTML = deck.length;
}

window.addEventListener('load', function(){
    deckErstellen();
    shuffle();
    createPlayers(1);
});