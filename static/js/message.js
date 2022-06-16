(function () {
    $('#myTabs a').click(function (e) {

        e.preventDefault()
        $(this).tab('show')
    })
    var test = $('#profile-tab');
    console.log(test)
    $('#profile-tab').click(function () {
        alert('1111')
    })
})()
Vue.config.delimiters = ['{[', ']}']
const vm = new Vue({
    delimiters: ['{[', ']}'], el: '#choice', data: {
        city_choice: 0, city: [], getcity: [], tickets: [],
    }, methods: {
        old_price(price) {
            return price * 10;
        }, city_chuange(index) {
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
        }, windowScroll() {
            that = this;
            // 滚动条距离页面顶部的距离
            // 以下写法原生兼容
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight >= scrollHeight - 30) {
                //到了这个就可以进行业务逻辑加载后台数据了
                console.log("到了底部");
                if (that.getcity[that.city_choice] <= 5) {
                    $.ajax({
                        url: '/hotCity_flight',
                        type: 'get',
                        data: {'city_name': that.city[that.city_choice], 'num': that.getcity[that.city_choice]},
                        dataType: 'json',
                        success: function (data) {
                            that.getcity[that.city_choice]++;
                            that.tickets = that.tickets.concat(data);
                            that.height = that.height + 1300;
                        },
                        error: function () {
                            alert('数据请求失败')
                        }
                    })
                }

            }
        }, purchase() {
            console.log(this.tickets)
        },
    }, beforeMount() {
        //页面在内存中编辑完成，js内容尚未渲染到页面
        //初始化getcity
        var i = 0;
        while (i <= 10) {
            this.getcity[i] = 1;
            i++;
        }
        //获取初始的10个城市消息
        var that = this;
        $.ajax({
            url: '/hot_city', type: 'get', dataType: 'json', success: function (data) {
                that.city = data;

                $.ajax({
                    url: '/hotCity_flight',
                    type: 'get',
                    data: {'city_name': that.city[0], 'num': that.getcity[0]},
                    dataType: 'json',
                    success: function (data) {
                        that.getcity[0]++;
                        that.tickets = that.tickets.concat(data);
                        that.height = that.height + 1000;
                    },
                    error: function () {
                        alert('初始数据请求失败')
                    }
                })
            }, error: function (jqxhr, textStatus, error) {
                alert('请求发送失败')
            }

        })
    }, mounted() {
        /*监听滑轮滚动事件*/
        window.addEventListener('mousewheel', this.windowScroll);
    }
})