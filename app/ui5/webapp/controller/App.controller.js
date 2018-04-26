sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/m/Dialog",
    "sap/m/Button",
    "sap/m/Input",
    "sap/m/TileContent",
    "sap/m/ImageContent",
    "sap/ui/model/odata/v2/ODataModel"
], function (Controller, MessageBox, Dialog, Button, Input, TileContent, ImageContent, ODataModel) {
    "use strict";
    return Controller.extend("treinamento.ui5.controller.App", {

        onInit: function (evt) {
            var oView = evt.getParameter("value");

            var model = new sap.ui.model.odata.v2.ODataModel(
                "http://10.0.1.70:8000/sap/opu/odata/SAP/ZDAG_ESTACIONAMENTO_SRV/"
            );
        },

        onBeforeRendering: function () {},

        onAfterRendering: function () {},

        onExit: function () {},

        onPressEndButton: function () {
            dialog.close();
        },

        onPress: function (oEvent) {
            var oSource = oEvent.getSource();

            var dialog = new Dialog({
                title: "Insira o Número da Placa",
                content: [
                    new Input('nomeMotorista', {
                        class: "sapUiSmallMarginBottom",
                        placeholder: "Insira aqui nome do motorista"
                    }),
                    new Input('modeloCarro', {
                        class: "sapUiSmallMarginBottom",
                        placeholder: "Insira aqui modelo do carro"
                    }),
                    new Input('placaVaga', {
                        class: "sapUiSmallMarginBottom",
                        liveChange: function (oInput) {
                            var sText = oInput.getParameter("value");
                            var parent = oInput.getSource().getParent();

                            if (sText == "") {
                                parent.getBeginButton().setEnabled(true);
                            } else {
                                var reGex = /^[A-Z]{3}\-\d{4}$/;
                                if (!sText.match(reGex)) {
                                    parent.getBeginButton().setEnabled(false);
                                    this.setValueState("Error");
                                } else {
                                    parent.getBeginButton().setEnabled(true);
                                    this.setValueState("Success");
                                }
                            }
                        },
                        placeholder: "Insira aqui o número da placa",
                        valueStateText: "A placa do veículo não é válida. Ex: AAA-0000",
                        maxLength: 8
                    })
                ],
                beginButton: new Button({
                    text: "Submit",
                    press: function (oEvent) {

                        oSource.destroyTileContent();

                        var sFooter = sap.ui.getCore().byId("placaVaga").getValue();
                        var sSubHeader = sap.ui.getCore().byId("nomeMotorista").getValue();
                        var sUnit = sap.ui.getCore().byId("modeloCarro").getValue();
                        var oTileContent = new TileContent();
                        var oImageContent = new ImageContent();

                        if (sFooter == "") {
                            oSource.setHeader("Vaga: Disponível");
                            oSource.setHeaderImage(
                                "https://i.ytimg.com/vi/9tNufqp1my0/maxresdefault.jpg"
                            );
                            oSource.setSubheader("Motorista: ");
                            oTileContent.setUnit();
                            oTileContent.setFooter();
                            oImageContent.setSrc("sap-icon://border");
                        } else {
                            oSource.setHeader("Vaga: Ocupada");
                            oSource.setHeaderImage(
                                "https://pattishire.com.au/wp-content/uploads/2015/06/light_red_napkin.jpg"
                            );
                            oSource.setSubheader("Motorista: " + sSubHeader);
                            oTileContent.setUnit(sUnit);
                            oTileContent.setFooter(sFooter);
                            oImageContent.setSrc("sap-icon://car-rental");                            
                        }

                        oTileContent.setContent(oImageContent);
                        oSource.addTileContent(oTileContent);

                        dialog.close();
                    }
                }),
                endButton: new Button({
                    text: "Cancel",
                    press: function () {
                        dialog.close();
                    }
                }),
                afterClose: function () {
                    dialog.destroy();
                }
            });
            dialog.open();
        },

    });

});