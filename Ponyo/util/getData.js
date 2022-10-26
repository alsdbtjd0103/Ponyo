import axios from "axios";
import { useContext, useState } from "react";
import { UserInfoContext } from "../store/user-info";
import { save_db } from "./save_db";

export async function loadTodayKcal(id, today, setKcal) {
  var loadKcalSum = 0;
  const response = await save_db(
    `select kcal from calory where email='${id}' and eatDate='${today}';`
  );
  const calF = async () => {
    for (let i = 0; i < response.data.message.length; i++) {
      loadKcalSum += response.data.message[i].kcal;
    }
  };
  const saveF = async (value) => {
    setKcal(value);
  };
  await calF();
  await saveF(loadKcalSum);
  return;
}

export async function loadRecentBlood(id, setBlood) {
  const response = await save_db(
    `select bloodpressure from calory where email='${id}' order by date_time desc;`
  );
  if (!response.data.message) {
    return;
  }
  console.log("bloodobject:", response.data.message[0]);
  const saveF = async (value) => {
    setBlood(value);
  };
  await saveF(response.data.message[0].bloodpressure);
  return;
}

export async function loadMonthCalory(id, setMonthCalory) {
  var loadCalory = 0;
  const response = await save_db(
    `select * from calory where (date_time between date_add(now(),interval -1 Month) and Now()) and email='${id}';`
  );
  if (!response.data.message) {
    return;
  }

  const calF = async () => {
    for (let i = 0; i < response.data.message.length; i++) {
      loadCalory += response.data.message[i].kcal;
    }
  };
  const saveF = async (value) => {
    setMonthCalory(value);
  };
  await calF();

  await saveF(loadCalory / 30);
  return;
}

export async function loadMonthBlood(id, time, state, setBloodData) {
  var loadBlood = [];
  console.log(id, time, state);
  const response = await save_db(
    `select bloodpressure from calory where (date_time between date_add(now(),interval -1 Month) and Now()) and email='${id}' and time='${time}' and state='${state}';`
  );
  if (!response.data.message) {
    return;
  }
  const calF = async () => {
    for (let i = response.data.message.length - 1; i >= 0; i--) {
      loadBlood.push(parseInt(response.data.message[i].bloodpressure));
    }
  };
  const saveF = async () => {
    setBloodData(loadBlood);
  };
  await calF();
  await saveF();
  console.log(loadBlood);
  return;
}

export async function getHealthScore(id, setScore, today) {
  var response = await save_db(
    `select sex from user_info where email='${id}';`
  );
  const sex = response.data.message[0].sex;

  var response = await save_db(
    `select birth from user_info where email='${id}';`
  );

  const age = 2022 - parseInt(response.data.message[0].birth.substr(0, 4));

  var response = await save_db(
    `select weight from user_info where email='${id}';`
  );
  const weight = response.data.message[0].weight;

  var response = await save_db(
    `select height from user_info where email='${id}';`
  );
  const height = response.data.message[0].height;

  var response = await save_db(
    `select exercise from user_info where email='${id}';`
  );
  const exercise = response.data.message[0].exercise;
  console.log(exercise);
  const kcal = 2000;
  const carbo = 800;
  const protein = 100;
  const fat = 50;
  const state = "공복";
  const blood = 110;

  const data = {
    sex: sex,
    age: age,
    weight: weight,
    height: height,
    kcal: kcal,
    exercise: exercise,
    carbo: carbo,
    protein: protein,
    fat: fat,
    state: state,
    blood: blood,
  };

  console.log("try scoring...");
  var response = await axios.post("http://localhost:3000/scoring", data);
  
  const saveF = async (value) => {
    setScore(value);
  };
  await saveF(response.data);
  return;
}
