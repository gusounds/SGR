/* Actualmente, este archivo está asociado a un archivo HTML del mismo nombre y está extrayendo contenido de él. No podrá mover, eliminar, cambiar el nombre ni hacer ninguna otra modificación en el archivo hasta que no los desasocie. */

function DisplayTemplate_de1f0fe71fab4938a0f8f84b404b5927(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_de1f0fe71fab4938a0f8f84b404b5927.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fFilter_Dropdown_DNP.js';
  ctx['DisplayTemplateData']['TemplateType']='Filter';
  ctx['DisplayTemplateData']['TargetControlType']=['Refinement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['CompatibleSearchDataTypes']=[];
  ctx['DisplayTemplateData']['CompatibleManagedProperties']=[];

ms_outHtml.push('',''
,''
);

    this.Options = {
        ShowClientPeoplePicker: false,
        ShowCounts: false
    };

    if (ctx.RefinementControl.propertyName == "Author" ||
        ctx.RefinementControl.propertyName == "DisplayAuthor")
    {
        this.Options.ShowClientPeoplePicker = true;
    }

    function mapResultType(listData)
    {
        var map = { };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSAccess")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["accdb", "accdc", "accde", "accdr", "accdt"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_AdobePDF")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["pdf"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Assignment")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851252*"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Blog")] = {
            "RefinerName": "WebTemplate",
            "RefinementValues": ["BLOG"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Book")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x010100C568DB52D9D0A14D9B2FDCC96666E9F2007948130EC3DB064584E219954237AF3900ABD371128A994A0B98E7E888866B392F*"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Community")] = {
            "RefinerName": "WebTemplate",
            "RefinementValues": ["COMMUNITY"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Course")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851101*"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Discussion")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x012002*", "0x0107*"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Email")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["eml", "msg", "exch"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSExcel")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["odc", "ods", "xls", "xlsb", "xlsm", "xlsx", "xltm", "xltx", "xlam"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Image")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["bmp", "jpeg", "png", "tiff", "gif", "rle", "wmf", "dib", "ico", "wpd", "odg"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Lesson")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x010063C2F478ACC511DFB869B5BFDFD720851251*"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_NewsfeedPost")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x01FD4FB0210AB50249908EAA47E6BD3CFE8B*", "0x01FD59a0df25f1e14ab882d2c87d4874cf84*"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSOneNote")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["one"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSPowerPoint")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["odp", "ppt", "pptm", "pptx", "potm", "potx", "ppam", "ppsm", "ppsx"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSProject")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["mpp"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSPublisher")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["pub"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_SharePointSite")] = {
            "RefinerName": "contentclass",
            "RefinementValues": ["STS_Web", "STS_Site"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Task")] = {
            "RefinerName": "contentclass",
            "RefinementValues": ["STS_ListItem_GanttTasks", "STS_ListItem_Tasks", "STS_ListItem_HierarchyTasks", "STS_List_GanttTasks", "STS_List_Tasks", "STS_List_HierarchyTasks"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_TeamSite")] = {
            "RefinerName": "WebTemplate",
            "RefinementValues": ["STS"]
        }; 
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Video")] = {
            "RefinerName": "ContentTypeId",
            "RefinementValues": ["0x0120D520A8*"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Visio")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["vsd", "vsx"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_MSWord")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["docx", "doc", "docm", "dot", "nws", "dotx"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Webpage")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["HTML", "MHTML"]
        };
        map[Srch.U.loadResource("rf_ResultTypeRefinerValue_Archive")] = {
            "RefinerName": "FileType",
            "RefinementValues": ["zip"]
        };

        var retListData = new Array();
        var assocListData = new Array();
        for (var i = 0; i < listData.length; i++)
        {
            var filter = listData[i];
            var mappedRefinementName = null;
            for(var key in map)
            {
                if (map[key].RefinerName == filter.RefinerName)
                {
                    for (var j = 0; j < map[key].RefinementValues.length; j++)
                    {
                        var actualValue = filter.RefinementValue.toLowerCase(), candidateValue = map[key].RefinementValues[j].toLowerCase();

                        if (actualValue == candidateValue ||
                            (filter.RefinerName.toLowerCase() == "contenttypeid" && actualValue.startsWith(candidateValue.substring(0, candidateValue.length - 1)))) 
                        {
                            mappedRefinementName = key;
                            break;
                        }
                    }
                    if (!$isNull(mappedRefinementName))
                    {
                        break;
                    }
                }
            }

            var mappedFilter = new Object();
            if (!$isNull(mappedRefinementName))
            {
                mappedFilter.RefinerName = map[mappedRefinementName].RefinerName;
                mappedFilter.RefinementCount = filter.RefinementCount;
                mappedFilter.RefinementName = mappedRefinementName;
                mappedFilter.RefinementTokens = [];
                var resultTypeTokenWrapper = (mappedFilter.RefinerName.toLowerCase() == "contenttypeid") ? function (x) {return x;} : 
                                                                                                           Srch.RefinementUtil.stringValueToEqualsToken;
                for (var j in map[mappedRefinementName].RefinementValues) {
                    mappedFilter.RefinementTokens.push(resultTypeTokenWrapper(map[mappedRefinementName].RefinementValues[j]));
                }

                if ($isNull(assocListData[mappedFilter.RefinementName]))
                {
                    assocListData[mappedFilter.RefinementName] = mappedFilter;
                }
                else
                {
                    assocListData[mappedFilter.RefinementName].RefinementCount += mappedFilter.RefinementCount;
                }
            }                
        }

        for (var key in assocListData)
        {
            retListData[retListData.length] = assocListData[key];
        }

        return retListData;
    }

    var listData = ctx.ListData;
    var hasControl = true;
    var shortListSize = 5;

    if ($isNull(ctx.RefinementControl) || $isNull(ctx.ClientControl)) hasControl = false;
    
    /*var currentRefinementCategory = ctx.ClientControl.getCurrentRefinementCategory(ctx.RefinementControl.propertyName);
    var hasAnyFilterTokens = (!$isNull(currentRefinementCategory) && currentRefinementCategory.get_tokenCount() > 0);
    
    if($isNull(listData) && hasAnyFilterTokens){
    	listData = [];
    	 for(var j = 0; j < currentRefinementCategory.get_tokenCount(); j++) {
    	 	listData.push({
    	 		RefinerName : ctx.RefinementControl.propertyName,
    	 		RefinementValue: currentRefinementCategory.t[j].replace('equals("','').replace('")', ''),
    	 		RefinementToken: currentRefinementCategory.t[j],
    	 		RefinementCount: 0
    	 	});
    	 }
    }*/


    if (ctx.RefinementControl.propertyName == "FileType") {
        shortListSize = 6;

        if ($isNull(listData))
        {
            listData = [];
        }
        if (!$isNull(ctx.DataProvider.get_refinementInfo())) {
            if (!$isNull(ctx.DataProvider.get_refinementInfo()["contentclass"]))
            {
                listData = listData.concat(ctx.DataProvider.get_refinementInfo()["contentclass"]);
            }
            if (!$isNull(ctx.DataProvider.get_refinementInfo()["ContentTypeId"]))
            {
                listData = listData.concat(ctx.DataProvider.get_refinementInfo()["ContentTypeId"]);
            }
            if (!$isNull(ctx.DataProvider.get_refinementInfo()["WebTemplate"]))
            {
                listData = listData.concat(ctx.DataProvider.get_refinementInfo()["WebTemplate"]);
            }
        }

        if (hasControl)
            listData = mapResultType(listData);
    }
    else if (ctx.RefinementControl.propertyName == 'contentclass' || ctx.RefinementControl.propertyName == 'ContentTypeId' || ctx.RefinementControl.propertyName == 'WebTemplate') {
        hasControl = false;
    }
    else if (hasControl && !$isNull(listData))
    {
    	var newListData = [];

        for(var i in listData)
        {
        	
        	filter = listData[i];
        	filter.RefinementName = filter.RefinementName.replaceAll('string;#','');
            if(!$isEmptyString(filter.RefinementName)){
	            listData[i].RefinementTokens = [listData[i].RefinementToken];
	            listData[i].RefinementTokenWrappedValues = [Srch.RefinementUtil.stringValueToEqualsToken(listData[i].RefinementValue)];
	            if(ctx.RefinementControl.propertyName == "MediaDuration")
	            {
	                Srch.U.modifyMediaDurationRefinementName(listData[i]);
	            }
	            newListData.push(filter);
	        }
        }
        listData = newListData;
    }

    if (hasControl)
    {
        if($isNull(listData) || $isEmptyArray(listData))
        {
ms_outHtml.push(''
,'        <div id="EmptyContainer"></div>'
);
        }
        else
        {
            var isExpanded = Srch.Refinement.getExpanded(ctx.RefinementControl.propertyName);
            var iconClass = (isExpanded == "true"? "ms-ref-uparrow" : "ms-ref-downarrow");
            var displayStyle = (isExpanded == "true"? "" : "none");
            var refinerCatTitle = Srch.Refinement.getRefinementTitle(ctx.RefinementControl);
ms_outHtml.push(''
,'          <div id="Container" class="DNPresults-item checkbox date">'
,'          	<p class="title-filter">', refinerCatTitle,'</p>'
,''
);
            function outputFilter(refinementName, refinementCount, refiners, method, aClass, showCounts) {
                var aOnClick = "$getClientControl(this)." + method + "('" +  + "');";
                var nameClass = "ms-ref-name " + (showCounts ? "ms-displayInline" : "ms-displayInlineBlock ms-ref-ellipsis");
ms_outHtml.push('          '
,'            <option value="', $htmlEncode(Sys.Serialization.JavaScriptSerializer.serialize(refiners)) ,'">'
,'	            ', $htmlEncode(refinementName) ,''
,'            	                 '
,'            </option>'
);
            };

            function SortAlphabetically(a, b)
            {
                return a.RefinementName.localeCompare(b.RefinementName);
            }
            function SortByCountDescending(a, b)
            {
                return b.RefinementCount - a.RefinementCount;
            }

            var unselectedFilters = new Array();
            var selectedFilters = new Array();

            var hasDiscreteIntervals = (!$isEmptyString(ctx.RefinementControl.spec) && ctx.RefinementControl.spec.startsWith('(discretize=manual'));

            var currentRefinementCategory = ctx.ClientControl.getCurrentRefinementCategory(ctx.RefinementControl.propertyName);
            var hasAnyFiltertokens = (!Srch.U.n(currentRefinementCategory) && currentRefinementCategory.get_tokenCount() > 0);
            for (var i = 0; i < listData.length; i++){
                var filter = listData[i];
                if(!$isNull(filter)){                	
                    var isEmptyDiscreteInterval = (hasDiscreteIntervals && filter.RefinementCount < 1);

                    if (ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokens) ||
                        ctx.ClientControl.hasAllRefinementFilters(filter.RefinerName, filter.RefinementTokenWrappedValues)) {
                        selectedFilters.push(filter);
                    } else if(!isEmptyDiscreteInterval) {
                        unselectedFilters.push(filter);
                    }
                }                
            }
            if (ctx.RefinementControl.propertyName == "FileType")
            {
                if (unselectedFilters.length <= shortListSize) {
                    unselectedFilters = unselectedFilters.sort(SortAlphabetically);
                } else {

                    unselectedFilters = unselectedFilters.sort(SortByCountDescending);
                } 

                selectedFilters = selectedFilters.sort(SortAlphabetically);
            }

            var addMethod = "addRefinementFiltersJSON";
            if (ctx.RefinementControl.propertyName == "FileType") {
                unselectedFilters = unselectedFilters.sort(SortAlphabetically);
                addMethod = "addRefinementFiltersJSONWithOr";
            }
            
            if (selectedFilters.length > 0 || hasAnyFiltertokens)
            {
ms_outHtml.push('	'
,'				<select id="ddl', ctx.RefinementControl.propertyName ,'" class="DNPPlaneacion-item-select" disabled="disabled">'
);
	            for (var i = 0; i < selectedFilters.length; i++){
	                var filter = selectedFilters[i];
	                if(!$isNull(filter)){
	                    var refiners = new Object();
	                    if (!$isNull(filter.RefinementTokenWrappedValues))
	                        filter.RefinementTokens = filter.RefinementTokens.concat(filter.RefinementTokenWrappedValues); 
	                    refiners[filter.RefinerName] = filter.RefinementTokens;	                    
	                    outputFilter(filter.RefinementName, filter.RefinementCount, refiners, "removeRefinementFiltersJSON", "ms-core-listMenu-selected ms-ref-filterSel ms-displayBlock", this.Options.ShowCounts);
	                }
	            }
            
ms_outHtml.push(''
,'            	</select>'
);
			}
			else
			{
ms_outHtml.push(''
,'	            <select id="ddl', ctx.RefinementControl.propertyName ,'" class="DNPPlaneacion-item-select" style="display:', $htmlEncode(displayStyle) ,'">'
);	            
	                for (var i = 0; i < unselectedFilters.length; i++) {
	                    var filter = unselectedFilters[i];
	                    if(!$isNull(filter)) {
	                        var refiners = new Object();
	                        refiners[filter.RefinerName] = filter.RefinementTokens;
	                        outputFilter(filter.RefinementName, filter.RefinementCount, refiners, addMethod, "ms-displayBlock", this.Options.ShowCounts);
	                    }
	                }               
ms_outHtml.push(''
,'	            </select>'
);            
            }
            var onClick = "$getClientControl(this)." + addMethod + "(document.getElementById('ddl" + ctx.RefinementControl.propertyName +"').value);";
ms_outHtml.push('  '
,''
,'            <div class="DNP-Filter__search">'
,'	        	<a onclick="', onClick ,'" href="javascript:{}">Aplicar Filtro'
,'	            </a>'
,'	            <a onclick="$getClientControl(this).updateRefinementFilters(\'', $scriptEncode(ctx.RefinementControl.propertyName) ,'\', null);" href="javascript:{}">'
,'	                ', $htmlEncode($resource('rf_ClearAll')) ,''
,'	            </a>			  '
,'		    </div>'
,'		    <div class="DNP-line"></div>'
,'        </div>'
);
        }
    }
ms_outHtml.push(''
,''
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_de1f0fe71fab4938a0f8f84b404b5927() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Filter_Dropdown", DisplayTemplate_de1f0fe71fab4938a0f8f84b404b5927);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fFilter_Dropdown_DNP.js", DisplayTemplate_de1f0fe71fab4938a0f8f84b404b5927);
}

}
RegisterTemplate_de1f0fe71fab4938a0f8f84b404b5927();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fFilter_Dropdown_DNP.js"), RegisterTemplate_de1f0fe71fab4938a0f8f84b404b5927);
}