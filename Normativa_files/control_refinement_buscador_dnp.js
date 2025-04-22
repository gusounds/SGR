/* Actualmente, este archivo está asociado a un archivo HTML del mismo nombre y está extrayendo contenido de él. No podrá mover, eliminar, cambiar el nombre ni hacer ninguna otra modificación en el archivo hasta que no los desasocie. */

function DisplayTemplate_15b3e709a32d4e6080b73c3d8a30dca2(ctx) {
  var ms_outHtml=[];
  var cachePreviousTemplateData = ctx['DisplayTemplateData'];
  ctx['DisplayTemplateData'] = new Object();
  DisplayTemplate_15b3e709a32d4e6080b73c3d8a30dca2.DisplayTemplateData = ctx['DisplayTemplateData'];

  ctx['DisplayTemplateData']['TemplateUrl']='~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fControl_Refinement_Buscador_DNP.js';
  ctx['DisplayTemplateData']['TemplateType']='Control';
  ctx['DisplayTemplateData']['TargetControlType']=['Refinement'];
  this.DisplayTemplateData = ctx['DisplayTemplateData'];

ms_outHtml.push('',''
); 

        ctx.ClientControl.alternateRenderer = function(container, cntxt) {};
        if(!$isNull(ctx.ClientControl)){
            var rcs = ctx.ClientControl.get_selectedRefinementControls();
            
            ctx.ClientControl.add_resultRendered(function(source, arg){
            	if(source.get_shouldShowNoResultMessage()){
            		$('#Refinement').hide();
            	}
            	else{
            		$('#Refinement').show();
            	}
            	
            });
            
            if(!$isEmptyArray(rcs)){
ms_outHtml.push(''
,'				<div id="Refinement" name="Control" class="DNPresults-search">'
,'		        	<p>Filtros de b&#250;squeda</p>'
,'		        	<div class="DNP-line"></div>	'
);
                    for(var i = 0; i < rcs.length; i++){
                        var rc = rcs[i];
                        if(!$isNull(rc)){
                            rc.containerId = ctx.ClientControl.get_nextUniqueId(); 
ms_outHtml.push(''
,'                            <div id="', $htmlEncode(rc.containerId) ,'" name="Group" refinerName="', $htmlEncode(rc.propertyName) ,'"></div>                            '
); 
                        }
                    }
ms_outHtml.push(''
,'				</div>'
);

            }
ms_outHtml.push(''
,'            <div id="', ctx.ClientControl.get_emptyRefinementMessageId() ,'" class="ms-hide">'
,'            </div>'
);
        }
        
ms_outHtml.push(''
,'        '
,'    '
);

  ctx['DisplayTemplateData'] = cachePreviousTemplateData;
  return ms_outHtml.join('');
}
function RegisterTemplate_15b3e709a32d4e6080b73c3d8a30dca2() {

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("Control_Refinement", DisplayTemplate_15b3e709a32d4e6080b73c3d8a30dca2);
}

if ("undefined" != typeof (Srch) &&"undefined" != typeof (Srch.U) &&typeof(Srch.U.registerRenderTemplateByName) == "function") {
  Srch.U.registerRenderTemplateByName("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fControl_Refinement_Buscador_DNP.js", DisplayTemplate_15b3e709a32d4e6080b73c3d8a30dca2);
}

}
RegisterTemplate_15b3e709a32d4e6080b73c3d8a30dca2();
if (typeof(RegisterModuleInit) == "function" && typeof(Srch.U.replaceUrlTokens) == "function") {
  RegisterModuleInit(Srch.U.replaceUrlTokens("~sitecollection\u002f_catalogs\u002fmasterpage\u002fDisplay Templates\u002fFilters\u002fControl_Refinement_Buscador_DNP.js"), RegisterTemplate_15b3e709a32d4e6080b73c3d8a30dca2);
}