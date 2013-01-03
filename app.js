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
                grabFonts(gFontList)
            } else {
                onError()
            }
        },
        onError = function () {
            target.html("Error loading webfonts. :(")
        }
        //*
        // this is where it's calling the URL from ^^^^^^
        $.ajax({
            url: api,
            type: "GET",
            dataType: "jsonp",
            success: onSuccess,
            error: onError
        })
        //*/
        function renderFontList(fonts) {
            // var template = "<div class='font' style='font-family:%name%'><a href='%extlink%' target='_blank'>%name%</a><ul>%variants%</ul></div>",
            var template = "<h1 contenteditable='true' style='font-family:%name%'>New tab.</h1><ul>%variants%</ul>",
                variantsTemplate = "<li style='%style%; font-family:%name%;'>%name% %variant%</li>",
                variantsList = "",
                specimenUrlPrefix = "http://www.google.com/webfonts/specimen/",
                html = "",
                fontData = "";

            var val = fonts[Math.floor(Math.random() * fonts.length)];
            $.each(val.variants, function (ii, vv) {
                variantsList += templatify(variantsTemplate, {
                    'name': val.family,
                    'variant': nicerVariant(vv),
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
                $.each(fonts, function (i, v) {
                    tail = v.family + ':' + v.variants.join(',')
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

        // function grabFonts(fontList) {
        //     var base = "https://fonts.googleapis.com/css?family=",
        //         families = [],
        //         url, tail
        //         $.each(fontList, function (i, v) {
        //             tail = v.family + ':' + v.variants.join(',')
        //             $('<link rel="stylesheet" href="' + base + tail + '" >').appendTo("head")
        //         })
        // }

});