var config = {
	"IS_APPLICATION_IN_SANDBOX" : true,

	"sandbox" : {
		"CLIENT_ID" :"AeDmwwwljjA7hY_VsjUbr1_oFQ9tPi7WFH5DpqryjuaSHzetYIKQJhgGXjuMBWC7KZNqxZHecsH0WQCC",
		"SECRET":"ECA6ubeKAChgJLZuWiYUEugiRtQlXg8bhpwyqG0VsEG9knJa7oug32PnsiHCXkDfAn9P9Y0qbatI7vB7",
		"USER_NAME":"Mario1267_api1.gmail.com",
		"PASSWORD":"6QT974GBLAVZX5AE",
		"SIGNATURE":"AJBjrAOFeBi.IDmiOFQfhCvLWSn0AbNm-He.J4jVOt3DK39k729LW.bx",
		"VERSION":"204.0",
		"ACCESS_TOKEN_URL":"https://api.msmaster.qa.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.msmaster.qa.paypal.com/v1/payments/payment",
		"SETEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"DOEC_NVP_URL":"https://api-3t.sandbox.paypal.com/nvp",
		"EXECUTE_PAYMENT_URL":"https://api.msmaster.qa.paypal.com/v1/payments/payment/{payment_id}/execute/",
		"GET_PAYMENT_DETAILS":"https://api.msmaster.qa.paypal.com/v1/payments/payment/{payment_id}",
		"CANCEL_URL":"https://android-ec-nvp-server.herokuapp.com/cancel-url",
		"RETURN_URL":"https://android-ec-nvp-server.herokuapp.com/execute-payments",
		"BN_CODE":"PP-DemoPortal-EC-JSV4-python-REST"
	},

	"live" : {
		"CLIENT_ID" :"AYBymkGzvoY4j4GlCAFt3B3lDZ0v9DPqPgLzQ-qLFDvInFseYLfY2jkDBR83V6audEq8uUHGYYPTufdV",
		"SECRET":"EIGA-3CbWmvV5mNZQGBkbJXARbnErhE08OnbbSdq_d3WzL1_SeYwK54KQrCdMBg2yYLLpeCFy4yNUUgW",
		"ACCESS_TOKEN_URL":"https://api.sandbox.paypal.com/v1/oauth2/token",
		"CREATE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment",
		"EXECUTE_PAYMENT_URL":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}/execute/",
		"GET_PAYMENT_DETAILS":"https://api.sandbox.paypal.com/v1/payments/payment/{payment_id}",
		"CANCEL_URL":"cancel-url",
		"RETURN_URL":"cancel-url",
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


