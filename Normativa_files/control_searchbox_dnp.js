/* Actualmente, este archivo está asociado a un archivo HTML del mismo nombre y está extrayendo contenido de él. No podrá mover, eliminar, cambiar el nombre ni hacer ninguna otra modificación en el archivo hasta que no los desasocie. */

function DisplayTemplate_77d03bcc72504a8192637061d31b4f4c(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_77d03bcc72504a8192637061d31b4f4c.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_SearchBox_DNP.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchBox'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
); 
        var showQuerySuggestions = ctx.ClientControl.get_showQuerySuggestions();
        var showNavigation = ctx.ClientControl.get_showNavigation();

        var prompt = ctx.ClientControl.get_initialPrompt();
        if ($isNull(prompt))
        {
            prompt = Srch.Res.sb_Prompt;
        }

        var inputClass = "DNPresults-item-input";

        var searchBoxDivId = ctx.ClientControl.get_id() + "_sboxdiv";
        var searchBoxId = ctx.ClientControl.get_id() + "_sbox";
        var navButtonId = ctx.ClientControl.get_id() + "_NavButton";
        var suggestionsListId = ctx.ClientControl.get_id() + "_AutoCompList"; 
        var navListId = ctx.ClientControl.get_id() + "_NavDropdownList";
        var searchBoxLinkId = ctx.ClientControl.get_id() + "_SearchLink";
        var searchBoxProgressClass = "ms-srch-sbprogressLarge";
        var searchBoxPromptClass = "ms-srch-sb-prompt ms-helperText";

        ctx.OnPostRender = function(rCtx) {
            ctx.ClientControl.activate(
                prompt, 
                searchBoxId, 
                searchBoxDivId, 
                navButtonId, 
                suggestionsListId, 
                navListId, 
                searchBoxLinkId, 
                searchBoxProgressClass,
                searchBoxPromptClass);            
        }                      
ms_outHtml.push(''
,'        <div id="SearchBox" name="Control" class="DNPSearch-horizontal-busqueda">'
,'            <div class="DNPresults-search-item" id="', $htmlEncode(searchBoxDivId) ,'">'
,'            	<label class="DNPSearch-item-label"></label>'
,'                <input type="text" value="', $htmlEncode(ctx.ClientControl.get_currentTerm()) ,'" maxlength="2048" accessKey="', $htmlEncode(Srch.Res.sb_AccessKey) ,'" title="', $htmlEncode(prompt) ,'" id="', $htmlEncode(searchBoxId) ,'" autocomplete="off" autocorrect="off" onkeypress="if (Srch.U.isEnterKey(String.fromCharCode(event.keyCode))) { $getClientControl(this).search(this.value);return Srch.U.cancelEvent(event); }" onkeydown="var ctl = $getClientControl(this);ctl.activateDefaultQuerySuggestionBehavior();" onfocus="var ctl = $getClientControl(this);ctl.hidePrompt();" onblur="var ctl = $getClientControl(this);ctl.showPrompt();" class="', inputClass ,'" placeholder="Buscar" /> '
,'            </div>'
,'            <div class="DNPButtonscontainer-horizontal">'
,'                <button id="', $htmlEncode(searchBoxLinkId) ,'" class="DNPSimplebutton DNPSimplebutton-color" onclick="$getClientControl(this).search($get(\'', $scriptEncode(searchBoxId) ,'\').value);return Srch.U.cancelEvent(event);">Buscar</button>'
,'            </div>'
,'            <div class="DNPresults-search-item">'
); 
                var imagesUrl = GetThemedImageUrl('searchresultui.png');

				var displayImageUrl = Srch.U.htmlEncodeNonBase64ImageUrl(imagesUrl);

                if (showNavigation) { 
ms_outHtml.push(''
,'                    <a class="ms-srch-sb-navLink" title="', $htmlEncode(Srch.Res.sb_GoNav) ,'" id="', $htmlEncode(navButtonId) ,'" onclick="$getClientControl(this).activateDefaultNavigationBehavior();return Srch.U.cancelEvent(event);" href="javascript: {}">'
,'                        <img src="', displayImageUrl ,'" class="ms-srch-sbLarge-navImg" id="navImg" alt="', $htmlEncode(Srch.Res.sb_GoNav) ,'" />'
,'                    </a>'
); 
                }
            if (showQuerySuggestions) { 
ms_outHtml.push(''
,'                <div class="ms-qSuggest-container ms-shadow" id="AutoCompContainer">'
,'                    <div id="', $htmlEncode(suggestionsListId) ,'"></div>'
,'                </div>'
); 
            } 

            if (showNavigation) { 
ms_outHtml.push(''
,'                <div class="ms-qSuggest-container ms-shadow" id="NavDropdownListContainer">'
,'                    <div id="', $htmlEncode(navListId) ,'"></div>'
,'                </div>'
); 
            }

ms_outHtml.push(''
,'			</div>'
,'        </div>'
,'		<div id="SearchOptions">'
);
			 if (ctx.ClientControl.get_showAdvancedLink()) {
					var advancedUrl = ctx.ClientControl.get_advancedSearchPageAddress();
					if(!$isEmptyString(advancedUrl)){ 
ms_outHtml.push(''
,'						<div class="ms-srch-sbLarge-link"><a id="AdvancedLink" href="', $urlHtmlEncodeString(advancedUrl) ,'">', $htmlEncode(Srch.Res.sb_AdvancedLink) ,'</a></div>'
); 
					}
				}
				if (ctx.ClientControl.get_showPreferencesLink()) {
					var preferencesUrl = ctx.ScriptApplicationManager.get_preferencesUrl();
					if(!$isEmptyString(preferencesUrl)){ 
ms_outHtml.push(''
,'						<div class="ms-srch-sbLarge-link"><a id="PreferencesLink" href="', $urlHtmlEncodeString(preferencesUrl) ,'">', $htmlEncode(Srch.Res.sb_PreferencesLink) ,'</a></div>'
); 
					}
				} 
ms_outHtml.push(''
,'		</div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_77d03bcc72504a8192637061d31b4f4c() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_SearchBox", DisplayTemplate_77d03bcc72504a8192637061d31b4f4c);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_SearchBox_DNP.js", DisplayTemplate_77d03bcc72504a8192637061d31b4f4c);
}

}
RegisterTemplate_77d03bcc72504a8192637061d31b4f4c();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fControl_SearchBox_DNP.js"), RegisterTemplate_77d03bcc72504a8192637061d31b4f4c);
}