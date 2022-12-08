//Nota: ricorda di riaprire json server e tsc

const popUpCrea = document.getElementById('popUpCrea') as HTMLElement;
const cardList = document.getElementById('cardList') as HTMLElement;
const nomeLista = document.getElementById('nomeLista') as HTMLInputElement;

//creazione ListaNuova
const creaNuovo = () => {
    popUpCrea.classList.add('active');
}

const confermaNo = () => {
    popUpCrea.classList.remove('active');
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
    fetch('http://localhost:3000/cards', {
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
    fetch("http://localhost:3000/cards")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            if (data.length > 0) {
                console.log(data);
                data.map(function (e) {

                    let list = `<li class='list-group-item' onclick='test(${e.id})'>` + (e.lista).join(`</li><li class='list-group-item' onclick='test(${e.id})'>`) + "</li>";
                    cardList.innerHTML +=
                        `
                        <div class="glow m-2 border-3" style="width: 15rem;">
                            <div class="card-header py-4 fs-4 gradient text-white">${e.titolo}</div>
                                <ul class="list-group list-group-flush aggiungiItem">
                                    ${list}
                                    <li class="list-group-item bg-secondary text-white" onclick='addItem(${e.id})'>Aggiungi Item +</li>
                                </ul>
                        </div>`;
                });
            } else {
                cardList.innerHTML = "<p class='display-3 text-white' >Nessun elemento presente in elenco </p>";
            }
        });
}

//aggiungi item al titolo corrispondente
function addItem(element: number) {
    console.log(element);
    fetch("http://localhost:3000/cards")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            console.log(data);
            data.map(function (e) {

                var list = `<li class='list-group-item' onclick='test(${e.id})'>` + (e.lista).join(`</li><li class='list-group-item' onclick='test(${e.id})'>`) + "</li>";
            });
        }
        )
}

function test(element) {
    console.log(element);
}

