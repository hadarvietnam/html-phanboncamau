



// Robot Questions and Answers
var curRotot;
var robots = [
  {
    question: '9 + 99',
    answer: 105
  },
  {
    question: '99 - 9',
    answer: 90
  },
  {
    question: '99 x 9',
    answer: 891
  },
  {
    question: '99 : 9',
    answer: 11
  }
];


// Valid config
var phoneMin = 10;
var phoneMax = 12;

function validName(byThis) {
  var result = true;

  var rg = /\d+/g;

  var value = $(byThis).val();
  if (value === "") {
    result = false;
  } else if (value !== "") {
    if (value.match(rg)) {
      result = false;
    }
    if (value.indexOf(" ") === 0) {
      result = false;
    }
  }
  return result;
}

function valiadPhone(byThis) {
  var regex = /^\d+$/;
  var result = true;
  var value = $(byThis).val();
  if (value === "") {
    result = false;
  } else if (value !== "") {
    if (
      /^\S*$/.test(value) &&
      value.replaceAll(/\s/g, "").match(regex)[0].length <= phoneMax
    ) {
      result = true;
    } else {
      result = false;
    }
  }

  return result;
}

function validSelect(byThis) {
  var result = true;
  if ($(byThis).find(".selected").attr('data-vale') === 'none') {
    result = false;
  }
  return result;
}


function validRobot(byThis) {
  var result = true;
  var value = $(byThis).val();
  if(value == curRotot.answer) {
    result = true;
  } else {
    result = false;
  }
  return result;
}


var userName = false,
  numberPhone = false,
  city = false,
  district = false,
  town = false,
  robot = false;

  
function infoShowError(byThis) {
  if ($(byThis).attr("id") === "userName") {
    userName = validName("#userName");
    if (userName) {
      $("#userName").parent().removeClass("show__error");
    } else {
      $("#userName").parent().addClass("show__error");
    }
  }
  if ($(byThis).attr("id") === "phoneNumber") {
    numberPhone = valiadPhone("#phoneNumber");
    if (numberPhone) {
      $("#phoneNumber").parent().removeClass("show__error");
    } else {
      $("#phoneNumber").parent().addClass("show__error");
    }
  }
  if ($(byThis).attr("id") === "robotAnswer") {
    robot = validRobot("#robotAnswer");
    if (robot) {
      $("#robotAnswer").parent().removeClass("show__error");
    } else {
      $("#robotAnswer").parent().addClass("show__error");
    }
  }
}


function infoValid() {
  userName = validName("#userName");
  numberPhone = valiadPhone("#phoneNumber");
  city = validSelect("#citySelect");
  district = validSelect("#districtSelect");
  town = validSelect("#townSelect");
  robot = validRobot("#robotAnswer");

  if (
    userName &&
    numberPhone &&
    city &&
    district &&
    town && robot
  ) {
    if ($("#phoneNumber").val().trim().length >= phoneMin) {
      $("#btnSubmit").attr("disabled", false);
    } else {
      $("#btnSubmit").attr("disabled", true);
    }
  } else {
    $("#btnSubmit").attr("disabled", true);
  }
}

// Input Action
function inputHolder() {
  $(document).on("click", ".error", function () {
    $(this).parent().removeClass("show__error");
    $(this).parent().find("input").focus();
  });

  $(".form-box .form-group .input-txt")
    .focus(function (e) {
      $(this).parent().removeClass("show__error");
    })
    .focusout(function (e) {
      infoShowError(this);
      infoValid();
    });

  $(".form-box .form-group .input-txt").on("input", function () {
      infoShowError(this);
      infoValid();
  });

}


// Roulette Game
var isPlaying = false;
var countGame = 30;
var gifts = [
  {
    id: 1,
    title: 'Áo mưa',
    type: 'gift',
    img: ''
  }, {
    id: 2,
    title: 'Áo thun',
    type: 'gift',
    img: ''
  }, {
    id: 3,
    title: 'Mũ bảo hiểm',
    type: 'gift',
    img: ''
  }, {
    id: 4,
    title: 'Chúc bạn may mắn lần sau',
    type: 'none',
    img: ''
  },
  {
    id: 5,
    title: 'Bình giữ nhiệt',
    type: 'gift',
    img: ''
  }, {
    id: 6,
    title: 'Mũ tai bèo',
    type: 'gift',
    img: ''
  }, {
    id: 7,
    title: 'Samsung A015F',
    type: 'gift',
    img: ''
  }, {
    id: 8,
    title: 'Dù cầm tay',
    type: 'gift',
    img: ''
  }
];


