/* Actualmente, este archivo está asociado a un archivo HTML del mismo nombre y está extrayendo contenido de él. No podrá mover, eliminar, cambiar el nombre ni hacer ninguna otra modificación en el archivo hasta que no los desasocie. */

function DisplayTemplate_7e196dbe478146e496d89b3cdcd9ece0(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_7e196dbe478146e496d89b3cdcd9ece0.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fResultados_Buscador_DNP.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
);
        if (Srch.U.shouldAnimate(ctx.DataProvider)){
            Srch.U.hideElement(ctx.ClientControl.get_element());
            ctx.OnPostRender = function(){ Srch.U.animateResults(ctx.ClientControl, ctx.DataProvider.get_userAction()); }; 
        }
ms_outHtml.push('                    '
,'        <div id="Result" name="Control">'
); 
            var arwImageUrl = GetThemedImageUrl('ecbarw.png');
            var keyword = ctx.ClientControl.get_dataProvider().get_currentQueryState().k;

            function getDropDownArrowHtml(alttext) { 

				var displayImageUrl = Srch.U.htmlEncodeNonBase64ImageUrl(arwImageUrl);
                return String.format('<img src="{0}" class="ms-core-menu-arrow" alt="{1}"/>', 
                    displayImageUrl,
                    $htmlEncode(alttext)
                );
            }

            function getDropdownMenu(linkId, linkText, linkTitle, funcName) {
                var cssLink = "color: inherit; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; word-wrap: normal; display:inline-block; max-width: 250px; vertical-align: top; text-decoration: none";
                var cssSpan = "unicode-bidi:embed; display:inline-block;"
                return String.format('<span id="{0}" class="ms-core-menu-button ms-core-menu-item" title="{2}" onclick="$getClientControl(this).{4}(this); return Srch.U.cancelEvent(event);" style="{5}"><a class="ms-core-menu-root" style="{6}">{1}</a>{3}</span>',
                                    linkId, 
                                    $htmlEncode(linkText),
                                    $htmlEncode(linkTitle),
                                    getDropDownArrowHtml(linkTitle),
                                    funcName,
                                    cssSpan,
                                    cssLink);
            }

            if(!$isNull(ctx.ScriptApplicationManager) && !$isNull(ctx.DataProvider) && !$isNull(ctx.ClientControl)){
                var appStates = ctx.ScriptApplicationManager.states;

                var getUpScopeHtmlFunc, langPrefHtml;
                if(ctx.ClientControl.get_showUpScopeMessage()) {

                    getUpScopeHtmlFunc = function(linkId) {
                        var upScopeUrl = ctx.DataProvider.get_upScopeUrl();
                        if (!$isEmptyString(upScopeUrl)) {
                            var _idScopeMenuSuffix = linkId + '_ScopeMenu';
                            var _idScopeLinkSuffix = linkId + '_ScopeLink';
                            var _idScopeMenuItemSuffix = linkId + '_ScopeMenuItem';

                            var scopeLinkIdNoEncode = ctx.ClientControl.get_id() + _idScopeLinkSuffix; 
                            var contextTitle = appStates["contextTitle"];
                            var scopeName = $isEmptyString(contextTitle) ? 
                                    "undefined":
                                    contextTitle;

                            function showSearchScopeMenu(anchorElement) {
                                var self = $getClientControl(anchorElement);
                                EnsureScriptFunc('SP.js', 'SP.UI.Menu', function () {
                                    var menu = SP.UI.Menu.create(self.get_id() + _idScopeMenuSuffix);
                                    var seqNo = 0;

                                    var navigationNodes = ctx.ScriptApplicationManager.getNavigationNodes();
                                    for (var i = 0; i < navigationNodes.length; i++) {
                                        var navNode = navigationNodes[i];
                                        var encodedNodeUrl = SP.Utilities.HttpUtility.ecmaScriptStringLiteralEncode(navNode.url);
                                        var script = String.format("SP.Utilities.HttpUtility.navigateTo(Srch.U.getResultsPageUrl('{0}', $getClientControl(document.getElementById(\'{1}\')).get_dataProvider().get_currentQueryState().k));", encodedNodeUrl, self.get_id());
                                        menu.addMenuItem(navNode.name, script, null, null, seqNo, navNode.promptString, self.get_id() + _idScopeMenuItemSuffix + seqNo++);
                                    }

                                    menu.hideIcons();
                                    menu.show(anchorElement, true, false, 0);
                                });
                            }

                            ctx.ClientControl.showSearchScopeMenu = showSearchScopeMenu;

                            var upScopeLinkHtml = getDropdownMenu(scopeLinkIdNoEncode, 
                                scopeName, 
                                $resource("rs_SearchScopeTooltip"),
                                "showSearchScopeMenu");
                            return String.format($htmlEncode($resource("rs_SearchScope")), upScopeLinkHtml);
                        } else {
                            return "";
                        }
                    };
                }
                var showSortOptions = ctx.ClientControl.get_showSortOptions() && !$isEmptyArray(ctx.DataProvider.get_availableSorts());
                var showLanguageOptions = ctx.ClientControl.get_showLanguageOptions();

                if (showLanguageOptions) {
                    var _idLangMenuSuffix = '_LangMenu';
                    var _idLangLinkSuffix = '_LangLink';
                    var _idLangSelectSuffix = '_LangLSelect';
                    var _idLangMenuItemSuffix = '_LangMenuItem';
                    var _idLangMenuItemPrefSuffix = '_LangMenuItemLangPref';
                    var _idLangMenuItemMoreSuffix = '_LangMenuItemMoreLang';

                    var langLinkIdNoEncode = ctx.ClientControl.get_id() + _idLangLinkSuffix;    

                    function showLanguageMenu(anchorElement) {
                        var self = $getClientControl(anchorElement);
                        EnsureScriptFunc('SP.js', 'SP.UI.Menu', function () {
                            var menu = SP.UI.Menu.create(self.get_id() + _idLangMenuSuffix);
                            var sam =  Srch.ScriptApplicationManager.get_current();
                            var languagePreferences = sam.getUserPreferenceLanguages();
                            var seqNo = 0;

                            if (!Srch.U.n(languagePreferences) && languagePreferences.length > 0) {
                                for (var i = 0; i < languagePreferences.length; i++) {
                                    var langPref = languagePreferences[i];
                                    var displayName = langPref.label;
                                    var actionScript = String.format('$getClientControl(document.getElementById(\'{1}\')).changeQueryLanguage({0});', $htmlEncode(langPref.id + ''), SP.Utilities.HttpUtility.ecmaScriptStringLiteralEncode(self.get_id()));
                                    menu.addMenuItem(displayName, actionScript, null, null, seqNo++, null, self.get_id() + _idLangMenuItemSuffix + displayName);
                                }
                            }
                            menu.addSeparator();

                            var advancedLanguagePreferencesUrl = sam.states['userAdvancedLanguageSettingsUrl'];
                            if (!Srch.U.e(advancedLanguagePreferencesUrl)) {
                                var langPrefScript = String.format('window.location = \'{0}\';', SP.Utilities.HttpUtility.ecmaScriptStringLiteralEncode(advancedLanguagePreferencesUrl));
                                menu.addMenuItem(Srch.Res.rs_LanguagePreferences, langPrefScript, null, null, seqNo, Srch.Res.rs_LanguagePreferences, self.get_id() + _idLangMenuItemPrefSuffix);
                            }

                            menu.hideIcons();
                            menu.show(anchorElement, true, false, 0);
                        });
                    }

                    ctx.ClientControl.showLanguageMenu = showLanguageMenu;

                    var currLangLabel = ctx.DataProvider.get_effectiveLanguageDisplayName();

                    if ($isEmptyString(currLangLabel)) {

                        var advLangSettingsUrl = ctx.ScriptApplicationManager.states['userAdvancedLanguageSettingsUrl'];
                        if (!Srch.U.e(advLangSettingsUrl)) {
                            var settingsLinkHtml = String.format('<span><a class="ms-searchNotification" href="{0}">{1}</a></span>',
                                $urlHtmlEncodeString(advLangSettingsUrl),
                                $htmlEncode(Srch.Res.rs_SelectPreferredSearchLanguage_Language)
                            );
                            langPrefHtml = String.format($htmlEncode(Srch.Res.rs_SelectPreferredSearchLanguage), settingsLinkHtml);
                        }
                    } else {
                        var langLinkHtml = getDropdownMenu(langLinkIdNoEncode, 
                            currLangLabel, 
                            Srch.Res.rs_LanguageDescription,
                            "showLanguageMenu");
                        langPrefHtml = String.format($htmlEncode(Srch.Res.rs_PreferredSearchLanguage), langLinkHtml);
                    }
                }

                var upScopeHtml = getUpScopeHtmlFunc ? getUpScopeHtmlFunc("UpScopeLinkTopA") : "";
                if (langPrefHtml || upScopeHtml) {
ms_outHtml.push('  '
,'                    <div id="UpScopeLinkTop" class="ms-srch-upscope-top" style="display:table;  width: 500px">'
);
                    if (upScopeHtml) {
ms_outHtml.push(''
,'                        <div style="display: table-cell">',  upScopeHtml ,'</div>'
);
                        if (langPrefHtml) { 
ms_outHtml.push(''
,'                            <div style="display: table-cell; width: 20px"></div>'
);
                         }
                    }
                    if (langPrefHtml) {
ms_outHtml.push(''
,'                        <div style="display: table-cell">', langPrefHtml ,'</div>'
);
                    }
ms_outHtml.push(''
,'                    </div>'
);
                }
ms_outHtml.push(''
,'				<div class="DNPSearch-horizontal-busqueda">'
,'		            <div class="DNPresults-search-item">'
);	
	                if(showSortOptions){
	                    var availableSorts = ctx.DataProvider.get_availableSorts();
ms_outHtml.push('				'
,'                    	<label class="DNPresults-item-label-search">Ordenar:</label>	                        '
,'                        <select title="', $htmlEncode(Srch.Res.rs_SortDescription) ,'" id="SortbySel" onchange="$getClientControl(this).sortOrRank(this.value);" class="DNPresults-item-select">'
); 
                            for (var i = 0; i < availableSorts.length; i++) {
                                var cplxsort = availableSorts[i];
                                if(!$isNull(cplxsort)){
                                    if(ctx.DataProvider.getSortRankName() == cplxsort.name) {
ms_outHtml.push(''
,'                                        <option selected="selected" value="', $htmlEncode(cplxsort.name) ,'">'
,'                                            ', $htmlEncode(cplxsort.name) ,''
,'                                        </option>'
); 
                                    } else {
ms_outHtml.push(''
,'                                        <option value="', $htmlEncode(cplxsort.name) ,'">'
,'                                            ', $htmlEncode(cplxsort.name) ,''
,'                                        </option>'
); 
                                    }
                                }
                            } 
ms_outHtml.push(''
,''
,'                        </select>'
);                 
					}
                    if(ctx.ClientControl.get_showResultCount() && ctx.DataProvider.get_totalRows() > 0){
                        var start = ctx.DataProvider.get_currentQueryState().s;
                        var resultsPerPage = ctx.DataProvider.get_resultsPerPage();
                        var totalRows = ctx.DataProvider.get_totalRows();
                        var countDisplayString = Srch.Res.rs_ApproximateResultCount;
                        

                        if (start + resultsPerPage > totalRows) { countDisplayString = (totalRows == 1)? Srch.Res.rs_SingleResultCount : Srch.Res.rs_ResultCount; }
                        
                        if(keyword != ''){
ms_outHtml.push(''
,'							<p class="DNPresults-item-paragraph">', String.format($htmlEncode(countDisplayString), $htmlEncode(totalRows.localeFormat("N0"))) + ' con la(s) palabra(s) "' + keyword  + '"' ,'</p>'
); 
						}
						else{
ms_outHtml.push(''
,'							<p class="DNPresults-item-paragraph">', String.format($htmlEncode(countDisplayString), $htmlEncode(totalRows.localeFormat("N0"))) ,'</p>'
); 
                    	}
                    }
                    else if(keyword != ''){
                    
ms_outHtml.push(''
,'						<p class="DNPresults-item-paragraph">', 'No se ha encontrado contenido relacionado con su búsqueda. Intente con otras palabras claves relacionadas.' ,'</p>'
); 
                    }
                    else{
ms_outHtml.push(''
,'						<p class="DNPresults-item-paragraph">', 'Por favor, haga una búsqueda para mostrar resultados' ,'</p>'
); 
                    }
                    
ms_outHtml.push(''
,''
,'					</div>'
,'                </div>'
,''
);                          
                
                var hasPersonalResults = false;
                if(ctx.ClientControl.get_showPersonalFavorites()){

                    var pfTable = Srch.U.getTableOfType(ctx.ClientControl.get_currentResultTableCollection(), Microsoft.SharePoint.Client.Search.Query.KnownTableTypes.personalFavoriteResults);
                    if(!$isNull(pfTable)){
                        var pfRows = pfTable[Srch.U.PropNames.resultRows];
                        if(!$isNull(pfRows) && pfRows.length > 0)
                        {
                            var pfRow = pfRows[0];
                            if(!$isNull(pfRow) && !$isEmptyString(pfRow.Title) && !$isEmptyString(pfRow.Url))
                            {
                                hasPersonalResults = true;
                                var pfId = ctx.ClientControl.get_nextUniqueId();
                                var pfTitle = Srch.U.getHighlightedProperty(pfId, pfRow, "Title");
                                if ($isEmptyString(pfTitle))
                                    pfTitle = $htmlEncode(pfRow.Title);
ms_outHtml.push('                '
,'                                <div class="ms-srch-result-personalResult">'
,'                                    <div class="ms-srch-result-personalResult-prompt">', $htmlEncode(Srch.Res.qs_PersonalResultTitleSingular) ,'</div>                                    '
,'                                    <a id="PersonalResult" class="ms-textLarge" href="', $urlHtmlEncodeString(pfRow.Url) ,'">', Srch.U.trimTitle(pfTitle, Srch.U.titleTruncationLength, 2) ,'</a>'
,'                                </div>'
); 
                            }
                        }
                    } 
                }
                if(ctx.ClientControl.get_showDidYouMean() && !hasPersonalResults){                    
                    if(!$isNull(ctx.ListData) && !$isEmptyString(ctx.ListData.SpellingSuggestion)){
                        var dymTerm = ctx.ListData.SpellingSuggestion;
                        var dymHtml = "<a id='DidYouMean' class='ms-bold ms-italic' href='#' onclick='$getClientControl(this).changeQueryTerm(\"" + $scriptEncode(dymTerm) + "\");return Srch.U.cancelEvent(event);'>" + $htmlEncode(dymTerm) + "</a>";
ms_outHtml.push('                '
,'                        <div class="ms-srch-result-didYouMean">'
,'                            ', String.format($htmlEncode(Srch.Res.rs_DidYouMean), dymHtml) ,''
,'                        </div>'
); 
                    }
                }
                if (Srch.U.isPageInEditMode()){
                    var sourcesHtml = "<a href='" + $urlHtmlEncodeString(ctx.ScriptApplicationManager.get_resultSourcesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_ResultSources) + "</a>";
                    var displayTemplatesHtml = "<a href='" + $urlHtmlEncodeString(ctx.ScriptApplicationManager.get_displayTemplatesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_DisplayTemplate) + "</a>";
                    var resultTypesHtml = "<a href='" + $urlHtmlEncodeString(ctx.ScriptApplicationManager.get_resultTypesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_ResultType) + "</a>";
                    var queryRulesHtml = "<a href='" + $urlHtmlEncodeString(ctx.ScriptApplicationManager.get_queryRulesUrl()) + "' target='_blank'>" + $htmlEncode(Srch.Res.rs_Edit_QueryRules) + "</a>";
                    var configureResultsUrl = "javascript:HelpWindowKey(\"WSSEndUser_ConfigureResultsWPInEditMode\")";
                    var configureResultsLink = "<a href=" + configureResultsUrl + ">" + $htmlEncode(Srch.Res.rs_Edit_ConfigureSearchResults_Link) + "</a>";  
ms_outHtml.push(' '
,'                    <div id="EditMode-CustomizingResults" class="ms-trcnoti-base ms-srch-msg ms-srch-msg-border">'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_ResultSourcesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ResultSourcesDescription), sourcesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_ResultTypesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ResultTypesDescription), displayTemplatesHtml, resultTypesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <h2 class="ms-accentText">', $htmlEncode(Srch.Res.rs_Edit_QueryRulesTitle) ,'</h2>'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_QueryRulesDescription), queryRulesHtml) ,'</div>'
,'                        </div>'
,'                        <div class="ms-srch-msg-section">'
,'                            <div>', String.format($htmlEncode(Srch.Res.rs_Edit_ConfigureSearchResults), configureResultsLink) ,'</div>'
,'                        </div>'
,'                    </div>'
);                     
                }
