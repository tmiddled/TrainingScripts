try {
    //Construct URL
    var custDbAlias = VV.CustomerDatabaseAlias;
    var custAlias = VV.CustomerAlias;
    var apiVer = "v1";
    var templateId = 'f9c80aec-2ac5-e311-accd-005056805d2b';

    var fields = 'PrimaryRep';
    var limit = 1000;
    var offset = 0;


    var existingWorkOrderData = [];

    String.prototype.changeTechnician = function () {
        var name = this;
        name.toLowerCase().replace(" ", ".");
        return name;
    }


    var existingdata = $.getJSON(VV.BaseAppUrl + 'api/' + apiVer + '/' + custAlias + '/' + custDbAlias + '/formtemplates/' + templateId + '/forms?fields=' + fields + '&limit=' + limit + '&offset=' + offset)
    .done(function (result) {
        var numOfForms = result.data.length;
        if (numOfForms > 0) {
            for (var a = 0; a < numOfForms; a++) {
                existingWorkOrderData.push({
                    formid: result.data[a].instanceName,
                    revisionid: result.data[a].revisionId,
                    currentprimaryrep: result.data[a].primaryRep
                });
            }
            var postData = {};
            for (var b = 0; b < numOfForms; b++) {
                var lowerCaseRep = existingWorkOrderData[b].currentprimaryrep;
                var lowerCaseTechnician = existingWorkOrderData[b].current;
                // var lowerCaseNames = changeTechnician(lowerCaseRep, lowerCaseTechnician);
                lowerCaseRep.changeTechnician();
                postData.PrimaryRep = lowerCaseNames[0];

                var currentFormInstance = existingWorkOrderData[b].revisionid;
                //Make Request to Post Data
                var requestPost = $.ajax({
                    type: "POST",
                    url: VV.BaseAppUrl + 'api/' + apiVer + '/' + custAlias + '/' + custDbAlias + '/formtemplates/' + templateId + '/forms/' + currentFormInstance,
                    data: postData


                })
                var newvar = 'five';
            }
        }
    })

    var newvar = 'five';

} catch (error) {
    VaultMaster.MasterMessageWindow.showMessage('Sup', '<br />An error occurred: ' + error.message);
}
