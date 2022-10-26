#!/usr/bin/env python
# coding: utf-8


import pandas as pd
import numpy as np
import sys

#
# return BMI
def BMI(height_CM : float, weight : float):
    height_M = height_CM/100
    BMI = weight/(height_M**2)
    return BMI

# return BMI score(0~100)
def BMI_scoring(height_CM : float, weight : float, gender):
    bmi = BMI(height_CM, weight)
    ## 저체중
    if bmi < 18.5 :
        score = BMI/18.5 * 100
        cls = '저체중'
        if gender :
          standard_w = (height_CM/100)**2*22
        else:
          standard_w = (height_CM/100)**2*21

    ## 정상
    elif (bmi >=18.5)&(bmi<23): 
        score = 100
        cls = '정상'
        if gender :
          standard_w = (height_CM/100)**2*22
        else:
          standard_w = (height_CM/100)**2*21

    ## 과체중
    elif (bmi >=23)&(bmi<25): 
        score = 100 - (bmi-23)/23*100
        cls = '과체중'
        if gender :
          standard_w = (height_CM/100)**2*22
        else:
          standard_w = (height_CM/100)**2*21

    ## 비만
    else: 
        score = 100 - (bmi-25)/25*100
        cls = '비만'
        if gender :
          standard_w = (height_CM/100)**2*22
        else:
          standard_w = (height_CM/100)**2*21

    return score, bmi, cls, standard_w


# 총열량
## 권장 칼로리 계산
def recommended_calories(gender : bool, height_CM : float, weight : float, age : int):
    recommended = 0
    _, _, bmi_class,_ = BMI_scoring(height_CM, weight, gender)
    ## 남자
    if gender:
        ## 저체중
        if bmi_class == '저체중':
            recommended = 66.47 + (13.75*weight) +(5*height_CM) - (6.76*age) + 500
        ## 정상
        elif bmi_class == '정상':
            recommended = 66.47 + (13.75*weight) +(5*height_CM) - (6.76*age)
        ## 과체중 & 비만
        else :
            recommended = 66.47 + (13.75*weight) +(5*height_CM) - (6.76*age) - 500
    ## 여자
    else:
        if bmi_class ==  '저체중':
            recommended = 655.1 + (9.56*weight) +(1.85*height_CM) - (4.68*age) + 500
        elif bmi_class == '정상':
            recommended = 655.1 + (9.56*weight) +(1.85*height_CM) - (4.68*age)
        else:
            recommended = 655.1 + (9.56*weight) +(1.85*height_CM) - (4.68*age) - 500
    return recommended

## Input kcal 점수 계산
def kcal_scoring(gender : bool, height_CM : float, weight : float, age : int, Input_kcal : float, active : int) :
    score, recommended = kcal_age(gender, height_CM, weight, age, Input_kcal)
    _, _, _,standard_w = BMI_scoring(height_CM, weight, gender)
    if active == 1 : #가벼운 운동
      if not (recommended <= standard_w*25) & (recommended >= standard_w*30) :
          recommended = standard_w * ((25+30)/2)
          if (Input_kcal >= standard_w*25)&(Input_kcal<standard_w*30):
              score = 100
          elif Input_kcal >= standard_w*25:
            score = (1-(standard_w*25-Input_kcal)/Input_kcal)*100
          else :
            score = (1-(Input_kcal-standard_w*30)/Input_kcal)*100

      else :
        recommended, score

    elif active == 2 : #보통 운동
      if not (recommended <= standard_w*30) & (recommended >= standard_w*35) :
        recommended = standard_w * ((30+35)/2)
        if (Input_kcal >= standard_w*30)&(Input_kcal<standard_w*35):
            score = 100
        elif Input_kcal >= standard_w*30:
          score = (1-(standard_w*30-Input_kcal)/Input_kcal)*100
        else :
          score = (1-(Input_kcal-standard_w*35)/Input_kcal)*100

      else :
        recommended, score

    elif active == 3: #강한 운동
      if not (recommended <= standard_w*35) & (recommended >= standard_w*40) :
        recommended = standard_w * ((35+40)/2)
        if (Input_kcal >= standard_w*35)&(Input_kcal<standard_w*30):
          score = 100
        elif Input_kcal >= standard_w*35:
          score = (1-(standard_w*35-Input_kcal)/Input_kcal)*100
        else :
          score = (1-(Input_kcal-standard_w*40)/Input_kcal)*100
    return recommended, score

