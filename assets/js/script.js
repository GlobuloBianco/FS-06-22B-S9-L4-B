//Nota: ricorda di riaprire json server e tsc
var popUpCrea = document.getElementById('popUpCrea');
var cardList = document.getElementById('cardList');
var nomeLista = document.getElementById('nomeLista');
var popUpAdd = document.getElementById('popUpAdd');
var addedValue = document.getElementById('itemAdded');
var url = 'http://localhost:3000/cards';
//creazione ListaNuova
var creaNuovo = function () {
    popUpCrea.classList.add('active');
};
var confermaNo = function () {
    popUpCrea.classList.remove('active');
    popUpAdd.classList.remove('active');
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
    fetch(url, {
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
    fetch(url)
        .then(function (response) {
        return response.json();
    })
        .then(function (data) {
        if (data.length > 0) {
            console.log(data);
            data.map(function (e) {
                var list = "<li class='list-group-item' onclick='test(".concat(e.id, ")'>") + (e.lista).join("</li><li class='list-group-item' onclick='test(".concat(e.id, ")'>")) + "</li>";
                cardList.innerHTML +=
                    "\n                        <div class=\"glow m-2 border-3\" style=\"width: 15rem;\">\n                            <div class=\"card-header py-4 fs-4 gradient text-white\">".concat(e.titolo, "</div>\n                                <ul class=\"list-group list-group-flush aggiungiItem\">\n                                    ").concat(list, "\n                                    <li class=\"list-group-item bg-secondary text-white\" onclick='addItem(").concat(e.id, ", ").concat(JSON.stringify(data[e.id - 1].lista), ")'>Aggiungi Item +</li>\n                                </ul>\n                        </div>");
            });
        }
        else {
            cardList.innerHTML = "<p class='display-3 text-white' >Nessun elemento presente in elenco </p>";
        }
    });
}
//aggiungi item al titolo corrispondente
var idHolder;
var item;
function addItem(e, value) {
    item = value; // array json
    console.log(item);
    idHolder = e; // id lista
    popUpAdd.classList.add('active');
}
function aggiungi() {
    if (addedValue.value == "") {
        alert('Si prega di inserire qualcosa');
    }
    else {
        addToJsonlist(addedValue.value);
        popUpAdd.classList.remove('active');
        addedValue.value = ""; //clear input
    }
}
var addToJsonlist = function (value) {
    var array = item;
    array.push(value);
    fetch(url + "/" + idHolder, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(({ lista: array }))
    });
};
function test(element) {
    //console.log(element[1]);
}
