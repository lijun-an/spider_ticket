from functools import wraps
from flask import g, request, redirect, url_for


# 检查登录装饰器
def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not hasattr(g, 'user'):
            return redirect(url_for('user.login', next=request.url))
        return f(*args, **kwargs)

    return decorated_function
