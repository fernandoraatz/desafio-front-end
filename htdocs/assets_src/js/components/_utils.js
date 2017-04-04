/*
|--------------------------------------------------------------------------
| Utils
|--------------------------------------------------------------------------
*/

APP.component.Util = {

    init : function () {
        this.setup();
        this.getController();
    },

    setup : function () {

        


    },


    getController: function () {

        var controller = $('meta[name=controller]').attr('content');
        return controller ? controller : false;

    },

   


};


