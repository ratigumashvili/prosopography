// Get current year
document.getElementById("currentYear").innerHTML = new Date().getFullYear();
document.querySelector(".current-year-eng").innerHTML = new Date().getFullYear();

// Generate current URL in #current-url
document.getElementById("current-url").innerHTML = window.location.href;

//Generate current date in current-date
var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = mm + '/' + dd + '/' + yyyy;
document.getElementById("current-date").innerHTML = (today);

// Send link by email
function emailCurrentPage() {
    window.location.href = "mailto:?subject=" + document.title + "&body=" + encodeURI(document.location);
}
// Display success while copying URL
function revealMessage() {
    $("#copy-notification").addClass("d-block");
};

// Function to execute copyToClipboard from ('#current-url') on button click
function copyToClipboard(element) {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($(element).text()).select();
    document.execCommand("copy");
    $temp.remove();

    revealMessage();
}

// Print
function PrintPDF(){
    window.print();
}

// TOC for about page
var c = function() {
    return({
        log: function(msg) {
        consoleDiv = document.getElementById('console');
        para = document.createElement('p');
        text = document.createTextNode(msg);
        para.appendChild(text);
        consoleDiv.appendChild(para);
        }
    });
}();

window.onload = function () {
    var toc = "";
    var level = 0;
    var maxLevel = 3;

    document.getElementById("contents").innerHTML =
        document.getElementById("contents").innerHTML.replace(
            /<h([\d])>([^<]+)<\/h([\d])>/gi,
            function (str, openLevel, titleText, closeLevel) {
                if (openLevel != closeLevel) {
                c.log(openLevel)
                    return str + ' - ' + openLevel;
                }

                if (openLevel > level) {
                    toc += (new Array(openLevel - level + 1)).join("<ul>");
                } else if (openLevel < level) {
                    toc += (new Array(level - openLevel + 1)).join("</ul>");
                }

                level = parseInt(openLevel);

                var anchor = titleText.replace(/ /g, "_");
                toc += "<li><a href=\"#" + anchor + "\">" + titleText
                    + "</a></li>";

                return "<h" + openLevel + "><a name=\"" + anchor + "\">"
                    + titleText + "</a></h" + closeLevel + ">";
            }
        );

    if (level) {
        toc += (new Array(level + 1)).join("</ol>");
    }

    document.getElementById("toc").innerHTML += toc;
};

jQuery(document).ready(function($){
    // Datatable
    $('.factoid-table-new').DataTable({

        lengthMenu: [
            [5, 10, 25, 50, 100, -1],
            [5, 10, 25, 50, 100, "ყველა"]
        ],

        order: [
            [0, 'asc']
        ],
        
        columnDefs: [{
            targets: [1, 2, 3, 4, 5],
            orderable: false
        }],

        language: {
        processing:     "მუშავდება...",
        search:         "ძიება ცხრილში:",
        lengthMenu:    "აჩვენე _MENU_ ჩანაწერი",
        info:           "ნაჩვენებია ჩანაწერები _START_–დან _END_–მდე, სულ _TOTAL_ ჩანაწერი",
        infoEmpty:      "ნაჩვენებია ჩანაწერები 0–დან 0–მდე, სულ 0 ჩანაწერი",
        infoFiltered:   "(გაფილტრული შედეგი _MAX_ ჩანაწერიდან)",
        infoPostFix:    "",
        loadingRecords: "იტვირთება...",
        zeroRecords:    "არაფერი მოიძებნა",
        emptyTable:     "მონაცემები არ არის ხელმისაწვდომი",
        paginate: {
            first:      "პირველი",
            previous:   "წინა",
            next:       "შემდეგი",
            last:       "ბოლო"
        },
        Aria: {
            SortAscending: ": სვეტის დალაგება ზრდის მიხედვით",
            SortDescending: ": სვეტის დალაგება კლების მიხედვით"
        },
    },

        initComplete: function () {
        this.api().columns(1).every( function () {
            var column = this;
            var select = $('<select class="custom-select"><option value="">ყველა ტიპი</option></select>')
                .appendTo( $(column.header()).empty() )
                .on( 'change', function () {
                    var val = $.fn.dataTable.util.escapeRegex(
                        $(this).val()
                    );
                    column
                        .search( val ? '^'+val+'$' : '', true, false )
                        .draw();
                } );
            column.data().unique().sort().each( function ( d, j ) {
                select.append( '<option value="'+d+'">'+d+'</option>' )
            } );
        } );
    },

    });

    // Table fullscreen  
    $("#fsBtn").click(function(){
        $("#tableHolder").toggleClass("table-fullscreen");
    });

    // Highlight search results in table

    var table = $('#example').DataTable();
    
    table.on( 'draw', function () {
        var body = $( table.table().body() );

        body.unhighlight();
        body.highlight( table.search() );  
    });

    // Change sources accordion text

    $('.sources-occurencies-title').click(function(){
        $(this).text(function(i,old){
            return old=='აკეცვა' ?  'ჩვენება' : 'აკეცვა';
        });
    });

    // Popover
    $(function () {
        $('[data-toggle="popover"]').popover({html:true})
    });

    // Font 1. Increase, 2. Decrease, 3. Reset
    var size = $('.article-text').css('font-size');
    $("#resetFont").click(function(){
        $('.article-text').css('font-size', size);
        return false;
    });
    $("#increaseFont").click(function() {
        var size = $('.article-text').css('font-size');
        $('.article-text').css('font-size', parseInt(size)+2);
        return false;
    });
    $("#decreaseFont").click(function() {
        var size = $('.article-text').css('font-size');
        $('.article-text').css('font-size', parseInt(size)-2);
        return false;
    });

    // Map in modal
    $('#locationMap').on('show.bs.modal', function (e) {
        setTimeout(function () {
        map.invalidateSize();
        }, 200);
    });

    // List & Grid view

    $('#list').click(function(event){
        event.preventDefault();
        $('#recordlist').removeClass('card-columns');
        $('#recordlist').addClass('row');
        $('#recordlist .item').addClass('col-lg-12 mb-3');
    });
    $('#grid').click(function(event){
        event.preventDefault();
        $('#recordlist').removeClass('row');
        $('#recordlist').addClass('card-columns');
        $('#recordlist .item').removeClass('col-lg-12 mb-3');
    });

    // Show/hide map
    $("#showmap").click(function(){
        $("#showmap").toggleClass("inactive");
        $(".map").toggleClass("d-none");
        setTimeout(function () {
        map.invalidateSize();
        }, 200);
    });

    // Glossary

    $(function(){
        $('body').glossarizer({
        sourceURL: 'records/glossary.json',
        callback: function(){
            new tooltip();
        }
        });
    });

    // Datepicker

    $("#datepicker-from").datepicker({
        startDate: '1800',
        endDate: '1956',
        startView: '1800',
        format: "yyyy",
        viewMode: "years", 
        minViewMode: "years"
    });

    $("#datepicker-to").datepicker({
        startDate: '1800',
        endDate: '1956',
        format: "yyyy",
        viewMode: "years", 
        minViewMode: "years"
    });

    // Close alert

    $(".close").click(function(){
        $(this).parent().removeClass("d-block");
    });

});