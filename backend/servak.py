import uvicorn
import pandas as pd
import os
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi import FastAPI, Query


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


general_flights_data = pd.read_csv("RASP2020.csv", sep=";")
per_num_classes = {"1120": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1121": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1122": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1123": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1124": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1125": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1126": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1127": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1128": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1129": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1130": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1131": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1134": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1135": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1138": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1139": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1140": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1141": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1172": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1173": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1174": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1175": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1642": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1643": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1772": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1775": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "2957": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1132": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1133": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1740": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1741": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1771": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1773": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1780": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1781": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1790": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1791": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1792": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1793": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "2985": ["J", "M", "C", "Y"], "2990": ["J", "M", "C", "Y"], "1782": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1783": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1784": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1785": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1786": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1787": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1788": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1789": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1794": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1795": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1796": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1797": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1798": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1799": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "2980": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "2981": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1136": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1137": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1148": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1151": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6179": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6180": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6181": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6182": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1116": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1117": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1118": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1119": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6186": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "6185": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1152": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"], "1153": ["P", "I", "D", "Q", "M", "T", "R", "G", "X", "U", "C", "B", "O", "V", "K", "Z", "H", "N", "J", "Y", "E", "L"]}
general_flights_data_with_classes = []
already_processed = set()
for _, data_line in general_flights_data.iterrows():
    current_flight_id = str(data_line["FLT_NUMSH"])
    flight_time = str(data_line["DEP_TIME1"])
    new_flight_data = {
        "time": f"{flight_time[:-2]}:{flight_time[-2:]}",
        "title": current_flight_id,
        "direction": f"{data_line['LEG_ORIG']} - {data_line['LEG_DEST']}",
        "classes": per_num_classes[current_flight_id],
    }
    if str(new_flight_data) in already_processed:
        continue
    already_processed.add(str(new_flight_data))
    general_flights_data_with_classes.append(new_flight_data)


# FIRST TASK DYNAMIC BOOKING PLOT #
first_plot_data = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))
dir_first_task_name = "dynamic"
for root, dirs, files in os.walk(dir_first_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[2]
        flight_date = name_components[3]
        booking_class = name_components[1]
        plot_type = name_components[0]
        first_plot_data[flight_id][flight_date][booking_class][plot_type] = f"{dir_first_task_name}/{file_name}"

# FIRST TASK DYNAMIC HEIGHT PLOT #
dir_first_task_name = "dynamic_height"
for root, dirs, files in os.walk(dir_first_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[3]
        flight_date = name_components[4]
        booking_class = name_components[2]
        plot_type = "_".join(name_components[0:2])
        first_plot_data[flight_id][flight_date][booking_class][plot_type] = f"{dir_first_task_name}/{file_name}"

print(f"Prepared first: {dict(first_plot_data)}")


# SECOND TASK SEASONS BOOKING PLOT #
second_plot_data = defaultdict(lambda: defaultdict(lambda: defaultdict(dict)))
dir_second_task_name = "season_booking"
for root, dirs, files in os.walk(dir_second_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[3]
        booking_class = name_components[2]
        plot_type = "_".join(name_components[0:2])
        second_plot_data[0][flight_id][booking_class][plot_type] = f"{dir_second_task_name}/{file_name}"

# SECOND TASK SEASONS SPROS PLOT #
dir_second_task_name = "season_spros"
for root, dirs, files in os.walk(dir_second_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[3]
        booking_class = name_components[2]
        plot_type = "_".join(name_components[0:2])
        second_plot_data[0][flight_id][booking_class][plot_type] = f"{dir_second_task_name}/{file_name}"

print(f"Prepared second: {dict(second_plot_data)}")


# THIRD TASK PROFILE PLOT #
third_plot_data = defaultdict(lambda: defaultdict(dict))
dir_third_task_name = "profile"
for root, dirs, files in os.walk(dir_third_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[2]
        booking_class = name_components[1]
        third_plot_data[0][flight_id][booking_class] = f"{dir_third_task_name}/{file_name}"

print(f"Prepared third: {dict(third_plot_data)}")


# mock model

class Boom:
    @staticmethod
    def predict(flight_id_to_predict: str, booking_class_to_predict: str, start_date: str, prediction_depth: int):
        return list(range(prediction_depth))


model = Boom()


@app.get("/flight_task_1", status_code=200)
async def task1(flight_id_param: str, flight_date_param: str, booking_class_param: str, plot_type_param: str):
    try:
        next_data = first_plot_data[flight_id_param][flight_date_param][booking_class_param][plot_type_param]
        processed_data = pd.read_csv(next_data)
        answer = []
        for _, row in processed_data.iterrows():
            answer.append({"x": row["SDAT_S"], "y": row["PASS_BK"], })
        return answer
    except KeyError as error:
        print(f"First handler died with the following error: {error}")
        return []


@app.get("/flight_task_2", status_code=200)
async def task2(flight_id_param: str, booking_class_param: str, plot_type_param: str):
    try:
        next_data = second_plot_data[0][flight_id_param][booking_class_param][plot_type_param]
        processed_data = pd.read_csv(next_data)
        answer = {"data": [], "seasons": [], }
        seasons_data = defaultdict(lambda: defaultdict(str))
        for _, row in processed_data.iterrows():
            try:
                answer["data"].append({"x": row["DD"], "y": row["PASS_BK"], })
                if "left" in seasons_data[row["season"]]:
                    seasons_data[row["season"]]["left"] = min(row["DD"], seasons_data[row["season"]]["left"])
                else:
                    seasons_data[row["season"]]["left"] = row["DD"]
                seasons_data[row["season"]]["right"] = max(row["DD"], seasons_data[row["season"]]["right"])
            except KeyError as exep:
                answer["data"].append({"x": row["SDAT_S"], "y": row["delta"], })
                if "left" in seasons_data[row["season"]]:
                    seasons_data[row["season"]]["left"] = min(row["SDAT_S"], seasons_data[row["season"]]["left"])
                else:
                    seasons_data[row["season"]]["left"] = row["SDAT_S"]
                seasons_data[row["season"]]["right"] = max(row["SDAT_S"], seasons_data[row["season"]]["right"])
            answer["seasons"] = seasons_data
        return answer
    except KeyError as error:
        print(f"Second handler died with the following error: {error}")
        return {"data": [], "seasons": {}, }


@app.get("/flight_task_3", status_code=200)
async def task3(flight_id_param: str, booking_class_param: str, profile_types: Annotated[list[str], Query()]):
    try:
        answer = []
        for profile_type in profile_types:
            next_data = third_plot_data[0][flight_id_param][booking_class_param]
            processed_data = pd.read_csv(next_data)
            profile_answer = {"title": profile_type, "data": [], }
            for _, row in processed_data.iterrows():
                profile_answer["data"].append({"x": row["SDAT_S"], "y": row[profile_type], })
            answer.append(profile_answer)
        return answer
    except KeyError as error:
        print(f"Third handler died with the following error: {error}")
        return []


@app.get("/all_flights_data", status_code=200)
async def all_flights():
    return list(general_flights_data_with_classes)


@app.get("/flight_task_4", status_code=200)
async def all_flights(flight_id_param: str, booking_class_param: str, start_date: str, prediction_depth: int):
    return model.predict(flight_id_param, booking_class_param, start_date, prediction_depth)


uvicorn.run(app, host="0.0.0.0", port=5000, log_level="info")
