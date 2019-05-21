$(document).ready(function(){
    var i,totalQuest,timeUp,score,howto=$('.howto'),allQuest=$('.all_quest'),splash=$('.splash'),timeCountDiv=$(".timeCount"),totalQuestDiv=$('.totalQuest'),tickIcon=$('.tick'),crossIcon=$('.cross');
    //初始化
    init();
    function init(){
        i=1;totalQuest=20;timeUp=3500;score=0;
        $('.result').hide();howto.hide();
        $('.hint ul').children().hide();
        allQuest.children().hide();
        totalQuestDiv.hide().html('问题 '+i+' / '+totalQuest);
        splash.show()
    }

    //GO点击事件
    $('.splash a').click(function(e){
        e.preventDefault();
        splash.hide();
        howto.fadeIn('slow')
    });
    //开始游戏点击事件
    $('.howto a').click(function(e){
        e.preventDefault();
        howto.hide();
        startGame()
    });
    //选项点击事件
    $('.answer a').click(function(e){
        var ans=$(this).data('verify');
        var default_ans="dui";
        e.preventDefault();
        $('.answer a').addClass('disable_click');
        if(ans===default_ans){
            score+=1;
            tickIcon.fadeIn('slow',function(){$(this).fadeOut('fast')})
        }else{
            crossIcon.fadeIn('slow',function(){
                $(this).fadeOut('fast')})
        }
        $('.quest'+i).fadeOut('slow',function(){
            if(i<totalQuest&&timeUp>=1){
                i++;
                $('.quest'+i).fadeIn('slow',function(){
                        $('.answer a').removeClass('disable_click')}
                )}else{
                showResult();
                clearInterval(timeLoop)
            }
            totalQuestDiv.html('问题 '+i+' / '+totalQuest)
        })
    });

    //再玩一次点击事件
    $('.retry').click(function(e){
        e.preventDefault();
        init()
    });
    //开始游戏函数
    function startGame(){
        $('.quest1').show();
        timeCountDiv.show();
        totalQuestDiv.show();
        timeLoop=setInterval(timeUpCount,1000/60)
    }
    //计时函数
    function timeUpCount(){
        var time=parseInt(timeUp);
        var minutes=Math.floor(time/60);
        var seconds=time%60;
        if(timeUp>=1){
            timeUp--
        }else{
            showResult();
            clearInterval(timeLoop)
        }
        timeCountDiv.html("时间 "+minutes+":"+seconds)
    }
    //结果显示函数
    function showResult(){
        allQuest.children().hide();
        totalQuestDiv.hide();
        timeCountDiv.hide();
        $('.result .score').html('答对'+score+'个题，共'+totalQuest+'题.色感'+score*5+'分');
        $('.result').fadeIn('slow');
    }
});
