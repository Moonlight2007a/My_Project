let moisActuel_2 = new Date().getMonth();
let anneeActuelle_2 = new Date().getFullYear();
let jourActuelButton_2 = null;  // Déclaration de la variable pour garder référence au jour actuel

function genererCalendrier_2(mois_2, annee_2) {
    let table_2 = document.querySelector(".calendrier_2 tbody");
    let titre_2 = document.querySelector(".mois-annee_2");

    // Noms des mois
    let nomsMois_2 = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    titre_2.innerText = `${nomsMois_2[mois_2]} ${annee_2}`;

    // Obtenir le premier jour et le nombre de jours du mois
    let premierJour_2 = new Date(annee_2, mois_2, 1).getDay(); // Jour de la semaine (0 = Dimanche)
    let joursDansMois_2 = new Date(annee_2, mois_2 + 1, 0).getDate(); // Nb de jours du mois

    if (premierJour_2 === 0) premierJour_2 = 7; // Adapter pour commencer à Lundi

    let aujourdHui_2 = new Date();
    let jourActuel_2 = aujourdHui_2.getDate();
    let moisActuel_2 = aujourdHui_2.getMonth();
    let anneeActuelle_2 = aujourdHui_2.getFullYear();

    let ligne_2 = "<tr>";
    for (let i = 1; i < premierJour_2; i++) {
        ligne_2 += "<td></td>"; // Cases vides avant le 1er jour
    }

    for (let jour_2 = 1; jour_2 <= joursDansMois_2; jour_2++) {
        let classeJour_2 = (jour_2 === jourActuel_2 && mois_2 === moisActuel_2 && annee_2 === anneeActuelle_2) ? `id="jour-actuel_2"` : "";
        ligne_2 += `<td ${classeJour_2}><button class="jour-button_2">${jour_2}</button></td>`;
        if ((jour_2 + premierJour_2 - 1) % 7 === 0) {
            ligne_2 += "</tr><tr>"; // Nouvelle ligne après Dimanche
        }
    }
    ligne_2 += "</tr>";

    table_2.innerHTML = ligne_2;

    // Mettre en surbrillance le jour actuel
    jourActuelButton_2 = document.querySelector(`#jour-actuel_2`);
    if (jourActuelButton_2) {
        jourActuelButton_2.style.backgroundColor = "#5f5f5f7a"; // Appliquer couleur de fond
    }
}

// Fonction pour changer de mois (précédent ou suivant)
function changerMoisSecond(direction_2) {
    moisActuel_2 += direction_2;

    // Si le mois est en dehors des bornes, on ajuste l'année
    if (moisActuel_2 > 11) {
        moisActuel_2 = 0;
        anneeActuelle_2++;
    } else if (moisActuel_2 < 0) {
        moisActuel_2 = 11;
        anneeActuelle_2--;
    }

    // Générer le calendrier pour le mois et l'année actuels
    genererCalendrier_2(moisActuel_2, anneeActuelle_2);
}

// Initialisation du calendrier
genererCalendrier_2(moisActuel_2, anneeActuelle_2);

document.querySelector(".calendrier_2").addEventListener("click", function(event) {
    if (event.target && event.target.matches("button.jour-button_2")) {
        // Récupérer le jour sur lequel l'utilisateur a cliqué
        let jourClique_2 = event.target.textContent;

        document.querySelector(".date_arriver_2").textContent = (String(jourClique_2).padStart(2, '0')) + " / " + (String(moisActuel_2 + 1).padStart(2, '0')) + " / " + anneeActuelle_2;
        
        let jours_2 = document.querySelectorAll(".jour-button_2");
        jours_2.forEach(function(btn_2) {
            btn_2.style.backgroundColor = ''; // Réinitialiser la couleur de fond
            btn_2.style.color = ''; // Réinitialiser la couleur du texte
        });

        // Si un autre bouton est cliqué, on réinitialise la couleur du jour actuel précédent
        if (jourActuelButton_2) {
            jourActuelButton_2.style.backgroundColor = '';  // Réinitialiser la couleur du fond du jour actuel
            jourActuelButton_2.style.color = '';            // Réinitialiser la couleur du texte
        }

        // Mettre en surbrillance le bouton cliqué
        event.target.style.height = "100%";
        event.target.style.width = "100%"
        event.target.style.backgroundColor = "#5f5f5f7a"; // Exemple : couleur de fond gris clair
        event.target.style.borderRadius = "6.7px";       // Arrondir les coins du bouton

        // Mettre à jour la référence du jour actuel
        jourActuelButton_2 = event.target;  // Le bouton cliqué devient le jour actuel
    }
});
