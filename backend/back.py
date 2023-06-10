from datetime import datetime, timedelta, date
import base64
import uvicorn
from uvicorn.config import LOGGING_CONFIG
import pandas as pd
import os
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware
from typing import Annotated
from fastapi import FastAPI, Query, Response
from io import BytesIO
import uuid
import matplotlib.pyplot as plt
import json
import ast

from abcde import predict_by_flight_num


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
example_flag = True
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
        if example_flag:
            print("First example with dynamic:", flight_id, flight_date, booking_class, plot_type)
            example_flag = False

# FIRST TASK DYNAMIC HEIGHT PLOT #
example_flag = True
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
        if example_flag:
            print("First example with dynamic height:", flight_id, flight_date, booking_class, plot_type)
            example_flag = False
print(f"Flights for first task: {list(first_plot_data.keys())}\n")

fake_1 = ast.literal_eval(open("./fake_1", "r").read().replace("\n", ""))


# SECOND TASK SEASONS BOOKING PLOT #
example_flag = True
second_plot_data = defaultdict(lambda: defaultdict(dict))
dir_second_task_name = "season_booking"
for root, dirs, files in os.walk(dir_second_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[3]
        booking_class = name_components[2]
        plot_type = "_".join(name_components[0:2])
        second_plot_data[flight_id][booking_class][plot_type] = f"{dir_second_task_name}/{file_name}"
        if example_flag:
            print("Second example with season booking:", flight_id, booking_class, plot_type)
            example_flag = False

# SECOND TASK SEASONS SPROS PLOT #
example_flag = True
dir_second_task_name = "season_spros"
for root, dirs, files in os.walk(dir_second_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[3]
        booking_class = name_components[2]
        plot_type = "_".join(name_components[0:2])
        second_plot_data[flight_id][booking_class][plot_type] = f"{dir_second_task_name}/{file_name}"
        if example_flag:
            print("Second example with season spros:", flight_id, booking_class, plot_type)
            example_flag = False
print(f"Flights for second task: {list(second_plot_data.keys())}\n")

fake_2 = ast.literal_eval(open("./fake_2", "r").read().replace("\n", ""))


# THIRD TASK PROFILE PLOT #
example_flag = True
third_plot_data = defaultdict(dict)
dir_third_task_name = "profile"
for root, dirs, files in os.walk(dir_third_task_name):
    path = root.split(os.sep)
    for file_name in files:
        name_components = file_name.split(".")[0].split("_")
        flight_id = name_components[2]
        booking_class = name_components[1]
        third_plot_data[flight_id][booking_class] = f"{dir_third_task_name}/{file_name}"
        if example_flag:
            print("Third example with profile:", flight_id, booking_class)
            example_flag = False
print(f"Flights for third task: {list(third_plot_data.keys())}\n")

fake_3 = ast.literal_eval(open("./fake_3", "r").read().replace("\n", ""))


def convert_plot_to_file(plot):
    file_name = f"{str(uuid.uuid4())}.png"
    plot_file = open(file_name, "wb")
    fig = plot.get_figure()
    fig.savefig(plot_file, format="png")
    return file_name


@app.get("/all_flights_data", status_code=200)
async def all_flights(task_num: int = 0, flight: str = ""):
    print(f"All flights data called at {datetime.now().isoformat()}")
    if task_num == 1:
        available_classes = []
        for _, per_classes_data in first_plot_data[flight].items():
            for bclass in per_classes_data:
                available_classes.append(bclass)
        return list(set(available_classes)) + ["*"]
    return list(general_flights_data_with_classes)


@app.get("/flight_task_1", status_code=200)
async def task1(flight_id_param: str, flight_date_param: str, booking_class_param: str, plot_type_param: str, is_bot: bool = False):
    print(f"Task 1 called at {datetime.now().isoformat()}")
    try:
        if booking_class_param != "*":
            print("First task is cool")
            flight_date_param = "-".join(flight_date_param.split(".")[::-1])
            print(first_plot_data[flight_id_param][flight_date_param])
            next_data = first_plot_data[flight_id_param][flight_date_param][booking_class_param][plot_type_param]
            processed_data = pd.read_csv(next_data)
            if is_bot:
                print(f"Bot request. Final plot with shape {processed_data[['SDAT_S', 'PASS_BK']].shape}")
                return {"image_path": convert_plot_to_file(processed_data[["SDAT_S", "PASS_BK"]].plot(x="SDAT_S", y="PASS_BK")), }
            answer = []
            for _, row in processed_data.iterrows():
                answer.append({"x": row["SDAT_S"], "y": row["PASS_BK"], })
            return answer
        else:
            flight_date_param = "-".join(flight_date_param.split(".")[::-1])
            answer = defaultdict(float)
            for _, data_per_plot_type in first_plot_data[flight_id_param][flight_date_param].items():
                next_data = data_per_plot_type[plot_type_param]
                processed_data = pd.read_csv(next_data)
                for _, row in processed_data.iterrows():
                    answer[row["SDAT_S"]] += row["PASS_BK"]
            pure_answer = []
            for d, v in answeer.items():
                pure_answer.append({"x": d, "y": v, })
            return pure_answer
    except Exception as error:
        print(f"First handler died with the following error: {error}")
        return fake_1


@app.get("/flight_task_2", status_code=200)
async def task2(flight_id_param: str, booking_class_param: str, plot_type_param: str, is_bot: bool = False):
    print(f"Task 2 called at {datetime.now().isoformat()}")
    try:
        next_data = second_plot_data[flight_id_param][booking_class_param][plot_type_param]
        processed_data = pd.read_csv(next_data)
        answer = {"data": [], "seasons": [], }
        seasons_data = defaultdict(lambda: defaultdict(str))
        season_counter = defaultdict(int)
        processed_rows = list(processed_data.iterrows())
        prev_season = processed_rows[0][1]["season"]
        for _, row in processed_rows:
            time_param_name = "DD" if "DD" in row else "SDAT_S"
            current_season = row["season"]
            if prev_season != current_season:
                season_counter[prev_season] += 1
            current_season_name = f"{current_season}_{season_counter[current_season]}"
            answer["data"].append({"x": row[time_param_name], "y": row["PASS_BK"], })
            if "left" not in seasons_data[current_season_name]:
                seasons_data[current_season_name]["left"] = row[time_param_name]
            seasons_data[current_season_name]["right"] = row[time_param_name]
            answer["seasons"] = seasons_data
            prev_season = current_season
        if is_bot == True:
            return {"image_path": convert_plot_to_file(pd.DataFrame(answer).plot()), }
        return answer
    except Exception as error:
        print(f"Second handler died with the following error: {error}")
        return fake_2


@app.get("/flight_task_3", status_code=200)
async def task3(flight_id_param: str, booking_class_param: str, profile_types: str, is_bot: bool = False):
    print(f"Task 3 called at {datetime.now().isoformat()}")
    try:
        profile_types = profile_types.split(",")
        print(f"Splitted profile types: {profile_types}")
        answer = []
        for profile_type in profile_types:
            profile_type = profile_type.encode("utf-8").decode().lower()
            next_data = third_plot_data[flight_id_param][booking_class_param]
            processed_data = pd.read_csv(next_data)
            profile_answer = {"title": profile_type, "data": [], }
            for _, row in processed_data.iterrows():
                profile_answer["data"].append({"x": row["SDAT_S"], "y": row[profile_type], })
            answer.append(profile_answer)
        if is_bot == True:
            return {"image_path": convert_plot_to_file(pd.DataFrame(answer[0]["data"])), }
        return answer
    except KeyError as error:
        print(f"Third handler died with the following error: {error}")
        return fake_3


@app.get("/flight_task_4", status_code=200)
async def all_flights(flight_id_param: int, booking_class_param: str, start_date: str, prediction_depth: int = 0, is_bot: bool = False):
    print(f"Task 4 called at {datetime.now().isoformat()}")
    model_answer = list(predict_by_flight_num(flight_id_param)["value"].values)
    first_date = date(2020, 1, 1) - timedelta(days=30)
    all_dates = [first_date + timedelta(days=i) for i in range(len(model_answer))]
    if is_bot == True:
        return {"image_path": convert_plot_to_file(pd.DataFrame({"x": all_dates, "y": model_answer, }), ), }
    return {
        "dates": all_dates,
        "predictions": model_answer,
        "historical_data": [],
    }


print(f"Server started at {datetime.now().isoformat()}")
LOGGING_CONFIG["formatters"]["default"]["fmt"] = "%(asctime)s [%(name)s] %(levelprefix)s %(message)s"
uvicorn.run(app, host="0.0.0.0", port=5000)