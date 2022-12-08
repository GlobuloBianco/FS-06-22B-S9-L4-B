//Nota: ricorda di riaprire json server e tsc
var popUpCrea = document.getElementById('popUpCrea');
var cardList = document.getElementById('cardList');
var nomeLista = document.getElementById('nomeLista');
//creazione ListaNuova
var creaNuovo = function () {
    popUpCrea.classList.add('active');
};
var confermaNo = function () {
    popUpCrea.classList.remove('active');
};
var confermaSi = function () {
    if (nomeLista.value === '') {
        nomeLista.value = 'Lista'; // se non si inserisce nulla
    }
    addToJson(nomeLista.value);
    popUpCrea.classList.remove('active');
    clearInput();
};
var addToJson = function (titolo) {
    fetch('http://localhost:3000/cards', {
        method: 'POST',
        body: JSON.stringify({
            titolo: (titolo).toUpperCase(),
            lista: []
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
        .then(function (response) { return response.json(); })
        .then(function (json) { return console.log(json); });
};
//clear inputvalue
var clearInput = function () {
    nomeLista.value = '';
};
//Print Json
printData();
function printData() {
    fetch("http://localhost:3000/cards")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        if (data.length > 0) {
            console.log(data);
            data.map(function (e) {
                var list = "<li class='list-group-item' onclick='test(".concat(e.id, ")'>") + (e.lista).join("</li><li class='list-group-item' onclick='test(".concat(e.id, ")'>")) + "</li>";
                cardList.innerHTML +=
                    "\n                        <div class=\"glow m-2 border-3\" style=\"width: 15rem;\">\n                            <div class=\"card-header py-4 fs-4 gradient text-white\">".concat(e.titolo, "</div>\n                                <ul class=\"list-group list-group-flush aggiungiItem\">\n                                    ").concat(list, "\n                                    <li class=\"list-group-item bg-secondary text-white\" onclick='addItem(").concat(e.id, ")'>Aggiungi Item +</li>\n                                </ul>\n                        </div>");
            });
        }
        else {
            cardList.innerHTML = "<p class='display-3 text-white' >Nessun elemento presente in elenco </p>";
        }
    });
}
//aggiungi item al titolo corrispondente
function addItem(element) {
    console.log(element);
    fetch("http://localhost:3000/cards")
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        console.log(data);
        data.map(function (e) {
            var list = "<li class='list-group-item' onclick='test(".concat(e.id, ")'>") + (e.lista).join("</li><li class='list-group-item' onclick='test(".concat(e.id, ")'>")) + "</li>";
        });
    });
}
function test(element) {
    console.log(element);
}
