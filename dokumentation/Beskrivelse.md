# Beskrivelse af eksisterende database

Det eksisterende database design ser ud som følger:
<img src="Database_diagram.png">
Som man kan se er der ingen relationer mellem de forskellige entety sets, hvilket er problematisk.


De forskellige entety sets er beskrevet som følger:
* <b>Products</b>: De produkter som mechtronic har udviklet. 
* <b>Devices</b>: De enheder som bliver produceret af et bestemt produkt. Den person som har produceret enheden gemmes i ProductEmployee. Den som ejer enheden gemmes i Owner.
* <b>Bugs</b>: Hvis et produkt har en fejl (fx en softwarefejl) - omhandler altså et produkt og ikke en specifik enhed
* <b>Users</b>: Alle brugere af systemet
* <b>Components</b>: De komponenter som mechtronic har udviklet. En komponent kan tilføjes til en produktenhed for at give ekstra funktionalitet. En komponent er kun kompatibel med nogle produkter - derfor ProductIDs.
* <b>Parameters</b>: En parameter for en komponent. Kan fx være WiFi indstillinger til et router-komponent. 
* <b>Component</b>: En produceret komponentenhed som er sat på en bestemt produktenhed
* <b>ComponentParameter</b>: Parameterværdi for en komponent-parameter som er tilknyttet en specifik komponentenhed.
* <b>Service</b>: Når der laves service af en produktenhed, så skal der beskrives hvad der er lavet. Altså er den tilknyttet et DeviceID.

De sidste to entety sets ser ikke ud til at blive brugt, men tror meningen er som følger:
* <b>Serviceparts</b>: De forskellige typer af servicedele - fx LCD-display osv.
* <b>Servicepart</b>: En servicedel som er blevet brugt. Altså skal den være tilknyttet en "serviceparts" i form af Partnumber og en service i form af ServiceID.
