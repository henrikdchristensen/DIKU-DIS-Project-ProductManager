import pandas as pd

users = ["All", "All Mech", "Breeders", "Danilift", "DISP", "DRA", "EK", "Esben Kristensen", "ESN", "FM Maskiner", "GMV", "HB", "HJ", "Hulgaard", "Ivan Jakobsen", "Just Easy Tools", "Ketner", "KG", "KJ", "KNOP", "KT", "Kunde", "Langhøj", "Lausø", "MJ", "MSK", "MSS", "MWD", "NatDis", "NCN", "NK", "NV", "RM", "SBA", "Skarpnes", "Smartlift", "SR", "TDJHors", "Voltech", "VS", "Zeppelin"]

def findDeviceIds():
    deviceIds = [4720, 4719, 5114, 5956, 5957, 6221, 6221, 8261, 8262, 8284, 8289, 8290, 8291, 8292, 8293, 8294, 8295, 8296, 8297, 9298, 9324, 10877, 11122, 11123, 11124, 11330, 11331, 11332, 11335, 11334, 11333, 12006, 12007, 12008, 12009, 12010, 12199, 12399, 12399, 12400, 12400, 13132, 13133, 13134, 13135, 13136, 13137, 13242, 14349, 14350, 14351, 14352, 14353, 14985, 14986, 14987, 15295, 15472, 15473, 15474, 15475, 19076, 19077, 19078, 19079, 19128, 19129, 19130, 19131, 19431, 19432, 19433, 19434, 19437, 19437, 19436, 19436, 20786, 20789, 21396, 21422, 24035, 24036, 24037, 24038, 22703, 28131, 28132, 31245, 31246, 31247, 31248, 31249, 31250, 31251, 31249, 31249, 31250, 31251, 31411, 31412, 31413, 31414, 31415, 41764, 45157, 45404, 45405, 45406, 45407, 46129, 46130, 47647, 47648, 47649, 47650, 47651,]

    df = pd.read_csv("Devices_ids.csv", delimiter=';')
    device_df = pd.DataFrame()
    
    for id in deviceIds:
        # find each device id in df
        id_df = df['ID'] == id
        # chechk if id_df has any rows
        if sum(id_df) == 0:
            print(id)
            continue
        device_df = pd.concat([device_df, df.loc[id_df]])


    device_df.to_csv("Devices_ids_new.csv", index=False, header=False, sep=';')

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


#deleteDuplicates('Devices_sw', ['number'])

#findNonExistingUsers('Produced_Products')

findDeviceIds();