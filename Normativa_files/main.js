var TitleList = 'Menú Horizontal';
var IncludeFields = 'Title, ID, FileLeafRef, FileDirRef,MenuUrl,MenuAccesKey,MenuActivo,MenuOrden,MenuTituloMostrar,MenuAbrirNuevaVentana';

//Cambia el texto de los div para el tab de userway
document.addEventListener("userway:render_completed", function(event) {
    var div = $('#uw-skip-to-main');
    div.attr('aria-label', 'Ir al contenido principal');
    div.find('.uw-exclude.title').html('Ir al contenido principal');
    
    div = $('#uw-enable-visibility');
    div.remove();
    //div.attr('aria-label', 'Habilitar la accesibilidad para personas con discapacidad visual');
    //div.find('.uw-exclude.title').html('Habilitar la accesibilidad para personas con discapacidad visual');

    div = $('#uw-open-accessibility');
    div.attr('aria-label', 'Abrir el menú de accesibilidad');
    div.find('.uw-exclude.title').html('Abrir el menú de accesibilidad.');
});


$(document).ready(function() {
	$("#idSearch").on('keypress',function(e) {
	    if(e.which == 13) {
	        buscar();
	        return false;
	    }
	});
    $("#btnSearch").click(buscar);
    
	$('footer a').each(function(i, val){ 
		var href = $(this).attr('href');
		var element = $(this);
		if(typeof href != 'undefined'){
			element.attr('href', unescape(href));
		}
	});

	$('#s4-bodyContainer img').each(function(i, val){ 
		var src = $(this).attr('src');
		var element = $(this);
		if(typeof src != 'undefined'){
			ExecuteOrDelayUntilScriptLoaded(function(){
				element.attr('src', STSHtmlDecode(src));
			}, 'init.js');
		}
	});
	
	$('#s4-bodyContainer picture>source').each(function(i, val){ 
		var element = $(this);
		ExecuteOrDelayUntilScriptLoaded(function(){
			element.attr('srcset', element.attr('srcset').replace('&#58;', ':'));
		}, 'init.js');
	});
	
	$('.preloadImages').remove();
	
	moment.locale(_spPageContextInfo.currentUICultureName);	
	
});

