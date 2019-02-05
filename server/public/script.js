function onfilter(val) {
    // console.log(val);
    $('table tr').each(function()  {
        const tr = $(this);
        const id = this.id;
        if (id && id.indexOf(val) === -1) {
            tr.hide();
        } else {
            tr.show();
        }
    });
}

function clearfilter() {
    $('#q').val('');
    onfilter('');
}