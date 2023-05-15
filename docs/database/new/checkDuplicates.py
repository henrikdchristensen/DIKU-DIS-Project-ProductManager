import pandas as pd

users = ["All", "All Mech", "Breeders", "Danilift", "DISP", "DRA", "EK", "Esben Kristensen", "ESN", "FM Maskiner", "GMV", "HB", "HJ", "Hulgaard", "Ivan Jakobsen", "Just Easy Tools", "Ketner", "KG", "KJ", "KNOP", "KT", "Kunde", "Langhøj", "Lausø", "MJ", "MSK", "MSS", "MWD", "NatDis", "NCN", "NK", "NV", "RM", "SBA", "Skarpnes", "Smartlift", "SR", "TDJHors", "Voltech", "VS", "Zeppelin"]

def findNonExistingUsers(file):
    # read csv file
    df = pd.read_csv(file + ".csv", delimiter=';')
    # check if df has rows where the firsto two columns are the same

    s = set()

    def p(x):
        if x not in users:
            s.add(x)
     
    
    df["User"].apply(p)
    print(s)
        

# read csv file and check for duplicates using for loop
def deleteDuplicates(file, colums):
    # read csv file
    df = pd.read_csv(file + ".csv", delimiter=';')
    # check if df has rows where the firsto two columns are the same
    df = df.drop_duplicates(subset=colums, keep='first')
    df.to_csv(file + "-new.csv", index=False, header=False, sep=';');


deleteDuplicates('Devices_sw', ['number'])

#findNonExistingUsers('Produced_Products')