// Render gift func
function renderGift(gift) {
  console.log(gift);
  isPlaying = false;
  countGame--;
  $('body').addClass('no-scroll');
  if (gift.type === 'gift') {
    $('#giftName').html(gift.title);
    $('#popWin').addClass('open');
  } else {
    $('#popLost').addClass('open');
  }
}

// Init Game
function initGame() {
  var $roulete = $('.roulette').fortune(gifts);

  // PLay Game
  $('#luckyPlay').on('click', function () {
    if (!isPlaying && countGame > 0) {
      isPlaying = true;

      var numberWin = Math.floor(Math.random() * 8); // Get form BE

      $roulete.spin(numberWin).done(function (gift) {
        renderGift(gift);
      });
    }
  });

}

// Init Robots
function initRobot() {
  //curRotot
  var index = Math.floor(Math.random() * 4);
  curRotot = robots[index];
  $('#robotQuestion').attr('value', curRotot.question);
}




// Toggle Dropdown event
$(document).on("click", ".dropdown-toggle", function () {
  var $box = $(this).parent();
  $box.removeClass('show__error');
  $box.addClass('jusClick');
  if ($(this).parent().hasClass("open")) {
    $(this).parent().removeClass("open");
    if ($box.find('.dropdown-menu li.selected').length === 0) {
      $box.addClass('show__error');
    }
  } else {
    $(".dropdown").removeClass("open");
    $(this).parent().addClass("open");
  }

});

// Selected item Dropdown
$(document).on("click", ".dropdown-menu li", function () {
  if (!$(this).hasClass("selected")) {
    var $box = $(this).parent().parent().parent();

    var text = $(this).text();
    var target = $(this).attr('data-value');

    $box.find('.dropdown-menu li.selected').removeClass('selected');
    $(this).addClass('selected');
    $box.find('.dropdown-toggle span').html(text);
    $box.removeClass('open');

    var boxId = $box.attr('id');

    if (boxId === 'citySelect') {
      loadDistrict(boxId);
    } else if (boxId === 'districtSelect') {
      loadTown(boxId);
    }

    if (target === 'none') {
      $box.parent().addClass('show__error')
    } else {
      $box.parent().removeClass('show__error')
    }

  }
});


function loadDistrict(cityId) {
  // Reset Town
  $('#townSelect .dropdown-menu').html('');

  // Fake load District
  var fakeUrl = 'district-hcm.html';
  $.ajax({
    type: 'GET',
    url: fakeUrl,
    success: function (data) {
      $('#districtSelect .dropdown-menu').html(data);
    }
  });
}


function loadTown(districtId) {
  // Fake load Town
  var fakeUrl = 'town-hcm.html';
  $.ajax({
    type: 'GET',
    url: fakeUrl,
    success: function (data) {
      $('#townSelect .dropdown-menu').html(data);
    }
  });
}

//Close any Tooltip when click out
$(document).on("click touchstart", function (event) {
  if (
    $(".dropdown").has(event.target).length == 0 &&
    !$(".dropdown").is(event.target)
  ) {
    $(".dropdown").removeClass("open");
    if ($('.isGender').hasClass('jusClick')) {
      if ($('.isGender').find('.dropdown-menu li.selected').length === 0) {
        $('.isGender').addClass('show__error');
      }
      $('.isGender').removeClass('jusClick');
    }
  }
});


// Increase Number
$(document).on('click', '.increase-number', function () {
  console.log('Increase');
  var value = parseInt($('#robotAnswer').val());
  if (value || value === 0) {
    value = value + 1;
    $('#robotAnswer').val(value);
    robot = validRobot("#robotAnswer");
    if (robot) {
      $("#robotAnswer").parent().removeClass("show__error");
    } else {
      $("#robotAnswer").parent().addClass("show__error");
    }
  }

});

// Decrease Number
$(document).on('click', '.decrease-number', function () {
  console.log('Decrease');
  var value = parseInt($('#robotAnswer').val());
  if (value) {
    value = value - 1;
    value = value < 0 ? 0 : value;
    $('#robotAnswer').val(value);
    robot = validRobot("#robotAnswer");
    if (robot) {
      $("#robotAnswer").parent().removeClass("show__error");
    } else {
      $("#robotAnswer").parent().addClass("show__error");
    }
  }
});




// Tab Result event
$(document).on('click', '.tab-item', function () {
  if (!$(this).hasClass('current')) {
    var tab = $(this).attr('data-tab');
    $('.tab-item, .body-item').removeClass('current');
    $('.tab-item[data-tab=' + tab + '], .body-item[data-tab=' + tab + ']').addClass('current');
  }
});



