from flask import Flask, session, g
from blueprint import user_bp, flight_bp
import config
from exts import db, mail
from flask_migrate import Migrate
from module import UserModel

app = Flask(__name__)
# 应用config中的设置
app.config.from_object(config)
# 绑定蓝图
app.register_blueprint(user_bp)
app.register_blueprint(flight_bp)
# 给app绑定数据库对象和邮箱对象
db.init_app(app)
mail.init_app(app)
# 绑定数据库
migrate = Migrate(app, db)


# 在服务器接收的请求还没分发到视图函数之前执行的钩子函数
@app.before_request
def before_request():
    user_id = session.get("user_id")
    if user_id:
        try:
            g.user = UserModel.query.filter_by(id=user_id).first()
        except:
            g.user = None


@app.context_processor
def context():
    # 必须返回一个字典
    # hasattr(obj, attr) 判断obj是否有attr属性, 注意此时的attr应该是字符串
    if hasattr(g, "user"):
        return {"user": g.user}
    else:
        # 注意: 必须返回一个字典
        return {}


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
