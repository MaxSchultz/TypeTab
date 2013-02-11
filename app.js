jQuery(document).ready(function ($) {
    var target = $("#fonts"),
        api = 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyAAy3g4GGcbdk1_WVTcdI76nzzygW8Hrp0',
        gFontList = [],
        onSuccess = function (data) {
            if (data.kind === "webfonts#webfontList") {
                $.each(data.items, function (index, value) {
                    if (value.variants.length > 1) {
                        gFontList.push(value);
                    }
                })
                // gFontList.sort(function() { return 0.5 - Math.random() });
                renderFontList(gFontList)
                // grabFonts(gFontList)
            } else {
                onError()
            }
        },
        onError = function () {
            $("#error").show("fast");
        }
        //*
        // this is where it's calling the URL from ^^^^^^
        $.ajax({
            url: api,
            type: "GET",
            timeout: 800,
            dataType: "jsonp",
            success: onSuccess,
            error: onError
        })
        //*/
        function renderFontList(fonts) {
            var template = "<div class='big' contenteditable='true' style='font-family:%name%'><span>New tab.</span></div><ul>%variants%</ul>",
                variantsTemplate = "<li style='%style%; font-family:%name%;'><div class='small'><span><a href='%extlink%' target='_blank'>%name% %variant%</a></span></div></li>",
                variantsList = "",
                specimenUrlPrefix = "http://www.google.com/webfonts/specimen/",
                html = "",
                fontData = "";

            var val = fonts[Math.floor(Math.random() * fonts.length)];
            $.each(val.variants, function (ii, vv) {
                variantsList += templatify(variantsTemplate, {
                    'name': val.family,
                    'variant': nicerVariant(vv),
                    'extlink': specimenUrlPrefix + encodeURIComponent(val.family),
                    'style': variantStyle(vv)
                })
            })
            html += templatify(template, {
                'name': val.family,
                'extlink': specimenUrlPrefix + encodeURIComponent(val.family),
                'variants': variantsList
            })
            target.html(html)
            
            var base = "https://fonts.googleapis.com/css?family=",
                families = [],
                url, tail
                $.each(fonts[Math.floor(Math.random() * fonts.length)], function (i, v) {
                    tail = val.family + ':' + v.variants
                    $('<link rel="stylesheet" href="' + base + tail + '" >').appendTo("head")
                })


        }

        function templatify(html, data) {
            var r
            $.each(data, function (i, val) {
                r = new RegExp('%' + i + '%', 'g')
                html = html.replace(r, val);
            })
            return html
        }

        function nicerVariant(variant) {
            return variant.replace('italic', ' italic')
        }

        function variantStyle(variant) {
            var text = variant.replace(/regular/i, '400').replace(/bold/i, '700'),
                isItalic = /italic/.test(text),
                weight = text.replace('italic', ''),
                style = (weight !== '') ? 'font-weight:' + weight + ';' : ''
            return (isItalic) ? style + 'font-style:italic;' : style
        }

});


$(window).load(function() {
    $("#fonts").show();

});

// STOP USER FROM CREATING NEW LINE WHEN contenteditable
$(document).on('keypress', '.big', function(e){
    return e.which != 13; 

});  

jQuery(document).ready(function ($) {
 $('.info-btn').pageslide({ direction: "left" });
 $('#info-close').click(function(){
  $.pageslide.close();
});
});
