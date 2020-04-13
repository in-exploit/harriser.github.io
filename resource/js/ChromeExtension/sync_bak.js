/*
digo.src("*.md", "*.markdown").pipe("digo-marked", {
	tpl: "",			// 生成的 HTML 模板。[1]
	title: true,		// 是否追加标题。如果为字符串则表示标题内容。[1]
	renderer: null,		// 自定义渲染器。具体见：[渲染器](https://github.com/chjj/marked#renderer)。
	highlight: {, 		// 自定义语法高亮语法。 true 或对象则用法 [highlight.js](https://highlightjs.org/) 高亮。或者用法自定义函数，原型为：highlight (code, lang) [1]
		tabReplace: "    ",// 代替 TAB 字符的字符，用于占位缩进。
		useBR: true,	// 是否用法 <br> 换行。
		classPrefix: "",// 生成 CSS 类名前缀。
		languages: ["html", "js", "css"], // 自动分析语法时，指定所有可能出现的语法。
	},
	gfm: true,			// 启用兼容 [GitHub 风格](https://help.github.com/articles/github-flavored-markdown) 的语法。
	tables: true,   	// 是否支持[表格](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#tables)。仅当 gfm 为 true 时有效。
	breaks: false, 		// 是否追加 [换行](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet#line-breaks)。仅当 gfm 为 true 时有效。
	pedantic: false, 	// 完全按照 Markdown 标准风格执行。
	sanitize: false, 	// 删除内置 HTML。
	smartLists: true,	// 改进列表。
	smartypants: false, // 改进连接符。
});
*/


$(function(){
	// marked插件的基本配置
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
		highlight: function (code,lang) {
			//使用 highlight 插件解析文档中代码部分
			return hljs.highlightAuto(code,[lang]).value;
		}
	});

	$.ajax({
		type:"get",
		url : "../../resource/other/ChromeExtension.md",
		async : false,
		dataType:"text",
		success : function(response,status,request) {
			// document.body.innerHTML = marked(response);
			document.getElementById('content').innerHTML =
				marked(response);

			//渲染文档中代码部分
			hljs.initHighlighting();

			//给生成的文档中统一添加样式
			$("table").addClass("table");
		}
	});

});