## 나이 기준 score 계산
def kcal_age(gender : bool, height_CM : float, weight : float, age : int, Input_kcal : float):
    recommended = recommended_calories(gender, height_CM, weight, age)
    if gender == True:
        if (age >=20)&(age<30):
            if (Input_kcal >= 1728-368.2)&(Input_kcal<1728+368.2):
                score = 100
            elif Input_kcal <= 1728-368.2:
              score = (1-(1728-368.2-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1728+368.2)/Input_kcal)*100
            
        elif (age >=30)&(age<50):
            if (Input_kcal >= 1669.5-302.1)&(Input_kcal<1669.5+302.1):
                score = 100
            elif Input_kcal <= 1669.5-302.1:
              score = (1-(1669.5-302.1-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1669.5+302.1)/Input_kcal)*100

        elif age >= 50 :
            if (Input_kcal >= 1493.8-315.3)&(Input_kcal<1493.8+315.3):
                score = 100
            elif Input_kcal <= 1493.8-315.3:
              score = (1-(1493.8-315.3-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1493.8+315.3)/Input_kcal)*100

    else:
        if (age >=20)&(age<30):
            if (Input_kcal >= 1311.5-233.0)&(Input_kcal<1311.5+233.0):
                score = 100
            elif Input_kcal <= 1311.5-233.0:
              score = (1-(1311.5-233.0-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1311.5+233.0)/Input_kcal)*100
            
        elif (age >=30)&(age<50):
            if (Input_kcal >= 1316.8-225.9)&(Input_kcal<1316.8+225.9):
                score = 100
            elif Input_kcal <= 1316.8-225.9:
              score = (1-(1316.8-225.9-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1316.8+225.9)/Input_kcal)*100

        elif age >= 50 :
            if (Input_kcal >= 1252.5-228.6)&(Input_kcal<1252.5+228.6):
                score = 100
            elif Input_kcal <= 1252.5-228.6:
              score = (1-(1252.5-228.6-Input_kcal)/Input_kcal)*100
            else :
              score = (1-(Input_kcal-1252.5+228.6)/Input_kcal)*100

    return score, recommended


# 영양소 균형

## carbo : 탄수화물(carbohydrate)
## protein : 단백질
## fat : 지방

## 탄수화물 계산
def carbo_cal(carbo, recommended, Input_nut):
    carbo = carbo*4
    carbo_min = recommended*0.6*0.55
    carbo_max = recommended*0.6*0.65
    ## 정상
    if carbo_min <= carbo and carbo <= carbo_max:
        carbo_ratio = 1
    ## 미달 | 초과
    elif carbo <= carbo_min: 
        carbo_ratio = 1-(carbo_min-carbo)/carbo
    else:
        carbo_ratio = 1-(carbo-carbo_max)/carbo
    return carbo_ratio

## 단백질 계산
def protein_cal(protein, recommended, Input_nut):
    protein = protein * 4
    protein_min = recommended*0.2*0.13
    protein_max = recommended*0.2*0.35
    ## 정상
    if protein_min <= protein and protein <= protein_max:
        protein_ratio = 1
    ## 미달 | 초과
    elif protein < protein_min:
        protein_ratio = 1-(protein_min-protein)/protein
    else:
        protein_ratio = 1-(protein-protein_max)/protein
    return protein_ratio

## 지방 계산
def fat_cal(fat, recommended, Input_nut):
    fat = fat * 9
    fat_min = recommended*0.2*0.2
    fat_max = recommended*0.2*0.35
    ## 정상
    if fat_min <= fat and fat <= fat_max:
        fat_ratio = 1
    ## 미달 | 초과
    elif fat <= fat_min:
        fat_ratio = 1-(fat_min-fat)/fat
    else:
        fat_ratio = 1-(fat-fat_max)/fat
    return fat_ratio


## 영양소 균형 계산
def balanced_ratio_cal(recommended, carbo, protein, fat) -> tuple:
    Input_nut = carbo + protein + fat

    carbo_ratio = carbo_cal(carbo, recommended, Input_nut)
    protein_ratio = protein_cal(protein, recommended, Input_nut)
    fat_ratio = fat_cal(fat, recommended, Input_nut)

    cal_score = ((carbo_ratio + protein_ratio + fat_ratio)*100/3)

    if cal_score >= 99.99 :
      cal_recommended = '정상'
    else :
      cal_recommended = '관리 필요'

    return Input_nut, cal_score, cal_recommended

