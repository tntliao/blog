window.onload = function () {
    //获取#right_block当前top
    let deValue1 = $('#right_block').css('top');
    //获取当前视口的宽度
    let nowClient = document.documentElement.clientWidth;
    //调用一次初始化
    scroll();
    viewSize();
    //视口大小变化
    window.onresize = () => {
        nowClient = document.documentElement.clientWidth;
        viewSize();
    }
    //页面发生滚动
    $(document).scroll(() => {
        console.log('@@@@@@');
        //获取滚动条到顶部的距离
        let sTop = $(document).scrollTop();
        let newValue1 = sTop + parseInt(deValue1);
        $('#right_block').css('top', newValue1);
    })
    //初始化第一次
    function scroll() {
        //获取滚动条到顶部的距离
        let sTop = $(document).scrollTop();
        let newValue1 = sTop + parseInt(deValue1);
        $('#right_block').css('top', newValue1);
    }
    //右边两个模块隐藏显示
    function viewSize() {
        if (nowClient < 753) {
            $('.jia_info').css('visibility', 'hidden');
            $('#info').css('display', 'none')
            $('.card').css('display', 'none')

        } else if (nowClient > 753) {
            $('.jia_info').css('visibility', 'visible');
            $('#info').css('display', 'block')
            $('.card').css('display', 'block')
        }
    }
    //回到顶部函数
    function top() {
        console.log('#####');
        //进入函数说明已经执行回到顶部函数，这里去除函数，预防多次点击照成不好的体验
        this.removeEventListener('click', top);
        //获取到顶部距离
        let distance = $(document).scrollTop();
        //到达总部总时长
        const duration = 300;
        //定时器执行间隔
        const speed = 10;
        //每次定时器增加的值
        const value = distance / (duration / speed);

        const timer = setInterval(() => {
            distance -= value;
            if (distance <= 0) {
                clearInterval(timer);
                //重新绑定函数
                this.addEventListener('click', top);
            }
            $(document).scrollTop(distance)
        }, speed)
    }
    $('.btn_up').get(0).addEventListener('click', top);

    //壁纸的地址
    const wallpaper = [
        './images/wall/01.jpg',
        './images/wall/02.jpg',
        './images/wall/03.jpg'
    ]
    //切换壁纸
    let wallIndex = 0;
    function wallToggle() {
        this.removeEventListener('click', wallToggle);
        const img = new Image();
        img.src = wallpaper[wallIndex];
        img.onload = () => {
            $('section').css('background-image', `url(${img.src})`)
            wallIndex++;
            if (wallIndex >= wallpaper.length) wallIndex = 0;
            setTimeout(() => {
                this.addEventListener('click', wallToggle);
            }, 800)
        }
    }
    $('.toggle').get(0).addEventListener('click', wallToggle);

    //恭喜发财显示与隐藏
    function move(triggerNode, targetNode) {
        $(triggerNode).mouseenter(function () {
            $(targetNode).css('height', '3rem');
            $(this).mouseleave(() => {
                $(targetNode).css('height', '0')
            })
        })
    }
    move('.btn_up', '.btn_hidden');
    move('.toggle', '.toggle_hidden');
}