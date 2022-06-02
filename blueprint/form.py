import wtforms
from wtforms.validators import length, email, EqualTo
from module import EmailCaptchaModel, UserModel


# 注册验证
class RegisterForm(wtforms.Form):
    username = wtforms.StringField(validators=[length(min=4, max=25)])
    email = wtforms.StringField(validators=[email()])
    captcha = wtforms.StringField(validators=[length(min=6, max=6)])
    password = wtforms.StringField(validators=[length(min=5, max=15), EqualTo('confirm')])
    confirm = wtforms.StringField()

    ### 自定义验证器：
    # 如果想要对表单中的某个字段进行更细化的验证，那么可以针对这个字段进行单独的验证。步骤如下：
    # 1. 定义一个方法，方法的名字规则是：`validate_字段名(self,filed)`。
    # 2. 在方法中，使用`field.data`可以获取到这个字段的具体的值。
    # 3. 如果数据满足条件，那么可以什么都不做。如果验证失败，那么应该抛出一个`wtforms.validators.ValidationError`的异常，并且把验证失败的信息传到这个异常类中。

    # 自定义校验验证码的方法
    def validate_captcha(self, filed):
        captcha = filed.data
        email = self.email.data
        #         如果邮箱存在且对应的验证码相等，则满足条件，否则验证失败
        try:
            captcha_model = EmailCaptchaModel.query.filter_by(email=email).first()
            if not captcha_model or captcha_model.captcha.lower() != captcha.lower():
                raise wtforms.validators.ValidationError('验证码错误！')
        except:
            raise wtforms.validators.ValidationError('系统错误！')

    # 邮箱不可反复注册
    def validate_email(self, filed):
        try:
            email = filed.data
            print(email)
            # 如果该邮箱已经被注册，返回验证失败
            user_model = UserModel.query.filter_by(email=email).first()
            if user_model:
                raise wtforms.validators.ValidationError('该邮箱已被注册！')
        except:
            raise wtforms.validators.ValidationError('该邮箱信息错误')

    # 用户名不可相同
    def validate_username(self, filed):
        try:
            username = filed.data
            print(username)
            # 如果该邮箱已经被注册，返回验证失败
            user_model = UserModel.query.filter_by(username=username).first()
            if user_model:
                raise wtforms.validators.ValidationError('该用户名已被使用！')
        except:
            raise wtforms.validators.ValidationError('该用户名信息错误')


# 登录验证
class LoginForm(wtforms.Form):
    username = wtforms.StringField(validators=[length(min=4, max=25)])
    password = wtforms.StringField(validators=[length(min=5, max=15)])
