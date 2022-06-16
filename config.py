# 防止中文乱码
JSON_AS_ASCII = False
# 数据库的配置变量
HOSTNAME = '47.108.90.106'
PORT = '3310'
DATABASE = 'flight_system'
USERNAME = 'root'
PASSWORD = '123456'
DB_URI = 'mysql+pymysql://{}:{}@{}:{}/{}'.format(USERNAME, PASSWORD, HOSTNAME, PORT, DATABASE)
# # 指定使用的数据库的链接地址
SQLALCHEMY_DATABASE_URI = DB_URI
# 关闭追踪数据库的修改
SQLALCHEMY_TRACK_MODIFICATIONS = True
# 设置密钥
SECRET_KEY = '12345'
# 邮箱配置
MAIL_SERVER = "smtp.qq.com"
MAIL_PORT = "587"
MAIL_USE_TLS = True
MAIL_USERNAME = "1048655155@qq.com"
MAIL_PASSWORD = "krbzhhxvnyzobfhf"
MAIL_DEFAULT_SENDER = "1048655155@qq.com"  # 默认发送者
