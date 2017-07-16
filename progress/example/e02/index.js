;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Progress = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'on':'g-progress-on',
            'active': 'g-progress-active',
            'color': '#ff8800',
            // 'position':1,  //可以设置激活的位置 首先执行      从1开始
            'targets':'g-progress-point',
            'animate':{},
            'tagH':2,
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Progress.prototype = {
        progress: function() {
            var _this = this;
                targets = _this.$element.find('.'+_this.options.targets),
                activeP = _this.options.position || $('.'+ _this.options.active).prevAll().length;  //激活位置
                percent = (((activeP - 1) / (targets.length - 1)) * 100);
            var tag = $('<div class="g-progress-percent" style="position:absolute;top:0px;left:0px;width:0;height:'+_this.options.tagH+'px;background-color:'+_this.options.color+'"></div>');
            var $targets = $('.'+_this.options.targets);

            _this.$element.prepend(tag);

            $targets.map(function(index,item){
                if(activeP > index){
                    $(item).addClass(_this.options.on)
                }
                $(item).css({'left':(percent * index)+'%'});
            })
            $($targets[activeP]).addClass(_this.options.active);

            //动画
            tag.animate({width:(percent * activeP)+'%'}, 1000);
        }
    }
    //在插件中使用Beautifier对象
    $.fn.progress = function(options) {
        //创建Beautifier的实体
        var pro = new Progress(this, options);
        //调用其方法
        return pro.progress();
    }
})(jQuery, window, document);
