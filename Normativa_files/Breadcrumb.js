var breadcrumb = function () {
	return {
		_termsGlobalNav : [],

		GetParents : function(){
	  		return new Promise(resolve => {
	  			var parents = [];
	  			SP.SOD.executeFunc('sp.js', 'SP.ClientContext', function(){
			        SP.SOD.registerSod('sp.publishing.js', SP.Utilities.Utility.getLayoutsPageUrl('sp.publishing.js'));
			        SP.SOD.executeFunc('sp.publishing.js','SP.Publishing.Navigation.NavigationTermSet',function(){			
			            ctx = SP.ClientContext.get_current();
			            wns = SP.Publishing.Navigation.TaxonomyNavigation.getTermSetForWeb(ctx,ctx.get_web(),"GlobalNavigationTaxonomyProvider", true);
			            ctx.load(wns);
			            terms = wns.getAllTerms();
			            ctx.load(terms, 'Include(Id,Title,CategoryImageUrl,Terms, Parent, TargetUrl, FriendlyUrlSegment, SimpleLinkUrl)');
						
			            ctx.executeQueryAsync(function(){			            	
			            	var termsEnumerator = terms.getEnumerator();
						    while (termsEnumerator.moveNext()) {
						        var currentTerm = termsEnumerator.get_current();
						        var targetUrl = currentTerm.get_targetUrl().get_value();
						        var hasTerm = false;
						        if(targetUrl === _spPageContextInfo.serverRequestPath){
						        	hasTerm = true;
							        var parentsTerm = currentTerm.getAllParentTerms();							        
							        ctx.load(parentsTerm, 'Include(Id,Title,CategoryImageUrl,Terms, Parent, TargetUrl, FriendlyUrlSegment, SimpleLinkUrl)');
							        ctx.executeQueryAsync(function(){
							        	var parentsEnumerator = parentsTerm.getEnumerator();
							        	while (parentsEnumerator.moveNext()) {
							        		var parentTerm = parentsEnumerator.get_current();
							        		var parent = {
									        	name : parentTerm.get_title().get_value(),
									        	urlLenguajeSeñas : parentTerm.get_categoryImageUrl(),
									        	descripcionLenguajeSeñas : "Imagen en Lenguaje de señas de " + parentTerm.get_title().get_value(),
									        	guid : parentTerm.get_id().toString(),
									        	targetUrl : parentTerm.get_targetUrl().get_value(),
									        	friendlyUrlSegment : parentTerm.get_friendlyUrlSegment().get_value(),
									        	simpleLinkUrl : parentTerm.get_simpleLinkUrl()
									        };
									        parents.push(parent);
							        	}
							        	resolve({ hasTerm : hasTerm, parents: parents});
									},function (sender, args) {
								        console.log(args.get_message());
								        resolve({ hasTerm : hasTerm, parents: parents});
								    });
								    break;
						        }						        
				            }
				            if(!hasTerm){
				            	resolve({ hasTerm : hasTerm, parents: parents});
				            }
			            },function (sender, args) {
			            	console.log(args.get_message());
			            	resolve({ hasTerm : false, parents: parents});
					    });
			        }); 
			    });  
			});
	  	},
	  	
	  	validarTextoBreadcrumb : function(texto){	
	  		if(texto.length > 30){
	  			texto = texto.substring(0, 30) + '...';
	  		}
	  		
	  		var palabras = texto.split(' ');
	  		if(palabras.length > 3){
	  		
	  			texto = palabras.slice(0,3).join(' ') + '...'; 
	  		}
	  		return texto;
	  	},

		renderBreadcrumb : function(selector, classElements){	
			var oldCrumbs = $(selector + ' a.'+ classElements + ', ' + selector + ' span.' + classElements);
			var newCrubs = [];
			newCrubs.push($(document.createElement('li')).addClass(classElements).append(oldCrumbs.eq(0).removeClass(classElements)));
			
			breadcrumb.GetParents().then(function (value){
	  			if(value.hasTerm){
	  				if(value.parents.length > 0){
		  				var text = "";
		  				var link = "#";  				
	  				
		  				if(value.parents.length == 1){
			  				text = value.parents[0].name;
			  			}
			  			else{
			  				text = "Volver a " + value.parents[value.parents.length - 1].name;
			  			}
			  			
			  			if(value.parents[value.parents.length - 1].targetUrl != ""){
			  				link = "";
			  				value.parents.forEach(parent => link = "/" + parent.friendlyUrlSegment + link);
			  			}
			  			else if (value.parents[value.parents.length - 1].simpleLinkUrl != "" ){
			  				link = value.parents[value.parents.length - 1].simpleLinkUrl;
			  			}
			  			
			  			newCrubs.push($(document.createElement('li')).addClass(classElements).append($(document.createElement('a')).attr('href', link).text(text)));
			  		}
	  			}
	  			else{
	  				if(oldCrumbs.length > 3){
	  					oldCrumbs.eq(oldCrumbs.length - 2).text("Volver a " + oldCrumbs.eq(oldCrumbs.length - 2).text())
	  				}
	  				
	  				if(oldCrumbs.length >= 3)
	  				{
	  					newCrubs.push($(document.createElement('li')).addClass(classElements).append(oldCrumbs.eq(oldCrumbs.length - 2).removeClass(classElements)));
	  				}	  				
	  			}
	  			
	  			newCrubs.push($(document.createElement('li')).addClass(classElements).append(oldCrumbs.eq(oldCrumbs.length - 1).removeClass(classElements)));
	  			
	  			newCrubs.forEach(function(crub, index) {
				  $(crub).children().text(breadcrumb.validarTextoBreadcrumb($(crub).text()));
				});
				
	  			
	  			if(oldCrumbs.length > 1){
	  				$(selector).empty();
	  				$(selector).append(newCrubs);
	  				$(selector).show();
	  			}	  			
	  			
	  		});
		}
    };
}();