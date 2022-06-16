from flask import Blueprint, render_template, request, flash, redirect, url_for, jsonify, session
from .form import RegisterForm, LoginForm
import random
import datetime
from module import EmailCaptchaModel, UserModel
from exts import db, mail
from flask_mail import Message

bp = Blueprint('user', __name__, url_prefix='/user')


# 注册
@bp.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'GET':
        return render_template('register.html')
    else:
        # 表单验证
        form = RegisterForm(request.form)
        print(request.form)
        if form.validate():
            # 如果表单验证成功则将数据存入数据库
            username = request.form['username']
            email = request.form['email']
            password = request.form['password']
            print(username, email, password)
            user_model = UserModel(username=username, email=email, password=password)
            db.session.add(user_model)
            db.session.commit()
            flash("注册成功！")
            return redirect(url_for('user.login'))
        else:
            flash("信息输入格式有误，注册失败！")
            # 如果验证失败则重定向到注册页面
            print(form.errors)
            return redirect(url_for('user.register'))
            # 登录


@bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    else:
        print(request.form)
        form = LoginForm(request.form)
        if form.validate():
            username = request.form['username']
            password = request.form['password']
            try:
                user_model = UserModel.query.filter_by(username=username).first()
                if not user_model:
                    flash('该用户不存在')
                    return redirect(url_for('user.login'))
                else:
                    if not user_model.password == password:
                        flash('密码错误')
                        return redirect(url_for('user.login'))
                    else:
                        session['user_id'] = user_model.id
                        flash('登录成功')
                        return redirect(url_for('flight.index'))
            except:
                flash('用户名或密码输入格式有误')
                return redirect(url_for('user.login'))
        else:
            print(form.errors)
            flash('用户名或密码输入格式有误')
            return redirect(url_for('user.login'))


# 退出登录
@bp.route('/logout')
def logout():
    #  清楚session中的数据
    session.clear()
    return redirect(url_for('user.login'))


# 发送邮箱验证码
@bp.route('/captcha')
def send_captcha():
    # 生成验证码
    code = generate_verification_code_v2()
    email = request.values.get('email')
    print(email)
    if email:
        try:
            captcha_model = EmailCaptchaModel.query.filter_by(email=email).first()
            # 如果邮箱已经存在，更新一下该邮箱对应的验证码
            if captcha_model:
                captcha_model.captcha = code
                captcha_model.create_time = datetime.datetime.now()
                db.session.commit()
                message = Message(subject='您的验证码', recipients=[f'{email}'], body=f"你的邮箱已发送过验证码,新的验证码为：{code}")
                print(message)
                mail.send(message)
                return jsonify({'code': 200, 'message': '邮箱已成功发送！'})
                # 如果邮箱不存在，直接发送一个新的验证码，并将邮箱和验证码存入数据库
            else:
                new_captcha_model = EmailCaptchaModel(email=email, captcha=code)
                db.session.add(new_captcha_model)
                db.session.commit()
                message = Message(subject='您的验证码', recipients=[f'{email}'], body=f"您的验证码为：{code}")
                mail.send(message)
                print(message)
                return jsonify({'code': 200, 'message': '邮箱已成功发送！'})
        except:
            return jsonify({'code': 400, 'message': '邮箱发送失败！请重新发送！'})
    else:
        return jsonify({'code': 400, 'message': '邮箱发送失败！请重新发送！'})


# 生成随机验证码
def generate_verification_code_v2():
    ''' 随机生成6位的验证码 '''
    code_list = []
    for i in range(2):
        random_num = random.randint(0, 9)  # 随机生成0-9的数字
        # 利用random.randint()函数生成一个随机整数a，使得65<=a<=90
        # 对应从“A”到“Z”的ASCII码
        a = random.randint(65, 90)
        b = random.randint(97, 122)
        random_uppercase_letter = chr(a)
        random_lowercase_letter = chr(b)
        code_list.append(str(random_num))
        code_list.append(random_uppercase_letter)
        code_list.append(random_lowercase_letter)
    verification_code = ''.join(code_list)
    return verification_code
