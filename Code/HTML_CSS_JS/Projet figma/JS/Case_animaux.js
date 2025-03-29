let valeur_animaux = 0
document.querySelector(".image_checkbox_animaux").addEventListener("click", function() {
    if (valeur_animaux === 0){
        valeur_animaux = 1
        document.querySelector(".image_checkbox_animaux").src = "Image/Icon_section_recherche/Animaux/Checkbox_pleine.png"
    }
    else {
        valeur_animaux = 0
        document.querySelector(".image_checkbox_animaux").src = "Image/Icon_section_recherche/Animaux/Checkbox_vide.png"
    }
})

