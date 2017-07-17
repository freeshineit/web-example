;(function($, window, document,undefined){
    var YSelect = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            "width":200, //下拉列表的宽度
            "height":400,
            "bgColor":'',
            "moveColor":'',
            "panelStyle":{},
            "optionStyle":{},
            "arrow":'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAsAAAAGCAYAAAAVMmT4AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyhpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OThGRDY1OUE1QjBFMTFFN0FCNzFFNzdDOEE5NURDMUMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OThGRDY1OUI1QjBFMTFFN0FCNzFFNzdDOEE5NURDMUMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo5OEZENjU5ODVCMEUxMUU3QUI3MUU3N0M4QTk1REMxQyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo5OEZENjU5OTVCMEUxMUU3QUI3MUU3N0M4QTk1REMxQyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PjX6bzUAAAA+SURBVHjaYty7d+9/BgYGRgbC4D8TVOF/QgpB6pigHHwa4DYzIQli04DiRCY0SWQNGH5hwmItIzaFIAAQYACFnQ1DHZsxyAAAAABJRU5ErkJggg==',
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    YSelect.prototype = {
        createPanel: function() {
            var target = this.$element,
                _this = this,
                id = (target.attr('id')+'_'+ Math.random()).replace('.', '_');
                html = _this.getHtml(target);
                optionBox = $("<div style='position: absolute; top: 0px; left: 0px; width: 100%;'> <div class='select_option option_component option_box_"+ id +"' style='display:none'>"+html+"</div></div>");
                placeholder = target.attr('placeholder') || ''; //默认值

            var option = null,
                arrow = null,
                options = optionBox.find('li'),
                optionHeight = 36, //每个option的高度
                lineHeight = target.height(); //行高

            defaultValue = placeholder;
            value = '';

            $.each(optionBox.find('li'), function(index, item) {
                if ($(item).attr('select') !== undefined) {
                    defaultValue = $(item).text();
                    value = $(item).attr('value');
                }
            })

            option = $('<input readonly style="border:0;outline:none;margin:0;padding:0;line-height:'+ lineHeight+'px;height:'+  lineHeight +'px;padding-left: 10px;padding-right:23px;overflow: hidden" class="option_component_value" id="' + id + '" value="' + value + '" defaultValue="'+ defaultValue +'">');
            arrow = $('<span class="logo_component logo_arr" style="background:url('+ _this.options.arrow +');width:11px;height:6px;background-repeat:no-repeat;margin-top: -20px;float: right;margin-right: 10px;"></span>')
            $('body').append(optionBox);

            //css
            option.css(_this.options.optionStyle);

            target.prepend(arrow).prepend(option);

            $.each([arrow,option],function(index,item){
                item.on('click', function(event) {
                    var optionCom = optionBox.children('.option_component');
                    var otherOptionBox = optionBox.siblings().find('.select_option.option_component') || [];
                    var top = target.offset().top;
                    var left = target.offset().left;
                    optionCom.css({'top':(top + lineHeight + 5 )+'px','left':left +'px'})
                    $.each(otherOptionBox, function(index, item) {
                        $(item).hide();
                    })

                    _this.showPanel(optionCom)

                    event.stopPropagation();

                    $(document).on('click', function(event) {
                        optionCom.hide();
                        $(this).unbind('click')
                        event.stopPropagation();
                    })

                    return false;
                })
            })

            options.on('click', function(event) {
                var $this = $(this)
                $this.closest('.select_option.option_component').hide();
                $this.attr('select','select').siblings().removeAttr('select');
                defaultValue = $this.text();
                value = $this.attr('value');
                option.attr('value', value).text(defaultValue);
                event.stopPropagation();

                option.trigger('change');
            })
            return option
        },
        getHtml: function(ele){
            var _html = ele.html();
            ele.html('');
            return _html;
        },
        addEvent:function(){

        },
        showPanel: function(ele){
            if (ele.css("display") == "none") {
                ele.show();
            } else {
                ele.hide();
            }
            return ele;
        },
        select:function() {
            var _this = this;

            return _this.createPanel();
        }
    }
    $.fn.yselect = function(options) {
        var ySelect = new YSelect(this, options);
        //调用其方法
        return ySelect.select();
    }

})(jQuery, window, document);