# 혈당
def BS_scoring(Input_bs_time, Input_bs):
    if Input_bs_time == '공복': # (자기 전)
        if Input_bs <= 100 :
            BS_cls = '정상'
            BS_score = 100
        elif (Input_bs>100)&(Input_bs<126) :
            BS_cls = '주의'
            BS_score = (1-(Input_bs-100)/Input_bs)*100
        else :
            BS_cls = '위험'
            BS_score = (1-(Input_bs-100)/Input_bs)*100
        BS_recommend = '100이하'

    elif Input_bs_time == '식후' : #(아침, 점심, 저녁)
        if Input_bs <= 140 :
            BS_cls = '정상'
            BS_score = 100
        elif (Input_bs>140)&(Input_bs<200) :
            BS_cls = '주의'
            BS_score = (1-(Input_bs-140)/Input_bs)*100
        else :
            BS_cls = '위험'
            BS_score = (1-(Input_bs-140)/Input_bs)*100
        BS_recommend = '140이하'

    return BS_score, BS_cls, BS_recommend



# 당화혈색소
def HbA1c_func(Input_HbA1c : float):
    if Input_HbA1c <= 5.7:
        HbA1c_cls = '정상'
        HbA1c_score = 100
    else:
        HbA1c_cls = '위험'
        HbA1c_score = (1-(Input_HbA1c-5.7)/Input_HbA1c)*100
    return HbA1c_score, HbA1c_cls


HbA1c_func(6)



# 점수 계산

def score(gender:bool, age:int, weight:float, height_CM:float, active : int, Input_kcal:float, carbo:float,
          protein:float, fat:float, Input_bs_time:str, Input_bs:float, Input_HbA1c):
    Arr = np.zeros((3,5))
    
    Index = ['권장','Input','%']
    data = pd.DataFrame(Arr, columns=['BMI','총열량','영양소 균형','혈당','당화혈색소'], index=Index)
    
    bmi_score, bmi, bmi_cls, standard_w = BMI_scoring(height_CM, weight, gender)
    
    recommended, kcal_score = kcal_scoring(gender, height_CM, weight, age, Input_kcal, active)
    Input_nut, cal_score, cal_recommended = balanced_ratio_cal(recommended, carbo, protein, fat)
    BS_score, BS_cls, BS_recommend = BS_scoring(Input_bs_time, Input_bs)
    HbA1c_score, HbA1c_cls = HbA1c_func(Input_HbA1c)

    data.loc['권장', 'BMI'] = bmi_cls
    data.loc['Input', 'BMI'] = int(bmi)
    data.loc['%', 'BMI'] = int(bmi_score)

    data.loc['권장', '총열량'] = int(recommended)
    data.loc['Input', '총열량'] = int(Input_kcal)
    data.loc['%', '총열량'] = int(kcal_score)

    data.loc['권장', '영양소 균형'] = cal_recommended
    data.loc['Input', '영양소 균형'] = int(Input_nut)
    data.loc['%', '영양소 균형'] = int(cal_score)

    data.loc['권장', '혈당'] = BS_recommend
    data.loc['Input', '혈당'] = int(Input_bs)
    data.loc['%', '혈당'] = int(BS_score)

    data.loc['권장', '당화혈색소'] = '5.7이하'
    data.loc['Input', '당화혈색소'] = Input_HbA1c
    data.loc['%', '당화혈색소'] = int(HbA1c_score)

    return data


# ↓↓↓↓↓ Input code ↓↓↓↓↓


sex=sys.argv[1]
if sex=='1':  sex=True
else: sex=False

data = score(gender=sex, age=int(sys.argv[2]), weight=float(sys.argv[3]), height_CM=float(sys.argv[4]), active = int(sys.argv[5]),Input_kcal=float(sys.argv[6]),  
      carbo=float(sys.argv[7]), protein=float(sys.argv[8]), fat=float(sys.argv[9]), Input_bs_time=sys.argv[10], Input_bs=float(sys.argv[11]), Input_HbA1c=int(sys.argv[12]))

if data.loc['Input','당화혈색소'] == 0 :
  score_mean = data.iloc[2][:4].mean()
else :
  score_mean = data.iloc[2].mean()
print(int(score_mean))



