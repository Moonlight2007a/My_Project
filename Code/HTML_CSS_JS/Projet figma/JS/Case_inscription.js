const imageCheckboxInscription = document.querySelector(".image_checkbox_inscription");
const image_checkbox_mdp = document.querySelector(".image_checkbox_mdp");

const mdp = document.querySelector(".mdp");
const mail = document.querySelector(".mail");

const imageMail = document.querySelector(".image_mail");
const imageMdp = document.querySelector(".image_mdp");



mdp.addEventListener("mouseenter", () => {
    imageMdp.style.display = "none"
});
mdp.addEventListener("mouseleave", () => {
    imageMdp.style.display = "block"
});

mail.addEventListener("mouseenter", () => {
    imageMail.style.display = "none"
});
mail.addEventListener("mouseleave", () => {
    imageMail.style.display = "block"
});

imageCheckboxInscription.addEventListener("click", function() {
    imageCheckbox("inscription")
    if (document.querySelector(`.image_checkbox_inscription`).src.endsWith("Checkbox_pleine.png")){
        inscription()
        rangement_confirme_mdp = document.querySelector(`.rangement_confirme_mdp`)
        rangement_condition_utilisation = document.querySelector(`.rangement_condition_utilisation`)
    } else{
        rangement_condition_utilisation.remove()
        rangement_confirme_mdp.remove()
    };
});

image_checkbox_mdp.addEventListener("click", function() {
    imageCheckbox("mdp");
    mdp.type = (document.querySelector(`.image_checkbox_mdp`).src.endsWith("Checkbox_vide.png")) ? "password" : "text";
});

function imageCheckbox(checkbox){
    document.querySelector(`.image_checkbox_${checkbox}`).src = (document.querySelector(`.image_checkbox_${checkbox}`).src.endsWith("Checkbox_vide.png")) ? "Image/Icon_section_recherche/Animaux/Checkbox_pleine.png" : "Image/Icon_section_recherche/Animaux/Checkbox_vide.png";
};

function inscription(){
    document.querySelector(`.inscription`).innerHTML =
         `<div class="rangement_confirme_mdp">
            <img class="image_confirme_mdp" src="Image/Icon/Mot_de_passe.png" alt="">
            <input type="password" class="confirme_mdp" name="" id="mdp" placeholder="Mot de passe"></input>
        </div>
        <div class="rangement_condition_utilisation">
            <a href="" class="lien_condition_utilisation">Condition d'utilisation ?</a>
            <div class="checkbox">
                <input type="checkbox" value="1" id="checkbox_condition_utilisation">
                <img for="checkbox_condition_utilisation" class="image_checkbox_condition_utilisation" src="Image/Icon_section_recherche/Animaux/Checkbox_vide.png" alt="">
            </div>
        </div>`
    ;
    const image_checkbox_condition_utilisation = document.querySelector(".image_checkbox_condition_utilisation");

    image_checkbox_condition_utilisation.addEventListener("click", function() {
    imageCheckbox("condition_utilisation");
    });

    confirme_mdp = document.querySelector(".confirme_mdp");
    const image_confirme_mdp = document.querySelector(".image_confirme_mdp");

    confirme_mdp.addEventListener("mouseenter", () => {
        image_confirme_mdp.style.display = "none";
    }); document.querySelector(".mail").value.trim()
    confirme_mdp.addEventListener("mouseleave", () => {
        image_confirme_mdp.style.display = "block";
    });
}

let utilisateur = [
    { mail: "alice@mail.com", motDePasse: "azerty123" },
    { mail: "bob@gmail.com", motDePasse: "bonjour2024" },
    { mail: "charlie@yahoo.fr", motDePasse: "mdpSecret" }
]

function validation_inscription() {

    const verifMail = /^[a-zA-Z0-9._%+-]+(\.[a-zA-Z0-9._%+-]+)*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    
    if(document.querySelector(`.image_checkbox_inscription`).src.endsWith("Checkbox_vide.png") && (document.querySelector(".mail").value.trim() != "" && document.querySelector(".mdp").value.trim() != "")){
        let utilisateurTrouve = false;

        document.querySelector(`.inscription`).innerHTML = ""

        for (let i = 0; i < utilisateur.length; i++){
            if (document.querySelector(".mail").value.trim() === utilisateur[i].mail && document.querySelector(".mdp").value.trim() === utilisateur[i].motDePasse){
                utilisateurTrouve = true
                break
            } 
        }
        if (!utilisateurTrouve) {
            document.querySelector(`.inscription`).innerHTML =
            `<p>L'adresse e-mail ou le mot de passe est incorrect</p>`
        }
    } else if (document.querySelector(`.image_checkbox_inscription`).src.endsWith("Checkbox_pleine.png") && document.querySelector(".mail").value.trim() != "" && document.querySelector(".mdp").value.trim() != "" && confirme_mdp.value.trim() != ""){
       
        const allP = document.querySelector(`.inscription`).querySelectorAll("p")
        allP.forEach(p => p.remove());

        if (verifMail.test(document.querySelector(".mail").value.trim())){
            if (document.querySelector(".mdp").value.trim() === confirme_mdp.value.trim()) {
                utilisateur.push({mail: document.querySelector(".mail").value.trim(), motDePasse: document.querySelector(".mdp").value.trim()})
                console.log(utilisateur)
            } else {
                const inscription = document.querySelector(`.inscription`);
                const message_mdp = document.createElement('p'); 
                message_mdp.textContent = `Les mots de passe ne correspondent pas`
                inscription.appendChild(message_mdp)
            }
        }
    }
}

