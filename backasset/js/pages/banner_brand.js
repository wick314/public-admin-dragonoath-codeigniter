$(function () {
    $('.js-basic-example').DataTable();

    //Exportable table
    $('.js-exportable').DataTable({
        responsive: true,
        dom: 'Bfrtip',
        buttons: [
            'copy', 'excel', 'pdf', 'print'
        ]
    });
});
function form_submit($form,$class) {
    $post = $form.serialize();
    $submit = $form.find("button[type='submit']");
     var ajax = $.post('#', $post);
        ajax.done(function (data) {
            console.log(data);
            if (data.code == '200') {
                showNotification("alert-warning", data.message, "bottom", "center", null, null);
                return;
            }
            if (data.code == '100') {
                showNotification("alert-success", data.message, "bottom", "center", null, null);
                $submit.html('<i class="material-icons">keyboard_backspace</i>  Quay Lại');
                $submit.attr('type', 'button');
                $submit.removeClass('btn-primary');
                $submit.addClass('btn-success');
                $submit.addClass($class);
            }
        });
}
$(document).ready(function () {
    $(document).on('submit', "#add_bbanner", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_bbanner_success");
       
    });
    $(document).on('submit', "#edit_banner", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_bbanner_success");
       
    });
    $(document).on('submit', "#add_lbanner", function (e) {
        e.preventDefault();
        $form = $(this);
        form_submit($form,"add_lbanner_success");
       
    });
    $(document).on('click', '.add_bbanner_success', function () {
        window.location = BASE_URL + "Backend/Bannerbrand"
    });
    $(document).on('click', '.add_lbanner_success', function () {
        window.location = BASE_URL + "Backend/linkbanner"
    });
});

function showNotification(colorName, text, placementFrom, placementAlign, animateEnter, animateExit) {
    if (colorName === null || colorName === '') { colorName = 'bg-black'; }
    if (text === null || text === '') { text = 'Turning standard Bootstrap alerts'; }
    if (animateEnter === null || animateEnter === '') { animateEnter = 'animated fadeInDown'; }
    if (animateExit === null || animateExit === '') { animateExit = 'animated fadeOutUp'; }
    var allowDismiss = true;

    $.notify({
        message: text
    },
        {
            type: colorName,
            allow_dismiss: allowDismiss,
            newest_on_top: true,
            timer: 1000,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            animate: {
                enter: animateEnter,
                exit: animateExit
            },
            template: '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' + (allowDismiss ? "p-r-35" : "") + '" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
            '</div>'
        });
}