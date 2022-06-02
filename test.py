import datetime

a = datetime.datetime(2022, 5, 21, 12, 33, 53)  # 打印现在的时间，详细的时间

c = datetime.datetime.now().date()  # 获取当前的日期，年月份

if a.date() > c:
    print('xiangdeng')
else:
    print('ss')