var menu = function () {
	return {
		_termsGlobalNav : [],

		GlobalNavInit : function(callback) {
	        SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
		        SP.SOD.registerSod('sp.publishing.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.publishing.js'));
		        SP.SOD.executeFunc('sp.publishing.js','SP.Publishing.Navigation.NavigationTermSet',function(){
	                menu.GlobalNavLoad(callback);                
	            });
	        });
	    },

		GlobalNavLoad: function (callback) {
		    ctx = SP.ClientContext.get_current();
            wns = SP.Publishing.Navigation.TaxonomyNavigation.getTermSetForWeb(ctx,ctx.get_web(),"GlobalNavigationTaxonomyProvider", true);
            ctx.load(wns);
            var terms = wns.get_terms();
            ctx.load(terms, 'Include(Id,Title,CategoryImageUrl,Terms,Parent.Id, TargetUrl)');
		
            ctx.executeQueryAsync(function(){
		        menu.createTermsGlobalNav(terms, callback);
		    }, function (sender, args) {
		        console.log(args.get_message());
		    });
		},

		createTermsGlobalNav : function (terms, callback) {
		    var termsEnumerator = terms.getEnumerator();
		    
		    while (termsEnumerator.moveNext()) {
		        var currentTerm = termsEnumerator.get_current();
		        var navTerm = {
		        	name : currentTerm.get_title().get_value(),
		        	urlLenguajeSeñas : currentTerm.get_categoryImageUrl(),
		        	descripcionLenguajeSeñas : "Imagen en Lenguaje de señas de " + currentTerm.get_title().get_value(),
		        	guid : currentTerm.get_id().toString()		        	
		        };
		        menu._termsGlobalNav.push(navTerm)
		        		        
		    }
		    callback();
		},

		sortTermsFromTree : function (tree) {
		        // Check to see if the get_customSortOrder function is defined. If the term is actually a term collection,
		        // there is nothing to sort.
		    if (tree.children.length && tree.term.get_customSortOrder) {
		        var sortOrder = null;
		
		        if (tree.term.get_customSortOrder()) {
		            sortOrder = tree.term.get_customSortOrder();
		        }
		
		        // If not null, the custom sort order is a string of GUIDs, delimited by a :
		        if (sortOrder) {
		            sortOrder = sortOrder.split(':');
		
		            tree.children.sort(function (a, b) {
		                var indexA = sortOrder.indexOf(a.guid);
		                var indexB = sortOrder.indexOf(b.guid);
		
		                if (indexA > indexB) {
		                    return 1;
		                } else if (indexA < indexB) {
		                    return -1;
		                }
		
		                return 0;
		            });
		        }
		        // If null, terms are just sorted alphabetically
		        else {
		            tree.children.sort(function (a, b) {
		                if (a.title > b.title) {
		                    return 1;
		                } else if (a.title < b.title) {
		                    return -1;
		                }
		
		                return 0;
		            });
		        }
		    }
		
		    for (var i = 0; i < tree.children.length; i++) {
		        tree.children[i] = menu.sortTermsFromTree(tree.children[i]);
		    }
		
		    return tree;
		},
		
		renderMenuGlobal : function(){
			$('nav.DNPNav>div').removeClass().addClass('navbar-navs');														
			$('.navbar-navs').find(':not(.ms-hidden, button.navbar-toggler, .ms-listMenu-editLink, .ms-listMenu-editLink *)').removeClass();										 
			$('.navbar-navs>ul').addClass('DNPNav-menu').attr("role", "menubar");
			$('.navbar-navs>ul>li').addClass('DNPNav-menu-item').attr("role", "menuitem").attr("aria-haspopup","true");
			$('.navbar-navs>ul>li:nth-child(n+9)').hide();
			$('.navbar-navs>ul>li ul').each(function(i, val){
				$(this).replaceWith($('<ul class="DNPNav-menu-item-submenu"><div class="DNPNav-menu-item-submenu-container">' + $(this).html() + '</div></ul>'));
			});
			$('.navbar-navs>ul>li ul').addClass('DNPNav-menu-item-submenu').attr("role","menu");									
			$('.navbar-navs>ul ul li').addClass('DNPNav-menu-item-submenu-item').attr("role","menuitem");
			$('.navbar-navs li>span').each(function(i, val){
				$(this).replaceWith($('<a href="#">' + $(this).html() + '</a>'));
			});
			$('.navbar-navs li>a').attr("role","link");
			$('.DNPNav-menu-item:not(.ms-navedit-editArea)').each(function(i, val){
				var id = 'DN_' + i;
				$(this).prop("id", id);
				$(this).prepend('<div class="DNPNav-menu-item-corner"></div>');
				if($(this).children('ul').length == 0){
					$(this).append('<ul class="DNPNav-menu-item-submenu"></ul>');
				}
				
				$(this).find('.DNPNav-menu-item-corner').click( f => {
					DNPopen(id, 'DNPNav-menu-item');
				});
			});/**/
			$('nav.DNPNav').show();
			SP.SOD.executeFunc('sp.runtime.js', 'SP.ClientContext', function () { /*alert("sp.runtime.js loaded");*/ });
		    SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function () { /*alert("sp.js loaded");*/ });
		    menu.GlobalNavInit(function (){
				$('.DNPNav-menu-item:not(.ms-navedit-editArea)').each(function(i, val){
					if(!IsNullOrUndefined(menu._termsGlobalNav[i].urlLenguajeSeñas) && menu._termsGlobalNav[i].urlLenguajeSeñas != ''){
						$(this).children('ul').css('--data-before',"url('" + menu._termsGlobalNav[i].urlLenguajeSeñas + "')");
					}					
				});

			});
		}
    };
}();

function buscar(){	
	var urlWebBuscador = "/";
	utils.ObtenerSpWebProperties(urlWebBuscador).then(function (result){	
		var resultsPageAddress = JSON.parse(result.SRCH_SB_SET_WEB).ResultsPageAddress + '#k=' + $("#idSearch").val();
		$(location).attr('href', resultsPageAddress); 	
    });	
    //$(location).attr('href', 'https://2022.dnp.gov.co/DNPN/Paginas/Buscador.aspx?q=' + $("#idSearch").val()); 	
}



