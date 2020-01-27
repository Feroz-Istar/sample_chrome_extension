$(function(){
    chrome.storage.sync.get('total',function (budget){
        $('#total').text(budget.total);
    });

    chrome.storage.sync.get('limit',function (budget){
        console.log(budget.limit)
        $('#limit').text(budget.limit);
    });

    $('#spendAmount').click(function(){
       chrome.storage.sync.get(['total','limit'],function (budget){
        console.log(budget.limit)

           var newtotal = 0;
           if(budget.total){
            newtotal += parseInt(budget.total); 
           }

           var amount= $('#amount').val();
           if(amount){
            newtotal+= parseInt(amount);
           }
           chrome.storage.sync.set({'total':newtotal},function(){
               if(amount && newtotal >= parseInt(budget.limit)){
                   var notifOption ={
                       type:'basic',
                       iconUrl:'images/get_started48.png',
                       title:'limit reached',
                       message:' look like you reached your limit'
                   }
                   chrome.notifications.create('limitnotif12',notifOption)
               }
           });
           $('#total').text(newtotal);
           $('#amount').val('');
       });
      
    });
})