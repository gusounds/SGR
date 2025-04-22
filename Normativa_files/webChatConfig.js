const date = new Date();

//Generar key AES
generateKey()
  .then((key) => {

	//Encriptar key AES
	encryptKey(key,generarID())
	.then((ciphertext) => {
	
		// Aplicar webchat
		const store = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
		//console.log(action,"----->");//PARA DEGUG ESTA LINEA
		if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
			dispatch({
				type: 'WEB_CHAT/SEND_EVENT',
				payload: {
					name: 'webchat/join',
					value: { language: 'es-es' }
				}
			});
		}

		if(action.type === 'DIRECT_LINE/INCOMING_ACTIVITY'){
			setTimeout(applyButtonStyle, 100);
		}
		return next(action);
		});
	
		var directLineCreated = window.WebChat.createDirectLine(
			{
				secret: obtenerToken(),
				user: myUser
			});
		
	//Decripyt key
	decryptMessagex(ciphertext)
	.then((decrypted) => {
			let dec = new TextDecoder();
		
		//Render webchat
		var renderwebChatvar = window.WebChat.renderWebChat({
			directLine: directLineCreated,
			store,
			userID: dec.decode(decrypted),
			username: myUser.name,
			locale: 'es-ES',
			overrideLocalizedStrings: (strings, language) => ({
				...strings,
				TEXT_INPUT_PLACEHOLDER: 'Ingrese su consulta...'
				}),
				styleOptions
			},webChatContainer);
		
		//Create webchat	
		function createChat() {
			window.WebChat.renderWebChat(
			{
			  directLine: window.WebChat.createDirectLine(
			  { 
				secret: obtenerToken(),
				user: myUser
			  }),store,
				userID: dec.decode(decrypted),
				username: myUser.name,
				locale: 'es-ES',
				overrideLocalizedStrings: (strings, language) => ({
				...strings,
				TEXT_INPUT_PLACEHOLDER: 'Ingrese su consulta...'
				}),styleOptions
			},webChatContainer);
		}
					
	})
	.catch((error) => {
	console.error('Error desencriptando:', error);
	});
				
		function createStore(){
			const storex = window.WebChat.createStore({}, ({ dispatch }) => next => action => {
			//console.log(action,"----->");//PARA DEGUG ESTA LINEA
			if (action.type === 'DIRECT_LINE/CONNECT_FULFILLED') {
				dispatch({
					type: 'WEB_CHAT/SEND_EVENT',
					payload: {
						name: 'webchat/join',
						value: { language: 'es-es' }
					}
				});
			}

			if(action.type === 'DIRECT_LINE/INCOMING_ACTIVITY'){
				setTimeout(applyButtonStyle, 100);
			}

			return next(action);
		});
		}		
				
									
	})
	.catch((error) => {
	  console.error('Error encriptando:', error);
	});
})
.catch((error) => {
	console.error('Error generando key:', error);
});