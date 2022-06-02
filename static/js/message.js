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
Vue.config.delimiters = ['{[', ']}'];
const vm = new Vue({
    delimiters: ['{[', ']}'],
    el: '#myTabs',
    data: {},
    methods: {
        tab_choice(a) {
            alert(a);
        }
    }
})


