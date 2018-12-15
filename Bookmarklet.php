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

    private function getLoadScript() {
        return "
function loadScript(url, callback) {
    d = document;
    const s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = url;
    s.onreadystatechange = callback;
    s.onload = callback;
    d.head.appendChild(s);
}
";
    }

    private function getLoadNext($i, $files, $n, $url) {
        $next = 'next' . $i;
        $next2 = 'next' . ($i + 1);
        if ($i == $n - 2) {
            $next2 = 'null';
        }
        $nextfile = $files[$i + 1];
        return "
function $next() {
    loadScript('$url$nextfile', $next2);
}
";
    }

    public function getScriptsAsync($files, $url) {
        $script = $this->getLoadScript();
        $n = count($files);
        for ($i = 0; $i < $n - 1; $i++) {
            $script .= $this->getLoadNext($i, $files, $n, $url);
        }
        $f = $files[0];
        $script .= "
loadScript('$url$f', next0);
";
        // debug print
//        echo '<pre>' . $script . '</pre>';
        return $script;
    }

    public function getScript() {
        global $settings;
        $url = $settings['scripturl'];
        if (!empty($this->scriptUrl)) {
            $url = $this->scriptUrl;
        }
        $f = $this->scriptFile;
        if (is_array($f)) {
            return $this->getScriptsAsync($f, $url);
        }
        return
            "
        d=document;
        s=d.createElement('script');
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
        <div class="script-link">
            <a href="javascript:@inline_href">@inline_text</a>
            <div class="script-body" title="drag me to bookmark bar">@inline_href</div>        
        </div>
        <div class="script-file">
            <a href="?script=@file">@file</a>
        </div>        
    </div>
</div>
EOT;
        $script_href = '';
        $inline_href = '';
        $inline_text = '';
        if (!empty($this->scriptFile)) {
            $script = Minify::process($this->getScript());
            $script_href = '(function(){' . $script . '})()';
        } else if (!empty($this->script)) {
            $script = Minify::process($this->script);
            $script_href = '(function(){' . $script . '})()';
        }
        if (!empty($this->file)) {
            $inline_href = Minify::process($this->getContent());
            $inline_text = $this->link . '(i)';
        }
        $placeholders = ['@icon', '@title', '@subtitle', '@body',
            '@script_href', '@script_text', '@file',
            '@inline_href', '@inline_text'];
        $f = $this->file;
        if (is_array($f)) {
            $f = null;
        }
        $data = [
            $this->icon,
            $this->title,
            $this->subtitle,
            $this->body,
            $script_href,
            $this->link,
            $f,
            $inline_href,
            $inline_text,
        ];
        $html = str_replace($placeholders, $data, $template);
        return $html;
    }

}
