from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from module import FlightModel, UserModel
from exts import db, mail
from sqlalchemy import and_, func, extract
import datetime
import re

bp = Blueprint('flight', __name__, url_prefix='/')


# 首页
@bp.route('/')
def index():
    try:
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
    except:
        return redirect(url_for('flight.index'))


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
    return render_template('message.html')


@bp.route('/search')
def search():
    cityname = request.args.get('cityname')
    # print(cityname)
    citys = FlightModel.query.filter_by(depCity=cityname).order_by(FlightModel.price).all()
    city_list = []
    if citys:
        for city in (citys[:15] if len(citys) > 15 else citys):
            city_dic = {}
            city_dic['price'] = city.price
            city_dic['date'] = city.date.strftime('%Y-%m-%d')
            city_dic['arrCity'] = city.arrCity
            # print(city_dic)
            city_list.append(city_dic)
        # print(city_list)
        return jsonify({'code': 200, 'citys': city_list})

    else:
        return jsonify({'code': 400, 'message': '抱歉，暂时未搜索到该城市的机票信息！'})


@bp.route('/search_city')
def search_city():
    city_name = request.args.get('cityname')
    print(city_name)
    citys = FlightModel.query.filter_by(depCity=city_name).order_by(FlightModel.price).all()
    return jsonify(citys)


# 返回十大热门城市
@bp.route('/hot_city')
def hot_city():
    city_10st = db.session.query(FlightModel.depCity).group_by(
        FlightModel.depCity).order_by(-db.func.count(FlightModel.id)).limit(10).all()

    citys = []
    for i in city_10st:
        city = str(i).replace('(\'', '').replace('\',)', '')
        citys.append(city)
    return jsonify(citys)


# 根据出发地、目的地和日期搜素航班信息
@bp.route('/search_flight')
def search_flight():
    depCity = request.args.get('depCity')
    arrCity = request.args.get('arrCity')
    res = re.match('(?P<year>.*?)年(?P<mouth>.*?)月', request.args.get('date'))
    year = int(res.group('year'))
    mouth = int(res.group('mouth'))
    print(depCity, arrCity, res)
    #  extract提取当前月的数据
    flights = FlightModel.query.filter(FlightModel.depCity == depCity,
                                       FlightModel.arrCity == arrCity,
                                       and_(extract('month', FlightModel.date) == mouth,
                                            extract('year', FlightModel.date) == year)
                                       ).order_by(FlightModel.date).all()
    print(flights)
    if flights:
        flights_list = []
        for flight in flights:
            flights_list.append(
                {'place_left': flight.depCity, 'place_right': flight.arrCity, 'platform': flight.source,
                 'date': flight.date.strftime('%Y-%m-%d'), 'url': flight.url, 'price': flight.price,
                 'original_price': int(flight.price / (flight.discount / 10)),
                 'price_change': int((10 - flight.discount) * 10)})
        print(flights_list)
        return jsonify({'code': 200, 'flights': flights_list})
    else:
        return jsonify({'code': 400, 'message': '该航班信息不存在！'})


# 返回热门城市的航班信息
@bp.route('/hotCity_flight')
def hotCity_flight():
    city_name = request.args.get('city_name')
    num = request.args.get('num')
    flights = FlightModel.query.filter_by(depCity=city_name).order_by(FlightModel.price).limit(50).all()
    # print(flights)
    flights_list = []
    for flight in flights[(int(num) - 1) * 10:int(num) * 10]:
        # print(flight)
        flights_list.append(
            {'place_left': flight.depCity, 'place_right': flight.arrCity, 'platform': flight.source,
             'date': flight.date.strftime('%Y-%m-%d'), 'url': flight.url, 'price': flight.price,
             'original_price': int(flight.price / (flight.discount / 10)),
             'price_change': int((10 - flight.discount) * 10)})
    # print(flights_list)
    return jsonify(flights_list)


# 票价预测页面
@bp.route('/forecast')
def forecast():
    # try:
    # 返回各大售票平台的机票数量和机票平均价格
    ticket_num = db.session.query(FlightModel.source, func.count(FlightModel.id)).group_by(FlightModel.source).all()
    avg_price = db.session.query(FlightModel.source,
                                 func.sum(FlightModel.price) / func.count(FlightModel.id)).group_by(
        FlightModel.source).all()
    # 将元组变成列表
    ticket_num_list = []
    avg_price_list = []
    for i in ticket_num:
        ticket_num_list.append(list(i))
    for i in avg_price:
        i = list(i)
        i[1] = int(i[1])
        avg_price_list.append(list(i))
    # 热门城市的机票数和平均价格
    hot_city = db.session.query(FlightModel.depCity, func.count(FlightModel.id),
                                func.sum(FlightModel.price) / func.count(FlightModel.id)).group_by(
        FlightModel.depCity).order_by(-func.count(FlightModel.id)).limit(
        5).all()
    hot_city_list = []
    for i in hot_city:
        i = list(i)
        i[2] = int(i[2])
        hot_city_list.append(list(i))
    #     每月平均票价
    # month_tickets = db.session.query(
    #     extract('year', FlightModel.date).label('year'), extract('month', FlightModel.date).label('month'),
    #     func.sum(FlightModel.price) / func.count('*')
    # ).group_by('month').order_by('year').order_by('month').all()
    month_tickets = db.session.query(
        func.date_format(FlightModel.date, "%Y-%m").label('time'),
        func.sum(FlightModel.price) / func.count('*')).group_by('time').all()
    print(month_tickets)
    month_ticket_list = []
    for month_ticket in month_tickets:
        l = []
        l.append(month_ticket[0])
        l.append(int(month_ticket[1]))
        month_ticket_list.append(l)
    # 机票价格分布  200以下，200-500，500-1000，1000-2000，2000以上
    price_ticket = []
    price_ticket.append(
        db.session.query(func.count('*')).filter(FlightModel.price <= 200).order_by(FlightModel.price).first()[0])
    price_ticket.append(
        db.session.query(func.count('*')).filter(and_(FlightModel.price > 200, FlightModel.price <= 500)).order_by(
            FlightModel.price).first()[0])
    price_ticket.append(
        db.session.query(func.count('*')).filter(and_(FlightModel.price > 500, FlightModel.price <= 1000)).order_by(
            FlightModel.price).first()[0])
    price_ticket.append(
        db.session.query(func.count('*')).filter(
            and_(FlightModel.price > 1000, FlightModel.price <= 2000)).order_by(
            FlightModel.price).first()[0])
    price_ticket.append(
        db.session.query(func.count('*')).filter(FlightModel.price > 2000).order_by(FlightModel.price).first()[0])
    total_num = db.session.query(func.count(FlightModel.id)).first()[0]

    return render_template('forecast.html', ticket_num=ticket_num_list, avg_price=avg_price_list,
                           hot_city=hot_city_list, month_ticket=month_ticket_list, price_ticket=price_ticket,
                           total_num=total_num
                           )


# except:
#     return redirect(url_for('flight.forecast'))


# 模糊搜索页面
@bp.route('/fuzzy_search')
def fuzzy_search():
    return render_template('search.html')
