var hot_city = document.getElementById('hot_city').getAttribute('d');
// debugger;
Vue.config.delimiters = ['{[', ']}'];
// Vue.prototype.axios = axios;
const vm = new Vue({
    delimiters: ['{[', ']}'], el: '#choice', data: {
        first: 0,
        tip_data: false,
        tip_origin: false,
        tip_destination: false,
        tickets: [],
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
        data_enter() {
            this.data = String(this.nowyear) + "年" + String(this.nowmounth) + "月";
        },
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
        },
        old_price(price) {
            return price * 10;
        },
        city_chuange(index) {
            that = this;
            this.city_choice = index;
            if (this.getcity[index] == 1) {
                $.ajax({
                    url: '/hotCity_flight',
                    type: 'get',
                    data: {'city_name': that.city[index], 'num': that.getcity[index]},
                    dataType: 'json',
                    success: function (data) {
                        that.getcity[index]++;
                        that.tickets = that.tickets.concat(data);
                    },
                    error: function () {
                        alert('初始数据请求失败')
                    }
                })
            }
        },
        purchase() {
            console.log(this.tickets)
        },
        confirm() {
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
                var that = this;
                var depCity = $('#depCity').val();
                var arrCity = $('#arrCity').val();
                var date = $('#data_input').val();
                // axios({
                //     method: 'get',
                //     // 发ajax请求，用以获取数据，此处地址意思是查询 github中 vue 星数最高的项目
                //     url: '/search_flight?depCity=' + depCity + '&arrCity=' + arrCity + '&date=' + date,
                // }).then(function (data) {
                //     if (data['code'] == 200) {
                //         that.tickets = that.tickets.concat(data['flights']);
                //         document.getElementById('box').style.top = '0px';
                //     } else {
                //         alert(data['message']);
                //     }
                // });
                $.ajax({
                    url: '/search_flight',
                    type: 'get',
                    data: {'depCity': depCity, 'arrCity': arrCity, 'date': date},
                    dataType: 'json',
                    success: function (data) {
                        if (data['code'] == 200) {
                            that.tickets = [];
                            that.tickets = that.tickets.concat(data['flights']);
                            document.getElementById('box').style.top = '0px';
                        } else {
                            alert(data['message']);
                        }
                    },
                    error: function (jqxhr, textStatus, error) {
                        alert('请求发送失败')
                    }

                })

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

