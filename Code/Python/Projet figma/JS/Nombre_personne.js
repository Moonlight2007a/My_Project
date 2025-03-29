document.querySelector("#bouton_moins_adulte").addEventListener("click", function() {
    if (document.querySelector(`#nombre_enfant`).textContent > 0 ){
        minimum = 1
    }
    else {minimum = 0}
    numberPeople ("moins", "adulte", minimum)
});

document.querySelector("#bouton_plus_adulte").addEventListener("click", function() {
    if (document.querySelector(`#nombre_enfant`).textContent > 0 ){
        minimum = 1
    }
    else {minimum = 0}
    numberPeople ("plus", "adulte", minimum)
});

document.querySelector("#bouton_moins_enfant").addEventListener("click", function() {
    numberPeople ("moins", "enfant", 0)
});

document.querySelector("#bouton_plus_enfant").addEventListener("click", function() {
    
    numberPeople ("plus", "enfant", 0)
});

function numberPeople (BoutonPress, typePeople, minimum) {
    let numberStr = document.querySelector(`#nombre_${typePeople}`).textContent
    let number = parseInt(numberStr)

    if (BoutonPress === "plus" && number < 20){
        number++
    }
    else if (BoutonPress === "moins" && number > minimum) {
        number--
    }

    document.querySelector(`#nombre_${typePeople}`).textContent = number;

    if (document.querySelector(`#nombre_enfant`).textContent !== "0" && document.querySelector(`#nombre_adulte`).textContent === "0" ){
        document.querySelector(`#nombre_adulte`).textContent = 1
    }
    else{
        document.querySelector(`#image_bouton_moins_adulte`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_moins_orange.png"
    }

    if (document.querySelector(`#nombre_enfant`).textContent !== "0" && document.querySelector(`#nombre_adulte`).textContent === "1" ){
        document.querySelector(`#image_bouton_moins_adulte`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_moins_gris.png"
    }

    if (number === minimum){
        document.querySelector(`#image_bouton_moins_${typePeople}`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_moins_gris.png"
    }
    else if (number === 20){
        document.querySelector(`#image_bouton_plus_${typePeople}`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_plus_gris.png"
    }
    else {
        document.querySelector(`#image_bouton_plus_${typePeople}`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_plus_orange.png"
        document.querySelector(`#image_bouton_moins_${typePeople}`).src = "Image/Icon_section_recherche/Nb_personne/Bouton/bouton_moins_orange.png"
    }

    let phrase_adult = ""
    if (document.querySelector(`#nombre_adulte`).textContent === "1"){
        phrase_adult = "1 adulte"
    }
    else if (document.querySelector(`#nombre_adulte`).textContent === "0"){
        phrase_adult = ""
    }
    else {
        phrase_adult = `${document.querySelector('#nombre_adulte').textContent} adultes`
    }

    let phrase_children = ""
    if (document.querySelector(`#nombre_enfant`).textContent === "1"){
        phrase_children = ", 1 enfant"
    }
    else if (document.querySelector(`#nombre_enfant`).textContent === "0"){
        phrase_children = ""
    }
    else {
        phrase_children = `, ${document.querySelector('#nombre_enfant').textContent} enfants`
    }

    document.querySelector('#texte_nombre_personne').textContent = (`${phrase_adult}${phrase_children}`)

    if (document.querySelector(`#nombre_adulte`).textContent === "0" && document.querySelector(`#nombre_enfant`).textContent === "0"){
        document.querySelector('#texte_nombre_personne').textContent = "Nombre de personnes"
    }
}