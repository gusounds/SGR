/* Actualmente, este archivo está asociado a un archivo HTML del mismo nombre y está extrayendo contenido de él. No podrá mover, eliminar, cambiar el nombre ni hacer ninguna otra modificación en el archivo hasta que no los desasocie. */

function DisplayTemplate_1f14b594e70f408881c76cb5f7cd01eb(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_1f14b594e70f408881c76cb5f7cd01eb.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fItem_Buscador_DNP_Normativa.js';
  ctx['DisplayTemplateData']['TemplateType']='Item';
  ctx['DisplayTemplateData']['TargetControlType']=['SearchResults'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['ManagedPropertyMapping']={'Title':['Title'], 'Path':['Path'], 'HitHighlightedSummary':['HitHighlightedSummary'], 'HitHighlightedProperties':['HitHighlightedProperties'], 'ArticleStartDateOWSDATE':['ArticleStartDateOWSDATE'], 'FileType':['FileType'], 'CreatedOWSDATE':['CreatedOWSDATE'], 'PublishingContactNameOWSTEXT':['PublishingContactNameOWSTEXT'], 'Size':['Size'], 'Write':['Write'], 'CommentsOWSMTXT':['CommentsOWSMTXT']};
  var cachePreviousItemValuesFunction = ctx['ItemValues'];
  ctx['ItemValues'] = function(slotOrPropName) {
    return Srch.ValueInfo.getCachedCtxItemValue(ctx, slotOrPropName)
};

ms_outHtml.push('',''
);
        if(!$isNull(ctx.CurrentItem) && !$isNull(ctx.ClientControl)){
        	var id = ctx.CurrentItem.csr_id;
        	var currentItemIdx = ctx.CurrentItemIdx;

            var termsToUse = 2;
            var maxTitleLengthInChars = 126;
            var title = Srch.U.getHighlightedProperty(id, ctx.CurrentItem, "Title");
	        if ($isEmptyString(title)) {title = $htmlEncode(ctx.CurrentItem.Title)}

			var fecha = !$isNull(ctx.CurrentItem.ArticleStartDateOWSDATE) ? ctx.CurrentItem.ArticleStartDateOWSDATE : ctx.CurrentItem.CreatedOWSDATE;
			fecha = !$isNull(fecha) ? fecha : ctx.CurrentItem.Write;
            var fechaTexto = !$isNull(fecha) ? 'Fecha actualización/publicación: ' + utils.ConvertirTextoFechaTextoConFormato(fecha, 'YYYY-MM-DDThh:mm:ssTZD', 'MMMM DD [de] yyyy') : '';
            var displayPath = Srch.U.getHighlightedProperty(id, ctx.CurrentItem, "Path");
	        if ($isEmptyString(displayPath)) {displayPath = $htmlEncode(ctx.CurrentItem.Path)}
            var pathLength = ctx.CurrentItem.csr_PathLength;
            if(!pathLength) {pathLength = Srch.U.pathTruncationLength}
            var truncatedUrl = Srch.U.truncateHighlightedUrl(displayPath, pathLength);

            var autor = Srch.U.getTrimmedString(ctx.CurrentItem.PublishingContactNameOWSTEXT, 50)
            autor = (!$isNull(autor) && autor.length > 0) ? autor = ' - Autor: ' + autor : '' ;


ms_outHtml.push(''
,'			<a id="UrlDocumento',ctx.CurrentItemIdx,'" href="',ctx.CurrentItem.Path ,'" title="',ctx.CurrentItem.Title ,'">'
,'	            <article class="DNPHistorical-search">'
);
        			if(!$isNull(ctx.CurrentItem.FileType) && ctx.CurrentItem.FileType != 'html' && ctx.CurrentItem.FileType != 'mhtml' ){
        				var urlImg = '';
        				var altImg = '';

        				switch (ctx.CurrentItem.FileType) {
							case "docx":
							case "doc":
							case "docm":
							case "dot":
							case "nws":
							case "dotx":
								urlImg = '/assets/word.svg';
								altImg = 'Icono archivo Word';
								break;
							case "odc":
							case "ods":
							case "xls":
							case "xlsb":
							case "xlsm":
							case "xlsx":
							case "xltm":
							case "xltx":
							case "xlam":
								urlImg = '/assets/excel.svg';
								altImg = 'Icono archivo Excel';
								break;
							case "pdf":
								urlImg = '/assets/pdf.svg';
								altImg = 'Icono archivo Pdf';
								break;
							default:
    							urlImg = '/assets/generico.svg';
    							altImg = 'Icono archivo';
    							break
						}

        				var size = (!$isNull(ctx.CurrentItem.Size)) ? utils.FormatearBytes(ctx.CurrentItem.Size) : '' ;
ms_outHtml.push(''
,'		            	<!-- &#205;cono del documento -->'
,'			            <div class="DNPHistorical-search-icon">'
,'			                <img src="', urlImg ,'" alt="', altImg ,'" class="DNPHistorical-search-icon-image" />'
,'			                <p class="DNPHistorical-search-icon-size" id="fileSize',ctx.CurrentItemIdx,'">', size ,'</p>'
,'			            </div>'
);
        			}
ms_outHtml.push(''
,''
,'	                <div class="DNPHistorical-search-info">'
,'	                    <!-- T&#237;tulo del contenido -->'
,'	                    <h3 class="DNPHistorical-search-info-title">', Srch.U.trimTitle(title, maxTitleLengthInChars, termsToUse) ,'</h3>'
,'	                    <!-- Sumario del contenido -->'
,'	                    <p class="DNPHistorical-search-info-text">', Srch.U.processHHXML(ctx.CurrentItem.CommentsOWSMTXT) ,'</p>'
,'	                    <!-- Fecha del contenido y Autor -->'
,'	                    <p class="DNPHistorical-search-info-subtitle">', fechaTexto + autor ,' </p>'
,'	                    <!-- Enlaces a contenido  -->'
,'	                    <a title="', $htmlEncode(displayPath) ,'" class="DNPHistorical-search-link" href="',ctx.CurrentItem.Path ,'">', truncatedUrl ,'</a>'
,'	                </div>'
,'	            </article>'
,'	        </a>'
);
        }
ms_outHtml.push(''
,'    '
);

  ctx['ItemValues'] = cachePreviousItemValuesFunction;
  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_1f14b594e70f408881c76cb5f7cd01eb() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Item_WebPage", DisplayTemplate_1f14b594e70f408881c76cb5f7cd01eb);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fItem_Buscador_DNP_Normativa.js", DisplayTemplate_1f14b594e70f408881c76cb5f7cd01eb);
}

}
RegisterTemplate_1f14b594e70f408881c76cb5f7cd01eb();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fSearch\u002fItem_Buscador_DNP_Normativa.js"), RegisterTemplate_1f14b594e70f408881c76cb5f7cd01eb);
}