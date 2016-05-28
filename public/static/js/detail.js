'use strict';
$(function() {
    // init program player
    $('.post-content video').mediaelementplayer({
        isVideo: false,
        enableKeyboard: false,
        alwaysShowControls: true,
        alwaysShowHours: true,
        videoVolume:'horizontal',
        flashName: '/static/module/mediaelement/flashmediaelement.swf',
        features: ['playpause','progress','current','duration','tracks','volume'],
        defaultSeekBackwardInterval: function(media) {
            return (media.duration * 0.02);
        },
        defaultSeekForwardInterval: function(media) {
            return (media.duration * 0.02);
        }
    });

    // init music player
    $('.post-music video').mediaelementplayer({
        isVideo: false,
        flashName: '/static/module/mediaelement/flashmediaelement.swf',
        features: [],
        success: function (me, dom) {
            $('#' + dom.id + '-btn').click(function() {
                if (me.paused) {
                    me.play();
                } else {
                    me.pause();
                }
            });
        }
    });

    // tips
    if ( ! utils.isMobileClient()) {
        // bind tips
        $('.post-title, .post-meta').tipsy({
            gravity: 'e',
            html: true,
            delayOut: 5000,
            opacity: 0.6,
            offset: 10
        });

        // replace emoji to image in tips
        if (utils.isWinOs()) {
            var emoji = utils.emoji();
            $('.post-title, .post-meta').on('mouseover', function() {
                var tips = document.getElementsByClassName('tipsy-inner');
                for (var i = 0, n = tips.length; i < n; i++) {
                    tips[i].innerHTML = emoji.replace_unified(tips[i].innerHTML);
                }
            });
        }

        // trigger it
        $('.post-title, .post-meta li').each(function() {
            $(this).trigger('mouseover').trigger('mouseout');
        });
    }

    // set current program date
    var date = $('article').attr('data-date');
    $.cookie('program_date', date, {expires: 365, path: '/'});

    // load page view counts
    var url = '/programs/' + date + '/pv';
    $.getJSON(url, function(data) {
        $('#post-view-counts').text(data.total);
    });

    // replace emoji to image in duoshuo comments
    $('.ds-comments').wait(function() {
        var emoji = utils.emoji();
        $(this).find('p').each(function() {
            this.innerHTML = emoji.replace_colons(this.innerHTML);
        });
    }, 5, 1000);
});
