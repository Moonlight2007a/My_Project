from tkinter import *

def replay() :
    frame_win.grid_remove()
    global current_player
    global win
    for i in range(3):
        for j in range(3):
            buttons[i][j].config(text = "")
    current_player = 'X'
    win = False
    draw_grid()


def check_nul() :
    print("Match nul")

def print_winner() :
    global win
    if win is False :
        win = True
    label_title = Label(frame_win, text=f"Le joueur {current_player} à gagné le jeu", font=("Courier", 10), fg='black')
    label_title.pack()
    button_endgame()

def button_endgame() :
    button_restart = Button(frame_win, text = "Recommencer", font = ("Courier", 10), bg = 'white',  fg = 'black', command =  replay)
    button_quit = Button(frame_win, text = "Quitter", font = ("Courier", 10), bg = 'white',  fg = 'black', command = root.quit)
    button_restart.pack()
    button_quit.pack()

#Changer de joueur
def switch_player() :
    global current_player
    if current_player == 'X' :
        current_player = 'O'
    else :
        current_player = 'X'


#Detection de victoire
def check_win(clicked_row, clicked_col) :

    #Detecter la victoire horizontal
    count = 0
    for i in range(3):
        current_button = buttons[i][clicked_row]
        if current_button['text'] == current_player :
            count += 1
    if count == 3 :
        print_winner()

    #Detecter la victoire vertical
    count = 0
    for i in range(3):
        current_button = buttons[clicked_col][i]
        if current_button['text'] == current_player :
            count += 1
    if count == 3 :
        print_winner()

    # Detecter la victoire diagonal
    count = 0
    for i in range(3):
         current_button = buttons[i][i]
         if current_button['text'] == current_player:
            count += 1
    if count == 3:
        print_winner()

     # Detecter la victoire diagonal inversé
    count = 0
    for i in range(3):
        current_button = buttons[2-i][i]
        if current_button['text'] == current_player:
            count += 1
    if count == 3:
        print_winner()

    if win is False :
        count = 0
        for col in range (3) :
            for row in range (3) :
                current_button = buttons[col][row]
                if current_button['text'] != "" :
                    count +=1
        if count == 9 :
            print("Match nul")





# Dessin de la grille
def draw_grid() :
    for colomn in range (3) :
        buttons_in_cols = []
        for row in range (3) :
            button = Button(
                frame_principal, font=("Arial", 25),
                width = 10, height = 5,
                command = lambda r = row, c = colomn: place_symbol(r, c)
            )
            button.grid(row = row, column = colomn)
            buttons_in_cols.append(button)
        buttons.append(buttons_in_cols)

#Detection de click
def place_symbol(row, column) :
    clicked_button = buttons[column][row]
    if clicked_button['text'] == "" :
        clicked_button.config(text = current_player)
        check_win(row, column)
        switch_player()


# Stockages
buttons = []
current_player = 'X'
win = False


#Creer la fenetre du jeu
root = Tk()


#Creer la frame
frame_best = Frame(root)
frame_principal = Frame(frame_best)
frame_win = Frame(frame_best)


#Personnalisation de la fenetre
root.title("Morpion")
root.iconbitmap("jeux_morpion.ico")
root.minsize(500, 500)
root.config(background = '#1679A2')

#Création barre menu
menu_bar = Menu(root)

file_menu = Menu(menu_bar ,tearoff = 0)
file_menu.add_command(label = "Quitter", command = root.quit)
file_menu.add_command(label = "Rejouer", command = replay )
menu_bar.add_cascade(label = "Fichier", menu = file_menu)

root.config(menu = menu_bar)


#Placement de la grille
frame_best.pack(expand = YES)
frame_win.grid(row = 0, column = 0)
frame_principal.grid(row = 0, column = 0)
draw_grid()

#Dessin de la fenetre

root.mainloop()