// Result Swiper
function resultsSlider() {

  $('.body-item').each(function (_index, elm) {
    new Swiper(elm.querySelector('.result-swiper'), {
      effect: "slide",
      speed: 800,
      loop: false,
      spaceBetween: 20,
      grabCursor: true,
      navigation: {
        nextEl: elm.querySelector('.swiper-button-next'),
        prevEl: elm.querySelector('.swiper-button-prev'),
      },
    });
  });
}


// Artcle Swiper
function aricleSlider() {
  new Swiper('.article-swiper', {
    effect: "slide",
    speed: 800,
    loop: false,
    spaceBetween: 20,
    grabCursor: true,
    navigation: {
      nextEl: '.articles .swiper-button-next',
      prevEl: '.articles .swiper-button-prev',
    },
  });
}



// Toggle FAQ
$(document).on("click", ".faq-title", function (e) {
  box = $(this).parent();
  next = $(this).next();

  if (box.hasClass("active")) {
    box.removeClass("active");
    next.slideUp();
  } else {
    var active = $(".faq-item.active");
    var previous = active.find(".faq-detail");
    if (previous && previous.length > 0) {
      active.removeClass("active");
      previous.slideUp();
    }
    box.addClass("active");
    next.slideDown();
  }
});

// Toggle Video Intro
$(document).on('click', '.video-box', function () {
  if ($(this).hasClass('playing')) {
    $(this).removeClass('playing');
    $(this).find('video')[0].pause();
  } else {
    $('.playing').removeClass('playing');
    $(this).addClass('playing');
    $(this).find('video')[0].muted = false;
    $(this).find('video')[0].play();
  }
});


// Scroll to current section
$(document).on("click", ".nav li", function () {
  $('body').removeClass('open-menu');
  var nav = $(this).attr('data-nav');
  //var headerH = $('.header-inr').innerHeight();
  var headerH = 0;

  $('.nav li').removeClass('nav-active');
  $('.scrollBy.nav-active').removeClass('nav-active');
  $('.nav li[data-nav=' + nav + '], .scrollBy[data-nav=' + nav + ']').addClass('nav-active');
  if ($('.scrollBy[data-nav=' + nav + ']').addClass('nav-active')) {
    var top = $('.scrollBy[data-nav=' + nav + ']').addClass('nav-active').offset().top;
    $("html, body").animate({ scrollTop: top - headerH }, "slow");
  }
});


// Go To Top
$(document).on("click", ".to-top", function () {
  $('html,body').animate({ scrollTop: 0 }, 'slow');
});


// Load Article Data
function loadArticle() {

  var loadArticle = false;
  $(document).on("click", ".article", function () {
    // Fake Load article detail popup by Ajax
    if (!loadArticle) {
      loadArticle = true;
      var fakeUrl = 'article-detail.html';
      $('body').addClass('no-scroll');
      $.ajax({
        type: 'GET',
        url: fakeUrl,
        success: function (data) {
          loadArticle = false;
          $('#popNewDetail .ajax-load').html(data);
          $('#popNewDetail').addClass('open');
        }
      });
    }

  });

}


// Load Support
function loadSupport() {

  var loadArticle = false;
  $(document).on("click", ".support-link", function () {
    // Fake Load article detail popup by Ajax
    if (!loadArticle) {
      loadArticle = true;
      var fakeUrl = 'support.html';
      $('body').addClass('no-scroll');
      $.ajax({
        type: 'GET',
        url: fakeUrl,
        success: function (data) {
          loadArticle = false;
          $('#popSupport .ajax-load').html(data);
          $('#popSupport').addClass('open');
        }
      });
    }

  });

}


// Close Popup
$(document).on("click", ".close-pop, .overlay, .close__popup", function () {
  $('body').removeClass('no-scroll');
  $('.popup').removeClass('open');
});



window.addEventListener("scroll", function () {
  var doc = document.documentElement;
  var top = (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
  var winH = window.innerHeight;
  if (top > winH / 2) {
    document.querySelector(".to-top") &&
      document.querySelector(".to-top").classList.add("show");
  } else {
    document.querySelector(".to-top") &&
      document.querySelector(".to-top").classList.remove("show");
  }
});

// Page Ready
(function () {
  //founderSlider();
  inputHolder();
  initRobot();
  initGame();
  resultsSlider();
  aricleSlider();

  // Popup
  loadSupport();
  loadArticle();

})();