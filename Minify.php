<?php
/**
 * Created by PhpStorm.
 * User: orion
 * Date: 14/12/2018
 * Time: 21:56
 */

class Minify
{
    private static function removeComment($s) {
        // remove line-comment
        $lines = explode("\n", $s);
        //error_log('removing comment');
        for ($i = 0; $i < count($lines); $i++) {
            $squoting = false;
            $dquoting = false;
            $lastchar = '';
            for ($j = 0; $j < strlen($lines[$i]); $j++) {
                $char = $lines[$i][$j];
                if ($char == '\'') {
                    $squoting = !$squoting;
                }
                if ($char == '"') {
                    $dquoting = !$dquoting;
                }
                if (!$squoting && !$dquoting) {
                    if ($char == '/' && $lastchar == '/') {
                        $lines[$i] = substr($lines[$i], 0, $j - 1);
                        break;
                    }
                }
                $lastchar = $char;
            }
        }
        $s = implode("\n", $lines);

        // remove multi-line comment
        $s = preg_replace("/\/\*([\s\S]*?)\*\//", '', $s);

        return $s;
    }

    /**
     * Remove all white space, except for after var statement.
     * Also remove comments.
     * @param string $s e.g. javascript
     * @return string
     */
    public static function process($s) {
        //
        $s = self::removeComment($s);

        // escape
        $search = array(
            'var ',
            'return ',
            '&',
            '"',
            'function ',
        );
        $replace = array(
            'var%20',
            'return%20',
            '&amp;',
            '&quot;',
            'function%20',
        );
        $s = str_replace($search, $replace, $s);

        // replace white space to single spaces
        $s = preg_replace('/\s+/', ' ', $s);

        return $s;
    }


}