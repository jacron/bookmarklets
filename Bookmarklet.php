<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of Bookmarklet
 *
 * @author jan
 */
class Bookmarklet {

    private $title;
    private $subtitle;
    private $body;
    private $script;
    private $scriptFile;
    private $scriptUrl;
    private $file;
    private $link;
    private $icon;

    /**
     * Constructor, intializing all fields
     * @param array $data
     */
    function __construct($data) {
        // obligatory fields
        $this->title = $data['title'];
        $this->subtitle = $data['subtitle'];
        $this->body = $data['body'];

        // optional fields
        if (isset($data['scriptFile'])) {
            $this->scriptFile = $data['scriptFile'];
        }
        if (isset($data['scriptUrl'])) {
            $this->scriptUrl = $data['scriptUrl'];
        }
        if (isset($data['script'])) {
            $this->script = $data['script'];
        }
        if (isset($data['file'])) {
            $this->file = $data['file'];
        }
        if (isset($data['link'])) {
            $this->link = $data['link'];
        }
        if (isset($data['icon'])) {
            $this->icon = $data['icon'];
        }
    }

    private function removeComment($s) {
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
    private function minify($s) {
        //
        $s = $this->removeComment($s);

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

    public function getContent() {
        global $settings;
        if (is_array($this->file)) {
            $content = '';
            foreach ($this->file as $file) {
                $content .= file_get_contents($settings['scriptpath'] . $file);
            }
            $this->file = null;
        } else {
            $content = file_get_contents($settings['scriptpath'] . $this->file);
        }
        return $content;
    }


    public function getScript() {
        global $settings;
        $url = $settings['scripturl'];
        if (!empty($this->scriptUrl)) {
            $url = $this->scriptUrl;
        }
        $f = $this->scriptFile;
        return
            "
        d = document;
        s = d.createElement('script');
        s.src='$url$f';
        d.body.appendChild(s);
      ";
    }

    public function makeTile() {
        $template = <<<EOT
<div class="aux-content-widget">
    <div class="tile-header">
        <div class="icon @icon"></div>
        <h1>@title</h1>
        <h2>@subtitle</h2>
        <div class="description">@body</div>
    </div>
    <hr>
    <div class="link-container">
        <div class="script-link">
            <a href="javascript:@script_href">@script_text</a>
            <div class="script-body" title="drag me to bookmark bar">@script_href</div>        
        </div>
        <div class="script-file">
            <a href="?script=@file">@file</a>
        </div>        
    </div>
</div>
EOT;
        $script_href = '';
        if (!empty($this->scriptFile)) {
            $script = $this->minify($this->getScript());
            $script_href = '(function(){' . $script . '})()';
        } else if (!empty($this->script)) {
            $script = $this->minify($this->script);
            $script_href = '(function(){' . $script . '})()';
        } else if (!empty($this->file)) {
            $script_href = $this->minify($this->getContent());
        }
        $placeholders = ['@icon', '@title', '@subtitle', '@body',
            '@script_href', '@script_text', '@file'];
        $data = [
            $this->icon,
            $this->title,
            $this->subtitle,
            $this->body,
            $script_href,
            $this->link,
            $this->file
        ];
        $html = str_replace($placeholders, $data, $template);
        return $html;
    }

}
