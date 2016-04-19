var RequestService = function(app){
    RequestService.prototype.getLocale = function(){
        return app.request.getCurrentLocale();
    };

    RequestService.prototype.isTranslatorEnabled = function(){
        return app.session.getTranslatorEnabled();
    };

};

module.exports = RequestService;
