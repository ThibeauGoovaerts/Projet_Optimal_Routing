from PIL import Image, ImageDraw, ImageFont
from retrieveData import readParams, getCoordinates, getNameEquipe
import os

weekdays = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"]
desktop = os.path.join(os.path.join(os.environ['USERPROFILE']), 'Desktop')


def color_indiv_teams(bungalows_to_clean, nb_equipe, date, file_name, reloue):
    # Creates a new image
    im = Image.open("../photos/plan_inter.png").convert("RGBA")
    overlay = Image.new("RGBA", (1500, 1754), color=(255, 255, 255, 0))
    d = ImageDraw.Draw(overlay)
    fnt = ImageFont.truetype("arialbd.ttf", size=35)
    fn = ImageFont.truetype("arialbd.ttf", size=50)
    # Writes the date
    d.text((50, 50), str(weekdays[int(date.weekday())]) + "    " + str(date.day) + "/" + str(date.month), font=fn,
           fill=(0, 0, 0))
    # Writes the number of the team
    name_equipe = getNameEquipe(nb_equipe)

    if len(name_equipe) == 4:
        names = name_equipe[0] + " " + name_equipe[1] + "\n" + name_equipe[2] + " " + name_equipe[3]
    else:
        names = name_equipe[0] + " " + name_equipe[1]
    d.text((100, 150), names, font=fnt, fill=(0, 0, 0))
    # The radius of the circle overlapping the bungalow
    r = 15
    # The start_coordinate where the text needs to be written
    start_coordinate = 613
    fnt = ImageFont.truetype("arialbd.ttf", size=25)
    # Goes to look for the bungalows that belong to Orava in the params file
    bng_orava = readParams(bng_orava_list=True)
    # Writes the number of the bungalow and colors a green or purple circle over the bungalow over the map.
    # The green circle is for a not Orava bungalow and the purple circle is for a Orava bungalow.
    # When a bungalow is reloue, a 'R' is added behind the bungalow number
    for j in bungalows_to_clean:
        if j in reloue:
            d.text((1333, start_coordinate), str(j) + ' R', font=fnt, fill=(0, 0, 0))
        else:
            d.text((1333, start_coordinate), str(j), font=fnt, fill=(0, 0, 0))
        start_coordinate += 60
        x, y = getCoordinates(j)
        leftUp = x - r, y - r
        leftRight = x + r, y + r
        if j in bng_orava:
            d.ellipse([leftUp, leftRight], fill=(0, 130, 100))  # Purple
        else:
            d.ellipse([leftUp, leftRight], fill=(0, 210, 0))  # Green

    im.paste(overlay, (0, 0), overlay)
    im.save(desktop + f"/schoonmaaklijst/{file_name}/info_equipes/Equipe{nb_equipe}.png")

    return desktop + f"/schoonmaaklijst/{file_name}/info_equipes/Equipe{nb_equipe}.png"


def make_winter_plan(aankomst, vertrek, date, file_name):
    # Creates a new image
    im = Image.open("../photos/winter.png").convert("RGBA")
    overlay = Image.new("RGBA", (1500, 1754), color=(255, 255, 255, 0))
    d = ImageDraw.Draw(overlay)
    fnt = ImageFont.truetype("arialbd.ttf", size=35)
    fn = ImageFont.truetype("arialbd.ttf", size=50)
    # Writes the date
    d.text((50, 50), str(date), font=fn,
           fill=(0, 0, 0))
    # The radius of the circle overlapping the bungalow
    r = 17
    # Goes to look for the bungalows that belong to Orava in the params file
    bng_orava = readParams(bng_orava_list=True)
    # Writes the number of the bungalow and colors a green or purple circle over the bungalow over the map.
    # The green circle is for a not Orava bungalow and the purple circle is for a Orava bungalow.
    for j in aankomst:
        x, y = getCoordinates(j)
        left_up = x - r, y - r
        left_right = x + r, y + r
        d.ellipse([left_up, left_right], fill=(0, 210, 0))  # Green

    r = 10
    for j in vertrek:
        x, y = getCoordinates(j)
        left_up = x - r, y - r
        left_right = x + r, y + r
        d.ellipse([left_up, left_right], fill=(240, 0, 0))  # Red

    im.paste(overlay, (0, 0), overlay)
    im.save(desktop + f"/schoonmaaklijst/{file_name}/Winterplan.png")
    return
