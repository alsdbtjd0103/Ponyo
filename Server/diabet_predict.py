#!/usr/bin/env python
# coding: utf-8

# ## 10년 당뇨병 발생 위험도 계산법
# 국내에서 장기간 수행된 대규모 역학연구인 안성-안산코호트연구로부터, 당뇨병이 없는 성인 8,740명을 대상으로 2년 간격으로 75 g 경구포도당내성검사와 당화혈색소를 추적관찰하여 이후 10년 동안 당뇨병이 발생할 확률을 % 값으로 제시한 자가점수법을 개발하였으며, 계산법은 표 2.3에 표기하였다
import sys

sex = sys.argv[1]
age = int(sys.argv[2])
area = sys.argv[3]
smoke =  sys.argv[4]
hypertension = sys.argv[5]
family = sys.argv[6]
waist = int(sys.argv[7])


# 고혈압은 혈압약을 복용하거나 수축기혈압 140 mm Hg 이상 또는 확장기혈압 90 mm Hg 이상으로 정의하였고, 고혈압 전단계는 수축기혈압
# 120-139 mm Hg 또는 확장기혈압 80-89 mm Hg으로 정의함. 당뇨병 가족력은 부모, 형제, 자녀 중에 당뇨병에 이환된 경우로 정의함.
# 점수합계의 최고점은 100점.



def Diabetes(sex, age, area, smoke, hypertension, family, waist):
    score = 0
    prob = 0
    
    # 성별
    if sex == '남성':
        # 나이
        if age < 45:
            pass
        elif age < 50:
            score += 4
        elif age < 55:
            score += 7
        elif age < 60:
            score += 12
        elif age < 65:
            score += 17
        else:
            score += 25
        # 거주 지역
        if area == '농촌':
            pass
        else:
            score += 17
        # 흡연력
        if smoke == '없음':
            pass
        elif smoke == '과거 흡연':
            score += 8
        else:
            score += 14
        # 고혈압
        if hypertension == '정상혈압':
            pass
        elif hypertension == '고혈압 전단계':
            score += 11
        else:
            score += 20
        # 당뇨병 가족력
        if family == '없음':
            pass
        else:
            score += 12
        # 허리둘레
        if waist < 90:
            pass
        else:
            score += 12
            
        if score < 25:
            prob = 8.9
        elif score < 30:
            prob = 20.6
        elif score < 35:
            prob = 24.3
        elif score < 40:
            prob = 23.4
        elif score < 45:
            prob = 24.8
        elif score < 50:
            prob = 28.8
        else:
            prob = 34.9                    
    
            
    # 성별
    if sex == '여성':
        # 나이
        if age < 45:
            pass
        elif age < 50:
            score += 5
        elif age < 55:
            score += 10
        elif age < 60:
            score += 8
        elif age < 65:
            score += 18
        else:
            score += 20
        # 거주 지역
        if area == '농촌':
            pass
        else:
            score += 19
        # 흡연력
        if smoke == '없음':
            pass
        elif smoke == '과거 흡연':
            score += 9
        else:
            score += 13
        # 고혈압
        if hypertension == '정상혈압':
            pass
        elif hypertension == '고혈압 전단계':
            score += 10
        else:
            score += 19
        # 당뇨병 가족력
        if family == '없음':
            pass
        else:
            score += 15
        # 허리둘레
        if waist < 85:
            pass
        else:
            score += 14
        
        if score < 25:
            prob = 10.8
        elif score < 30:
            prob = 24.1
        elif score < 35:
            prob = 21.5
        elif score < 40:
            prob = 27.4
        elif score < 45:
            prob = 26.9
        elif score < 50:
            prob = 28.6
        else:
            prob = 38.3
        
    return prob


print(Diabetes(sex, age, area, smoke, hypertension, family, waist))


# 출처: 이승환, 당뇨병 선별검사, 16
