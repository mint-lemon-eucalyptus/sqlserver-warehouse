$(function () {
    $.fn.modalmanager.defaults.resize = true;

    $('[data-source]').each(function () {
        var $this = $(this),
            $source = $($this.data('source'));

        var text = [];
        $source.each(function () {
            var $s = $(this);
            if ($s.attr('type') == 'text/javascript') {
                text.push($s.html().replace(/(\n)*/, ''));
            } else {
                text.push($s.clone().wrap('<div>').parent().html());
            }
        });

        $this.text(text.join('\n\n').replace(/\t/g, '    '));
    });

})
;
