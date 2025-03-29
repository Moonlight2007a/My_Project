let moisActuel = new Date().getMonth();
let anneeActuelle = new Date().getFullYear();
let jourActuelButton = null;  // Déclaration de la variable pour garder référence au jour actuel

function genererCalendrier(mois, annee) {
    let table = document.querySelector(".calendrier tbody");
    let titre = document.querySelector(".mois-annee");

    // Noms des mois
    let nomsMois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    titre.innerText = `${nomsMois[mois]} ${annee}`;

    // Obtenir le premier jour et le nombre de jours du mois
    let premierJour = new Date(annee, mois, 1).getDay(); // Jour de la semaine (0 = Dimanche)
    let joursDansMois = new Date(annee, mois + 1, 0).getDate(); // Nb de jours du mois

    if (premierJour === 0) premierJour = 7; // Adapter pour commencer à Lundi

    let aujourdHui = new Date();
    let jourActuel = aujourdHui.getDate();
    let moisActuel = aujourdHui.getMonth();
    let anneeActuelle = aujourdHui.getFullYear();

    let ligne = "<tr>";
    for (let i = 1; i < premierJour; i++) {
        ligne += "<td></td>"; // Cases vides avant le 1er jour
    }

    for (let jour = 1; jour <= joursDansMois; jour++) {
        let classeJour = (jour === jourActuel && mois === moisActuel && annee === anneeActuelle) ? `id="jour-actuel"` : "";
        ligne += `<td ${classeJour}><button class="jour-button">${jour}</button></td>`;
        if ((jour + premierJour - 1) % 7 === 0) {
            ligne += "</tr><tr>"; // Nouvelle ligne après Dimanche
        }
    }
    ligne += "</tr>";

    table.innerHTML = ligne;

    // Mettre en surbrillance le jour actuel
    jourActuelButton = document.querySelector(`#jour-actuel`);
    if (jourActuelButton) {
        jourActuelButton.style.backgroundColor = "#5f5f5f7a"; // Appliquer couleur de fond
    }
}

// Fonction pour changer de mois (précédent ou suivant)
function changerMois(direction) {
    moisActuel += direction;

    // Si le mois est en dehors des bornes, on ajuste l'année
    if (moisActuel > 11) {
        moisActuel = 0;
        anneeActuelle++;
    } else if (moisActuel < 0) {
        moisActuel = 11;
        anneeActuelle--;
    }

    // Générer le calendrier pour le mois et l'année actuels
    genererCalendrier(moisActuel, anneeActuelle);
}

// Initialisation du calendrier
genererCalendrier(moisActuel, anneeActuelle);

document.querySelector(".calendrier").addEventListener("click", function(event) {
    if (event.target && event.target.matches("button.jour-button")) {
        // Récupérer le jour sur lequel l'utilisateur a cliqué
        let jourClique = event.target.textContent;

        document.querySelector(".date_arriver").textContent = (String(jourClique).padStart(2, '0')) + " / " + (String(moisActuel + 1).padStart(2, '0')) + " / " + anneeActuelle;
        
        let jours = document.querySelectorAll(".jour-button");
        jours.forEach(function(btn) {
            btn.style.backgroundColor = ''; // Réinitialiser la couleur de fond
            btn.style.color = ''; // Réinitialiser la couleur du texte
        });

        // Si un autre bouton est cliqué, on réinitialise la couleur du jour actuel précédent
        if (jourActuelButton) {
            jourActuelButton.style.backgroundColor = '';  // Réinitialiser la couleur du fond du jour actuel
            jourActuelButton.style.color = '';            // Réinitialiser la couleur du texte
        }

        // Mettre en surbrillance le bouton cliqué
        event.target.style.height = "100%";
        event.target.style.width = "100%"
        event.target.style.backgroundColor = "#5f5f5f7a"; // Exemple : couleur de fond gris clair
        event.target.style.borderRadius = "6.7px";       // Arrondir les coins du bouton

        // Mettre à jour la référence du jour actuel
        jourActuelButton = event.target;  // Le bouton cliqué devient le jour actuel
    }
});
