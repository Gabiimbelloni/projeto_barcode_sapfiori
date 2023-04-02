sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/library",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, library, JSONModel) {
        "use strict";

        var urlObject = library.URLHelper;

        return Controller.extend("consultaprodutos.controller.Main", {
            onInit: function () {
                let produto = {};
                let productModel = new JSONModel(produto);
                let view = this.getView();
                view.setModel(productModel, "ModeloProduto");
                
                //alert("Meu programa está no ar!!!");
            },

            onClickImage: function(oEvent) {
                urlObject.redirect(oEvent.getSource().getSrc(), true);
            },

            onPressBuscar: function(){
                let input;
                input = this.byId("inpBusca");
                let valor = input.getValue();
                //alert(valor);

                let parameters = {
                    url : "https://world.openfoodfacts.org/api/v2/product/" + valor,
                    method :  "GET",
                    async : true,
                    crossDomain : true,
                };

                $.ajax(parameters).done(function(response){
                    let oProdutoModel = this.getView().getModel("ModeloProduto");
                    // Limpar a tela 
                    oProdutoModel.setData({});
                    oProdutoModel.refresh();
                    oProdutoModel.setData(response);
                    oProdutoModel.refresh();
                }.bind(this) ) // sucesso 
                .fail(function(){
                    //debugger
                }.bind(this) ); //tratamento de erro 

                //variavel tipo texto = com aspas
                //let material = "Agua Mineral Natural";
                //variavel do tipo numerico
                //let peso = 500;
                //let unidade = "ml";
                //numerico com casas decimais
                //let qtdsodio = 15.66;
                //booleano = abap_boll
                //let conteudoLiquido = true;

                //tabela interna no javascript - array
                //let composicao = ["Bicarbonato", "magnesio", "sulfato", "brometo"];
                //estrutura = tipo com varias propriedades - ou também chamado de objeto
                //let produto = {
               //     descricao : "Chá verde",
               //     marca : "quaker",
               //     peso : 130,
                //    uom : "g"
               // }

            }
        });
    });
