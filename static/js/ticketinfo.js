//地图模块
(function () {
    var myChart = echarts.init(document.querySelector('.map .chart'));
    //地图的经纬度相关数据(不要改！！！)
    var geoCoordMap = {
        上海: [121.4648, 31.2891],
        东莞: [113.8953, 22.901],
        东营: [118.7073, 37.5513],
        中山: [113.4229, 22.478],
        临汾: [111.4783, 36.1615],
        临沂: [118.3118, 35.2936],
        丹东: [124.541, 40.4242],
        丽水: [119.5642, 28.1854],
        乌鲁木齐: [87.9236, 43.5883],
        佛山: [112.8955, 23.1097],
        保定: [115.0488, 39.0948],
        兰州: [103.5901, 36.3043],
        包头: [110.3467, 41.4899],
        北京: [116.4551, 40.2539],
        北海: [109.314, 21.6211],
        南京: [118.8062, 31.9208],
        南宁: [108.479, 23.1152],
        南昌: [116.0046, 28.6633],
        南通: [121.1023, 32.1625],
        厦门: [118.1689, 24.6478],
        台州: [121.1353, 28.6688],
        合肥: [117.29, 32.0581],
        呼和浩特: [111.4124, 40.4901],
        咸阳: [108.4131, 34.8706],
        哈尔滨: [127.9688, 45.368],
        唐山: [118.4766, 39.6826],
        嘉兴: [120.9155, 30.6354],
        大同: [113.7854, 39.8035],
        大连: [122.2229, 39.4409],
        天津: [117.4219, 39.4189],
        太原: [112.3352, 37.9413],
        威海: [121.9482, 37.1393],
        宁波: [121.5967, 29.6466],
        宝鸡: [107.1826, 34.3433],
        宿迁: [118.5535, 33.7775],
        常州: [119.4543, 31.5582],
        广州: [113.5107, 23.2196],
        廊坊: [116.521, 39.0509],
        延安: [109.1052, 36.4252],
        张家口: [115.1477, 40.8527],
        徐州: [117.5208, 34.3268],
        德州: [116.6858, 37.2107],
        惠州: [114.6204, 23.1647],
        成都: [103.9526, 30.7617],
        扬州: [119.4653, 32.8162],
        承德: [117.5757, 41.4075],
        拉萨: [91.1865, 30.1465],
        无锡: [120.3442, 31.5527],
        日照: [119.2786, 35.5023],
        昆明: [102.9199, 25.4663],
        杭州: [119.5313, 29.8773],
        枣庄: [117.323, 34.8926],
        柳州: [109.3799, 24.9774],
        株洲: [113.5327, 27.0319],
        武汉: [114.3896, 30.6628],
        汕头: [117.1692, 23.3405],
        江门: [112.6318, 22.1484],
        沈阳: [123.1238, 42.1216],
        沧州: [116.8286, 38.2104],
        河源: [114.917, 23.9722],
        泉州: [118.3228, 25.1147],
        泰安: [117.0264, 36.0516],
        泰州: [120.0586, 32.5525],
        济南: [117.1582, 36.8701],
        济宁: [116.8286, 35.3375],
        海口: [110.3893, 19.8516],
        淄博: [118.0371, 36.6064],
        淮安: [118.927, 33.4039],
        深圳: [114.5435, 22.5439],
        清远: [112.9175, 24.3292],
        温州: [120.498, 27.8119],
        渭南: [109.7864, 35.0299],
        湖州: [119.8608, 30.7782],
        湘潭: [112.5439, 27.7075],
        滨州: [117.8174, 37.4963],
        潍坊: [119.0918, 36.524],
        烟台: [120.7397, 37.5128],
        玉溪: [101.9312, 23.8898],
        珠海: [113.7305, 22.1155],
        盐城: [120.2234, 33.5577],
        盘锦: [121.9482, 41.0449],
        石家庄: [114.4995, 38.1006],
        福州: [119.4543, 25.9222],
        秦皇岛: [119.2126, 40.0232],
        绍兴: [120.564, 29.7565],
        聊城: [115.9167, 36.4032],
        肇庆: [112.1265, 23.5822],
        舟山: [122.2559, 30.2234],
        苏州: [120.6519, 31.3989],
        莱芜: [117.6526, 36.2714],
        菏泽: [115.6201, 35.2057],
        营口: [122.4316, 40.4297],
        葫芦岛: [120.1575, 40.578],
        衡水: [115.8838, 37.7161],
        衢州: [118.6853, 28.8666],
        西宁: [101.4038, 36.8207],
        西安: [109.1162, 34.2004],
        贵阳: [106.6992, 26.7682],
        连云港: [119.1248, 34.552],
        邢台: [114.8071, 37.2821],
        邯郸: [114.4775, 36.535],
        郑州: [113.4668, 34.6234],
        鄂尔多斯: [108.9734, 39.2487],
        重庆: [107.7539, 30.1904],
        金华: [120.0037, 29.1028],
        铜川: [109.0393, 35.1947],
        银川: [106.3586, 38.1775],
        镇江: [119.4763, 31.9702],
        长春: [125.8154, 44.2584],
        长沙: [113.0823, 28.2568],
        长治: [112.8625, 36.4746],
        阳泉: [113.4778, 38.0951],
        青岛: [120.4651, 36.3373],
        韶关: [113.7964, 24.7028],
        三亚: [109.5000, 18.2000],
        赣州: [114.5600, 28.5200],
        常德: [111.5100, 29.0200],
        绵阳: [104.4200, 31.3000],
        芜湖: [118.2200, 31.1900],
        西双版纳: [100.7664, 21.9705],
        赤峰: [118.5800, 42.1700],
        锦州: [121.0900, 41.0700],
        阿克苏: [80.1900, 41.0900],
        鞍山: [123.0000, 41.0700],
        博乐: [82.0800, 44.5700],
        洛阳: [112.2650, 34.3790],
        昭通: [116.3124, 39.2071],
        揭阳: [116.3728, 23.5499],
        恩施: [109.4881, 30.2721],
        塔城: [82.9803, 46.7453],
        库尔勒: [86.1746, 41.7258],
        丹东: [124.3830, 40.1242],
        九寨沟: [104.2438, 33.2520],
        佳木斯: [130.3189, 46.7999],
        大庆: [125.1037, 46.5893],
        大理: [100.2676, 25.6064],
        广元: [105.8433, 32.4354],
        齐齐哈尔: [123.9181, 47.3543],
        张家界: [110.4791, 29.1170],


    };


    var XAData = [[{name: '北京'}, {name: '烟台', value: 268, date: '2022-11-11'}], [{name: '北京'}, {
        name: '太原', value: 272, date: '2022-11-11'
    }], [{name: '北京'}, {name: '大连', value: 280, date: '2022-11-11'}], [{name: '北京'}, {
        name: '上海', value: 285, date: '2022-11-11'
    }],];


    var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
    //var planePath = 'arrow';
    var convertData = function (data) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
            var dataItem = data[i];
            var fromCoord = geoCoordMap[dataItem[0].name];
            var toCoord = geoCoordMap[dataItem[1].name];
            if (fromCoord && toCoord) {
                res.push({
                    fromName: dataItem[0].name,
                    toName: dataItem[1].name,
                    coords: [fromCoord, toCoord],
                    value: dataItem[1].value,
                    date: dataItem[1].date
                });
            }
        }
        return res;
    };

    var color = ['cyan']; //航线的颜色
    var series = [];
    [['北京', XAData],

    ].forEach(function (item, i) {
        series.push({ //不带飞机的线条
            name: item[0], type: 'lines', //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化
            zlevel: 1, effect: {
                show: true, period: 6, trailLength: 0.7, color: 'red', //arrow箭头的颜色
                symbolSize: 3,
            }, lineStyle: {
                normal: {
                    color: color[i], width: 0, curveness: 0.2,
                },
            }, data: convertData(item[1]),
        }, { //带飞机的线条
            name: item[0], type: 'lines', zlevel: 2, symbol: ['none', 'arrow'], symbolSize: 10, effect: {
                show: true, period: 6, trailLength: 0, symbol: planePath, symbolSize: 15,
            }, lineStyle: {
                normal: {
                    color: color[i], width: 1, opacity: 0.6, curveness: 0.2,
                },
            }, data: convertData(item[1]),
        }, { //终点城市的圈圈效果
            name: item[0], type: 'effectScatter', //带有涟漪特效动画的散点（气泡）图
            coordinateSystem: 'geo', zlevel: 2, rippleEffect: {
                brushType: 'stroke',
            }, label: {
                normal: {
                    show: true, position: 'right', formatter: '{b}',
                },
            }, symbolSize: function (val) {
                return 10;

            }, itemStyle: {
                normal: {
                    color: color[i],
                }, emphasis: {
                    areaColor: '#2B91B7',
                },
            }, data: item[1].map(function (dataItem) {
                return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                    date: dataItem[1].date
                };
            }),
        });
    });


    var option = {
        tooltip: {
            trigger: 'item', //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
            formatter: function (params, ticket, callback) {
                if (params.seriesType == 'effectScatter') { //图上的城市大圆点

                    return params.data.name + '' + '<br />' + '价格：' + params.data.value[2] + '<br />' + '日期：' + params.data.date;
                    ;
                } else if (params.seriesType == 'lines') { //图上的线路
                    return params.data.fromName + '->' + params.data.toName;
                } else {
                    return params.name;
                }
            },
        }, legend: {
            orient: 'vertical', left: 'left', bottom: '0%', textStyle: {
                fontSize: 20, color: 'black',
            }, selectedMode: 'multiple',

        }, geo: {
            map: 'china', zoom: 1.2, //地图放大
            label: {
                emphasis: {
                    show: false, color: '#fff',
                },
            }, roam: true, itemStyle: {
                normal: {
                    areaColor: 'rgba(2, 28, 121,0.8)', //地图省份背景
                    borderColor: '#195BB9', borderWidth: 1,
                }, emphasis: {
                    areaColor: '#2B91B7',
                },
            },
        }, series: series,
    };

    myChart.setOption(option);

    //缩放，适配屏幕
    window.addEventListener("resize", function () {
        myChart.resize();
    });

    $('#city_btn').click(function () {
        var cityname = $('#cityname').val();
        if (cityname) {
            $.ajax({
                url: "/search", type: "get", data: {'cityname': cityname}, dataType: "json", success: function (data) {
                    if (data['code'] == '200') {
                        var citys = data['citys']
                        myData = []
                        var series = [];
                        for (var i = 0; i < citys.length; i++) {
                            var date = citys[i]['date']
                            var arrCity = citys[i]['arrCity']
                            var price = citys[i]['price']
                            var temp = [{name: cityname}, {name: arrCity, value: price, date: date}]
                            myData.push(temp)
                        }
                        [[cityname, myData],

                        ].forEach(function (item, i) {
                            series.push({ //不带飞机的线条
                                name: item[0], type: 'lines', //用于带有起点和终点信息的线数据的绘制，主要用于地图上的航线，路线的可视化
                                zlevel: 1, effect: {
                                    show: true, period: 6, trailLength: 0.7, color: 'red', //arrow箭头的颜色
                                    symbolSize: 3,
                                }, lineStyle: {
                                    normal: {
                                        color: color[i], width: 0, curveness: 0.2,
                                    },
                                }, data: convertData(item[1]),
                            }, { //带飞机的线条
                                name: item[0],
                                type: 'lines',
                                zlevel: 2,
                                symbol: ['none', 'arrow'],
                                symbolSize: 10,
                                effect: {
                                    show: true, period: 6, trailLength: 0, symbol: planePath, symbolSize: 15,
                                },
                                lineStyle: {
                                    normal: {
                                        color: color[i], width: 1, opacity: 0.6, curveness: 0.2,
                                    },
                                },
                                data: convertData(item[1]),
                            }, { //终点城市的圈圈效果
                                name: item[0], type: 'effectScatter', //带有涟漪特效动画的散点（气泡）图
                                coordinateSystem: 'geo', zlevel: 2, rippleEffect: {
                                    brushType: 'stroke',
                                }, label: {
                                    normal: {
                                        show: true, position: 'right', formatter: '{b}',
                                    },
                                }, symbolSize: function (val) {
                                    return 10;

                                }, itemStyle: {
                                    normal: {
                                        color: color[i],
                                    }, emphasis: {
                                        areaColor: '#2B91B7',
                                    },
                                }, data: item[1].map(function (dataItem) {

                                    return {
                                        name: dataItem[1].name,
                                        value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]),
                                        date: dataItem[1].date
                                    };
                                }),
                            });
                        });

                        var option = {
                            tooltip: {
                                trigger: 'item', //提示框浮层内容格式器，支持字符串模板和回调函数两种形式
                                formatter: function (params, ticket, callback) {
                                    if (params.seriesType == 'effectScatter') { //图上的城市大圆点

                                        return params.data.name + '' + '<br />' + '价格：' + params.data.value[2] + '<br />' + '日期：' + params.data.date;
                                        ;
                                    } else if (params.seriesType == 'lines') { //图上的线路
                                        return params.data.fromName + '->' + params.data.toName;
                                    } else {
                                        return params.name;
                                    }
                                },
                            }, legend: {
                                orient: 'vertical', left: 'left', bottom: '0%', textStyle: {
                                    fontSize: 20, color: 'black',
                                }, selectedMode: 'multiple',
                            }, geo: {
                                map: 'china', zoom: 1.2, //地图放大
                                label: {
                                    emphasis: {
                                        show: true, color: '#fff',
                                    },
                                }, roam: true, itemStyle: {
                                    normal: {
                                        areaColor: 'rgba(2, 28, 121,0.8)', //地图省份背景
                                        borderColor: '#195BB9', borderWidth: 1,
                                    }, emphasis: {
                                        areaColor: '#2B91B7',
                                    },
                                },
                            }, series: series,
                        };
                        myChart.setOption(option);
                        alert('找到该城市的机票信息')
                    } else {
                        alert(data['message'])
                    }
                }, error: function (jqxhr, textStatus, error) {
                    alert('请求失败')


                }
            })
        } else {
            alert('城市信息不能为空！')
        }


    })

    var hot_city = document.getElementById('hot_city').getAttribute('d');
    // debugger;
    Vue.config.delimiters = ['{[', ']}'];
    const vm = new Vue({
        delimiters: ['{[', ']}'], el: '#choice', data: {
            data: '',
            tip_data: false,
            tip_origin: false,
            tip_destination: false,
            nowmounth: 6,/*用于存储目前选择的月数，初始值与传过来的mouth值相同，点击日期后会传到日期的输入框value值*/
            mounth: 6,/*目前时间的月数，用于约束前进和后退*/
            nowyear: 2022,/* 用于存储目前选择的年数,初始值与传过来的year值相同，点击日期后会传到日期的输入value值*/
            year: 2022,/*目前时间的年数，用于约束前进和后退*/
            manyday: [2, 4, 0, 3, 5, 1, 3, 6, 2, 2],
            destination: '',
            origin: '',
            data: '',
            box_content_focus: 100,
            choice_origin: false,
            choice_data: false,
            choice_destination: false,
            choice_list: hot_city.slice(2, -2).split("', '")
        }, methods: {
            choice(who, where) {
                if (who == 'origin') {
                    this.origin = where;
                }
                if (who == 'destination') {
                    this.destination = where;
                }
                console.log(who);
                console.log(where);
            }, mounthup() {
                if ((this.nowyear - this.year) * 12 + (this.nowmounth - this.mounth) != this.manyday.length - 1) {
                    if (this.nowmounth != 12) {
                        this.nowmounth++;
                    } else {
                        this.nowmounth = 1;
                        this.nowyear++;
                    }
                    console.log(this.nowmounth);
                }
            }, mounthdown() {
                if ((this.nowyear - this.year) * 12 + (this.nowmounth - this.mounth) != 0) {
                    if (this.nowmounth != 1) {
                        this.nowmounth--;
                    } else {
                        this.nowmounth = 12;
                        this.nowyear--;
                    }
                    console.log(this.nowmounth);
                }
            }, whatmounth() {
                if (this.nowmounth == 1 || this.nowmounth == 3 || this.nowmounth == 5 || this.nowmounth == 7 || this.nowmounth == 8 || this.nowmounth == 10 || this.nowmounth == 12) {
                    return 31;
                }
                if (this.nowmounth == 2) {
                    if (this.nowmounth % 4 != 0) return 29; else return 28;
                } else return 30;
            }, data_choice(index) {
                this.data = String(this.nowyear) + "年" + String(this.nowmounth) + "月" + String(index) + "日 ";
            }, ChoiceBlur(who) {
                console.log(who + '失去焦点')

                if (who == 'origin') {
                    this.choice_origin = false;
                }
                if (who == 'data') {
                    this.choice_data = false;
                }
                if (who == 'destination') {
                    this.choice_destination = false;
                }
            }, ChoiceFocus(who) {
                console.log(who + '获得焦点');
                if (who == 'origin') {
                    this.choice_origin = true;
                }
                if (who == 'data') {
                    this.choice_data = true;
                }
                if (who == 'destination') {
                    this.choice_destination = true;
                }
            }, confirm() {
                console.log(hot_city);
                this.tip_destination = false;
                this.tip_origin = false;
                this.tip_data = false;
                if (this.data == '') {
                    this.tip_data = true;
                }
                if (this.destination == '') {
                    this.tip_destination = true;
                }
                if (this.origin == '') {
                    this.tip_origin = true;
                }
                if (this.origin != '' && this.data != '' && this.destination != '') {
                    //    点击搜索按钮发送ajax请求
                    $('#search-btn').click(function () {

                        var depCity = $('#depCity').val();
                        var arrCity = $('#arrCity').val();
                        var date = $('#data_input').val();
                        alert(date)
                        $.ajax({
                            url: '/search_flight',
                            type: 'get',
                            data: {'depCity': depCity, 'arrCity': arrCity, 'date': date},
                            dataType: 'json',
                            success: function (data) {
                                if (data['code'] == 200) {
                                    alert('成功')
                                } else {
                                    alert('失败')
                                }
                            },
                            error: function (jqxhr, textStatus, error) {
                                alert('请求发送失败')
                            }

                        })
                    });

                }
            }, input_data(e) {
                this.data = e.currentTarget.value;
            }, input_origin(e) {
                this.origin = e.currentTarget.value;
            }, input_destination(e) {
                this.destination = e.currentTarget.value;
            }
        }
    })


})();
