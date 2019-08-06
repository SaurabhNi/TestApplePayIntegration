var config = {
	"IS_APPLICATION_IN_SANDBOX" : true,

	"sandbox" : {
		"CLIENT_ID" :"AY_7Ot1bDbkeUe0A61I6oaFeBAAu36vOUQ7dJCm7_6aqYdwXjjI_3fb1-tgq43BykTnq4dUg7D2jUZwf",
		"SECRET":"EHp-nENfthAt7JHBd2eBHEBJA8TN8d11CZ76lVYpybGc7Vy7fhpZz8kxBOo-tlVGn9-_TkCXuBhaNRa0",
		//"CLIENT_ID" :"AUy9j0vE2UevpqIxAR2QsxzDJBM2dB3tBNwe6hLTRFY3DOAI8n1pC3vKmdoWMORxy5YpXWcqF3o0dW3E",
		//"SECRET":"EMv9tv-oRlIQQPkgP1hLW5LYvmW6-rO4XUOybTRKO4-pkOHCazAq-TbJZYHOMHJUWsP-uIrCUQLiUuVV",
		"USER_NAME":"Mario1267_api1.gmail.com",
		"PASSWORD":"6QT974GBLAVZX5AE",
		"SIGNATURE":"AJBjrAOFeBi.IDmiOFQfhCvLWSn0AbNm-He.J4jVOt3DK39k729LW.bx",
		"VERSION":"204.0",
		"ACCESS_TOKEN_URL":"https://api.sandbox.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment",
		"GET_CLIENT_TOKEN":"https://api.sandbox.paypal.com/v1/identity/generate-token",
		"SETEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"DOEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"EXECUTE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}/execute/",
		"GET_PAYMENT_DETAILS":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}",
		"CANCEL_URL":"https://ignis.serveo.net/cancel-url",
		"RETURN_URL":"https://android-ec-nvp-server.herokuapp.com/execute-payments",
		"BN_CODE":"PP-DemoPortal-EC-JSV4-python-REST"
	},

	"live" : {
		"CLIENT_ID" :"AeIP3_gc2KU8iMd1JAZ-3P0WJMQCijHaqvTV6rwN7kLTjPl5oRyM0xZ43U6gwKjVhRciR-LQy21d7E74",
		"SECRET":"EJQyU0dEc-d_uvm4QzpsQNexTx146ZTVz-gE_1ZArO53AUiyNKuppjTrcfuZDl3de6csjclXQhHcq-It",
		"ACCESS_TOKEN_URL":"https://api.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.paypal.com/v1/payments/payment",
		"EXECUTE_PAYMENT_URL":"https://api.paypal.com/v1/payments/payment/{payment_id}/execute/",
		"GET_PAYMENT_DETAILS":"https://api.paypal.com/v1/payments/payment/{payment_id}",
		"CANCEL_URL":"https://ignis.serveo.net/cancel-url",
		"RETURN_URL":"https://android-ec-nvp-server.herokuapp.com/execute-payments",
		"BN_CODE":"PP-DemoPortal-EC-JSV4-python-REST"
	}
}

exports.getConfig = function() {
	console.log(config.IS_APPLICATION_IN_SANDBOX)
	if(config.IS_APPLICATION_IN_SANDBOX)
		return config.sandbox
	else
		return config.live
}


