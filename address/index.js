;(function($, window, document,undefined) {
    //定义Beautifier的构造函数
    var Address = function(ele, opt) {
        this.$element = ele,
        this.defaults = {
            'width':400,
            'height':400,
            'boxClass':{},
            'provinceClass':{},
            'cityClass':{},
            'bgcolor':'rgba(0,0,0,0.2)',
            'data':[
                {
                    province:'安徽',
                    city:['suz','132','12341','合肥']
                },
                {
                    province:'浙江',
                    city:['suz','132','12341','杭州']
                },
            ]
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Address.prototype = {
        address: function(){
            var _this = this;
                $('body').append(_this.addPanel());
        },
        addPanel: function() {
            var _this = this,
                data = _this.options.data,
                clRan = Math.random().toString().split('.')[1],
                box = $('<div id="g-address-box_'+clRan+'" class="g-address-box g-address-ran'+clRan+'" style="position:fixed;top:0;left:0;height:100%;width:100%;background-color:'+ _this.options.bgcolor+';display:none"></div>');

                boxPanel = $('<div class="g-address-box-panel" style="position:absolute;left:50%;top:50%;background-color:red;width:'+_this.options.width+'px;height:'+_this.options.height+'px;margin-top:-'+ _this.options.height / 2 +'px;margin-left:-'+_this.options.width / 2 +'px"></div>')

                data.map(function(item){
                    boxPanel.append(_this.provincePanel(item.province).append(_this.cityPanel(item.city)));
                })
                box.append(boxPanel);

                this.$element.click(function(e){
                    box.css({'display':'block'})
                    e.stopPropagation();
                    return false;
                })

                boxPanel.click(function(e){
                    e.stopPropagation();
                    return false;
                })

                box.click(function(e){
                    $(this).css({'display':"none"});

                    e.stopPropagation();
                    return false;
                })

            return box;
        },
        provincePanel: function(province) {
            var _this = this,
                _province = province,
                pPanel = $('<div class="g-address-province-panel" style="display:inline-block;position:relative"></div>');

                pPanel.append('<span>'+province+'</span>')

                pPanel
                .mouseenter(function(e){
                    var target = $(this).find('.g-address-city-panel');
                    e.stopPropagation();
                    return false;
                })
                .mouseleave(function(e){
                    var target = $(this).find('.g-address-city-panel');
                    e.stopPropagation();
                    return false;
                })

            return pPanel;
        },
        cityPanel:function(city) {
            var _city = city,
                cPanel = $('<ul class="g-address-city-panel" style="list-style:none;padding:5px;display:none;position:absolute;top:10px;left:0;background-color:blue"></ul>');
            _city.map(function(item){
                cPanel.append('<li style="display:inline-block;paddng:0 5px;"><input type="checkbox" name="1" checked/>'+item+'</li>')
            })

            // cPanel.click()
            return cPanel;

        }

    }
    //在插件中使用Beautifier对象
    $.fn.address = function(options) {
        //创建Beautifier的实体
        var addr = new Address(this, options);
        //调用其方法
        return addr.address();
    }
})(jQuery, window, document);
