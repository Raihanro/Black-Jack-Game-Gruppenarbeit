let suits = ["Pik", "Herz", "Karo", "Kreuz"];
let wert = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = new Array();

function deckErstellen() {
    deck = new Array();
    for (let i = 0 ; i < wert.length; i++)
    {
        for(let x = 0; x < suits.length; x++)
        {
            let weight = parseInt(wert[i]);
            if (wert[i] == "J" || wert[i] == "Q" || wert[i] == "K")
                weight = 10;
            if (wert[i] == "A")
                weight = 11;
            var card = { Value: wert[i], Suit: suits[x], Weight: weight };
            deck.push(card);
        }
    }
}