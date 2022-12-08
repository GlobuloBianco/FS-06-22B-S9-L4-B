




CONFERMA SI VALUE:

    let titolo = (nomeLista.value).toUpperCase();
    cardList.innerHTML += `
    <div class="glow m-2 border-3" style="width: 15rem;">
        <div class="card-header py-4 fs-4 gradient text-white">${titolo}</div>
        <ul class="list-group list-group-flush aggiungiItem">
            <li class="list-group-item bg-secondary text-white" onclick='addItem()'>Aggiungi Item +</li>
        </ul>
    </div>
    `;

    --------------------------------------------

// tentativo 1--------------------------
/*
//items sottolista
var valueItem: string;

const addItem = () => {
    let aggiungiItem = document.querySelector('.aggiungiItem') as HTMLElement;
    var itemNuovo = document.createElement("li");

    itemNuovo.classList.add('d-flex');
    itemNuovo.innerHTML = `<input type="text" class='list-group-item w-75' placeholder="Inserire"><button class="w-25" onclick="scriviItem()" type="button"> + </button>`;
    aggiungiItem.prepend(itemNuovo);
}

function scriviItem() {
    this.innerHTML = 'ciao';
}
*/
// tentativo 2--------------------------
/*
//class
class Card {
    titolo: string;
    constructor(_titolo: string) {
        this.titolo = _titolo;
    }
    getTitolo(): string { 
        return cardList.innerHTML += this.titolo;
    }
}

const confermaSi = () => {
    let titolo: string = (nomeLista.value).toUpperCase();
    new Card(titolo);
    popUpCrea.classList.remove('active');
}
*/