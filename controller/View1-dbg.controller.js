var empId = "";
var type = "";
var name = "";
var request = "";
var position = "";
var dept = "";
var area = "";
var company = "";
var string = "";
sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("zdm.zclearance_direct_manager.controller.View1", {
		onInit: function () {
			
			debugger;
			/*this.oRouter = this.getOwnerComponent().getRouter();
			this.oRouter.attachRoutePatternMatched(this.data, this);*/
			
			/*var complete_url = window.location.href;
			//var pieces = complete_url.split("?");
			//var val = pieces[2];
			var pieces = complete_url.split("/");  /*get the woritem id 
			var val = pieces[6];
			var that = this;
			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/directManagerSet('" + val + "')";
			
			oModel.read(sPath, {
				success: function (oData, response) {
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idClearanceForm1");
					osf.setModel(oModel3);
					name = oData.Name;
					position = oData.Jobtitle;
					dept = oData.Department;
					area = oData.Zarea;
					company = oData.Zcompany;
				},
				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});*/
			
			
			var complete_url = window.location.href;
			//var pieces = complete_url.split("?");
				var pieces = complete_url.split("ccc");
				if	(pieces.length === 2){
			string = pieces[1];
			this.zrecord = string.substr(1, 9);	
		}
			//var val = pieces[1];
			//var to = pieces[1].split("=");
			//var val = to[0];
		//	this.zrecord = val;
			//this.zrecord = pieces[1].slice(1,9);
			//var pieces = complete_url.split("/");  /*get the woritem id 
			//var val = pieces[6];
			var that = this;
			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/directManagerSet('" + this.zrecord + "')";
			
			oModel.read(sPath, {
				success: function (oData, response) {
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idClearanceForm1");
					osf.setModel(oModel3);
					name = oData.Name;
					position = oData.Jobtitle;
					dept = oData.Department;
					area = oData.Zarea;
					company = oData.Zcompany;
				},
				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});
			
		},
		
		handleUploadPress: function(oEvent){
			debugger
			var oFileUploader = this.getView().byId("fileUploader");
			var domRef = oFileUploader.getFocusDomRef();
			var file = domRef.files[0];
			var that = this;
			this.filename = file.name;
			this.filetype = file.type;
			
			var reader = new FileReader();
			
			reader.onload = function(e){
			debugger;
			var vContent = e.currentTarget.result.replace("application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,","");
			that.postToSap(that.zrecord, that.filename, that.filetype, vContent);
			};
			//file reader will start reading
			reader.readAsDataURL(file);
			
		},
		
		postToSap: function(zrecord,filename, filetype,content){
		var oDataModel = this.getView().getModel();
		var payLoad = {
			"Zrecord": zrecord,
		"Zdepartment": "DM", 
			"Content": btoa(encodeURI(content)),
			"Filename" : filename,
			"Filetype" : filetype

		};
		oDataModel.create("/attachmentsSet", payLoad , {
			success : function(oEvent){
				sap.m.MessageToast.show("Success");
			},
			error : function(oError){
				sap.m.MessageToast.show("error");
			}
		});
		
			
		},
		
		data: function(oEvent) {
			debugger;
			//get the id of the router
			
		//	var id = oEvent.getParameter("arguments").;
			
		

			//var Pernr = oEvent.getSource().getValue();
			//empId = this.getView().byId("idEmpid").getValue();
			var that = this;

			var oModel = that.getOwnerComponent().getModel();
			var sPath = "/directManagerSet('" + 1 + "')";

			oModel.read(sPath, {
				success: function (oData, response) {
					var oModel3 = new sap.ui.model.json.JSONModel(oData);
					var osf = that.getView().byId("idClearanceForm1");
					osf.setModel(oModel3);
					name = oData.Name;
					position = oData.Jobtitle;
					dept = oData.Department;
					area = oData.Zarea;
					company = oData.Zcompany;
				},
				error: function () {

					sap.m.MessageToast.show("No Data retreived");
				}

			});

		}
	});
});