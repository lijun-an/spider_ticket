from flask import Blueprint, render_template, request, jsonify
from module import FlightModel, UserModel
from exts import db, mail
from sqlalchemy import and_
import datetime

bp = Blueprint('flight', __name__, url_prefix='/')


# 首页
@bp.route('/')
def index():
    # 传递给首页模板参数,包括所爬网站数,爬取信息总数,今日爬取信息,用户数.
    # 爬取的平台数
    index_dic = {}
    sources = db.session.query(FlightModel.source, db.func.count(FlightModel.source)).group_by(
        FlightModel.source).all()
    source_num = len(sources)
    data_num = len(FlightModel.query.all())
    user_num = len(UserModel.query.all())
    taday_datas = FlightModel.query.all()
    # print(taday_datas)
    taday_data_num = 0
    for taday_data in taday_datas:
        if taday_data.create_time.date() == datetime.datetime.now().date():
            taday_data_num += 1
    index_dic['source_num'] = source_num
    index_dic['data_num'] = data_num
    index_dic['user_num'] = user_num
    index_dic['taday_data_num'] = taday_data_num
    return render_template('index.html', index_dic=index_dic)


@bp.route('/discount')
def discount():
    # 返回全国类机票价格最低前五十机票信息
    citys = db.session.query(FlightModel.depCity).group_by(
        FlightModel.depCity).order_by(-db.func.count(FlightModel.id)).limit(20).all()
    # 返回机票信息最多的前十城市
    city_list = []
    for city in citys:
        city_list.append(city[0])
    return render_template('ticketinfo.html', citys=city_list)


@bp.route('/message')
def message():
    country_tickets = db.session.query(FlightModel.depCity, FlightModel.arrCity, FlightModel.price,
                                       FlightModel.discount, FlightModel.source, FlightModel.date,
                                       FlightModel.url).order_by(
        FlightModel.price).limit(
        50).all()
    print(country_tickets)
    city_10st = db.session.query(FlightModel.depCity).group_by(
        FlightModel.depCity).order_by(-db.func.count(FlightModel.id)).limit(10).all()
    citys = []
    for i in city_10st:
        city = str(i).replace('(\'', '').replace('\',)', '')
        citys.append(city)
    print(citys)
    return render_template('message.html', citys=citys, country_tickets=country_tickets)


@bp.route('/search')
def search():
    cityname = request.args.get('cityname')
    print(cityname)
    citys = FlightModel.query.filter_by(depCity=cityname).order_by(FlightModel.price).all()
    city_list = []
    if citys:
        for city in (citys[:15] if len(citys) > 15 else citys):
            city_dic = {}
            city_dic['price'] = city.price
            city_dic['date'] = city.date.strftime('%Y-%m-%d')
            city_dic['arrCity'] = city.arrCity
            print(city_dic)
            city_list.append(city_dic)
        print(city_list)
        return jsonify({'code': 200, 'citys': city_list})

    else:
        return jsonify({'code': 400, 'message': '抱歉，暂时未搜索到该城市的机票信息！'})


@bp.route('/search_city')
def search_city():
    cityname = request.args.get('cityname')
    print(cityname)
    citys = FlightModel.query.filter_by(depCity=cityname).order_by(FlightModel.price).all()
    city_list = []
    # for city in (citys[:50] if len(citys) > 50 else citys):
    #     city_dic = {}
    #     city_dic['price'] = city.price
    #     city_dic['date'] = city.date.strftime('%Y-%m-%d')
    #     city_dic['arrCity'] = city.arrCity
    #     print(city_dic)
    #     city_list.append(city_dic)
    # print(city_list)
    return jsonify(citys)


# 根据出发地、目的地和日期搜素航班信息
@bp.route('/search_flight')
def search_flight():
    depCity = request.args.get('depCity')
    arrCity = request.args.get('arrCity')
    date = request.args.get('date')
    flights = FlightModel.query.filter_by(and_(depCity == depCity, arrCity == arrCity, date=date)).order_by(
        FlightModel.price).all()
    if flights:
        return jsonify({'code': 200, 'flights': flights})
    else:
        return jsonify({'code': 400, 'message': '该航班信息不存在！'})


# 返回热门城市的航班信息
@bp.route('/hotCity_flight')
def hotCity_flight():
    city_name = '重庆'
    flights = db.session.query(FlightModel.depCity, FlightModel.arrCity, FlightModel.price,
                               FlightModel.discount, FlightModel.source, FlightModel.date,
                               FlightModel.url).order_by(
        FlightModel.price).filter_by(depCity=city_name).limit(
        50).all()
    print(flights)
    return '成功'
