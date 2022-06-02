from exts import db
from datetime import datetime


class UserModel(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False, unique=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    register_time = db.Column(db.DateTime, default=datetime.now)
    # 在ORM层面绑定两者之间的关系，第一个参数是绑定的表的类名，
    # 第二个参数back_populates是通过User反向访问时的字段名称


class EmailCaptchaModel(db.Model):
    __tablename__ = 'email_captcha'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    captcha = db.Column(db.String(50), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)



class FlightModel(db.Model):
    __tablename__ = 'flight'
    id = db.Column(db.Integer, primary_key=True)
    depCity = db.Column(db.String(50), nullable=False)
    arrCity = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    discount = db.Column(db.Float, nullable=False, default=float(0))
    date = db.Column(db.DateTime, nullable=False)
    url = db.Column(db.Text, nullable=False)
    source = db.Column(db.String(50), nullable=False)
    create_time = db.Column(db.DateTime, default=datetime.now)
