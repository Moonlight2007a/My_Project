let departements = ["Paris", "Alpes-Maritimes", "Bouches-du-Rhône", "Haute-Savoie", "Var", "Gironde", "Hérault", "Finistère", "Vaucluse", "Calvados", "Loire-Atlantique", "Lozère", "Côte-d'Or", "Aude", "Seine-et-Marne", "Saône-et-Loire", "Isère", "Bas-Rhin", "Savoie", "Ain", "Haute-Garonne", "Charente-Maritime", "Pyrénées-Atlantiques", "Côtes-d'Armor", "Vendée", "Yvelines", "Nord", "Ardèche", "Moselle", "Aveyron", "Loir-et-Cher", "Cantal", "Puy-de-Dôme", "Morbihan", "Drôme", "Manche", "Haut-Rhin", "Tarn", "Eure-et-Loir", "Haute-Vienne", "Lot", "Brittany", "Loire", "Cher", "Somme", "Aisne"];
let villes = ["Paris", "Marseille", "Lyon", "Nice", "Toulouse", "Nantes", "Bordeaux", "Strasbourg", "Lille", "Montpellier", "Rennes", "Reims", "Le Havre", "Saint-Étienne", "Cannes", "Aix-en-Provence", "Antibes", "Versailles", "Avignon", "Chamonix", "Annecy", "Rouen", "Tours", "Clermont-Ferrand", "Caen", "Grenoble", "Dijon", "Le Mans", "Perpignan", "Villeurbanne", "Saint-Denis", "Amiens", "La Rochelle", "Toulon", "Valence", "Brest", "Nîmes", "Cergy", "Poitiers", "Bayonne", "Pau", "Lorient", "Beauvais", "Chartres", "Angers", "Saint-Malo", "Colmar", "Angoulême", "Châteauroux", "Montauban", "Sète", "Vannes", "Niort", "Vichy", "Mulhouse", "Périgueux", "Brive-la-Gaillarde", "Mâcon", "Douai", "Soissons", "Laval", "Béziers", "Blois", "Carcassonne", "Vienne", "Agen", "La Seyne-sur-Mer", "Le Pontet", "Cavaillon", "Fréjus", "Rochefort", "Sarcelles", "Albi", "Fontainebleau", "Marignane", "Saint-Nazaire", "La Teste-de-Buch", "Puteaux", "Cagnes-sur-Mer", "Vincennes", "La Courneuve", "Neuilly-sur-Seine", "Ivry-sur-Seine", "Levallois-Perret", "Bobigny", "Gennevilliers", "Rueil-Malmaison", "Clichy", "Asnières-sur-Seine", "Saint-Ouen", "Villejuif", "Fontenay-sous-Bois", "Sainte-Geneviève-des-Bois", "Saint-Quentin", "Montluçon", "Nanterre", "Palaiseau", "Troyes", "Thionville", "Belfort"];

let departementEtVilles = [departements, villes];
let listeDepartementsEtVilleTrouver = [1, 1]

// zone ecriture
document.querySelector(".destination_ecriture").addEventListener('input', function() {
    listeDepartementsEtVilleTrouver = [1, 1]
    document.querySelector(".lieu_proposer").innerHTML = '';
    if (document.querySelector(`.image_checkbox_departement`).src.endsWith("Checkbox_pleine.png")) {
        selectDepartementVille (0);
    } else if (document.querySelector(`.image_checkbox_ville`).src.endsWith("Checkbox_pleine.png")) {
        selectDepartementVille (1);
    }
});

document.querySelector(".image_checkbox_departement").addEventListener("click", function() {
    etat_bouton (0);
})

document.querySelector(".image_checkbox_ville").addEventListener("click", function() {
    etat_bouton (1);
})

function etat_bouton(type) {

    listeDepartementsEtVilleTrouver = [1, 1]
    document.querySelector(".lieu_proposer").innerHTML = '';

    let currentType = (type === 0) ? "departement" : "ville";
    let otherType = (type === 0) ? "ville" : "departement";

    let currentImageSrc = document.querySelector(`.image_checkbox_${currentType}`).src;
    
    // Utiliser .endsWith() pour vérifier si l'URL se termine par le nom du fichier de l'image
    if (currentImageSrc.endsWith("Checkbox_vide.png")) {
        document.querySelector(`.image_checkbox_${currentType}`).src = "Image/Icon_section_recherche/Animaux/Checkbox_pleine.png";
        document.querySelector(`.image_checkbox_${otherType}`).src = "Image/Icon_section_recherche/Animaux/Checkbox_vide.png";
        selectDepartementVille(type)
    }
    else if (currentImageSrc.endsWith("Checkbox_pleine.png")) {
        document.querySelector(`.image_checkbox_${currentType}`).src = "Image/Icon_section_recherche/Animaux/Checkbox_vide.png";
    }
}

let textarea = document.querySelector('.destination_ecriture');

function selectDepartementVille(type) {

    let texte = textarea.value.trim();
    let nombreTexte = texte.length;

    let currentType = (type === 0) ? " departement" : "e ville";
    let currentTypePluriel = (type === 0) ? "villes" : "departements";
    let departementsEtVilleTrouver = [];

    if (nombreTexte !== 0 && listeDepartementsEtVilleTrouver[type] !== 0) {

        for (let i = 0; i < departementEtVilles[type].length; i++) {
            if (departementEtVilles[type][i].slice(0, nombreTexte).toLowerCase() === texte.toLowerCase()) {
                departementsEtVilleTrouver.push(departementEtVilles[type][i]);
            }
        }

        if (departementsEtVilleTrouver.length === 0){
            document.querySelector(".lieu_proposer").innerHTML += `<div class='alerte_recherche'><p>Aucun${currentType} ne correspond à votre recherche. Voici les ${currentTypePluriel} correspondante(s) :</p></div>`;
            listeDepartementsEtVilleTrouver[type] = 0
            selectDepartementVille((type === 0) ? 1 : 0)
        }

        departementsEtVilleTrouver.forEach(element => {
            document.querySelector(".lieu_proposer").innerHTML += `<button class='bouton_lieu_trouver'>${element}</button>`;
        });
    }
    else if (nombreTexte !== 0){
        document.querySelector(".lieu_proposer").innerHTML = ""
        document.querySelector(".lieu_proposer").innerHTML += "<div class='alerte_recherche'><p>Aucune ville ni aucun département ne correspond à votre recherche</p></div>";
    }
}

document.querySelector(".lieu_proposer").addEventListener("click", function(event) {
    if (event.target && event.target.matches("button.bouton_lieu_trouver")) {
        let texteboutonLieuTrouver = event.target.textContent;
        document.querySelector("#checkboxOneInputDepartement").checked = false;
        document.querySelector("#checkboxOneInputVille").checked = false;
        textarea.value = "";
        document.querySelector(".lieu_proposer").innerHTML = '';
        textarea.placeholder = texteboutonLieuTrouver
    }
});