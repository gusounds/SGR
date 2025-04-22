
function refresh() {
		ReactDOM.unmountComponentAtNode(document.getElementById('webchat'));
		generateKey()
		  .then((key) => {
			 encryptKey(key,generarID())
			  .then((ciphertext) => {
			    decryptMessagex(ciphertext)
			     .then((decrypted) => {
				   let dec = new TextDecoder();
				   
				    const { useMemo, useState } = window.React;
					const { createDirectLine, createStore, ReactWebChat } = window.WebChat;
					
					  const App = () => {
					  const [locale, setLocale] = useState(navigator.language);
					  const directLine = useMemo(() => createDirectLine({ token }), []);
					  const store = useMemo(
						() =>
						  createStore({}, () => next => action => {
							//console.log(action);//PARA DEGUG ESTA LINEA
							if (action.type === 'DIRECT_LINE/INCOMING_ACTIVITY') {
							  const {
								activity: {
								  from: { role },
									text,
									type
								}
							  } = action.payload;
							//console.log(role); 
							//console.log(type);
							//console.log(text);
							if (
								role === 'bot' &&
								type === 'message' &&
								(text === 'en-US' || text === 'ja-JP' || text === 'zh-HK')
							  ) {
								setLocale(text);
							  }
							}
							if(action.type === 'DIRECT_LINE/INCOMING_ACTIVITY'){
								setTimeout(applyButtonStyle, 100);
							}
					   return next(action);
						  }),
						[]
					  );
					  return <ReactWebChat directLine={directLine} locale={locale} userID={dec.decode(decrypted)} username={myUser.name} store={store} styleOptions={styleOptions} />;
					};
					window.ReactDOM.render(<App />, document.getElementById('webchat'));
					document.querySelector('#webchat > *').focus();
			   })
			  .catch((error) => {
				console.error('Error desencriptando:', error);
				});
			 })
			 .catch((error) => {
			   console.error('Error encriptando:', error);
			  });
			})
		  .catch((error) => {
		   console.error('Error encriptando:', error);
		});
  }