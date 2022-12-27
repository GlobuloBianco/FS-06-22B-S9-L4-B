//Nota: ricorda di riaprire json server e tsc

const popUpCrea = document.getElementById('popUpCrea') as HTMLElement;
const cardList = document.getElementById('cardList') as HTMLElement;
const nomeLista = document.getElementById('nomeLista') as HTMLInputElement;
const popUpAdd = document.getElementById('popUpAdd') as HTMLElement;
const addedValue = document.getElementById('itemAdded') as HTMLInputElement;
const url: string = 'http://localhost:3000/cards';

//creazione ListaNuova
const creaNuovo = () => {
    popUpCrea.classList.add('active');
}

const confermaNo = () => {
    popUpCrea.classList.remove('active');
    popUpAdd.classList.remove('active');
}

const confermaSi = () => {
    if (nomeLista.value === '') {
        nomeLista.value = 'Lista';// se non si inserisce nulla
    }
    addToJson(nomeLista.value);
    popUpCrea.classList.remove('active');
    clearInput();
}

const addToJson = (titolo) => {
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({
            titolo: (titolo).toUpperCase(),
            lista: []
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => console.log(json));
}

//clear inputvalue
const clearInput = () => {
    nomeLista.value = '';
}

//Print Json
printData();
function printData() {
    fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                console.log(data);
                data.map(function (e) {
                    let list = `<li class='list-group-item' onclick='done(this)'>` + (e.lista).join(`</li><li class='list-group-item' onclick='done(this)'>`) + "</li>";
                    cardList.innerHTML +=
                        `
                        <div class="glow m-2 border-3" style="width: 15rem;">
                            <div class="card-header py-4 fs-4 gradient text-white">${e.titolo}<a type='button' class='elimina' onclick='rimuovi(${e.id})'>[x]</a></div>
                                <ul class="list-group list-group-flush aggiungiItem">
                                    ${list}
                                    <li class="list-group-item bg-secondary text-white" onclick='addItem(${e.id}, ${JSON.stringify(data[e.id - 1].lista)})'>Aggiungi Item +</li>
                                </ul>
                        </div>`;
                });
            } else {
                cardList.innerHTML = "<p class='display-3 text-white' >Nessun elemento presente in elenco </p>";
            }
        });
}

//aggiungi item al titolo corrispondente
let idHolder: number;
let item: any;

function addItem(e: number, value: object[]) {
    item = value // array json
    console.log(item)
    idHolder = e; // id lista
    popUpAdd.classList.add('active');

}

function aggiungi() {
    if (addedValue.value == "") {
        alert('Si prega di inserire qualcosa')
    } else {
        addToJsonlist(addedValue.value)
        popUpAdd.classList.remove('active');
        addedValue.value = ""; //clear input
    }
}

const addToJsonlist = (value: string) => {
    let array = item ;
    array.push(value)

    fetch(url + "/" + idHolder, {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(({lista: array}))
    })
}

function done(e) {
    e.classList.toggle('svolto')
}

function rimuovi(e) {
    let conferma = confirm("Sei sicuro di voler cancellare? l'operazione sarà irreversibile!");
    if (conferma) {
        fetch(url + "/" + e, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
    }
}