//绑定获取验证码时间，利用ajax发送验证码
function bindCapthaBtnClick() {
    $("#captcha_btn").click(function () {
        var email = $('#exampleInputEmail1').val()
        if (email) {
            //$.ajax({
            // url：请求地址
            // type:"get | post | put | delete " 默认是get,
            // data:请求参数 {"id":"123","pwd":"123456"},
            // dataType:请求数据类型"html | text | json | xml | script | jsonp ",
            // success:function(data,dataTextStatus,jqxhr){ },//请求成功时error:function(jqxhr,textStatus,error)//请求失败时
            // })
            if (checkEmail(email)) {
                $.ajax({
                    url: '/user/captcha',
                    type: 'get',
                    data: {'email': email},
                    dataType: 'json',
                    success: function (data) {
                        alert(data['message']);
                        if (data['code'] == '200') {
                            //1.禁止点击事件
                            $("#captcha_btn").attr('disabled', true);
                            //2.验证码倒计时
                            var limitTime = 60;//时长
                            var setIntervalId = setInterval(function () {
                                limitTime--;
                                if (limitTime >= 0) {
                                    $("#captcha_btn").html(limitTime + "秒后重新发送");
                                } else {
                                    //60s倒计时结束后清除计时器
                                    clearInterval(setIntervalId);
                                    $("#captcha_btn").html("获取验证码");
                                    //恢复点击事件
                                    $("#captcha_btn").attr('disabled', false);
                                }
                            }, 1000);
                        } else {
                            return
                        }
                    },
                    error: function (jqxhr, textStatus, error) {
                        alert('请求发送失败')
                    }

                })
            } else {
                alert('邮箱格式有误')
            }

        } else {
            alert('邮箱不能为空')
            return
        }
    })
}//验证邮箱
function checkEmail(value) {
    return /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(value)
}

// 当网页元素加载完成后再去执行事件
$(function () {
    bindCapthaBtnClick();

})