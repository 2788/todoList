
localStorage.setItem('color', $('header').css('background-color'));
$('.menu-button').click(function (ev) {
    if ($('.aside').css('left') === '0px') {
        $('.aside').css('left', '-260px');
        $('.cover').fadeOut();
    } else {
        $('.aside').css('left', '0px');
        $('.cover').fadeIn();
    }
});


$('.cover').click(function () {
    $('.aside').css('left', '-260px');
    $('.about').fadeOut();
    $('.theme').fadeOut();
    $('.menu-button').show();
    $('.icon-back').hide();
    $('.shake').removeClass('shake');
    $(this).fadeOut();
});

$('.aside li:eq(0)').click(function () {
    $('.aside').css('left', '-260px');
    $('.view-content ul:eq(0)').css('display', 'block');
    $('.view-content ul:eq(1)').css('display', 'none');
    $('.cover').fadeOut();
});

$('.aside li:eq(1)').click(function () {
    $('.aside').css('left', '-260px');
    $('.view-content ul:eq(0)').css('display', 'none');
    $('.view-content ul:eq(1)').css('display', 'block');
    $('.cover').fadeOut();
});

$('.aside li:eq(2)').click(function () {
    $('.aside').css('left', '-260px');
    $('.theme').css('display', 'block');
    $('.menu-button').hide();
    $('.icon-back').show();
});

$('.aside li:eq(3)').click(function () {
    $('.aside').css('left', '-260px');
    $('.about').css('display', 'block');
    $('.menu-button').hide();
    $('.icon-back').show();
});

$('.icon-back').click(function () {
    $('.cover').fadeOut();
    $('.theme').fadeOut();
    $('.about').fadeOut();
    $(this).hide();
    $('.menu-button').show();
    $('.shake').removeClass('shake');
})

$('.add-btn').click(function () {
    coverFadeShift(500);
})

$('.confirm-btn').click(function () {
    let $input = $('.add-content input');
    if ($input.val()) {
        let val = $input.val();
        let li = document.createElement("li");
        let spanOne = document.createElement('span');
        let spanTwo = document.createElement('span');
        li.innerText = val;
        spanOne.className = "glyphicon glyphicon-trash";
        spanTwo.className = "glyphicon glyphicon-ok-circle";

        $(spanOne).click(function () {
            let ul = this.parentElement.parentElement;
            let li = this.parentElement;
            $(this).off('click');
            $(this).siblings().off('click');
            ul.removeChild(li);
        });

        $(spanTwo).click(function () {
            let li = this.parentElement;
            let ul = document.querySelectorAll('.view-content ul')[1];
            let span = li.children[1];
            $(span).off('click');
            li.removeChild(span);
            ul.appendChild(li);
        });

        li.appendChild(spanOne);
        li.appendChild(spanTwo);
        $('.view-content ul').get(0).appendChild(li);
        $input.val('');
        confirmBtnShift($input);
        coverFadeShift(200);

    }
});


$('.theme ul li').click(function () {

    let color = localStorage.getItem('color', $('header').css('background-color'));
    $('.shake').removeClass('shake');
    if (color !== this.getAttribute('data')) {
        localStorage.setItem('color', this.getAttribute('data'));
        $('header').css('background-color', this.getAttribute('data'));
        $(this).find('div').addClass('shake');
        confirmBtnShift($('.add-content input').get(0));
    }
})



$('.add-content input').on('input', function () {
    confirmBtnShift(this);
});

(function () {
    let oldTop = $(document).scrollTop();
    let height = $('header').height();
    $(window).scroll(function () {
        let top = $(document).scrollTop();

        if (top - oldTop > 0) {//向下滑
            if (top > height){
                $('header').slideUp(200);
                $('.add-confirm-btn').css({'bottom':"-60px"});
            }
        } else {//向上滑
            $('.add-confirm-btn').css({'bottom':"3%"});
            $('header').slideDown(200);
        }
        oldTop = top;
    });
}());




function asideFadeOut() {
    if ($('.aside').css('left') === '0px')
        $('.aside').css('left', '-260px');

}

function asideFadeIn() {
    if ($('.aside').css('left') === '-260px')
        $('.aside').css('left', '0px');
}

function coverFadeShift(time) {
    $svg = $(".add-btn svg");
    if ($svg.css('transform') === 'none') {
        $svg.css('transform', 'rotate(-45deg)')
        $('.confirm-btn').css("top", "-80px");
    }
    else {
        $svg.css('transform', 'none');
        $('.confirm-btn').css("top", "5px");
    }
    $('.add-content').toggle(time);
}

function confirmBtnShift(that) {
    if (that.value)
        $('.confirm-btn').css("background-color", localStorage.getItem('color'));
    else
        $('.confirm-btn').css("background-color", "gray");
}