<?php
function sluggable($str) {

    $before = array(
        'àáâãäåòóôõöøèéêëðçìíîïùúûüñšž',
        '/[^a-z0-9\s]/',
        array('/\s/', '/--+/', '/---+/')
    );
 
    $after = array(
        'aaaaaaooooooeeeeeciiiiuuuunsz',
        '',
        '-'
    );
    $str = strtolower($str);
    $str = strtr($str, $before[0], $after[0]);
    $str = preg_replace($before[1], $after[1], $str);
    $str = trim($str);
    $str = preg_replace($before[2], $after[2], $str);
    return $str;
}