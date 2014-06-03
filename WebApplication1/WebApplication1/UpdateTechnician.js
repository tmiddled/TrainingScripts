try {
    //Get field values
    var primaryrepfrom = VV.Form.GetFieldValue('PrimaryRepFrom');
    var primaryrepto = VV.Form.GetFieldValue('PrimaryRepTo');

    //Construct URL
    var custDbAlias = VV.CustomerDatabaseAlias;
    var custAlias = VV.CustomerAlias;
    var apiVer = "v1";
    var templateId = 'f9c80aec-2ac5-e311-accd-005056805d2b';


    var fields = 'PrimaryRep,Datafield8'
    var queryString = '[PrimaryRep] =\'' + primaryrepfrom + '\'';

    var existingWorkOrderData = [];


    var existingdata = $.getJSON(VV.BaseAppUrl + 'api/' + apiVer + '/' + custAlias + '/' + custDbAlias + '/formtemplates/' + templateId + '/forms?q=' + queryString + '&fields=' + fields)
    .done(function (result) {
        var numOfForms = result.data.length;
        if (numOfForms > 0) {
            for (var a = 0; a < numOfForms; a++) {
                existingWorkOrderData.push({
                    formid: result.data[a].instanceName,
                    revisionid: result.data[a].revisionId,
                    currentprimaryrep: result.data[a].primaryRep,
                    newprimaryrep: primaryrepto
                });
            }
            var postData = {};
            for (var b = 0; b < numOfForms; b++) {
                postData.PrimaryRep = existingWorkOrderData[b].newprimaryrep;
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

