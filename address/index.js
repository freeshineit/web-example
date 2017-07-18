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
            'data':[],
        },
        this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Address.prototype = {
        address: function(){
            var _this = this;
                $('body').append(_this.addPanel());

                // console.log(_this.options.data[1]);
        },
        addPanel: function() {
            var _this = this,
                provinceList = _this.options.data[1].provinceList,
                clRan = Math.random().toString().split('.')[1],
                box = $('<div id="g-address-box_'+clRan+'" class="g-address-box g-address-ran'+clRan+'" style="position:fixed;top:0;left:0;height:100%;width:100%;background-color:'+ _this.options.bgcolor+';display:none"><input type="checkbox"/></div>');

                boxPanel = $('<div class="g-address-box-panel" style="position:absolute;left:50%;top:50%;background-color:#FFF;width:'+_this.options.width+'px;height:'+_this.options.height+'px;margin-top:-'+ _this.options.height / 2 +'px;margin-left:-'+_this.options.width / 2 +'px"></div>')

                provinceList.map(function(item){
                    boxPanel.append(_this.provincePanel(item.name).append(_this.cityPanel(item.cityList)));
                })
                box.append(boxPanel);

                this.$element.click(function(e){
                    box.css({'display':'block'})
                    e.stopPropagation();
                })

                boxPanel.click(function(e){
                    e.stopPropagation();
                })

                box.click(function(e){
                    $(this).css({'display':"none"});

                    e.stopPropagation();
                })

            return box;
        },
        provincePanel: function(province) {
            var _this = this,
                _province = province,
                pPanel =
                $('<div class="g-address-province-panel" style="display:inline-block;padding:0;margin:5px 10px;"><label><input type="checkbox" name="province" class="g-address-province-text" />'+province+'</label></div>');

                // pPanel.append('<span>'+province+'</span>')

                pPanel
                .mouseenter(function(e){
                    var target = $(this).find('.g-address-city-panel');
                        target.stop().fadeIn();
                    e.stopPropagation();
                    return false;
                })
                .mouseleave(function(e){
                    var target = $(this).find('.g-address-city-panel');
                    target.stop().fadeOut();
                    e.stopPropagation();
                    return false;
                })

                pPanel.children('label').children('input[type="checkbox"]').click(function(e){
                    var $this = $(this),
                        checkList = $this.closest('.g-address-province-panel').children('.g-address-city-panel');
                        $this.is(':checked') ? _this.checkedAll(checkList) : _this.cancelAll(checkList);
                })

            return pPanel;
        },
        cityPanel:function(city) {
            var _city = city,
                cPanel = $('<div class="g-address-city-panel" style="position:relative;display:none;"></div>');
                listPanel =$('<ul class="" style="list-style:none;padding:5px;position:absolute;top:0;left:0;background-color:#FFF;border:1px solid #e0e0e0;margin:0;width:400px"></ul>')
            _city.map(function(item,index){
                var list = $('<li style="display:inline-block;float:left;margin:5px 10px;"><label><input type="checkbox" name="city" value="'+item.code+'"/>'+item.name+'</label></li>');
                listPanel.append(list);
            });
            listPanel.find('input[type="checkbox"]').click(function(){
                var parent = $(this).closest('.g-address-province-panel');
                var siblings = $(this).closest('li').siblings('li');
                if($(this).is(':checked')){
                    // console.log('checked');
                    var i = 0;
                    siblings.each(function(){
                        if($(this).find('input[type="checkbox"]').is(':checked')) i ++;
                    })
                    console.log(i);
                    if(i == siblings.length){
                        parent.children('label').children('input[type="checkbox"]').prop("checked",true);
                    }
                }else{
                    // console.log('取消');
                    parent.children('label').children('input[type="checkbox"]').attr("checked",false);
                }
            })

            cPanel.append(listPanel);
            return cPanel;
        },
        checkedAll: function ($this){ //选中该类下的所有
             $this.find('label > input[type="checkbox"]').each(function(){
                 $(this).prop("checked",true);
             })
            return $this;
        },
        cancelAll: function ($this) {//取消选中该类下的所有
            $this.find('label > input[type="checkbox"]').map(function(index,item){
                $(item).attr("checked",false);
            })
           return $this;
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
