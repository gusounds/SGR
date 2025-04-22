const webChatContainer = document.getElementById('webchat');
var token = '9ZzUecZpRiE.m5XgrNaHV_QFWkYuBnlfluj--nWVJLDe5Gotm8gJoz4';
const date = new Date();

var myUser = {
		id:  'N1M2345#6789DP',
		name: 'BotUs_Dnp'
	}

//Estilos webchat
	const styleOptions = {
    botAvatarInitials: 'DNP',
    userAvatarInitials: 'Us',
    hideUploadButton: true,
    botAvatarImage: '/img/ava2.jpg',
    botAvatarBackgroundColor: '#004884',
    bubbleBackground: '#EDEDED',
    bubbleTextColor: 'black',
    bubbleBorderRadius: '0.5em',
    bubbleFromUserBorderRadius: '0.5em',
    userAvatarBackgroundColor: '#004884',
    primaryFont: "'Work Sans', Calibri, 'Helvetica Neue', arial, sans-serif",
    sendBoxButtonColor: '#3366CC',
    sendBoxButtonColorOnFocus: '#3366CC',
    sendBoxButtonColorOnHover: '#3366CC',
    suggestedActionBackgroundColor: '##3366CC',
    suggestedActionBorderRadius: '0.5em',
    suggestedActionTextColor: 'white',
	
	//typingAnimationBackgroundImage: undefined,
	//typingAnimationDuration: 5000,
	//typingAnimationHeight: 20,
	//typingAnimationWidth: 64
  
	//emojiSet: true,
	//hideScrollToEndButton: undefined, // Deprecated as of 4.14.0. Use "scrollToEndButtonBehavior" instead. Remove on or after 2023-06-02.
	//autoScrollSnapOnActivity: false,
	//autoScrollSnapOnActivityOffset: 0,
	//autoScrollSnapOnPage: false,
	//autoScrollSnapOnPageOffset: 0, // TODO: Rename from "autoScrollSnapOnPageoffset".
	//groupTimestamp: true,
	//sendTimeout: 20000,
	//sendTimeoutForAttachments: 120000,
	//timestampColor: undefined,
	//timestampFormat: 'relative',
    };
	
function applyButtonStyle() {
		const buttons = document.querySelectorAll('.ac-pushButton');
		for (let index = 0; index < buttons.length; index++) {
			const button = buttons[index];
			if (!button.classList.contains('custom-button')) {
				button.classList.toggle('custom-button');
			}
		}
	}
	
function obtenerToken() {
  return token;
}

function toggleChatbot(open) {
      const chatbotContainer = document.getElementById('chat');
      const chatbotLauncher = document.getElementById('launcher');
      
      if (open) {
        chatbotContainer.classList.add('open');
        chatbotLauncher.children[0].style.display = 'none';
        chatbotLauncher.children[1].style.display = 'block';
      } else {
        chatbotContainer.classList.remove('open');
        chatbotLauncher.children[0].style.display = 'flex';
        chatbotLauncher.children[1].style.display = 'none';
      }
    }

function generarID() {
	  //const fecha = new Date().getTime();
	  const fecha = date.toISOString();
	  const aleatorio = Math.random().toString(36).substring(2,8);
	  return `${fecha}-${aleatorio}`;
}

 async function decryptMessagex(ciphertextb) {
	 return new Promise((resolve, reject) => {
		window.crypto.subtle.decrypt(
		  {
			name: "AES-GCM",
			iv: this.iv
		  },
		  this.keyx,
		  ciphertextb
		)
		.then((decrypted) => {
		  resolve(decrypted);
			/*let dec = new TextDecoder();
			console.log(dec.decode(decrypted), "<---DECRIPTADO-->");
			console.log(decrypted, "<---DECRIPTED-->");*/
		})
		.catch((error) => {
		  reject(error);
		});
	});
}

function getMessageEncodingM(messageId) {
    	return new TextEncoder().encode(messageId);
	}

async function encryptKey(key,messageId) {
	return new Promise((resolve, reject) => {
	let encoded = this.getMessageEncodingM(messageId);
    this.iv = window.crypto.getRandomValues(new Uint8Array(32));
    window.crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: this.iv
      },
      key,
      encoded
    )
	.then((ciphertext) => {
	  this.keyx=key;
	  resolve(ciphertext);
		
	  /*let buffer = new Uint8Array(ciphertext, 0, 5);
	  const ciphertextValue = `${buffer}...[${ciphertext.byteLength} bytes total]`;
	  console.log(ciphertextValue,"---");*/
    })
    .catch((error) => {
      reject(error);
    });
  });
}

function generateKey() {
	return new Promise((resolve, reject) => {
    window.crypto.subtle.generateKey(
    {
        name: "AES-GCM",
        length: 256,
    },
    true,
    ["encrypt", "decrypt"]
  )
    .then((key) => {
      resolve(key);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

document.addEventListener('keydown', function(event) {
	const chatbotContainer = document.getElementById('chat');
	const isChatOpen = chatbotContainer.classList.contains('open');

	if (event.key === 'Escape' && isChatOpen) {
	 	toggleChatbot(false);
    }
});

