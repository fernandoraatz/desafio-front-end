/*
|--------------------------------------------------------------------------
| Controller Geral
|--------------------------------------------------------------------------
*/

APP.controller.General = {

    init : function () {

        this.setup();
        this.trazerNoticias();
        this.carregarMais();

    },

    setup : function () {

      
    },

    trazerNoticias : function () {

  
		 $.ajax({
                    type: "GET",
                    async: false,
                    dataType: 'json',
                    url: 'data.json',

                    success: function (data) {   

                        var mainTemplate = $('#main-template').html(),
                            brasilTemplate = $('#brasil-template').html(),
                            mundoTemplate = $('#mundo-template').html(),
                            mainData = data.section[0], 
                            brasilData = data.section[1],
                            mundoData = data.section[2]; 

                             console.log(brasilData);

                        $('.main .news').html(Mustache.render(mainTemplate, mainData));
                        $('.brasil .news').html(Mustache.render(brasilTemplate, brasilData));
                        $('.mundo .news').html(Mustache.render(mundoTemplate, mundoData));
                                    


      
                }
            });


	},


    carregarMais: function(){


        $('.carregar-mais a').on('click', function(event) {

            $(this).closest('section').find('.news').css('height', 'auto');
            $(this).hide();
            return false;

        });


    }





};