ms_outHtml.push('        '
,'                <div id="Groups">'
); 
                    ctx.ListDataJSONGroupsKey = "ResultTables"; 
ms_outHtml.push(''
,'                    ', ctx.RenderGroups(ctx) ,''
);
                    if(ctx.ClientControl.get_shouldShowNoResultMessage()){
ms_outHtml.push(''
,'                        <div id="NoResult">'
,'                        </div>'
);
                    }
ms_outHtml.push(''
,'                </div>'
,''
);
                if(getUpScopeHtmlFunc){
ms_outHtml.push(''
,'                    <div id="UpScopeLinkBottom" class="ms-srch-upscope-bottom" style="display:table;  width: 500px">'
,'                        <div style="display: table-cell">', getUpScopeHtmlFunc("UpScopeLinkBottomA") ,'</div>'
,'                    </div>'
); 
                } 

                if(ctx.ClientControl.get_showPaging()){
                    var pagingInfo = ctx.ClientControl.get_pagingInfo();
                    if(!$isEmptyArray(pagingInfo)){
ms_outHtml.push(''
,'                        <div id="Paging" class="DNPPager">'
); 
                        for (var i = 0; i < pagingInfo.length; i++) {
                            var pl = pagingInfo[i];
                            if(!$isNull(pl)) {
                                var imagesUrl = GetThemedImageUrl('searchresultui.png');
                                if(pl.startItem == -1) {
                                    var selfLinkId = "SelfLink_" + pl.pageNumber;
ms_outHtml.push(''
,'                                    <p id="PagingSelf" class="DNPPager-numbers"><a id="', $htmlEncode(selfLinkId) ,'">', $htmlEncode(pl.pageNumber) ,'</a></p>'
); 
                                } else if(pl.pageNumber == -1) {
                                    var iconClass = Srch.U.isRTL() ? "ms-srch-pagingNext" : "ms-srch-pagingPrev";
ms_outHtml.push(''
,'                                    <div id="PagingImageLink" class="DNPPager-prev">'
,'                                    	<a id="PageLinkPrev" href="#" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">'
,'	                                        Anterior'
,'                                    	</a>'
,'                                    </div>'
); 
                                } else if(pl.pageNumber == -2) {
                                    var iconClass = Srch.U.isRTL() ? "ms-srch-pagingPrev" : "ms-srch-pagingNext";
ms_outHtml.push(''
,'                                    <div id="PagingImageLink" class="DNPPager-next">'
,'                                    	<a id="PageLinkNext" href="#" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">'
,'	                                        Siguiente'
,'                                    	</a>'
,'                                    </div>'
); 
                                } else {
                                    var pageLinkId = "PageLink_" + pl.pageNumber;
ms_outHtml.push(''
,'                                    <p id="PagingLink" class="DNPPager-numbers"><a id="', $htmlEncode(pageLinkId) ,'" href="#" title="', $htmlEncode(pl.title) ,'" onclick="$getClientControl(this).page(', $htmlEncode(pl.startItem) ,');return Srch.U.cancelEvent(event);">', $htmlEncode(pl.pageNumber) ,'</a></p>'
); 
                                }
                            }
                        }
ms_outHtml.push(''
,'                        </div>'
); 
                    }
                } 
