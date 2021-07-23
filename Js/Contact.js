
var status;
$(document).ready(function () {


    $('#Status').on('change', function () {
        
        status = $("#Status option:selected").text();
        
    });

    init();



});
function init() {


   
    fillTable();
    BindButtons();



  





}




$('#Email').keypress(function (e) {
    var re = /([A-Z0-9a-z_-][^@])+?@[^$#<>?]+?\.[\w]{2,4}/.test(this.value);
    if (!re) {
        $('#erroremail').show();
    } else {
        $('#erroremail').hide();
    }
});
$('#Phone').keypress(function (e) {
    

    var arr = [];
    var kk = e.which;

    for (i = 48; i < 58; i++)
        arr.push(i);

    if (!(arr.indexOf(kk) >= 0))
        e.preventDefault();  
});
function BindButtons() {



    $('#btnSave').click(function () { SaveData(); });
    $('#btnEdit').click(Edit);
    $('#btnUpdate').click(function () { UpdateDetails(); });

}


function Edit() {

    $('#btnEdit').hide();
    $('#btnUpdate').show();
    $('#btnSave').hide();
    $('#myModal input').removeAttr('disabled');
    $('#myModal select').removeAttr('disabled');

    $('#FirstNameM').removeAttr('disabled');
    $('#LastNameM').removeAttr('disabled');
    $('#EmailM').removeAttr('disabled');
    $('#PhoneM').removeAttr('disabled');
    $('#StatusM').removeAttr('disabled');
  
}
function UpdateDetails()
{
    //debugger;
 if (!Validations()) return;
    $('#txtFNameValidation').html('');
    $('#txtLNameValidation').html('');
    $('#txtEmailValidation').html('');
    $('#txtPhoneValidation').html('');
    $('#Status').html('');

    
  //  var id = data[0].id;

    var objContact = new Object();
    objContact.ID = $('#LhId').val();
    objContact.FirstName = $('#FirstNameM').val();
    objContact.LastName = $('#LastNameM').val();
    objContact.Email = $('#EmailM').val();
    objContact.PhoneNo = $('#PhoneM').val();
  

        objContact.status = $("#StatusM option:selected").text();

  


    $.ajax({
        type: 'Post',
        dataType: 'json',

        url: 'https://localhost:44387//api/Contact/UpdateContacts',


        data: objContact,

        traditional: true,
        success: function (data) {
            //debugger;
            if (data && data.length > 0 && data[0].status === '200' && data[0].data) {

                alert(data[0].message);
                location.reload();
                $('#FirstName').val("");
                $('#LastName').val("");
                $('#Email').val("");
                $('#Phone').val("");
                $('#Status').val("");
                init();


            }
        }

    });






}
function SaveData() {
   
    if (!Validations()) return;
    $('#txtFNameValidation').html('');
    $('#txtLNameValidation').html('');
    $('#txtEmailValidation').html('');
    $('#txtPhoneValidation').html('');
    $('#Status').html('');

    //var table = $("#ResultsTable").DataTable();
    //var rows = table.data().count();
    var objContact = new Object();
    //objContact.id = parseInt(rows) + 1;
    objContact.FirstName = $('#FirstName').val();
    objContact.LastName = $('#LastName').val();
    objContact.Email = $('#Email').val();
    objContact.PhoneNo = $('#Phone').val();
    objContact.Status = status;
   
   
    $.ajax({
        type: 'Post',
        dataType: 'json',

        url: 'https://localhost:44387//api/Contact/AddContacts',
        

        data: objContact,
       
        traditional: true,
        success: function (data) {
            //debugger;
            if (data && data.length > 0 && data[0].status === '200' && data[0].data) {
             
                alert(data[0].message);
                $('#FirstName').val("");
                $('#LastName').val("");
                $('#Email').val("");
                $('#Phone').val("");
                $('#Status').val("");
                init();

                
            }
        }

    });







}


//function fillTableTemp(data) {
//    var json = data[0].data;

//    console.log(json);

//    var columns = [

//        //  { title: "View", "orderable": false, "targets": 'no-sort', data: null, render: function (data) { return "<button class='btn btn-default'  id='view' onclick='view(this);' > <span class='glyphicon glyphicon-eye-open' ></span></button>" } },
//        //{ title: "ID", data: "Mpid", responsivePriority: 2, class: "textalign" },
//        //  { title: "ID", data: "ID", responsivePriority: 1 },
//        { title: "Genre", data: "Genre", responsivePriority: 2, class: "textalign" },
//        { title: "MovieName", data: "MovieName", responsivePriority: 3, class: "textalign" },
//        { title: "Year", data: "Year", responsivePriority: 4, class: "textalign" },


//        {
//            title: "Action", data: null, "orderable": false , "targets": 'no-sort', responsivePriority: 5,class: "textalign", "render":
//                function (data) {
//                    var ret = "";

//                    ret = "<button class='btn btn-default'  onclick='View(this);' ><i class='fa fa-trash'></i></button>";



//                    return ret;

//                }
//        }
//    ];


//    //    debugger;
//    PopulateTable("#ResultsTable", json, columns, true);





//    $('#ResultsTable').show();
//    $("#lblNorecordsSearch").html(' ');



//}




function fillTable() {
    //debugger;
    $.ajax({
        type: "Get",
        url: 'https://localhost:44387//api/Contact/GetListContacts',
        data: {},
        dataType: 'json',
        success: function (data) {
             // debugger;
            if (data && data.length > 0 && data[0].status === '200' && data[0].data) {
                var json = data[0].data;

                //console.log(json);

                var columns = [

                    //  { title: "View", "orderable": false, "targets": 'no-sort', data: null, render: function (data) { return "<button class='btn btn-default'  id='view' onclick='view(this);' > <span class='glyphicon glyphicon-eye-open' ></span></button>" } },
                    //{ title: "ID", data: "Mpid", responsivePriority: 2, class: "textalign" },
                    //  { title: "ID", data: "ID", responsivePriority: 1 },
                    { title: "ID", data: "id", responsivePriority: 1, class: "textalign" },
                    { title: "FirstName", data: "fname", responsivePriority: 2, class: "textalign" },

                    { title: "LastName", data: "lname", responsivePriority: 3, class: "textalign" },
                    { title: "Email", data: "email", responsivePriority: 4, class: "textalign" },
                    { title: "PhoneNo", data: "phoneno", responsivePriority: 5, class: "textalign" },
                    { title: "Status", data: "status", responsivePriority: 6, class: "textalign" },

                    {
                        title: "Action", data: null, "orderable": false, "targets": 'no-sort', responsivePriority: 7, class: "textalign", "render":
                            function (data) {
                                var ret = "";

                                ret = "<button class='btn btn-default'  onclick='Delete(this);' ><i class='fa fa-trash'></i></button>" + " " + "<button class='btn btn-default'  onclick='View(this);' ><i class='fa fa-eye'></i></button>";

                               

                                return ret;

                            }
                         
                      
                    }
                ];


                //    debugger;
                PopulateTable("#ResultsTable", json, columns, true);





                $('#ResultsTable').show();
                $("#lblNorecordsSearch").html(' ');

            }
            else {
                $('#ResultsTable').hide();
                $("#lblNorecordsSearch").html('No Records Found !!');
            }
        }


    });



}


function View(e) {
    debugger;
    $('#txtFNameValidation').html('');
    $('#txtLNameValidation').html('');
    $('#txtEmailValidation').html('');
    $('#txtPhoneValidation').html('');
    $('#Status').html('');


    //var LhId = $('#LhId').val();
    var table = $("#ResultsTable").DataTable();
    var rows = $(e).closest('tr').addClass('selected');
    var data = table.rows('.selected').data();
    console.log(data);
    var id = data[0].id;
    var row1 = $(e).closest('tr').removeClass('selected');



    $.ajax({
        type: "Get",
        url: 'https://localhost:44387//api/Contact/GetListContactsByID',
        data: { ID: id },

        success: function (data) {
           

            if (data[0].status = "200") {
                
               // $(e).closest('tr').removeClass('selected');


               // $('#LhId').val(data[0].data[0].id);
                $("#FirstName").val(data[0].data[0].fname);

                $('#LastName').val(data[0].data[0].lname);

                $('#Email').val(data[0].data[0].email);

                $('#Phone').val(data[0].data[0].phoneno);
                
                $('#Status').val(data[0].data[0].status);

                $('#ddStatusValidation').html('');


                

                if (data[0].data[0].status == "Active") { $('#Status').val(1) }
                else
                    $('#Status').val(0);
                $('#LhId').val(data[0].data[0].id);
                $('#FirstNameM').val(data[0].data[0].fname).attr('disabled', true);
                $('#LastNameM').val(data[0].data[0].lname).attr('disabled', true);
                $('#EmailM').val(data[0].data[0].email).attr('disabled', true);
                $('#PhoneM').val(data[0].data[0].phoneno).attr('disabled', true);
                $('#StatusM').attr('disabled', true);
                $('#btnSave').hide();
                $('#btnEdit').show();
                $('#btnUpdate').hide();
                $('#myModal').modal('show');
                setTimeout(function () {
                    $("#PeriodName").focus();
                }, 300);






            }

        }
    });





}


function Delete(e) {


    // debugger;
    var table = $("#ResultsTable").DataTable();
    var rows = $(e).closest('tr').addClass('selected');
    var data = table.rows('.selected').data();

    console.log(data);
    var id = data[0].id;

    var row1 = $(e).closest('tr').removeClass('selected');


    $.ajax({
        type: "Post",
        url: 'https://localhost:44387//api/Contact/DeleteContacts',
        data: { ID: id },

        success: function (data1) {

            if (data1[0].status === "200") {
                alert(data1[0].message);
                fillTable();
            }
        }
    });






}


function PopulateTable(target, data, columns, autoopen, columnDef) {


    for (var i = 0; i < columns.length; i++) {
        if (columns[i]["className"])
            columns[i]["className"] += " dt-head-center";
        else columns[i]["className"] = " dt-head-center";
    }
    //if (autoopen) {
    //    columns.unshift(
    //                { "title": "", data: null, defaultContent: "<a>&nbsp</a>", sortable: false, orderable: false, targets: 'no-sort' }
    //                );
    //}
    $(target).dataTable({
        data: data,
        destroy: true,
        fixedColumns: true,
        autoWidth: false,
        responsive: {
            details: {
                type: 'column',
                renderer: function (api, rowIdx, columns) {
                    var rowIndex = rowIdx;
                    var data = $.map(columns, function (col, i) {
                        if (col.hidden) {
                            if (col.data.toString().indexOf('input') > 0) {
                                var row = $(target).DataTable().row(rowIndex[0]).node();
                                var input = $(row).children(':nth-child(' + (i + 1) + ')').children('input');
                                $(input).attr('value', $(input).val());
                                input = $(input).parent().html();
                                //var input = col.data;
                                var newcontrol = '<input ' + 'onchange="resposiveTableControlChanged(this,' + rowIndex[0] + ',' + i + ')" ' + input.substring(input.indexOf('index') + 7, input.length);
                                col.data = newcontrol;
                            }
                        }
                        return (col.hidden && col.title.trim() != '') ?
                            '<div data-dt-row="' + col.rowIndex + '" data-dt-column="' + col.columnIndex + '">' +
                            '<div class="col-md-3 col-xs-6"><strong>' + col.title + ':' + '</strong></div> ' +
                            '<div class="col-md-3 col-xs-6">' + (col.data ? col.data : "&nbsp;") + '</div>' +
                            '</div>' :
                            '';
                    }).join('');
                    return data ?
                        ('<div class="row">' + data + '</div>') :
                        false;
                }
            }
        },
        lengthMenu: [100],
        columns: columns,
        columnDefs: columnDef,
        fnInitComplete: function () {
            if (!data.length) {
                //    alert("Warning", "No data found!");
                $(target).hide();
            }
            else {
                $(target).show();
                $(target + "_wrapper").css("padding", "10px 10px 45px 10px").css("background-color", "rgb(255,255,255)");
                // $(target + ">thead th").css("width", "20%");
                if (autoopen) {
                    $(target + ' tbody').off('mouseenter mouseleave').on('mouseenter mouseleave', 'tr', function () {
                        if (!$(this).hasClass("marked"))
                            $(this).children().first().children().first().click();
                    });
                    $(target + ' tbody').on('click', 'tr', function (e) {
                        if (!$(e.target).is('a') && !$(e.target).is('input') && !$(e.target).is('button')) {
                            if ($(this).hasClass("marked")) {
                                $(this).removeClass("marked");
                            } else {
                                $(this).addClass("marked");
                            }
                        }
                    });
                }
                $(target + "_wrapper").css("padding", "10px 10px 45px 10px").css("background-color", "rgb(255,255,255)");

                $('[data-toggle="tooltip"]').tooltip();
            }


        },
        drawCallback: function () {
            if ($(target).DataTable().rows().count()) {
                $(target).show();
            }
        }
    });

    // ttd(target, data);
}
function PopulateSelect(options, callback) {

    var select = options.target;
    var url = options.url;
    var data = options.ajaxparams;
    var id = options.id;
    var text = options.text;
    var selectoptions = options.selectoptions;

    var so = "";
    if (!$(select).prop('multiple')) {
        so = "<option value='Select'>[Select]</option>";
    }



    $.ajax({
        url: url,
        type: 'GET',
        data: data,
        dataType: 'json',
        success: function (result) {

            if (result[0].message == "Success") {


                result[0].data.map(function (obj) {
                    so += ("<option  value=" + obj[id] + ">" + obj[text] + "</option>");
                });
                //Removes multi-select completely
                $(select).next().remove();
                $(select).unbind().removeData();
                if (Object.getOwnPropertyNames(selectoptions).length) {
                    //$(select).next().remove();
                    $(select).html(so);
                    if ($(select).prop('multiple')) {
                        $(select).multipleSelect(selectoptions);
                    } else {
                        $(select).on('change', selectoptions.onClose);
                    }

                }
                else {
                    //$(select).next().remove();
                    $(select).html(so);
                    if ($(select).prop('multiple'))
                        $(select).multipleSelect();
                }
                //  $("#" + select.id + " option").eq(1).prop('selected', true);
                if (callback) callback();
                //  $(select).multipleSelect('checkAll');
            }
            //$(select).next().attr('style', 'border:1px;');
            $(select).next().children(':first').attr('tabindex', $(select).attr('tabindex'));
            $(select).next().children(':first').focus(function () {

                $(select).next().attr('style', 'border-style:solid;border-color:skyblue;');
            });
            $(select).next().children(':first').blur(function () {

                $(select).next().removeAttr('style');
            });

        },
        error: function (xhr) {
            //Removes multi-select completely
            $(select).next().remove();
            $(select).unbind().removeData();
            $(select).empty();
            if ($(select).prop('multiple'))
                $(select).multipleSelect();
            console.log("Ajax failed");
            if (xhr.status == 401) {
                window.location.href = "/Default1/Login";
            }
        }
    });

}


function clear_form_elements(Id) {
    $("#" + Id).find(':input').each(function () {
        switch (this.type) {
            case 'password':
            case 'text':
            case 'textarea':
            case 'file':
            case 'select-one':
            case 'select-multiple':
            case 'multiple':
            case 'date':
            case 'number':
            case 'tel':
            case 'email':
                $(this).val('');
                break;
            case 'checkbox':
            case 'radio':
                this.checked = false;
                break;
        }
        $('#txtGenreValidation').html('');
        $('#txtMovieNameValidation').html('');
        $('#txtYearValidation').html('');

    });
}
function Validations() {


    var flag = true;
  

    

    if ($('#FirstName').val() === "") {
      
        $('#txtFNameValidation').html('Please Enter FirstName');
        flag = false;
    }

    if ($('#LastName').val() === "") {
        
        $('#txtLNameValidation').html('Please Enter LastName');
        flag = false;
    }
    if ($('#Email').val() === "") {
        
        $('#txtEmailValidation').html('Please Enter Email');
        flag = false;
    }
    if ($('#Phone').val() === "") {
        
        $('#txtPhoneValidation').html('Please Enter Phone');
        flag = false;
    }
    if ($('#Status').val() == "Select") {
        flag = false; $('#txtStatusValidation').html('Please Select Status');
    }


    return flag;







}