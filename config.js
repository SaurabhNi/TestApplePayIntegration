var config = {
	"IS_APPLICATION_IN_SANDBOX" : true,

	"sandbox" : {
		"CLIENT_ID" :"AYDT9tEozAuA53QfD0IoTLxiETetu52UoSb48m_ndpjjmr5w1k1imNdoNEkMACg_rFJwhl6Xp0r3PfH_",
		"SECRET":"EBOzYhK58t-vvBWsTMNOaM55DDW53XgpjocCbzcJx-6uHumQT6g6V1Xee1X-RH_ln7vEmZ1tiVpLMNWS",
		//"CLIENT_ID" :"AUy9j0vE2UevpqIxAR2QsxzDJBM2dB3tBNwe6hLTRFY3DOAI8n1pC3vKmdoWMORxy5YpXWcqF3o0dW3E",
		//"SECRET":"EMv9tv-oRlIQQPkgP1hLW5LYvmW6-rO4XUOybTRKO4-pkOHCazAq-TbJZYHOMHJUWsP-uIrCUQLiUuVV",
		"USER_NAME":"Mario1267_api1.gmail.com",
		"PASSWORD":"6QT974GBLAVZX5AE",
		"SIGNATURE":"AJBjrAOFeBi.IDmiOFQfhCvLWSn0AbNm-He.J4jVOt3DK39k729LW.bx",
		"VERSION":"204.0",
		"ACCESS_TOKEN_URL":"https://api.sandbox.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment",
		"SETEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"DOEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"EXECUTE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}/execute/",
		"GET_PAYMENT_DETAILS":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}",
		"CANCEL_URL":"https://ignis.serveo.net/cancel-url",
		"RETURN_URL":"https://android-ec-nvp-server.herokuapp.com/execute-payments",
		"BN_CODE":"PP-DemoPortal-EC-JSV4-python-REST"
	},

	"live" : {
		"CLIENT_ID" :"AY9D-HDO9zWylPFQzuCMwap9Iq4L_N4k0_nS3-rzdHJhM8p6gcW_AqdabfyCTf5bVoT9SB-0-LbYV5BI",
		"SECRET":"EFTuy_gNhfkO-OIUMVtzMU4yyf2UKXS9tn4uIKMsgfyzfu9XP0KY1K-azGi0KKyGOHjzT270B0tmaNII",
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


