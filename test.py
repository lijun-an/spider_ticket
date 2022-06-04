import datetime
import re

a = datetime.datetime(2022, 5, 21, 12, 33, 53)  # 打印现在的时间，详细的时间
b = a.strftime('%Y-%m-%d')
print(b)
