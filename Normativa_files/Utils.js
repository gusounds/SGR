var utils = (function () {
  return {
  
  	_spDateFormat: "",
  	_spDateSeparator: "",
  	_spWebProperties: {},
  	_list:{},
  
  	InitWebProperties: function (url){
  		return new Promise(resolve => {
	  		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
	  			var clientContext;
	  			if(url != ""){
	  				clientContext = new SP.ClientContext(url);
	  			}
	  			else{
					clientContext = SP.ClientContext.get_current();
				}
			    webProperties = clientContext.get_web().get_allProperties();
			    clientContext.load(webProperties);
				
				clientContext.executeQueryAsync(
				    function(sender,args) 
				    {
				    	utils._spWebProperties[url] = webProperties.get_fieldValues();		
						resolve(true);
				    },
				    function(sender,args)
				    {
				        console.log(args.get_message());
				        resolve(false);
				    }
				);
			});
		});
  	},
  	
  	InitRegionalVariables: function (){
  		return new Promise(resolve => {  		
	  		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
				var ctx = SP.ClientContext.get_current();
				var web = ctx.get_web();
				ctx.load(web);
				var regionalSettings = web.get_regionalSettings();
				ctx.load(regionalSettings);
				
				ctx.executeQueryAsync(
				    function(sender,args) 
				    {
				    	utils._spDateSeparator = regionalSettings.get_dateSeparator();
				    	switch (regionalSettings.get_dateFormat()) {
							case 0:
								utils._spDateFormat= "DD" + utils._spDateSeparator + "MM" + utils._spDateSeparator + "YYYY";
								break;
							case 1:
								utils._spDateFormat= "DD" + utils._spDateSeparator + "MM" + utils._spDateSeparator + "YYYY";
								break;
							case 2:
								utils._spDateFormat= "YYYY" + utils._spDateSeparator + "MM" + utils._spDateSeparator + "DDDD";
								break;						
						}					
						resolve(true);
				    },
				    function(sender,args)
				    {
				        console.log(args.get_message());
				        resolve(false);
				    }
				);
			});
		});
  	},
  	
  	ObtenerItemListaComoHTML : function (webUrl, listTitle, listItemId, properties, recargar){
  		return new Promise(resolve => {
  			if(recargar || typeof utils._list[webUrl+listTitle] == 'undefined' || utils._list[webUrl+listTitle] == null 
  				|| typeof utils._list[webUrl+listTitle][listItemId] == 'undefined' || utils._list[webUrl+listTitle][listItemId] == null){
  				var request;
  				var urlApi = `${webUrl}_api/web/lists/GetByTitle('${listTitle}')/items(${listItemId})/FieldValuesAsHtml`;
  				if(typeof properties != 'undefined'){
  					urlApi = urlApi + '?$select=' + properties;
  				}
		  		request = $.ajax({
					url: urlApi,
					method: "GET",
					headers: {
						"accept": "application/json; odata=verbose",
					},
					success: function (result) {
						if(typeof result.d != 'undefined' && result.d != null){
							if(typeof utils._list[webUrl+listTitle] == 'undefined' || utils._list[webUrl+listTitle] == null){
								utils._list[webUrl+listTitle] = {};
							}
							utils._list[webUrl+listTitle][listItemId] = result.d;
					        resolve(result.d);
					    }
					    else{
					    	resolve(null);
					    }
					},
		            error: function (error) {
	            		console.log(error.toString());
				    	resolve(null);
		            }
				});
			}
			else{
				resolve(utils._list[webUrl+listTitle][listItemId]);
			}
		});
  	},
  	
	ObtenerItemListaIDComoHTML : function (webUrl, listID, listItemId, properties){
  		return new Promise(resolve => {
			var request;
			var urlApi = `${webUrl}_api/web/lists/GetById('${listID}')/items(${listItemId})/FieldValuesAsText`;
			if(typeof properties != 'undefined'){
				urlApi = urlApi + '?$select=' + properties;
			}
	  		request = $.ajax({
				url: urlApi,
				method: "GET",
				crossDomain: true,
				headers: {
					"accept": "application/json; odata=verbose",
				},
				success: function (result) {
					if(typeof result.d != 'undefined' && result.d != null){
				        resolve(result.d);
				    }
				    else{
				    	resolve(null);
				    }
				},
	            error: function (error) {
            		console.log(error.toString());
			    	resolve(null);
	            }
			});
		});
  	}, 	

  	
  	GetValuesList : function (webUrl, listTitle, viewXml, recargar){
  		return new Promise(resolve => {
  			if(recargar || typeof utils._list[webUrl+listTitle] == 'undefined' || utils._list[webUrl+listTitle] == null ){
		  		ExecuteOrDelayUntilScriptLoaded(function(){	
					var clientContext = new SP.ClientContext(webUrl);
			 	    var oList = clientContext.get_web().get_lists().getByTitle(listTitle);
				    var camlQuery = new SP.CamlQuery();
				    camlQuery.set_viewXml(viewXml);
				    var collListItem = oList.getItems(camlQuery);
				    clientContext.load(collListItem);
				    clientContext.executeQueryAsync(function(){
				        var listItemEnumerator = collListItem.getEnumerator();
				        var elements = {};
					    while (listItemEnumerator.moveNext()) {
					        var oListItem = listItemEnumerator.get_current();				        
					        var id = oListItem.get_item('ID').toString();
					        elements[id] = oListItem;
					    }
					    utils._list[webUrl+listTitle] = elements;
					    resolve(elements);
				    }, function (sender, args) {
				        console.log(args.get_message());
				        resolve(null);
				    });
				}, 'sp.js');
			}
			else{
				resolve(utils._list[webUrl+listTitle]);
			}
		});
  	},
  	
  	ObtenerSpDateFormat: function (){
  		if(utils._spDateFormat == ""){
  			return new Promise((resolve) => { 
  				utils.InitRegionalVariables().then((result) => {
  					resolve(utils._spDateFormat);
  				}); 
  			});
  		}
  		else{
  			return new Promise((resolve) => { resolve(utils._spDateFormat) });
  		}
  	},
  	
  	ObtenerSpWebProperties: function (url = ""){
  		if(utils._spWebProperties[url] == null){
  			return new Promise((resolve) => { 
  				utils.InitWebProperties(url).then((result) => {
  					resolve(utils._spWebProperties[url]);
  				}); 
  			});
  		}
  		else{
  			return new Promise((resolve) => { resolve(utils._spWebProperties[url]) });
  		}
  	},
  	
  	ObtenerCurrentListItem: function (){
		return new Promise(resolve => {
	  		SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
				var context = SP.ClientContext.get_current();
				var web = context.get_web(); 
				var currentList = web.get_lists().getById(_spPageContextInfo.pageListId); 
				var currentListItem = currentList.getItemById(_spPageContextInfo.pageItemId);
				context.load(currentListItem);
				context.executeQueryAsync(function(){
					resolve(currentListItem);
				});
			});
		});
	},
  	
  	ConvertirTextoFechaTextoConFormato: function(sFecha, initialFormatString ,formatString){
  		var fecha = moment(sFecha, initialFormatString).format(formatString);
		fecha = fecha.charAt(0).toUpperCase() + fecha.slice(1);
		return fecha;
  	},
  	
  	RenderizarFecha: function( selector, formatString, initialFormatString ){
		if(typeof href == 'undefined'){
	  		utils.ObtenerSpDateFormat().then(function (result){
	  			$(selector).each(function(i, val){  			
		  			var fecha = utils.ConvertirTextoFechaTextoConFormato($(this).text().trim(), result, formatString);
		  			$(this).text(fecha);
				});
	  		});
  		}
  		else{
  			$(selector).each(function(i, val){  			
	  			var fecha = utils.ConvertirTextoFechaTextoConFormato($(this).text().trim(), initialFormatString, formatString);
	  			$(this).text(fecha);
			});
  		}
  	},
    
    RenderizarImagen: function(img, selector){
    	var imagen = $(img);
    	var src = '';
    	if(imagen.length == 1){
    		src = imagen.attr("src");
    	}
    	else{
    		var indexHttps = img.indexOf('src="https&#58') + 5;
    		var indexFirst = img.indexOf('"', indexHttps + 1);
    		var indexSecond = img.indexOf('"', indexFirst + 1);
    		img = img.substring(0, indexFirst) + "'" + img.substring(indexFirst + 1);
    		img = img.substring(0, indexSecond) + "'" + img.substring(indexSecond+ 1);
    		src = $(img).attr("src").replace('https://', '');   
    		var anchor = $(src);
    		src = anchor.attr('href');
    	}
    	var alt = imagen.attr("alt");
    	$(selector).attr("src", src).attr("alt", alt);
    },
	
	RenderizarPicture: function(imgDesktop, imgMobile, selector){
		if(imgDesktop != '')
		{
	    	var imagenDesktop = $(imgDesktop);
	    	var imagenMobile = $(imgMobile);
	    	var srcDesktop = imagenDesktop.attr("src");
	    	var srcMobile = imagenMobile.attr("src");
	    	var alt = imagenDesktop.attr("alt");
	    	var jSelector = $(selector);
	    	jSelector.find('source[media="(min-width: 600px)"]').attr("srcset", srcDesktop);
	    	jSelector.find('source[media="(max-width: 600px)"]').attr("srcset", srcMobile);
	    	jSelector.find('img').attr("src", srcDesktop).attr("alt", alt);
	    }
	    else{
    		$(selector).css("display", "none");
    	}  
    },
    
    RenderizarUrlComoImagen: function(url, cssClass){
    	var jUrl = $(url);
    	var href = jUrl.attr("href");
    	var alt = jUrl.text();
    	$('.' + cssClass).attr("src", href).attr("alt", alt);
    },
    
    RenderizarUrlComoIframe: function(url, selector){
    	var jUrl = $(url);
    	var src = jUrl.attr("href");
    	var title = jUrl.text();
    	if((typeof src != 'undefined') &&  (src != "")){
	    	$(selector).attr("src", src).attr("title", title).css("display", "");
    	}
    	else{
    		$(selector).css("display", "none");
    	}    	
    },
    
    EstablecerUrlEnIframe: function(selector, src, title){
    	if((typeof src != 'undefined') &&  (src != "")){
	    	$(selector).attr("src", src).attr("title", title).css("display", "");
    	}
    	else{
    		$(selector).css("display", "none");
    	}    	
    },

    
    RenderizarUrl: function(url, selector, abrirNuevaVentana, visibleVacio){
    	var jUrl = $(url);    	
    	var href = jUrl.attr("href");
    	var title = jUrl.text();
    	if((typeof href != 'undefined') &&  (href != "")){
	    	$(selector).attr("href", href).attr("title", title).css("display", "");
    	}
    	else if(typeof visibleVacio == 'undefined' || !visibleVacio ){
    		$(selector).remove();
    	}
    	else{
	    	$(selector).attr("href", '#');
    	}
    	if(typeof abrirNuevaVentana != 'undefined' && abrirNuevaVentana){
    		$(selector).attr("target", '_blank')
    	}
    	
    },    
    
    
    RenderizarEtiquetasTaxonomy: function(selector, cssClassEtiqueta = "DNPTags-item"){
    	var maxEtiquetas = 15;
    	utils.ObtenerSpWebProperties().then(function (result){
    		
    		var resultsPageAddress = JSON.parse(result.SRCH_SB_SET_WEB).ResultsPageAddress + '?k=Tags:';
    		
	    	var jSelector = $(selector);
	    	var etiquetas = jSelector.find('span');    	
	    	etiquetas.each(function(i, val){
	    		if(i < maxEtiquetas){
		    		aEtiqueta = $(document.createElement('a')).addClass(cssClassEtiqueta).attr('href', resultsPageAddress + $(this).text()).text($(this).text());
		    		$(this).replaceWith(aEtiqueta);
		    	}
		    	else{
		    		$(this).remove();
		    	}		    		
	    	});
	    	jSelector.find(':not(a)').remove();
	    	jSelector.html(jSelector.html().replace(/;/g, ''));
	    });
    },
    
    RenderizarLookupComoUrl : function(urlPage, lookupFieldName, selector){
    	ExecuteOrDelayUntilScriptLoaded(function (){
	    	var ctx = SP.ClientContext.get_current(); 
			var relUrl = urlPage.replace(_spPageContextInfo.siteAbsoluteUrl,'');  //convert to relative url
			var file = ctx.get_web().getFileByServerRelativeUrl(relUrl);   
			ctx.load(file,'ListItemAllFields'); 
				
			field = file.get_listItemAllFields().get_contentType().get_fields().getByInternalNameOrTitle(lookupFieldName);
			ctx.load(field, 'LookupList');				
			
			ctx.executeQueryAsync(function() {
				var lookupFieldValue = file.get_listItemAllFields().get_item(lookupFieldName);
				var lookupFieldValueText = lookupFieldValue.get_lookupValue();
				var lookupFieldValueId = lookupFieldValue.get_lookupId();
				
				var lookupField = ctx.castTo(field, SP.FieldLookup);
				var lookupList = ctx.get_web().get_lists().getById(lookupField.get_lookupList());
				var lookupItem = lookupList.getItemById(lookupFieldValueId);			
				ctx.load(lookupItem, 'FileRef');
			    ctx.executeQueryAsync(function (){
			    	var lookupUrl = lookupItem.get_item('FileRef');
			    	$(selector).each(function(index) {
			    		$(this).attr('href', lookupUrl);
			    		$(this).text($(this).text() +  ' ' + lookupFieldValueText);
					});
			    });
			});
		}, "sp.js");
    },

	RenderizarGaleriaImagenesDesdeSummaryLinks: function(selector, fieldName){
		var maxImagenes = 10;
    	utils.ObtenerCurrentListItem().then(function (result){
    		var jSelector = $(selector);
    		var field = $(result.get_item(fieldName));
    		var imagesLinks = field.find('div[title="_link"] > span[title="_linkurl"]');
    		$(selector).each(function(index) {
    			selector = $(this);
    			$(imagesLinks).each(function(index) {
    				if(index < maxImagenes){
						var img = $('<img class="DNPGallery-element DNPGallerycontent-element" />')
							.attr('src', $(this).find('a').attr('href') )
							.attr('alt', $(this).parent().find('span[title="_title"]').text());
						selector.append(img);
					}
    			});
    			DNPcreateDots($(this).prop('id'), 'DNPGallery-buttons-dots-element', 'imagen');
    		});
	    });
    },

    
    ConvertirLinkATexto : function(selector){
		$(selector).each(
			function(index) {
				var link = $(this);
				$(this).after(link.text());
				$(this).remove();
			}
		);
    },
    
    ColocarSoloPrimerParrafo: function(selector, limite){
		$(selector).each(
			function(index) {
				var parrafo = $(this).find("p:first");
				var texto = parrafo.text().replace(/[\u200B-\u200D\uFEFF]/g, '');
				if(texto.length > limite){
					texto = texto.substring(0, limite) + '...';
				}
				$(this).html(texto);
				var elementohtml = $("<div />").append($(this).clone()).html()
					.replaceAll($(this).prop("tagName").toLowerCase() + '>', 'p>' )
					.replaceAll('<' + $(this).prop("tagName").toLowerCase(), '<p' );
				$(this).replaceWith($(elementohtml));
			}
		);
    },
    
    ObtenerTamanoUrl: function (url, numDecimales = 0, numIntento = 0) {
    	return new Promise(resolve => {		  
	    	try
	    	{
	    		if(url.includes("colaboracion.dnp.gov.co")){
		    		const searchUrlColaboracion = "/_api/search/query?QueryTemplatePropertiesUrl='spfile:%2f%2fwebroot%2fqueryparametertemplate.xml'&selectproperties='Size'&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'&querytext=";
		    		var searchUrl = searchUrlColaboracion + "'path:" + escapeProperly(url) + "'";
		    		var request;
					request = $.ajax({
						url: searchUrl,
						method: "GET",
						headers: {
							"accept": "application/json; odata=verbose",
						},
						success: function (result) {
							if(result.d.query.PrimaryQueryResult.RelevantResults.RowCount > 0){
								
								var fileSize = result.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[0].Cells.results.find(c => c.Key == "Size" && c.ValueType == "Edm.Int64").Value;
						        resolve(utils.FormatearBytes(parseInt(fileSize), numDecimales));
						    }
						    else{
						    	resolve(null);
						    }
						},
			            error: function (error) {
			            	if(numIntento < 5){
			            		utils.ObtenerTamanoUrl(url, numDecimales , numIntento + 1).then(function (result){
			            			resolve(result);
			            		});
			            	}
			            	else{
			            		console.log(error.toString());
						    	resolve(null);				    	
			            	}
					    	
			            }
					});
	    		}
	    		else{
		    		var request;
					request = $.ajax({
						type: "HEAD",
						url: url,
						success: function () {
							var fileSize = request.getResponseHeader("Content-Length");
					        resolve(utils.FormatearBytes(parseInt(fileSize), numDecimales));
						},
			            error: function (error) {
					    	console.log(error.toString());
					    	resolve(null);				    	
			            }
					});
				}
		    }
		    catch(e)
		    {
		    	console.log(e.toString());
		    	resolve(null);
		    }
	    });
	},
	
	ObtenerTipoArchivoUrl: function (url, numIntento = 0) {
    	return new Promise(resolve => {		  
	    	try
	    	{
	    		if(url.includes("colaboracion.dnp.gov.co")){
		    		const searchUrlColaboracion = "/_api/search/query?QueryTemplatePropertiesUrl='spfile:%2f%2fwebroot%2fqueryparametertemplate.xml'&selectproperties='FileType'&sourceid='8413cd39-2156-4e00-b54d-11efd9abdb89'&querytext=";
		    		var searchUrl = searchUrlColaboracion + "'path:" + escapeProperly(url) + "'";
		    		var request;
					request = $.ajax({
						url: searchUrl,
						method: "GET",
						headers: {
							"accept": "application/json; odata=verbose",
						},
						success: function (result) {
							if(result.d.query.PrimaryQueryResult.RelevantResults.RowCount > 0){
								
								var fileType = result.d.query.PrimaryQueryResult.RelevantResults.Table.Rows.results[0].Cells.results.find(c => c.Key = "FileType" && c.ValueType == "Edm.String").Value;
						        resolve(fileType);
						    }
						    else{
						    	resolve(null);
						    }
						},
			            error: function (error) {
			            	if(numIntento < 5){
			            		utils.ObtenerTipoArchivoUrl(url, numIntento + 1).then(function (result){
			            			resolve(result);
			            		});
			            	}
			            	else{
			            		console.log(error.toString());
						    	resolve(null);				    	
			            	}
					    	
			            }
					});
	    		}
	    		else{
	    			resolve(null);
				}
		    }
		    catch(e)
		    {
		    	console.log(e.toString());
		    	resolve(null);
		    }
	    });
	},
	
	FormatearBytes : function (bytes, decimals = 2) {
	    if (!+bytes) return '0 Bytes';

	    const k = 1024;
	    const dm = decimals < 0 ? 0 : decimals;
	    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

	    const i = Math.floor(Math.log(bytes) / Math.log(k));

	    return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
	},
	
	AsegurarLibreria : function(urlLibreria, objeto){
		return new Promise(resolve => {	
			if (TypeofFullName(objeto) === 'undefined') {
				$.getScript(urlLibreria, function () {
					utils.AsegurarLibreria(urlLibreria, objeto).then( function (){
						resolve();
					});
				});				
			}
			else{
				resolve();
			}
		});
	},
	
	ObtenerEtiquetasCampoTaxonomy : function(strTaxonomy){
		var prefijos = strTaxonomy.split(';')
		var etiquetas = [];
		for (var prefijo of prefijos ) {
			if(prefijo.startsWith('L0')){
				var termino = prefijo.split('|');
				etiquetas.push(termino[2]);
			}
		}
		return etiquetas;
	}

	
  };
})();
