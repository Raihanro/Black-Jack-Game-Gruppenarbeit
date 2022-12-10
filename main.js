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

function check()
{
    if (players[currentPlayer].Points > 21)
    {
        document.getElementById('status').innerHTML = 'players: ' + players[currentPlayer].ID + ' verloren';
        document.getElementById('status').style.display = "inline-block";
        end();
    }
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


function createPlayers(num)
{
    players = new Array();
    for(var i = 1; i <= num; i++)
    {
        var hand = new Array();
        var player = { Name: 'Player ' + i, ID: i, Points: 0, Hand: hand };
        players.push(player);
    }
}

function createPlayersUI()
{
    document.getElementById('players').innerHTML = '';
    for(var i = 0; i < players.length; i++)
    {
        var div_player = document.createElement('div');
        var div_playerid = document.createElement('div');
        var div_hand = document.createElement('div');
        var div_points = document.createElement('div');

        div_points.className = 'points';
        div_points.id = 'points_' + i;
        div_player.id = 'player_' + i;
        div_player.className = 'player';
        div_hand.id = 'hand_' + i;

        div_playerid.innerHTML = 'Player ' + players[i].ID;
        div_player.appendChild(div_playerid);
        div_player.appendChild(div_hand);
        div_player.appendChild(div_points);
        document.getElementById('players').appendChild(div_player);
    }
}

function shuffle()
{

    for (var i = 0; i < 1000; i++)
    {
        var location1 = Math.floor((Math.random() * deck.length));
        var location2 = Math.floor((Math.random() * deck.length));
        var tmp = deck[location1];

        deck[location1] = deck[location2];
        deck[location2] = tmp;
    }
}

function startblackjack()
{
    document.getElementById('btnStart').value = 'Restart';
    document.getElementById("status").style.display="none";

    currentPlayer = 0;
    deckErstellen();
    shuffle();
    createPlayers(2);
    createPlayersUI();
    händeAusteilen();
    document.getElementById('player_' + currentPlayer).classList.add('active');
}

function renderCard(card, player)
{
    var hand = document.getElementById('hand_' + player);
    hand.appendChild(getCardUI(card));
}

function getCardUI(card)
{
    var el = document.createElement('div');
    var icon = '';
    if (card.Suit === 'Herz')
        icon='&hearts;';
    else if (card.Suit === 'Pik')
        icon = '&spades;';
    else if (card.Suit === 'Karo')
        icon = '&diams;';
    else
        icon = '&clubs;';

    el.className = 'card';
    el.innerHTML = card.Value + '<br/>' + icon;
    return el;
}


function getPoints(player)
{
    var points = 0;
    for(var i = 0; i < players[player].Hand.length; i++)
    {
        points += players[player].Hand[i].Weight;
    }
    players[player].Points = points;
    return points;
}

function updatePoints()
{
    for (var i = 0 ; i < players.length; i++)
    {
        getPoints(i);
        document.getElementById('points_' + i).innerHTML = players[i].Points;
    }
}