var config = {
	"IS_APPLICATION_IN_SANDBOX" : true,

	"sandbox" : {
		//"CLIENT_ID" :"AZN1cfAKLJSwDHfnIks7oGrjriBD3b6HS91ziYeRcKAGLSgQejjJmrPAL501icsygCTya3KJAqqHUDny",
		//"SECRET":"EBex11GdPVHrJ2V0yyr3wj0rg9c8f43KXqMgqys4NOcz49g_ljREUJHaFHJ7F7-wcMTaLgPIzbh3sswg",
		//"CLIENT_ID":"AYDT9tEozAuA53QfD0IoTLxiETetu52UoSb48m_ndpjjmr5w1k1imNdoNEkMACg_rFJwhl6Xp0r3PfH_",
		//"SECRET":"EBOzYhK58t-vvBWsTMNOaM55DDW53XgpjocCbzcJx-6uHumQT6g6V1Xee1X-RH_ln7vEmZ1tiVpLMNWS",
		//"CLIENT_ID" :"AY_7Ot1bDbkeUe0A61I6oaFeBAAu36vOUQ7dJCm7_6aqYdwXjjI_3fb1-tgq43BykTnq4dUg7D2jUZwf",
		//"SECRET":"EHp-nENfthAt7JHBd2eBHEBJA8TN8d11CZ76lVYpybGc7Vy7fhpZz8kxBOo-tlVGn9-_TkCXuBhaNRa0",
		//"MERCHANTID":"PPC6CRGZNWY5C",// MAM NLM account
		//"MERCHANTID":"PB29KMYK2ZXPC",   MSP first account
		  //"MERCHANTID":"M9B9WP3GUHY36", MSP second account
		  //"MERCHANTID":"QWNTH6ABRM3PJ", MSP third account
		  //"MERCHANTID":"QAGBJ7N92U8KQ", MSP fourth account
		  //"MERCHANTID":"PXW28TWUB5AWW", MSP fifth account
		  //"MERCHANTID":"K6KP7DHBL7QYC",//MAM v3 first account
		  //"MERCHANTID":"H4LZFZ4P7AMP2",//MAM v3 second account
		  //"MERCHANTID":"SKJ4Y3AVJQKDL"// MAM v3 third account
		//  "MERCHANTID":"E9532HVXYELWW",// MAM v3 fourth account
		//"CLIENT_ID":"AT5vIvI-b7hTlfwQQdjf__hhMG489_kxEilxC_AXH2jKH6_E7GjaTPb8ht-CTM5YmW9Zy92HiD4igtXG",
		//"SECRET" : "EFRHK9CFJKH8X1P1CmpG_sGk-S5ScH3Rg-2vGJsYNu9E2mKW4JYca5mdbEl0ccPBbdHQ0DAGus5WcToy",
		//"CLIENT_ID":"AQPH7XZKePkQA7Zf4obgBeM3tOS3kLpaptyT98rvsnz88fjhAbLu1Tg7cofSIM1hOhCHIV8X-oyy8lh7",
		//"SECRET" : "EOxeH9nq2MDhcm8Va2Q-Yf1TaVru41g6PE37yMQih9TeXApl0iXJPhXAGebXcikNqvO50uOepUXBZ59y",
		"CLIENT_ID":"ARLF4LUwz7LHsNM6LG_k7lMcH9M9UCSouN5LvvLv6KxRjVezzfPeACXSqZ7FClrG3UyqSeNLEwWWk-F_",
		"SECRET" : "EGKbdmWfX7Th9vzKhAW0k36uvM2KuVx-en_6b7g7JAkcjyslBfY9sSy89JuJVxNiVHpKYfkRQHroq0tl",
		//"CLIENT_ID":"AY45oF49HRPTBl1qN7H0MTxZH15hET_UQpNLpnZKTQd8ES8zNs-56lVDFMXEQy-YKeULewg2Dz7eELTR",
		//"SECRET":"EKOR9TSQWTc0YapubBV4y-hn7A-TpwATT4_otaEs90XlwY1qEkyO7SHRQp786AcG12PrNN0x6Gyf67Xi",
		//"CLIENT_ID":"AbCqrZQnUoLZVctdIBwKyJmLVFsnhMRgg_IypIfw5EagjxvXAsKgszZ3dvnUteChyUXAnKX40LR5FM1d",
		//"SECRET" : "EH5pxdMuh50QFUNzKN8y-CcNY60nhV05rbffRH3p9fIe3mhIqMs7WxRsSruiYCceIlQ8R4Ey6Cx_y435",
		//"CLIENT_ID":"ARY07ZiElP5G3NMt3pp3kEsXLz1m-5zOSrHotZ2KId0JBr4YFUkCpHV_o9VX1EKgoRGTe5KfIDzdvaEJ",
		//"SECRET":"EFpb5GqiS5O-XnlZA6B3tToicSyI4LXVwSKeD2tX3l9ScLjieW_OHeYORFjF0qc9veynjUxipcBp0ufl",
		"STC":"https://api.sandbox.paypal.com/v1/risk/transaction-contexts/",
		"CREATE_ORDER_URL":"https://api.sandbox.paypal.com/v2/checkout/orders",
		"CAPTURE_ORDER_URL":"https://api.sandbox.paypal.com/v2/checkout/orders/",
		//"CLIENT_ID":"ASuu5Mry_jCK3EWOzhSXAoTFJ0kBe_CNhTE_V68atBPfHMKdyU3FvLe6tVk-DAj43xjxIyZnfm9nXEeu",
		//"SECRET":"EEhN5c_tXXialdxHTcNRVxAs0n3OiS33ndeeCsXkHGzWEtt1QdMtx813-6J4GECKCF9ZGCact-uAX6MN",
		//"CLIENT_ID" :"AUy9j0vE2UevpqIxAR2QsxzDJBM2dB3tBNwe6hLTRFY3DOAI8n1pC3vKmdoWMORxy5YpXWcqF3o0dW3E",
		//"SECRET":"EMv9tv-oRlIQQPkgP1hLW5LYvmW6-rO4XUOybTRKO4-pkOHCazAq-TbJZYHOMHJUWsP-uIrCUQLiUuVV",
		"USER_NAME":"Mario1267_api1.gmail.com",
		"PASSWORD":"6QT974GBLAVZX5AE",
		"SIGNATURE":"AJBjrAOFeBi.IDmiOFQfhCvLWSn0AbNm-He.J4jVOt3DK39k729LW.bx",
		"VERSION":"204.0",
		"ACCESS_TOKEN_URL":"https://api.sandbox.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment",
		"GET_CLIENT_TOKEN":"https://api.sandbox.paypal.com/v1/identity/generate-token",
		"GET_GRAPHQL_URL":"https://api.sandbox.paypal.com/payments/graphql",
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
		"MERCHANTID":"SKBHKJUHPEPS8",
		"GET_CLIENT_TOKEN":"https://api.paypal.com/v1/identity/generate-token",
		"GET_GRAPHQL_URL":"https://api.paypal.com/payments/graphql",
		"CREATE_PAYMENT_URL":"https://api.paypal.com/v1/payments/payment",
		"STC":"https://api.paypal.com/v1/risk/transaction-contexts/",
		"CREATE_ORDER_URL":"https://api.paypal.com/v2/checkout/orders",
		"CAPTURE_ORDER_URL":"https://api.paypal.com/v2/checkout/orders/",
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


