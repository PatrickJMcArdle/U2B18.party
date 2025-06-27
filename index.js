// Constants ---
const BASE = "https://fsa-crud-2aa9294fe819.herokuapp.com/api";
const COHORT = "/2506-Patrick"
const RESOURCE = "/events"
const API = BASE + COHORT + RESOURCE

// State ---
let parties = [];
let selectedParty;

async function getParties() {
    try {
        const response = await fetch(API);
        const result = await response.json();
        parties = result.data
    } catch (error) {
        console.error(error);
    }
    render()
}

async function getParty(id) {
    try {
        const response = await fetch(`${API}/${id}`);
        const result = await response.json()
        selectedParty = result.data
    } catch (error) {
        console.error(error);
    }
    render();
}
// Components ---

function PartyListItem(party) {
    const $list = document.createElement("span");
    $list.innerHTML = /* html */ `
      <li><a href="#selected">${party.name}</a></li>
    `;

    $list.addEventListener("click", (e) => {
        e.preventDefault()

        getParty(party.id)
    })

    return $list
}

function PartyList() {
    const $container = document.createElement("ul");
    $container.classList.add("lineup")

    const $names = parties.map(PartyListItem);
    $container.replaceChildren(...$names)

    return $container
}

function PartyDetails() {
    if (!selectedParty) {
        const $p = document.createElement("p");
        $p.textContent = "Select a party for more info.";
        return $p;
    } else {
        const $section = document.createElement("span")
        $section.classList.add("party")
        $section.innerHTML = /* html*/ `
            <h3>${selectedParty.name} #${selectedParty.id}</h3>
            <figure>
                <p class="date">${selectedParty.date}</p>
                <p class="local">${selectedParty.location}</p>
            </figure>
            <p>${selectedParty.description}</p>
        `
        return $section
    }
}

// Render ---
function render() {
    const $app = document.querySelector("#app");
    $app.innerHTML = /* html */ `
        <h1>Party Planner</h1>
        <main>
        <section id="upcoming">
            <h2>Upcoming</h2>
            <PartyList></PartyList>
        </section>
        <section id="selected">
            <h2>Party Details</h2>
            <PartyDetails></PartyDetails>
        </section>
        </main>
    `;
    $app.querySelector("PartyList").replaceWith(PartyList());
    $app.querySelector("PartyDetails").replaceWith(PartyDetails());
}

async function init() {
    await getParties();
    render();
}

init();