function getItemsTest() { 
	SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
        SP.SOD.registerSod('sp.publishing.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.publishing.js'));
        SP.SOD.executeFunc('sp.publishing.js','SP.Publishing.Navigation.NavigationTermSet',function(){

            ctx = SP.ClientContext.get_current();
            wns = SP.Publishing.Navigation.TaxonomyNavigation.getTermSetForWeb(ctx,ctx.get_web(),"GlobalNavigationTaxonomyProvider", true);
            ctx.load(wns);
            terms = wns.getAllTerms();
            ctx.load(terms, 'Include(Id,Title,CategoryImageUrl,Terms, Parent, TargetUrl)');
		
            ctx.executeQueryAsync(function(){
            	var termsEnumerator = terms.getEnumerator();
			    while (termsEnumerator.moveNext()) {
			        var currentTerm = termsEnumerator.get_current();
			        var targetUrl = currentTerm.get_targetUrl().get_value();
			        if(targetUrl === _spPageContextInfo.serverRequestPath){
				        var parents = currentTerm.getAllParentTerms();
				        ctx.load(parents, 'Include(Id,Title,CategoryImageUrl,Terms, Parent, TargetUrl)');
				        ctx.executeQueryAsync(function(){
				        	var parentsEnumerator = parents.getEnumerator();
				        	while (parentsEnumerator.moveNext()) {
				        		var parent = parentsEnumerator.get_current();
				        	}
				        	console.log(currentTerm.get_categoryImageUrl());
						},function (sender, args) {
					        console.log(args.get_message());
					    });
			        }
	            }
            },function (sender, args) {
		        console.log(args.get_message());
		    });
        }); 
    });  
}  

if(typeof(window.showModalDialog) != 'function') {

	window.showModalDialog = function (url, arg, feature) {
	    var opFeature = feature.split(";");
	    var featuresArray = new Array()
	    if (document.all) {
	        for (var i = 0; i < opFeature.length - 1; i++) {
	            var f = opFeature[i].split("=");
	            featuresArray[f[0]] = f[1];
	        }
	    }
	    else {

	        for (var i = 0; i < opFeature.length - 1; i++) {
	            var f = opFeature[i].split(":");
	            featuresArray[f[0].toString().trim().toLowerCase()] = f[1].toString().trim();
	        }
	    }



	    var h = "200px", w = "400px", l = "100px", t = "100px", r = "yes", c = "yes", s = "no";
	    if (featuresArray["dialogheight"]) h = featuresArray["dialogheight"];
	    if (featuresArray["dialogwidth"]) w = featuresArray["dialogwidth"];
	    if (featuresArray["dialogleft"]) l = featuresArray["dialogleft"];
	    if (featuresArray["dialogtop"]) t = featuresArray["dialogtop"];
	    if (featuresArray["resizable"]) r = featuresArray["resizable"];
	    if (featuresArray["center"]) c = featuresArray["center"];
	    if (featuresArray["status"]) s = featuresArray["status"];
	    var modelFeature = "height = " + h + ",width = " + w + ",left=" + l + ",top=" + t + ",model=yes,alwaysRaised=yes" + ",resizable= " + r + ",celter=" + c + ",status=" + s;

	    var model = window.open(url, "", modelFeature, null);
	    model.dialogArguments = arg;

	    var timer = setInterval(function() {
		    if(model.closed) {
		        clearInterval(timer);
		        var result = null;
		        if (document.getElementById("__spPickerHasReturnValue") != null && document.getElementById("__spPickerHasReturnValue").value == "1" ) {
		        	result = document.getElementById("__spPickerReturnValueHolder").value;
		        }
		        else if(typeof window.commonModalDialogReturnValue != "undefined" && (!Mso_ContentSaveSucceeded || window.commonModalDialogReturnValue.retVal != Mso_TargetHiddenField.value)){
		        	result = window.commonModalDialogReturnValue.retVal;
		        }

		        if (result != null) {
			        Mso_TargetHiddenField.value = result;
			        if (typeof varWebPart != "undefined" && varWebPart != null) {
			            try {
			                Mso_ContentSaveSucceeded = false;
			                (varWebPart.Properties.Item(nameSpace)).Value = window.commonModalDialogReturnValue;
			                varWebPart.Save(false, SaveCallBack);
			            }
			            catch (e) {
			                alert(Strings.STS.L_ContentEditorSaveFailed_ERR);
			            }
			        }
			    }
		    }
		}, 1000);
	}
}