ms_outHtml.push(''
,''
,'                <div class="ms-srch-resultFooter">'
,''
,'                    <ul id="ResultFooter">'
); 
                        if(ctx.ClientControl.get_showAlertMe()){
                            var alertMeLabel = $htmlEncode($resource("rs_AlertMe"));
                            var queryTerm = ctx.DataProvider.get_currentQueryState().k;
                            var serializedQuery = Srch.U.getTableProperty(ctx.ClientControl.get_currentResultTableCollection(), "SerializedQuery");
ms_outHtml.push(''
,'                            <li id="AlertMeLi">'
,'                                <a id="CSR_AM1" href="javascript:{}" title="', alertMeLabel ,'" onclick="EnsureScriptParams(\'SearchUI.js\', \'Srch.SU.searchResultAlertMe\', \'', $scriptEncode(queryTerm) ,'\', \'', $scriptEncode(serializedQuery) ,'\');">'
,'                                    ', alertMeLabel ,''
,'                                </a>'
,'                            </li>'
); 
                        }

                        if(ctx.ClientControl.get_showPreferencesLink()){
                            var preferencesUrl = ctx.ScriptApplicationManager.get_preferencesUrl();
                            if(!$isEmptyString(preferencesUrl)){ 
ms_outHtml.push(''
,'                                <li id="Preferences"><a title="', $htmlEncode(Srch.Res.rs_Preferences) ,'" id="PreferencesLink" href="', $urlHtmlEncodeString(preferencesUrl) ,'">', $htmlEncode(Srch.Res.rs_Preferences) ,'</a></li>'
); 
                            }
                        }

                        if(ctx.ClientControl.get_showAdvancedLink()){
                            var advancedUrl = ctx.ClientControl.get_advancedUrl();
                            if(!$isEmptyString(advancedUrl)){ 
ms_outHtml.push(''
,'                                <li id="Advanced"><a title="', $htmlEncode(Srch.Res.rs_Advanced) ,'" id="AdvancedLink" href="', $urlHtmlEncodeString(advancedUrl) ,'">', $htmlEncode(Srch.Res.rs_Advanced) ,'</a></li>'
); 
                            }
                        }
ms_outHtml.push(''
,'                    </ul>'
,'                </div>'
); 
            }
            $('.DNPContent').addClass('DNPHistorical');
            var inDesignMode = document.forms[MSOWebPartPageFormName].MSOLayout_InDesignMode.value;

			if (inDesignMode != "1")
			{
            	$('.DNPHistorical>div, .DNPHistorical>div>div, .DNPHistorical>div>div>div').removeClass();
            }

ms_outHtml.push(''
,'        </div>'
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_7e196dbe478146e496d89b3cdcd9ece0() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_SearchResults", DisplayTemplate_7e196dbe478146e496d89b3cdcd9ece0);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fResultados_Buscador_DNP.js", DisplayTemplate_7e196dbe478146e496d89b3cdcd9ece0);
}

}
RegisterTemplate_7e196dbe478146e496d89b3cdcd9ece0();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fResultados_Buscador_DNP.js"), RegisterTemplate_7e196dbe478146e496d89b3cdcd9ece0);
}