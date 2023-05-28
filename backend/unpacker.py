import subprocess
from os import listdir
from os.path import isfile, join


super_puper = ["dynamic", "dynamic_height", "profile", "season_spros", "season_booking"]
final_command = ""
for f in listdir("./Nastya"):
    f_comps = f.split(".")
    if len(f_comps) < 1:
        continue
    if f_comps[-1] != "zip":
       continue
    final_command += "unzip ./Nastya/" + f + " -d " + f_comps[0] + " && "
    for data_frag in super_puper:
        final_command += "mv " + f"./{f_comps[0]}/*/{data_frag}/* " + data_frag + " && "

print(final_command)

