$(document).ready(function () {
    var counter = 3;

    $("#addrow").on("click", function () {
        var newRow = $("<tr>");
        var cols = "";

        cols += '<td class="col-sm-3"><input type="text" class="form-control inputName" placeholder="Anon ' + counter + '"/></td>';
        cols += '<td class="col-sm-3"><input type="text" class="form-control inputPrice" placeholder="0"/></td>';
        cols += '<td class="col-sm-3"><input type="text" class="form-control inputPay" placeholder="0"/></td>';
        cols += '<td class="col-sm-1"><input type="button" class="delete-button btn btn-md btn-danger"  value="Delete"></td>';

        newRow.append(cols);
        $("table.order-table").append(newRow);
        counter++;
    });

    $("table.order-table").on("click", ".delete-button", function (event) {
        $(this).closest("tr").remove();
    });


     $("#billForm").on("submit", function(){
        if (invalidInput()) {
            alert("Please fill in required fields.");
            return false;
        }
        var finalCharge = calculate();
        $("#chargeTable tbody tr").remove(); 

        for (var i = 0; i < finalCharge.length; i++) {
            var newRow = $("<tr>");
            var cols = "";

            var rowName = $(".inputName").get(i).value;
            if (rowName == "") {
                rowName = $(".inputName").get(i).placeholder;
            }

            cols += '<td class="col-sm-3">' + rowName + '</td>';
            cols += '<td class="col-sm-3">' + finalCharge[i] + '</td>';

            newRow.append(cols);
            $("table.charge-table").append(newRow);
        }
        $("table.charge-table").show();
        return false;
    })

    function invalidInput() {
        var inputs = $(":text");
        for (var i = 0; i < inputs.length; i++) {
            if (inputs.get(i).value != "" 
                && !$.isNumeric(inputs.get(i).value)) {
                return true;
            }
        }
        return $('#inputTotal').val() == '';
    }

    function calculate() {
        var numRows = $("#billTable>tbody>tr").length;
        var indPrice = Array(numRows).fill(0);
        var indPay = Array(numRows).fill(0);
        var indTax = Array(numRows).fill(0);
        var totalPrice = 0;
        var totalPay = 0;
        var totalTax = 0;
        var totalCharge = parseInt($('#inputTotal').val());

        if ($('#inputTax').val() != "") {
            totalTax = parseInt($('#inputTax').val());
        }

        for (var i = 0; i < numRows; i++) {
            if ($(".inputPrice").get(i).value != "") {
                indPrice[i] = parseInt($(".inputPrice").get(i).value);
                totalPrice += indPrice[i];
            }
            if ($(".inputPay").get(i).value != "") {
                indPay[i] = parseInt($(".inputPay").get(i).value);
                totalPay += indPay[i];
            } 
        } 

        for (var i = 0; i < numRows; i++) {
            var indPortion = indPrice[i]/totalPrice;
            indTax[i] = indPortion * totalTax;

            var indCharge = indPrice[i] + indTax[i];
            indPay[i] -= indCharge;
            if (indPay[i] > 0) {
                indPay[i] = 0;
            } else {
                indPay[i] = -indPay[i];
            }
        }
        return indPay;
    }

});