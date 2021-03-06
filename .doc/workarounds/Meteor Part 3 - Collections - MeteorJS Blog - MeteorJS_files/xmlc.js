//V20130715-01-KC

var xmlc = {}, Ajax = {};
xmlc.data={};
/***********************************************************************************************
 2 Ajax methods begins
 Note: we should rewrite whoever all the following 2 methods so that these 2 methods can be got rid of
 ***********************************************************************************************/
Ajax.Request = function(url, options) { 
		if (options==null) options = {};
		var errFunc = options.callbkErr || function() {};
		var format = options.dataRetFormat || 'html';
		var async = options.asynchronous || false;		
		var callbkSuc = options.onSuccess || function() {};
		var response = {responseText:""};
		var myCallbkSuc = function(html) {
			response.responseText = html;			
			callbkSuc(response);
		}
		dojo.xhrGet({
				sync: !async,
				handleAs: format,
				url: url, 
				load: myCallbkSuc,
				error: errFunc
			   });		
};

Ajax.Updater = function(updateObject , url, options) { 
		if (options==null) options = {};
		var errFunc = options.callbkErr || function() {};
		var format = options.dataRetFormat || 'html';
		var async = options.asynchronous || false;
		var method = options.method || 'GET';
		var params = options.parameters || {};		
		var myCallbkSuc = function(html) {
			dojo.html.set(dojo.byId(updateObject),html);
		};
		var args = {
					sync: !async,
					handleAs: format,
					url: url, 
					content: params,
					load: myCallbkSuc,
					error: errFunc
				   };
		if (method == 'GET') {
			dojo.xhrGet(args);	
		} else if (method == 'POST') {
			dojo.xhrPost(args);
		}
};
/******** end of Ajax methods ***********************************************************************/

getCookieVal = function(offset) {
  var endstr = document.cookie.indexOf (";", offset);
  if (endstr == -1) { endstr = document.cookie.length; }
  var cookieVal = unescape(document.cookie.substring(offset, endstr));

  // special case for English help matching the cookie value with prod
  if (cookieVal == "en_US" || cookieVal == "en_us" || cookieVal == "en-us")
  {
     cookieVal = "en";
  }
  return cookieVal;
}

GetCookie = function(name) {
  var arg = name + "=";
  var alen = arg.length;
  var clen = document.cookie.length;
  var i = 0;

  var defaultLangVal = "en";
  while (i < clen) {
    var j = i + alen;
    if (document.cookie.substring(i, j) == arg) {
      return getCookieVal (j);
      }
    i = document.cookie.indexOf(" ", i) + 1;
    if (i == 0) break; 
    }
  //ensures null isn't returned, "en" is
  return defaultLangVal;
}

