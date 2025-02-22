import random
from tkinter import *

buttons = [[None for _ in range(9)] for _ in range(9)]
selected_cell = None  # Variable pour suivre la cellule sélectionnée
easy_button = None
medium_button = None
hard_button = None

def draw_help_button():
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    create_button = Button(
        frame_right, font=("arial", 20),
        text="Help",  # Ajouter un texte pour le bouton
        command=help_pressed,  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    create_button.grid(row=6, column=0, padx=10, pady=10)

def help_pressed() :
    global selected_cell
    if selected_cell is not None :
        row, column = selected_cell
        if buttons[row][column].cget("text") == "" :
            list_number = []
            for rows in range(9):
                for columns in range(9):
                    list_number.append(buttons[rows][columns].cget("text"))
            finish_pressed()
            list_number[row*9+column] = buttons[row][column].cget("text")
            clear_pressed()
            for columns_for_I in range(9):
                for rows_for_I in range(9):
                    buttons[columns_for_I][rows_for_I].config(text=str(list_number[0]))
                    list_number.pop(0)


def draw_create_button():
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    create_button = Button(
        frame_right, font=("arial", 20),
        text="Create",  # Ajouter un texte pour le bouton
        command=create_pressed,
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    create_button.grid(row=5, column=0, padx=10, pady=10)

def create_pressed():
    draw_easy_button()
    draw_hard_button()
    draw_medium_button()

def draw_easy_button():
    global easy_button
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    easy_button = Button(
        frame_right, font=("arial", 20),
        text="Easy",  # Ajouter un texte pour le bouton
        command=lambda:level_pressed(37.5),  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    easy_button.grid(row=4, column=1, padx=10, pady=10)

def draw_medium_button():
    global medium_button
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    medium_button = Button(
        frame_right, font=("arial", 20),
        text="Medium",  # Ajouter un texte pour le bouton
        command=lambda:level_pressed(32.5),  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    medium_button.grid(row=5, column=1, padx=10, pady=10)

def draw_hard_button():
    global hard_button
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    hard_button = Button(
        frame_right, font=("arial", 20),
        text="Hard",  # Ajouter un texte pour le bouton
        command=lambda:level_pressed(27.5),  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    hard_button.grid(row=6, column=1, padx=10, pady=10)

def level_pressed(number_of_case):
    delete_level_button()
    create_grid(number_of_case)

def delete_level_button():
    if easy_button is not None:
        easy_button.grid_forget()
    if medium_button is not None:
        medium_button.grid_forget()
    if hard_button is not None:
        hard_button.grid_forget()

def create_grid(number_of_case) :
    porcentage = round(number_of_case * 100 / 81)
    if fill_grid():
        for rows in range(9):
            for columns in range(9):
                number_random = random.randint(0, 100)
                if number_random >= porcentage :
                    buttons[rows][columns].config(text="")

def fill_grid() :
    clear_pressed()
    list_number = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    for rows in range(9):
        for columns in range(9):
            random.shuffle(list_number)
            for number in list_number:
                if is_valid(columns, rows, number):
                    buttons[rows][columns].config(text=str(number))
                    if solution_grid():  # Récurssion pour continuer le remplissage
                        return True
                    buttons[rows][columns].config(text="")  # Reset si pas valide
            return False
    return True

def draw_clear_button():
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    clear_button = Button(
        frame_right, font=("arial", 20),
        text="Clear",  # Ajouter un texte pour le bouton
        command=clear_pressed,  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    clear_button.grid(row=3, column=0, padx=10, pady=10)

def clear_pressed() :
    global selected_cell
    for rows in range(9):
        for columns in range(9):
            buttons[rows][columns].config(bg="SystemButtonFace")
            buttons[rows][columns].config(text="")
            selected_cell = None

def draw_finish_button():
    # Création du bouton "Finish" avec les mêmes dimensions que les blocs
    finish_button = Button(
        frame_right, font=("arial", 20),
        text="Finish",  # Ajouter un texte pour le bouton
        command=finish_pressed,  # Appel de la fonction solution() quand on clique
        width=5, height=1,  # Même taille que les cases
        pady=3.5, padx=5  # Même padding que les cases de la grille
    )
    finish_button.grid(row=4, column=0, padx=10, pady=10)

def finish_pressed() :
    red_box_number = 0
    check()
    for rows in range(9):
        for columns in range(9):
            if buttons[rows][columns].cget("bg") == "red":
                red_box_number += 1
    if red_box_number == 0 :
        solution_grid()

def check() :
    for rows in range(9):
        for columns in range(9):
            if buttons[rows][columns].cget("text") != "":
                test_check(rows, columns)

def test_check(rows, columns):
    validation = 0
    for row in range(9):
        if row != rows and buttons[rows][columns].cget("text") == buttons[row][columns].cget("text"):
            validation = 1

    for column in range(9):
        if column != columns and buttons[rows][columns].cget("text") == buttons[rows][column].cget("text"):
            validation = 1

    start_row = (rows // 3) * 3
    start_column = (columns // 3) * 3
    for row in range(start_row, start_row + 3):
        for column in range(start_column, start_column + 3):
            if (row != rows and column != columns) and buttons[row][column].cget("text") == buttons[rows][columns].cget("text"):
                validation = 1

    if validation == 1 :
        validation = 0
        buttons[rows][columns].config(bg="red")
        return True
    else :
        buttons[rows][columns].config(bg="SystemButtonFace")

def solution_grid():
    """Essaie de résoudre la grille en remplissant les cases vides."""
    for rows in range(9):
        for columns in range(9):
            if buttons[rows][columns].cget("text") == "":
                for number in range(1, 10):
                    if is_valid(columns, rows, number):
                        buttons[rows][columns].config(text=str(number))
                        if solution_grid():  # Récurssion pour continuer le remplissage
                            return True
                        buttons[rows][columns].config(text="")  # Reset si pas valide
                return False
    return True

def is_valid(columns, rows, number):
    """Vérifie si un nombre peut être placé dans une position donnée."""
    # Vérifier la ligne
    for row in range(9):
        if buttons[row][columns].cget("text") == str(number):
            return False

    # Vérifier la colonne
    for column in range(9):
        if buttons[rows][column].cget("text") == str(number):
            return False

    # Vérifier le bloc 3x3
    start_row = (rows // 3) * 3
    start_column = (columns // 3) * 3
    for row in range(start_row, start_row + 3):
        for column in range(start_column, start_column + 3):
            if buttons[row][column].cget("text") == str(number):
                return False
    return True

def draw_grid():
    """Dessine la grille 9x9 avec des boutons représentant chaque cellule."""
    for rows in range(9):
        for columns in range(9):
            # Définir les espacements pour les blocs 3x3
            top_border = 4 if rows % 3 == 0 and rows != 0 else 1
            left_border = 4 if columns % 3 == 0 and columns != 0 else 1

            # Créer le bouton avec les bordures configurées
            button = Button(
                frame_left, font=("arial", 20),
                width=5, height=2,
                pady=3.5, padx=5,
                command=lambda r=rows, c=columns: select_cell(r, c,),
                relief="solid",
                bd=1
            )
            # Ajouter un padding pour les bordures spécifiques
            button.grid(row=rows, column=columns, padx=(left_border, 0), pady=(top_border, 0))
            buttons[rows][columns] = button

def select_cell(rows, columns):
    """Sélectionne une cellule pour saisir un nombre."""
    global selected_cell

    if selected_cell is not None :
        old_row, old_column = selected_cell
        buttons[old_row][old_column].config(bg="SystemButtonFace")
        check()

    selected_cell = (rows, columns)  # Mémorise la cellule sélectionnée
    buttons[rows][columns].config(bg = "lightgreen")

def key_press(event):
    """Remplit la cellule sélectionnée avec le chiffre correspondant."""
    global selected_cell
    if event.char.isdigit() :
        if selected_cell is not None:
            rows, columns = selected_cell
            if 1 <= int(event.char) <= 9:  # Vérifie si c'est un chiffre de 1 à 9
                buttons[rows][columns].config(text=event.char)
            elif event.keysym == "space" :
                buttons[rows][columns].config(text="")
            selected_cell = (rows, columns)  # Mémorise la cellule sélectionnée
            buttons[rows][columns].config(bg="SystemButtonFace")
            check()

            selected_cell = None  # Désélectionner après remplissage

# Créer la fenêtre du jeu
root = Tk()

# Créer un Frame principal pour tout contenir
frame_principal = Frame(root, bg="lightblue")
frame_principal.pack(expand=True)

# Créer la frame pour la grille et le bouton
frame_left = Frame(frame_principal, bg="lightblue")
frame_left.grid(row=0, column=0, padx=10, pady=0)
frame_right = Frame(frame_principal, bg="lightblue")
frame_right.grid(row=0, column=1, padx=10, pady=0)

# Personnalisation de la fenêtre
root.title("Sudoku Solver")
root.config(background="lightblue")
root.geometry("700x600")

# Créer la barre de menu
menu_bar = Menu(root)
file_menu = Menu(menu_bar, tearoff=0)
file_menu.add_command(label="Quitter", command=root.quit)

# Dessiner la grille et le bouton de fin
draw_grid()
draw_finish_button()
draw_clear_button()
draw_create_button()
draw_help_button()

# Lier l'événement de touche au remplissage de la cellule
root.bind("<KeyPress>", key_press)

# Afficher la fenêtre
root.mainloop()