switchLang = function(lang) {
	if (typeof(lang) == 'undefined') return; // sanity check
	if ((lang=="pt_br") &&
		(navigator.userAgent.toLowerCase().indexOf('msie') != -1) &&
		(window.location.href.indexOf("/community/wikis") != -1)) {
			lang="pt-br"; 
	}	
	var url = window.location.href, url2;
	
	if (url.search('lang='+lang) != -1) return;  // lang is the same as the lang in url
	url2 = url.replace(/lang=(.{2,5})?([&#].*)/, 'lang='+lang+'$2');  // url format has lang=...& or #
	url2 = (url2 == url) ? url.replace(/lang=(.*)/, 'lang='+lang) : url2;  // url format has lang=... as the last param
		
	
	// no lang= in the url
	if (url2 == url) { 
		var qIdx = url.indexOf('?');
		if (qIdx != -1) { // has ?
			url = url.substring(0,qIdx) + '?lang='+lang + '&' + url.substring(qIdx+1);
		} else {  // no ?
			var pIdx = url.indexOf('#');
			if (pIdx != -1) {  // no ? but has #
				url = url.substring(0,pIdx) + '?lang='+lang + url.substring(pIdx);
			} else { // no ? and no #
				url += '?lang='+lang;
			}
		}
		url2 = url;
	}

	window.location.href = url2;
}

// IE doesn't serialize correctly. So. length should be 0 in IE
xmlc.htmlSerialize = function() {
	var div = document.createElement( "div" );
	div.innerHTML = "<link/>";
	return !!div.getElementsByTagName("link").length;
}

// taking in serialized html script tags and execute the scripts inside <script>
xmlc.runScriptTags = function(html) {
	var div = document.createElement("div");
	var wrapper = [ 0, "", "" ];
	if ( !xmlc.htmlSerialize() ) {
		wrapper = [ 1, "div<div>", "</div>" ]; // IE trick
	}
	var wrap = wrapper;
	div.innerHTML = wrap[1] + html + wrap[2];
	while ( wrap[0]-- ) {
		div = div.lastChild;
	}
	dojo.forEach(div.childNodes, function(item) {
		if (item.tagName == 'SCRIPT') {			
			try{
				dojo.eval(item.innerHTML); // executes scripts inside the <script> tags
			}catch(e){}
		}
	});
}

xmlc.fetchData = function(url, callbkSuc, callbkErr, dataRetFormat, asyncValue) {
	
	//console.debug('fetchData: '+url);
		
		// Check Local Storage
		var value = "";
		try{
			value = localStorage.getItem(url);
		}catch(e){}
		
		//alert(value);
		if(value!=null && value!=""){

			callbkSuc(value);
			//console.debug('fetchData Local: '+url);
			return;
		}
		
		xmlc.fetchDataHelper(url, callbkSuc, callbkErr, dataRetFormat, asyncValue);
		
};
	
xmlc.fetchDataHelper = function(url, callbkSuc, callbkErr, dataRetFormat, asyncValue) {
		
		var errFunc = callbkErr || function() {};
		var format = dataRetFormat || 'text';
		var async = asyncValue || false;
		dojo.xhrGet({
				sync: !async,
				handleAs: format,
				url: url, 
				load: function(value){
										
					callbkSuc(value);
					try{
						value = localStorage.setItem(url,value);
					}catch(e){}
					//console.debug('fetchData Remote: '+url);
				},
				error: errFunc
			   });
};	

//if (window.location.href.search(/\/(mydeveloperworks|community)\/(files|wikis)/i) == -1) { 

	var langCookieName = "conxnsCookie";
	var hostName = window.location.host;

	// use the internal cookie name if we're not on production (prevents language collisions)
	if (hostName && hostName.indexOf("www.ibm.com") < 0)
	langCookieName = "internal_" + langCookieName;

	var lang = GetCookie(langCookieName);
	if (lang.indexOf("ja") >= 0 || lang.indexOf("jp") >= 0 )
		langArg = "ja";
	else if (lang.indexOf("ko") >= 0)
		langArg = "ko";
	else if (lang.indexOf("ru") >= 0)
		langArg = "ru";
	else if (lang.indexOf("zh") >= 0)
		langArg = "zh";
	else if (lang.indexOf("es") >= 0)
		langArg = "es";
	else if (lang.indexOf("pt") >= 0)
		langArg = "pt_br";
	else
		langArg = "en";


	var lasXmVersion = window.localStorage.getItem("xmversion");
	var lastModTime = parseInt(new Date().getTime() / (1000 * 60 * 15));
	if (lasXmVersion!=lastModTime) {
		window.localStorage.clear();
		window.localStorage.setItem("xmversion",lastModTime);
	}	
	//alert(langArg);
	xmlc.fetchData('/developerworks/lc/html/dwCustomHeader_'+langArg+'.html?lastMod='+lastModTime,
			  function(html){ dojo.html.set(dojo.byId('ibm-masthead'),html);},
			  function(xhr,status) {
				if (status == 'error') {
					xmlc.fetchData('/developerworks/lc/html/dwCustomHeader_en.html',
							 function(html){
								dojo.html.set(dojo.byId('ibm-masthead'),html);
							 });
				}
			  }); 

	xmlc.fetchData('/developerworks/lc/html/dwCustomFooter_'+langArg+'.html?lastMod='+lastModTime,
			  function(html){ dojo.html.set(dojo.byId('footer_div'),html); },
			  function(xhr,status) {
				if (status == 'error') {
					xmlc.fetchData('/developerworks/lc/html/dwCustomFooter_en.html',
							 function(html){
								 dojo.html.set(dojo.byId('footer_div'),html);
							 });
				}
			  });

	var customFooterScriptsUrl = "/developerworks/lc/html/dwCustomFooterScripts_"+langArg+".html?lastMod="+lastModTime;
	if (dojo.isIE && window.location.href.search(/\/(mydeveloperworks|community)\/blogs/i) != -1) { 
		customFooterScriptsUrl+="&nocache="+new Date().getTime();
	}	
	xmlc.fetchData(customFooterScriptsUrl, 
			  function(html){  
				xmlc.runScriptTags(html);  
				if (typeof(dwsi) != 'undefined') {    
                    // I have to make sure that dwsi.dsiEvtTgt is there. 
                    // dwCustomFooterScripts should have been included so that dwsi.siInit() is executed in its dojo.ready before executing the following function
                    dojo.ready(function() { 
                        if (!!dwsi.dwsiEvtTgt) {
                            dwsi.dwsiEvtTgt.addListener("dwsi_logged_in", 
                                function(event, evtArgs) {  
                                    if (typeof(evtArgs.json) != 'undefined') {
                                        loginStatus = evtArgs.json.status; 
                                        
                                        // grey out post comment section is not logged in
                                        if (loginStatus == 'true') {  
                                            window.location.reload();
                                        } 
                                    }
                                });
                        }
					});	
					//dwsi.dwsiEvtTgt.addListener("dwsi_logged_out", function() { window.location.reload(); });
				}
			  },
			  function(xhr,status) {
				if (status == 'error') { 
					xmlc.fetchData('/developerworks/lc/html/dwCustomFooterScripts_en.html',
							 function(html){
								xmlc.runScriptTags(html);
							 });
				}
			  },'text',true);
//}

if (window.location.href.search(/\/(mydeveloperworks|community)\/(files|wikis)/i) != -1) { 
	dojo.connect(dojo.byId('ibm-masthead'), 'onclick', function(e) { e.stopPropagation();return false; });
}

xmlc.retFalse = function() { return false; };

xmlc.loadFooter = function() {
    if (dojo.byId('ibm-page-tools-dw-enclosure') && dojo.byId('lotusFooter')) { 
		window.clearInterval(xmlc.footerLoaded);
		dojo.place('ibm-page-tools-dw-enclosure', 'lotusFooter','first');
		dojo.removeAttr('ibm-page-tools-dw-enclosure','style');
	}
};
xmlc.footerLoadedCall = function() { xmlc.footerLoaded = window.setInterval('xmlc.loadFooter()', 2000); }
xmlc.footerLoadedCall();


xmlc.loadLangCSS = function(){
	var target = "";
	var langCookieName = "conxnsCookie";
	var hostName = window.location.host;

	// use the internal cookie name if we're not on production (prevents language collisions)
	if (hostName && hostName.indexOf("www.ibm.com") < 0)
	langCookieName = "internal_" + langCookieName;
	
    var cookieVal = GetCookie(langCookieName).toLowerCase();
    if (cookieVal != "en") {
        if (cookieVal == "ja" || cookieVal == "jp") {
            target = "/developerworks/lc/html/dw-ja.css";
        } else if (cookieVal == "es") {
            target = "/developerworks/lc/html/dw-es.css";
        } else if (cookieVal == "pt_br" || cookieVal == "pt-br" ||cookieVal == "pt_BR") {
            target = "/developerworks/lc/html/dw-pt_br.css";
        } else if (cookieVal == "ko") {
            target = "/developerworks/lc/html/dw-ko.css";
        } else if (cookieVal == "zh") {
            target = "/developerworks/lc/html/dw-zh.css";
        } else if (cookieVal == "ru") {
            target = "/developerworks/lc/html/dw-ru.css";
        }
        var fileref=document.createElement("link");
        fileref.setAttribute("rel", "stylesheet");
        fileref.setAttribute("type", "text/css");
        fileref.setAttribute("href", target);
        document.getElementsByTagName("head")[0].appendChild(fileref);
    }
};


// --------------------------- URL Utils -----------------------------

xmlc.getCurrentPagePath=function(){
	return xmlc.getPagePath(window.location.pathname);	
};

xmlc.getPagePath=function(path){
	var pathArray = path.split( '/developerworks' );
	var last_path = pathArray[pathArray.length-1];	
	return last_path;
};


// --------------------------------- UI Modification -------------------------//
xmlc.pageInit={};
xmlc.pageInit['/community/blogs/roller-ui/authoring/uploadFiles.do']=function(){
	// ----------------- BLOG - UPLOAD/DOWNLOAD DISCLAIMER ----------------
	
	
	// ------------ UPLOAD DISCLAIMER
	var button = document.getElementById('uploadBtn');	
	if(button){
		var parent =  button.parentNode;		
		if(parent){
			parent.insertBefore(xmlc.UIModification_uploadDisclaimerNode(), button);
			 var newNode = dojo.create("div", {
					"innerHTML" : "<br>"                            
			});
			parent.insertBefore(newNode, button);
		}
		
		// Change button text
		button.value=xmlc.data.localization.xmlc_rs_upload;
	}
	
	// --------------- DOWNLOAD DISCLAIMER
	
	var form = document.getElementById('filesListForm');	
	if(form){
		// Search for Checkbox
		var a_list = form.getElementsByTagName("a");
			
		for(var i=0; i<a_list.length; i++){
			var a_node = a_list[i];
			
			if(a_node.href.indexOf('?')==-1){
				// Folder link contains ?, so anything other than ?
				
				var link = a_node.href;
				//a_node.href = "javascript:xmlc.UIModification_downloadConfirm(window,\"open\",\""+link+"\",null);";	  
				xmlc.UIModification_downloadDisclaimer_NodeReplace(a_node);
			}
		}
	}
	
};
xmlc.pageInit['/community/blogs/']=function(){
	// ----------------- BLOG - DOWNLOAD DISCLAIMER ----------------
	
	var form = document.getElementById('entries');	
	if(form){
		// Search for Checkbox
		var a_list = form.getElementsByTagName("a");
			
		for(var i=0; i<a_list.length; i++){
			var a_node = a_list[i];
			
			if (a_node.hasAttribute("_ic_source") && a_node.getAttribute("_ic_source")=="files"){
				a_node.removeAttribute("target");
				xmlc.UIModification_downloadDisclaimer_NodeReplace(a_node);			
			}
		}
	}
	
};

xmlc.pageInit['/community/blogs/']=function(){
	try {
		var divContent = dojo.query("div .min-Content");	
		if( divContent.length==1){
			// ----------------- modify class name for minimal theme content ----------------
			if (dojo.query("div #lotusColLeft").length==0) {
				//alert(1);
				divContent[0].className = "lotusContent min-AltContent";
			}
			// ----------------- add mobile CSS for minimal themes ----------------
			var dwICMinBlogCssPath = "//"+window.location.host+"/developerworks/lc/html/dw-ic-minBlog.css";
			var dwICGlobalCss = dojo.query("link[href*='dw-ic-global.css']");
			var dwICMinBlogCss = dojo.query("link[href*='dw-ic-minBlog.css']");
			if (dwICGlobalCss.length >0 && dwICMinBlogCss.length==0) {
				// add dw-ic-minBlog.css
				dwICGlobalCss = dwICGlobalCss[0];
				dwICMinBlogCss = document.createElement("link");
				dwICMinBlogCss.href = dwICMinBlogCssPath;
				dwICMinBlogCss.rel = "stylesheet";
				dwICMinBlogCss.type = "text/css";
				dwICGlobalCss.parentNode.insertBefore( dwICMinBlogCss, dwICGlobalCss.nextSibling );
			}
			
			// ---------------- add meta for mobile --------------------------
			//<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0"/>
			var metaViewport = dojo.query("meta[name='viewport']");
			if (metaViewport.length == 0) {
				// add meta
				metaViewport = document.createElement("meta");
				metaViewport.name = "viewport";
				metaViewport.content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
				dojo.query("head")[0].appendChild(metaViewport);
			}
		}
	} catch (ex) {
		if (console) console.log(ex);
	}	
};

xmlc.pageInit['/community/forums/html/topic']=function(){
//--------------- FORUM - UPLOAD/DOWNLOAD DISCLIAMER ------------
	
	
	
	// --------------- DOWNLOAD DISCLAIMER
	
	var list_download = dojo.query(".dfAttachments");
	if(list_download && list_download.length>0){
		
		for(var i=0; i<list_download.length; i++){
			
			var a_list = list_download[i].getElementsByTagName("a");
			if(a_list && a_list.length>0){
				for(var j=0; j<a_list.length; j++){
					var a_node = a_list[j];
					
					var link = a_node.href;
					if(link && link!=""){
						a_node.target="";
						xmlc.UIModification_downloadDisclaimer_NodeReplace(a_node);
						//xmlc.UIModification_downloadConfirm(a_node,link);
						
						//a_node.href = "javascript:xmlc.UIModification_downloadConfirm(window,\"open\",\""+link+"\",null);";
						
					}	
				}
			}
					
		}
	}
	
};



		  	    
xmlc.pageInit['/community/search/web/search']=function(){
	//---------------  BUG FIX: Bring page scroll to top after each search navigation  ------------
	if(searchObject){
		dojo.connect(searchObject, 'onPostChange',xmlc.UIModification_resetScroll);
	}
};



xmlc.pageInit['/community/profiles/html/advancedSearchView.do']=function(){
	//--------------- Remove PlaceHolder text from Search Box [Defect#13984] ------------
	var obj = dijit.byId('profilesNameSearchField');
	
	if(obj){		
		obj.hintText='';
		dojo.byId('profilesNameSearchField').value='';		
	}
};




xmlc.IC4_URLRewrite=function(){
	var current_location = location.href;
	var new_location = current_location;
	
	if(new_location.indexOf('/mydeveloperworks')>0){
		new_location = new_location.replace('mydeveloperworks','community');
	}
	
	if (new_location.indexOf("https://") == -1) {
		new_location= new_location.replace("http://", "https://");
	}
	
	if(current_location!=new_location){
		location.href=new_location;
	}
};

xmlc.pageInit['/community/profiles/html/searchProfiles.do']=function(){
	//--------------- Remove PlaceHolder text from Search Box [Defect#13984] ------------
	var obj = dijit.byId('profilesNameSearchField');	
	if(obj){		
		obj.hintText='';
		dojo.byId('profilesNameSearchField').value='';		
	}
};


xmlc.pageInit['/community/files/app']=function(){
	xmlc.IC4_URLRewrite();
};

xmlc.pageInit['/community/wikis/home']=function(){
	xmlc.IC4_URLRewrite();
};


xmlc.pageInit['/mydeveloperworks/files/app']=function(){
	xmlc.IC4_URLRewrite();
};

xmlc.pageInit['/mydeveloperworks/wikis/home']=function(){
	xmlc.IC4_URLRewrite();
};

xmlc.doPageInit=function(){
	
	if(xmlc.data.Done_doPageInit){
		return;
	}
	xmlc.data.Done_doPageInit=true;
	// Load Language
	
	//alert(djConfig.locale);
	dojo.registerModulePath("dwLC", "/developerworks/js/dw-lc"); 
	require({
   	 packages: [
       	 {"name": "dwLC", "location": "/developerworks/js/dw-lc"}
  	  ]
	});
	//dojoConfig.packages.push({"name": "dwLC", "location": "/developerworks/js/dw-lc"});
	dojo.requireLocalization("dwLC", "strings",djConfig.locale);
	xmlc.data.localization = dojo.i18n.getLocalization("dwLC", "strings",djConfig.locale);
	
	//alert(localizedStrings.greeting);

	// ---------------- Initialize Page ------------------//
	var pagePath = xmlc.getCurrentPagePath();
	var func = xmlc.pageInit[pagePath];
	if(func){
		func();
	} else if (pagePath.indexOf("/community/blogs/")!=-1){
		xmlc.pageInit['/community/blogs/']();
	}

	
};


xmlc.UIModification_resetScroll=function(){
	setTimeout('document.body.scrollTop=0');
	setTimeout('document.body.scrollTop=0',100);
	setTimeout('document.body.scrollTop=0',300);
	
};

xmlc.UIModification_downloadDisclaimer_NodeReplace=function(a_node, url, type){	
	if(!a_node) return;
	if(!url) url = a_node.href;
	
	if(!type || type=='') type='FILE';
	a_node.href='javascript:void(0)';
	var index=xmlc.UIModification_downloadDisclaimer_NodeHold(a_node,url,type);
	
	dojo.connect(a_node,'click',function(){
		//xmlc.UIModification_downloadConfirm(window,"open",url,null,type);
		xmlc.UIModification_downloadDisclaimer_NodeHoldProcess(index);
	}
	);
};
xmlc.node_list =[];
xmlc.UIModification_downloadDisclaimer_NodeHold=function(a_node,url,type){
	var index = xmlc.node_list.length;
	var obj = new Object();
	obj.node = a_node;
	obj.url = url;
	obj.type =type;
	xmlc.node_list[index]=obj;
	return index;
}

xmlc.UIModification_downloadDisclaimer_NodeHoldProcess=function(index){
	var obj = xmlc.node_list[index];
	if(!obj) return;
	xmlc.UIModification_downloadConfirm(window,"open",obj.url,null,obj.type);
}

xmlc.UIModification_downloadDisclaimer_NodeProcess=function(a_node){
	
	var url = a_node.getAttribute('url');
	var type = a_node.getAttribute('type');
	xmlc.UIModification_downloadConfirm(window,"open",url,null,type);
};

xmlc.UIModification_downloadDisclaimer_NodeReplaceOnClick=function(a_node, url){
	if(!a_node) return;
	if(!url) url = a_node.href;
	a_node.href='javascript:;';
	a_node.onclick=function(){
		xmlc.UIModification_downloadConfirm(window,"open",url,null);
		return false;
	};
};


xmlc.UIModification_uploadDisclaimer = function(){
	
	 dojo.subscribe("lconn/files/action/uploadfile/render", function(obj, border, user, opt, dialog){
			
		 var div = dialog.dialogContent;
		 dojo.place( xmlc.UIModification_uploadDisclaimerNode(), div, "last");
	});

};

xmlc.UIModification_uploadDisclaimerAppend = function(tbody){

	var d = document;
	var tr = d.createElement("tr");
	tr.className = "lotusFormFieldRow";
	//var td = d.createElement("td");tr.appendChild(td);
	var td = d.createElement("td");
	td.className = "lotusFormLabel"	;				 
	td.colSpan=2;
	var newNode = xmlc.UIModification_uploadDisclaimerNode();							
	td.appendChild(newNode);
	tr.appendChild(td);
	tbody.appendChild(tr);
			

};



xmlc.UIModification_uploadDisclaimerNode = function(){
	 var newNode = dojo.create("div", {			//                           
		 'innerHTML' : xmlc.data.localization.xmlc_rs_disclimerUpload
		});
	 return newNode;
};

xmlc.UIModification_downloadDisclaimerNode = function(){
	 var newNode = dojo.create("div", {
			//'innerHTML' : '<p>By downloading this file, you agree to <a href="https://www.ibm.com/developerworks/community/terms/" target="_blank">developerWorks terms of use</a>.</p>'                            
		 'innerHTML' : xmlc.data.localization.xmlc_rs_disclaimerDownload
		});
	 return newNode;
};

xmlc.UIModification_downloadDisclaimerNodeFolder = function(){
	
	 var newNode = dojo.create("div", {		                           
		 'innerHTML' : xmlc.data.localization.xmlc_rs_disclaimerDownloadFolder
		});
	 return newNode;
};


xmlc.UIModification_downloadConfirm=function(obj,methodname,arg1,arg2, type){
	
	
	if(!type || type=='') type='FILE';
	

	var code_node = xmlc.UIModification_downloadDisclaimerNode();
	if(type=='FOLDER')code_node =  xmlc.UIModification_downloadDisclaimerNodeFolder();
	

	xmlc.UIModification_downloadConfirm_obj=obj;
	xmlc.UIModification_downloadConfirm_methodname=methodname;
	xmlc.UIModification_downloadConfirm_arg1=arg1;
	xmlc.UIModification_downloadConfirm_arg2=arg2;
	xmlc.ConfirmDialog(code_node,xmlc.UIModification_downloadConfirm_done);
};


xmlc.UIModification_downloadConfirm_done=function(){
	
	if(xmlc.UIModification_downloadConfirm_obj && xmlc.UIModification_downloadConfirm_methodname){
		var obj = xmlc.UIModification_downloadConfirm_obj;
		var methodname = xmlc.UIModification_downloadConfirm_methodname;
		
		obj[methodname](xmlc.UIModification_downloadConfirm_arg1,xmlc.UIModification_downloadConfirm_arg2);
	}
};


xmlc.UIModification_downloadBulk=function(selection){
	for(var i=0; i<selection.length; i++){
		var s = selection[i];
		setTimeout('xmlc.UIModification_downloadSingle("'+s.getUrlDownload()+'")',i*1000);
	}
};

xmlc.UIModification_downloadSingle=function(url){
	var iframe = document.createElement('iframe');  
    iframe.id = "hiddenDownloader";
    iframe.style.display='none';
    document.body.appendChild(iframe);
    iframe.src = url;
};

dojo.require("dijit.Dialog");
xmlc.ConfirmDialog = function(message,onOK){		
	
	if(xmlc._ConfirmDialog){
		return;
	}
	if (typeof message != 'string'){
		
		message=message.innerHTML;
	}
	xmlc._ConfirmDialog_onOK=onOK;
	xmlc._ConfirmDialog = new dijit.Dialog({
            title: "Confirm",
			content: '<div class="lotusDialogWrapper" ><div><div class="lotusDialogBorder" style="width: 350px; "><form method="POST" class="lotusDialog lotusForm" onsubmit="return false"><div class="lotusDialogHeader" style="cursor: move;"><h1 class="lotusHeading">'+xmlc.data.localization.xmlc_rs_confirm+'</h1><a class="lotusDialogClose" href="javascript:;" title="Cancel" role="button" onClick="xmlc.ConfirmDialog_close()"><img alt="Cancel" src="//1.www.s81c.com/i/c.gif" role="presentation"><span class="lotusAltText">X</span></a></div><div style=""><div class="lotusDialogContent _qkrDialogCompact"><table class="lotusFormTable" role="presentation" cellpadding="0"><tbody><tr class="lotusFormFieldRow"><td><div><div>'+message+'</div></div></td></tr></tbody></table></div></div><div class="lotusDialogFooter"><input class="lotusFormButton" type="submit" value="'+xmlc.data.localization.xmlc_rs_ok+'" title=""  onClick="xmlc.ConfirmDialog_ok()"><input class="lotusFormButton" type="button" value="'+xmlc.data.localization.xmlc_rs_cancel+'" role="button"  onClick="xmlc.ConfirmDialog_close()"></div></form></div></div></div>',
            style: "width: 300px"
        });

        
		
    xmlc._ConfirmDialog.show();
};	

xmlc.ConfirmDialog_close = function(){
	if(xmlc._ConfirmDialog){
		xmlc._ConfirmDialog.hide();
		xmlc._ConfirmDialog=null;
	}
};

xmlc.ConfirmDialog_ok = function(){
	xmlc.ConfirmDialog_close();
	
	if(xmlc._ConfirmDialog_onOK){
		xmlc._ConfirmDialog_onOK();
	}
};

xmlc.debug=function(value){
	if(location.hostname.indexOf('draco')>-1){
		console.log(value);
	}
}

xmlc.smartHideHelloBar = function() {
	dojo.connect(window,"scroll", function() {
	  var dwRegbar = dojo.byId("dw-regbar");
	  if (dwRegbar != null) {
		var pagescrollY = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
		if (pagescrollY <450) {
		  dwRegbar.style.zIndex = "1000";
		  dwRegbar.style.display="";
		}
		else {
		  dwRegbar.style.zIndex = "auto";
		  dwRegbar.style.display="none";
		}
	  }
	});
}
/// -------------------------------------------------------------
dojo.addOnLoad(xmlc.doPageInit);
dojo.addOnLoad(xmlc.smartHideHelloBar);
//setTimeout(xmlc.doPageInit,1000);
