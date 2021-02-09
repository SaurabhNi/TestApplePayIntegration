// server

var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var request = require("request");
var bodyParser = require('body-parser');
var decoder = require('utf8');
var request = require('request');
var ejs = require('ejs');

var braintree = require('braintree');
var gateway = braintree.connect({environment: braintree.Environment.Sandbox,
	 merchantId: "83ghdy9cnwp4v3n8",
	 publicKey: "jgd28yfcckbnwbtp",
	 privateKey: "516f5aa74554da240e8439060026115f"
	// merchantId: "tywncdswf825nrc9",
	// publicKey: "crhds8qwnxhjt9wv",
	// privateKey: "7c8a8aeea3a710d8312d3f669530b6e6"
	
});

//var gateway = braintree.connect({
//	accessToken: "access_token$production$t2kz2xvnj6qz54cr$c74d08d4cd2a22d24146cdfc62f5489f"
//  });


var router = express();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
router.use(bodyParser.json());
router.set('view engine','ejs');
var server = http.createServer(router);
var returnCapture = require('./returnCapture.js');

const payLoadTemplate = require('./payload_template')
const btPaymentRequestPayLoadTemplate = payLoadTemplate.getCreateBTPaymentsPayLoadTemplate();


const uuidV4 = require('uuid/v4');
	router.get('/', function(req, res, next) {
		    var str=uuidV4();

		try{
			var accessToken;
			getAccessToken(function(data) {
				  accessToken = JSON.parse(data).access_token;
				  console.log("Access Token"+accessToken);
				  var token  = configuration.CLIENT_ID+":"+configuration.SECRET;
	    		  var encodedKey = new Buffer(token).toString('base64');
				  var GQCLient = GQclient({
					url: configuration.GET_GRAPHQL_URL,
					headers: {
					  Authorization: "Basic "+encodedKey
					}
				  });
			
				  // GraphQL to instantiate Universal Access Token (UAT)
				  
// GQCLient.query('mutation { authnauth{ token (clientInfo: {ipAddress: "10.11.121.1"}){ authToken(tokenClaims : [{key : "customer_id",value : "testvalue1"}]){universalAccessToken}}}}', function(req, res) {
// 					if(res.status === 401) {
// 					  throw new Error('Not authorized')
// 					}
// 				  })
// 				  .then(function(body) {
// 					console.log(body)
// 				  })
// 				  .catch(function(err) {
// 					console.log(err.message)
// 				  })



		   	   var options = { 
				 method: 'POST',
				 url: configuration.GET_CLIENT_TOKEN,
				 headers : {
					   'content-type': "application/json",
					   'authorization': "Bearer "+accessToken,
					   //'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVdXUFQ2bmhBV1pjTDYxMmtmV3JuRGJtOHYza1NMd3p3d3dRNTNQSW1YaTBaV2k4NTVIc0NodTdMTi1scFA4RnRRaldBWHdpaHI1OU95aTIiLAogICJwYXllcl9pZCI6ICJFVlZXTEgyWk1CRTdFIgp9.",
					   'cache-control': "no-cache",
					  //'PayPal-Partner-Attribution-Id':"UAE-CHECKOUT-PSP"
				   },
				   body: {
					   customer_id:"Saurabh_Nigam_102"
				   },
				   json:true				   
				}
			   request(options, function (error, response, body) {
				 if (error) {
					 throw new Error(error);
				 }
				 else{
				   console.log("Sending response",body);
				  // res.redirect('/index1.html?id='+body.client_token);

				//   gateway.dispute.find("28621").then(dispute=>{
				// 	  console.log(dispute);
				//   });

				//   gateway.dispute.search((search) => {
				// 	search.caseNumber().is("PP-D-28622");
				//   }, (err, response) => {
				// 	response.forEach((dispute) => {
				// 	  console.log(dispute.id);
				// 	});
				//   });

				  gateway.clientToken.generate({}, function (err, response) {
					if(err)
					{
						throw new Error(err);
					}
					//console.log(response);
					console.log("Token generated is"+response.clientToken);	
					res.render("index",{token: body.client_token,bt_client_token:response.clientToken});
				  });
				 }
			   });
			});
		   
	   }catch(e) {
		   console.log(e)
	   }
		});

router.use('/.well-known',express.static(path.resolve(__dirname, 'client')));
router.use(express.static(path.resolve(__dirname, 'client')));
router.use('/return',returnCapture);
var messages = [];
var sockets = [];



const config = require('./config');
//const payLoadTemplate = require('./payload_template')
const products = require('./products');

const queryString = require('querystring');

const configuration = config.getConfig();
var GQclient = require('graphql-client')
//const createPaymentPayloadTemplates = payLoadTemplate.getCreatePaymentsPayloadTemplate();
//const createNVPPaymentPayloadTemplates = payLoadTemplate.getNVPCreatePaymentsPayloadTemplate();
//const executeNVPPaymentPayloadTemplates = payLoadTemplate.getNVPExecutePaymentsPayloadTemplate();
//const productsJson = products.getProductsTemplate()


function getAccessToken(cb) {
	
	var url = configuration.ACCESS_TOKEN_URL;
	var token  = configuration.CLIENT_ID+":"+configuration.SECRET,
	    encodedKey = new Buffer(token).toString('base64'),
	    payload = "grant_type=client_credentials&Content-Type=application%2Fx-www-form-urlencoded&response_type=token&return_authn_schemes=true&ignoreCache=true",
	    headers = {
			'authorization': "Basic "+encodedKey,
			'accept': "application/json",
			'accept-language': "en_US",
			'cache-control': "no-cache",
			'content-type': "application/x-www-form-urlencoded",
			'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
			}

			var options = { 
			  method: 'POST',
			  url: configuration.ACCESS_TOKEN_URL,
			  headers: {
							'authorization': "Basic "+encodedKey,
							'accept': "application/json",
							'accept-language': "en_US",
							'cache-control': "no-cache",
							'content-type': "application/x-www-form-urlencoded",
							'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
						},
				body:payload
			}

			request(options, function (error, response, body) {
			  if (error) {
			  	throw new Error(error);
			  }
			  else{
			  	cb(body)
			  }
			});
		}

function buildCreatePaymentPayload(data) {
	console.log("Data in API Request is",data);
	var template = createPaymentPayloadTemplates;
		template.transactions[0].amount.total = data.total
		template.transactions[0].amount.currency = data.currency
		
		template.transactions[0].amount.details.subtotal = data.subtotal
		template.transactions[0].amount.details.shipping_discount = data.shipping_discount
		template.transactions[0].amount.details.insurance = data.insurance
		template.transactions[0].amount.details.shipping = data.shipping
		template.transactions[0].amount.details.tax = data.tax
		template.transactions[0].amount.details.handling_fee = data.handling_fee

		template.transactions[0].invoice_number = makeid();

		template.transactions[0].item_list.items[0].name = data.description	
		template.transactions[0].item_list.items[0].description = data.description	
		template.transactions[0].item_list.items[0].quantity = data.quantity	
		template.transactions[0].item_list.items[0].price = data.price	
		template.transactions[0].item_list.items[0].tax = data.tax	
		template.transactions[0].item_list.items[0].currency = data.currency	



		template.redirect_urls.return_url = configuration.RETURN_URL
		template.redirect_urls.cancel_url = configuration.CANCEL_URL
		
		if(data.customFlag == "true") {
			template.transactions[0].item_list.shipping_address.recipient_name = data.recipient_name	
			template.transactions[0].item_list.shipping_address.line1 = data.line1
			template.transactions[0].item_list.shipping_address.line2 = data.line2
			template.transactions[0].item_list.shipping_address.city = data.city
			template.transactions[0].item_list.shipping_address.country_code = data.country_code
			template.transactions[0].item_list.shipping_address.postal_code = data.postal_code
			template.transactions[0].item_list.shipping_address.phone = data.phone
			template.transactions[0].item_list.shipping_address.state = data.state			
		}else {
			delete template.transactions[0].item_list['shipping_address'];
		}


	return template;

}

function buildNVPCreatePaymentPayload(data) {
	var template = createNVPPaymentPayloadTemplates;
	return template;
}

function buildNVPExecutePaymentPayload(req) {
	var template = executeNVPPaymentPayloadTemplates;
	template.PAYERID=req.query.PayerID;
	template.TOKEN=req.query.token;
	return template;
}

function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}



// router.post('/create-payments', function(req, res, next) {

// 	try{
		
// 	 	var payLoad = buildNVPCreatePaymentPayload(req.body);
// 	 		request.post(
// 				 {url:configuration.SETEC_NVP_URL, form: payLoad}, 
// 				 function(error,response,body){  
// 					 if (error) {
// 						throw new Error(error);
// 					}
// 					else{
// 			    		res.send(body);
// 					}
// 				});
// 	}catch(e) {
// 		console.log(e)
// 	}
// });

router.post('/create-payments', function(req, res, next) {
	console.log ('In calling Create-Payments');
	try{
		
	 	var payLoad = buildCreatePaymentPayload(req.body);
	 	getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
		
			var _dataToSend = {

			}
			
			var options = { 
			  method: 'POST',
			  url: configuration.CREATE_PAYMENT_URL,
			  headers : {
					'content-type': "application/json",
					'authorization': "Bearer "+accessToken,
					'cache-control': "no-cache",
					'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
					//'PayPal-Client-Metadata-Id' : req.body.riskParingId
				},
				body: req.body,
				json:true
				
			}
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			console.log(options.headers)
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			console.log(JSON.stringify(payLoad));
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			request(options, function (error, response, body) {
			  if (error) {
			  	throw new Error(error);
			  }
			  else{
			    console.log("Sending response",body);
			  	res.send(body);
			  }
			});
			
		});
	}catch(e) {
		console.log(e)
	}
});

router.get("/client_token", function (req, res) {
	gateway.clientToken.generate({}, function (err, response) {
	  console.log("Token generated is"+response.clientToken);	
	  res.send(response.clientToken);
	});
  });

router.post("/checkout", function (req, res) {
	var nonce = req.body.payment_method_nonce;
	console.log(nonce);
	var payLoad = buildbtPaymentRequestPayload(req.body);
	payLoad.paymentMethodNonce = nonce;
	//payLoad.paymentMethodToken="fhm3q5g";
	//payLoad.options.storeInVaultOnSuccess = true;
	//payLoad.deviceData = req.body.deviceData;
	console.log(payLoad);

	// gateway.transaction.submitForSettlement("02w4cssx", function (err, result) {
	// 	if (result.success) {
	// 	  var settledTransaction = result.transaction;
	// 	  res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
	// 	} else {
	// 	  console.log(result.errors);
	// 	}
	//   });

	

	// gateway.transaction.sale(payLoad, function (err, result) {
	 //	if (err) {
	 	//	console.log("Inside error stream");
	 	//	console.log(err.type); 
   	 	//	console.log(err.name); 
     	//	console.log(err.message);
	 	//	res.send("<h1>Error:  " + err + "</h1>");
	 	//} else if (result.success) {
	 	  //console.log("Inside success. Transaction ID is :"+result.transaction.id);
	 	  //console.log("Result is : "+JSON.stringify(result));
	 	  // console.log("PayPal paymentID is :"+result.transaction.paypal.paymentId);
	 	  //console.log("Customer ID is :",result.customer.id);
	 	  //console.log("Customer Payment Method Token is :",result.customer.paymentMethods[0].token);
	 	  //res.send("<h1>Success! Transaction ID: " + result.transaction.id + "</h1>");
	 	//} else {
	 	  //console.log("Inside result is false");
	 	  //console.log("Result is : "+JSON.stringify(result));
	 	  //console.log("Result transaction id is : "+result.transaction.id);
	 	  //var deepErrors = result.errors.deepErrors();
	 	  //for (var i in deepErrors) {
	 	//	if (deepErrors.hasOwnProperty(i)) {
	 	//	  console.log(deepErrors[i].attribute);
	 	//	  console.log(deepErrors[i].code);
	 	//	  console.log(deepErrors[i].message);
	 	//	}
	 	 // }	
	 	 // console.log("Error is :"+result.message);
	 	  //res.send("<h1>Error:  " + result.transaction.id + "</h1>");
	 	//}
	   //});
});

router.post('/create-order', function(req, res, next) {
	console.log ('In calling Create-Order');
	try{
		getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
			request.post(configuration.CREATE_ORDER_URL, {
            headers: {
                'content-type': "application/json",
				'authorization': "Bearer "+accessToken,
				//'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVdXUFQ2bmhBV1pjTDYxMmtmV3JuRGJtOHYza1NMd3p3d3dRNTNQSW1YaTBaV2k4NTVIc0NodTdMTi1scFA4RnRRaldBWHdpaHI1OU95aTIiLAogICJwYXllcl9pZCI6ICJFVlZXTEgyWk1CRTdFIgp9.",
				//"PayPal-Partner-Attribution-Id":"UAE-CHECKOUT-PSP"
            },
            body: {
				"intent": "CAPTURE",
				"application_context":{"shipping_preference":"NO_SHIPPING","return_url":"https://www.google.com","cancel_url":"https://www.amazon.com"},
				//"payer":{
				//	"phone":{
				//		"phone_number":{
				//			"national_number":"48226501000"
				//		}
				//	}
				//},
				// payer: {
				// 	name: {
				// 	  given_name: "PayPal",
				// 	  surname: "Customer"
				// 	},
				// 	address: {
				// 	  address_line_1: '123 ABC Street',
				// 	  address_line_2: 'Apt 2',
				// 	  admin_area_2: 'San Jose',
				// 	  admin_area_1: 'CA',
				// 	  postal_code: '95121',
				// 	  country_code: 'US'
				// 	},
				// 	email_address: "customer@domain.com",
				// 	phone: {
				// 	  phone_type: "MOBILE",
				// 	  phone_number: {
				// 		national_number: "14082508100"
				// 	  }
				// 	}
				//   },
                "purchase_units": [
					{
						"reference_id":"PU001",
						"amount": {
							"currency_code": "USD",
							"value": "200.00",
							"breakdown": {
								"item_total": {
								  "currency_code": "USD",
								  "value": "180.00"
								},
								"tax_total": {
									"currency_code": "USD",
									"value": "20.00"
								  }
						 }
						},
					   //"payee":{
						 // 	"merchant_id":"8BXRV4YSW769Q"
					   //},
						// "shipping":{
						// 	"name":{
						// 		 "full_name":"PayPal Customer"
						// 	 },
						//  "address":{
						// 		   "address_line_1":"123 ABC Street",
						// 		   "address_line_2":"Apt 2",
						// 		  "admin_area_2":"San Jose",
						// 		  "admin_area_1":"CA",
						// 		   "postal_code":"95121",
						// 		   "country_code":"US"
						// 	   }
						// },
						"items": [
							{
							  "name": "T-Shirt",
							  "description": "Green XL#AE_Seller_001#Merchandise",
							  "sku": "sku01",
							  "unit_amount": {
								"currency_code": "USD",
								"value": "90.00"
							  },
							  "tax": {
								"currency_code": "USD",
								"value": "10.00"
							  },
							  "quantity": "1",
							  "category": "DIGITAL_GOODS"
							},
							{
							  "name": "Shoes",
							  "description": "Running, Size 10.5#AE_Seller_002#Merchandise",
							  "sku": "sku02",
							  "unit_amount": {
								"currency_code": "USD",
								"value": "45.00"
							  },
							  "tax": {
								"currency_code": "USD",
								"value": "5.00"
							  },
							  "quantity": "2",
							  "category": "DIGITAL_GOODS"
							}
						  ],
					// 	"payment_instruction":{
					// 	//"disbursement_mode":"DELAYED",
					// "platform_fees":[{
					// 		"amount":{
					// 			"currency_code":"USD",
					// 		"value":"10.00"
					// 		}
					// 	}]
					// 	}
						},
						// {
						// 	"reference_id":"PU002",
						// 	"amount": {
						// 		"currency_code": "EGP",
						// 		"value": "200.00",
						// 		"breakdown": {
						// 			"item_total": {
						// 			  "currency_code": "EGP",
						// 			  "value": "180.00"
						// 			},
						// 			"tax_total": {
						// 				"currency_code": "EGP",
						// 				"value": "20.00"
						// 			  }
						// 	 }
						// 	},
						// 	 "payee":{
						// 		 "merchant_id":"EVVWLH2ZMBE7E"
						// 	 },
						// 	// "shipping":{
						// 	// 	"name":{
						// 	// 		 "full_name":"PayPal Customer"
						// 	// 	 },
						// 	//  "address":{
						// 	// 		   "address_line_1":"123 ABC Street",
						// 	// 		   "address_line_2":"Apt 2",
						// 	// 		  "admin_area_2":"San Jose",
						// 	// 		  "admin_area_1":"CA",
						// 	// 		   "postal_code":"95121",
						// 	// 		   "country_code":"US"
						// 	// 	   }
						// 	// },
						// 	"items": [
						// 		{
						// 		  "name": "T-Shirt",
						// 		  "description": "Green XL#AE_Seller_001#Merchandise",
						// 		  "sku": "sku01",
						// 		  "unit_amount": {
						// 			"currency_code": "EGP",
						// 			"value": "90.00"
						// 		  },
						// 		  "tax": {
						// 			"currency_code": "EGP",
						// 			"value": "10.00"
						// 		  },
						// 		  "quantity": "1",
						// 		  "category": "PHYSICAL_GOODS"
						// 		},
						// 		{
						// 		  "name": "Shoes",
						// 		  "description": "Running, Size 10.5#AE_Seller_002#Merchandise",
						// 		  "sku": "sku02",
						// 		  "unit_amount": {
						// 			"currency_code": "EGP",
						// 			"value": "45.00"
						// 		  },
						// 		  "tax": {
						// 			"currency_code": "EGP",
						// 			"value": "5.00"
						// 		  },
						// 		  "quantity": "2",
						// 		  "category": "PHYSICAL_GOODS"
						// 		}
						// 	  ],
						// 	"payment_instruction":{
						// 	//"disbursement_mode":"DELAYED",
						// "platform_fees":[{
						// 		"amount":{
						// 			"currency_code":"EGP",
						// 		"value":"15.00"
						// 		}
						// 	}]
						// 	}
						// 	}
						// {
						// 	"amount": {
						// 		"currency_code": "EUR",
						// 		"value": "100.00"
						// 	 },
						// 	 "payee":{
						// 		  "merchant_id":"PXW28TWUB5AWW"
						// 	  },
						// 	"shipping":{
						// 		"name":{
						// 			 "full_name":"Duan Pengfei"
						// 		 },
						// 	 "address":{
						// 			   "address_line_1":"1H Zwirkrand Wigury Str.",
						// 			   "address_line_2":"",
						// 			  "admin_area_2":"Warsaw",
						// 			  "admin_area_1":"",
						// 			   "postal_code":"00-906",
						// 			   "country_code":"PL"
						// 		   }
						// 	},
						// 	"payment_instruction":{
						// 	//"disbursement_mode":"DELAYED",
						// 	"platform_fees":[{
						// 		"amount":{
						// 			"currency_code":"EUR",
						// 			"value":"10.00"
						// 		}}]
						// 	}
						// 	}
					]
            },
            json: true
        }, function (err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
			console.log (body);
			var orderId=body.id;
			// STC API Call
			console.log("Before calling STC API");
			res.json({
				id: orderId
			});
		// 	request.put(configuration.STC +configuration.MERCHANTID+ '/'+body.id, {
        //     headers: {
        //         'content-type': "application/json",
		// 		'authorization': "Bearer "+accessToken,
		// 		'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVQ1dkl2SS1iN2hUbGZ3UVFkamZfX2hoTUc0ODlfa3hFaWx4Q19BWEgyaktINl9FN0dqYVRQYjhodC1DVE01WW1XOVp5OTJIaUQ0aWd0WEciLAogICJwYXllcl9pZCI6ICJFOTUzMkhWWFlFTFdXIgp9."
        //     },
        //     body: {
        //         	"additional_data": [
		// 			{
		// 			  "key": "sender_account_id",
		// 			  "value": "A12345N343"
		// 			},
		// 			{
		// 			  "key": "sender_first_name",
		// 			  "value": "Saurabh"
		// 			},
		// 			{
		// 				"key":"sender_last_name",
		// 				"value":"Nigam"
		// 			},
		// 			{
		// 				"key":"sender_email",
		// 				"value":"saunig+1@gmail.com"
		// 			},
		// 			{
		// 				"key":"sender_country_code",
		// 				"value":"IN"
		// 			}]
					
        //     },
        //     json: true
		// },function (err, response, body) {
        //     if (err) {
        //         console.error(err);
        //         return res.sendStatus(500);
        //     }
		// 	console.log (body);
		// 	console.log("After calling STC API");
		// 	console.log ("Order ID is :"+orderId);
        //     res.json({
        //          id: orderId
        //      });
        //  });
	});
});
}catch(e) {
	console.log(e)
}
});	

router.post('/create-billing-agreement', function(req, res, next) {
	console.log ('In calling Create-Billing Agreement');
	try{
		getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
			request.post(configuration.CREATE_BA_URL, {
            headers: {
                'content-type': "application/json",
				'authorization': "Bearer "+accessToken
				//'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVdXUFQ2bmhBV1pjTDYxMmtmV3JuRGJtOHYza1NMd3p3d3dRNTNQSW1YaTBaV2k4NTVIc0NodTdMTi1scFA4RnRRaldBWHdpaHI1OU95aTIiLAogICJwYXllcl9pZCI6ICJFVlZXTEgyWk1CRTdFIgp9.",
				//"PayPal-Partner-Attribution-Id":"TEST_TECHM_FREELANCE_MP"
            },
            body: {
				
					"description": "Billing Agreement",
					"payer":
					{
						"payment_method": "PAYPAL"
					},
					"plan":
					{
						"type": "MERCHANT_INITIATED_BILLING",
						"merchant_preferences":
						{
							"return_url": "https://www.paypal.com/checkoutnow/error",
							"cancel_url": "https://www.paypal.com/checkoutnow/error",
							"notify_url": "https://www.example.com/notify",
							"accepted_pymt_type": "INSTANT",
							"skip_shipping_address": false
						}
					}
				 
            },
            json: true
        }, function (err, response, body) {
            if (err) {
                console.error(err);
                return res.sendStatus(500);
            }
			console.log (body);
			var baToken=body.token_id;
			res.json({
				id: baToken
			});
			// STC API Call
			//console.log("Before calling STC API");
			// Call v1 payments

			// request.post(CREATE_PAYMENT_URL, {
			// 	    headers: {
			// 	        'content-type': "application/json",
			// 			'authorization': "Bearer "+accessToken,
			// 			'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVQ1dkl2SS1iN2hUbGZ3UVFkamZfX2hoTUc0ODlfa3hFaWx4Q19BWEgyaktINl9FN0dqYVRQYjhodC1DVE01WW1XOVp5OTJIaUQ0aWd0WEciLAogICJwYXllcl9pZCI6ICJFOTUzMkhWWFlFTFdXIgp9."
			// 	    },
			// 	    body: {
			// 			"intent": "sale",
			// 			"application_context":{
			// 				"shipping_preference":"SET_PROVIDED_ADDRESS"
			// 			},
			// 			"payer":
			// 			{
			// 				"payment_method": "PAYPAL"
			// 			},
			// 			"transactions": [
			// 			{
			// 				"amount":
			// 				{
			// 					"currency": "USD",
			// 					"total": "10.00"
			// 				},
			// 				"description": "Payment transaction.",
			// 				"custom": "Payment custom field.",
			// 				"note_to_payee": "Note to payee field.",
			// 				"invoice_number": "INV-0012",
			// 				"item_list":
			// 				{
			// 					"items": [
			// 					{
			// 						"sku": "skuitemNo1",
			// 						"name": "ItemNo1",
			// 						"description": "The item description.",
			// 						"quantity": "1",
			// 						"price": "10.00",
			// 						"currency": "USD",
			// 						"tax": "0",
			// 						"url": "https://www.example.com/"
			// 					}],
			// 					"shipping_address":{
			// 						"line1":"Flat No A 102 ASSETZ MARQ",
			// 						"line2":"KANNAMANGALA VILLAGE, WHITEFIELD HOSKOTE ROAD",
			// 						"city":"Bangalore",
			// 						"postal_code":"560067",
			// 						"state":"KARNATAKA",
			// 						"country_code":"IN",
			// 						"recipient_name":"SaurabhNigam"
			// 					}
			// 				}
			// 			}],
			// 			"billing_agreement_tokens" : [baToken],
			// 			"redirect_urls":
			// 			{
			// 				"return_url": "https://www.paypal.com/checkoutnow/error",
			// 				"cancel_url": "https://www.paypal.com/checkoutnow/error"
			// 			}
							
			// 	    },
			// 	    json: true
			// 	},function (err, response, body) {
			// 	    if (err) {
			// 	        console.error(err);
			// 	        return res.sendStatus(500);
			// 	    }
			// 		console.log (body);
			// 		console.log("After calling STC API");
			// 		//console.log ("Order ID is :"+orderId);
			// 	    res.json({
			// 	         id: 
			// 	     });
			// 	 });

			
	});
});
}catch(e) {
	console.log(e)
}
});	




router.post('/capture-order/:id', function(req, res, next) {
	console.log ('In calling Capture-Order');
	try{
		getAccessToken(function(data) {
			{
				var OrderID = req.params.id;
				var accessToken = JSON.parse(data).access_token;
				request.post(configuration.CAPTURE_ORDER_URL + OrderID + '/capture', {
					headers: {
						'content-type': "application/json",
						'authorization': "Bearer "+accessToken,
						//'PayPal-Auth-Assertion':"ewogICJhbGciOiAibm9uZSIKfQ==.ewogICJpc3MiOiAiQVdXUFQ2bmhBV1pjTDYxMmtmV3JuRGJtOHYza1NMd3p3d3dRNTNQSW1YaTBaV2k4NTVIc0NodTdMTi1scFA4RnRRaldBWHdpaHI1OU95aTIiLAogICJwYXllcl9pZCI6ICJFVlZXTEgyWk1CRTdFIgp9.",
						//"PayPal-Partner-Attribution-Id":"UAE-CHECKOUT-PSP"
					}
				}, function (err, response, body) {
					if (err) {
						console.error(err);
						return res.sendStatus(500);
					}
					console.log(response);
					console.log(body);
					res.send
					res.json({
						status: 'success'
					});
				});
			}
		});
}catch(e) {
		console.log(e)
	}
});


router.post('/get-client-token', function(req, res, next) {
	console.log ('In calling Get Client Token');
	try{
		
	 	var payLoad = buildCreatePaymentPayload(req.body);
	 	getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
		
			var _dataToSend = {

			}
			
			var options = { 
			  method: 'POST',
			  url: configuration.GET_CLIENT_TOKEN,
			  headers : {
					'content-type': "application/json",
					'authorization': "Bearer "+accessToken,
					'cache-control': "no-cache",
					//'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
					//'PayPal-Client-Metadata-Id' : req.body.riskParingId
				},
				body: {customer_id: "CUSTOMER_ID_12345"},
				json:true
				
			}
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			console.log(options.headers)
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			console.log(JSON.stringify(payLoad));
			console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>")
			request(options, function (error, response, body) {
			  if (error) {
			  	throw new Error(error);
			  }
			  else{
				console.log("Sending response",body);
				res.status(200).send(body);
				res.end();
				//res.send(200, {
				//	clientToken: body.client_token
				//  });
			  }
			});
			
		});
	}catch(e) {
		console.log(e)
	}
});

// router.get('/execute-payments', function(req, res, next) {

// 	try{		
// 		var payLoad = buildNVPExecutePaymentPayload(req);
// 		console.log("Execute payment payload :",payLoad);
// 		request.post(
// 			{url:configuration.DOEC_NVP_URL, form: payLoad}, function(error,response,body){  if (error) {
// 			   throw new Error(error);
// 		   }
// 		   else{
// 			   console.log(body);
// 			   var response = decoder.decode(body);
// 			   console.log(response);
// 			   var respArray = response.split("&");
// 			   var transactionId = "";
// 			   var transactionStatus = "";
// 			   var respItems;
// 			   respArray.forEach(function(respItem){
// 				console.log(respItem);   
// 				respItems = respItem.split("=");
// 				   if(respItems[0]=='TRANSACTIONID')
// 				   {
// 					   transactionId=respItems[1];
// 				   }
// 				   if(respItems[0]=='ACK')
// 				   {
// 					   transactionStatus=respItems[1];
// 				   }
// 			   });
// 			   console.log("Transaction ID :",transactionId);
// 				if(transactionStatus == 'Success') {
// 					res.redirect('/success.html?id='+transactionId);	
// 				}else {
// 					res.redirect('/error.html');	
// 				}
// 			}
// 		   });
// 	    }catch(e) {
// 	   console.log(e)
//    }
// }
// );

router.get('/execute-payments', function(req, res, next) {

	try{
		var paymentId = req.query.paymentId;
		var payerId =  req.query.PayerID;
		

	 	var payLoad = req.body;
	 	getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
			var _dataToSend = {
				"payer_id": payerId
			}
			var options = { 
			  method: 'POST',
			  url:  configuration.EXECUTE_PAYMENT_URL.replace('{payment_id}', paymentId),
			  headers : {
					'content-type': "application/json",
					'authorization': "Bearer "+accessToken,
					'cache-control': "no-cache",
					'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
				},
				body: _dataToSend,
				json:true
				
			}
			
			request(options, function (error, response, body) {
			  if (error) {
			  	throw new Error(error);
			  }
			  else{
			 
			  	if(body.state = 'approved') {
		  		    //custom check 
					var webview = req.query.webview;
					console.log('About to redirect to success.html');
					//res.redirect('/success.html?id='+body.id+"&payerId="+body.payer.payer_info.payer_id);
					console.log('updated code is executing');
					//res.redirect('com.example.paypalcustomtabdemo://success?payID='+body.id);
					res.writeHead(302,{'Location':("com.reena.ec-rest://success/?paymentId="+body.id)});
					console.log('updated code ended');
					//res.writeHead(302, {'Location':"https://android-ec-nvp-server.herokuapp.com/paypalPaymentSuccess"});
					//res.end();
					//window.location.href='https://android-ec-nvp-server.herokuapp.com/paypalPaymentSuccess';
					//console.log('updated to old version code with latest express');
					//res.send(body.id);	
			  	}else {
					  //res.redirect('/error.html?webview='+webview);	
					  res.writeHead(302,{'Location':("com.reena.ec-rest://error/?token="+req.query.token)});
			  	}
			  	
			  }
			});
			
		});
	}catch(e) {
		console.log(e)
	}
});

router.post('/get-payment-details', function(req, res, next) {

	try{
		var token = req.query.token;
		var payerId = req.query.payerID;

	 	getAccessToken(function(data) {

			var accessToken = JSON.parse(data).access_token;
		
			var options = { 
			  method: 'GET',
			  url:  configuration.GET_PAYMENT_DETAILS.replace('{payment_id}', token),
			  headers : {
					'content-type': "application/json",
					'authorization': "Bearer "+accessToken,
					'cache-control': "no-cache",
					'PayPal-Partner-Attribution-Id' : configuration.BN_CODE
				}
				
			}
			
			request(options, function (error, response, body) {
			  if (error) {
			  	throw new Error(error);
			  }
			  else{
				  //console.log("Response sent")
				  console.log(body);
			  	res.send(body);
			  }
			});
			
		});
	}catch(e) {
		console.log(e)
	}
});


router.get('/get-products', function(req, res, next) {
	res.send(productsJson.products);
  	
});

router.get('/apple-app-site-association', function(req, res, next) {
	res.send('{"applinks":{"apps":[],"details":[{"appID":"87GA28WQTJ.paypal.TestPayPalNativeXO","paths":["*"]}]}}');
  	
});

//router.get('/.well-known/assetlinks.json', function(req, res, next) {
//	res.json('{"relation":["delegate_permission/common.handle_all_urls"],"target":{"namespace":"android_app","package_name":"com.example.paypalcustomtabdemo","sha256_cert_fingerprints":["AC:C4:A4:4E:4D:9C:01:C4:C6:6A:D6:4C:B6:6E:50:FE:8A:BC:2B:E4:C9:87:53:07:9E:CD:C0:EC:4C:14:82:B6"]}}');
//});


router.post('/post-paypal-ipn', urlencodedParser, function(req, res, next) {
	//console.log('Parameters received are'+req.body);
	//console.log('Parameters received in strings are'+JSON.stringify(req.body));
	//res.send('{"applinks":{"apps":[],"details":[{"appID":"87GA28WQTJ.paypal.TestPayPalNativeXO","paths":["*"]}]}}');
    console.log('In handling IPN message');
	//let params = queryString.stringify(req.body);
	  console.log('Invoice passed in request:'+req.body.invoice);
	  console.log('Custom passed in request:'+req.body.custom);
	  var ip1 = (req.headers['x-forwarded-for'] || '').split(',').pop();
	  var ip2 = req.connection.remoteAddress;
	  var ip3 = req.socket.remoteAddress;
	  //var ip4 = req.connection.socket.remoteAddress;
		 
	  console.log('Request is coming from this IP'+ip1);
	  console.log('Request is coming from this IP'+ip2);
	  console.log('Request is coming from this IP'+ip3);
	  //console.log('Request is coming from this IP'+ip4);
	  console.log (JSON.stringify(req.body));
	  //console.log('Parameters received are :'+params);
	  res.status(200).end();
});

function buildbtPaymentRequestPayload(data) {
	console.log(data);
	var template = btPaymentRequestPayLoadTemplate;
		template.amount = data.total;
		template.merchantAccountId = data.currency;
		
		//template.transactions[0].amount.details.subtotal = data.subtotal
		//template.transactions[0].amount.details.shipping_discount = data.shipping_discount
		//template.transactions[0].amount.details.insurance = data.insurance
		//template.transactions[0].amount.details.shipping = data.shipping
		//template.transactions[0].amount.details.tax = data.tax
		//template.transactions[0].amount.details.handling_fee = data.handling_fee

		template.orderId = makeid();

		//template.descriptor.name = data.description	
		//template.transactions[0].item_list.items[0].description = data.description	
		//template.transactions[0].item_list.items[0].quantity = data.quantity	
		//template.transactions[0].item_list.items[0].price = data.price	
		//template.transactions[0].item_list.items[0].tax = data.tax	
		//template.transactions[0].item_list.items[0].currency = data.currency	



		//template.redirect_urls.return_url = configuration.RETURN_URL
		//template.redirect_urls.cancel_url = configuration.CANCEL_URL
		
		if(data.customFlag == "true") {
			template.shipping.firstName = data.recipient_name	
			// template.transactions[0].item_list.shipping_address.line1 = data.line1
			// template.transactions[0].item_list.shipping_address.line2 = data.line2
			// template.transactions[0].item_list.shipping_address.city = data.city
			// template.transactions[0].item_list.shipping_address.country_code = data.country_code
			// template.transactions[0].item_list.shipping_address.postal_code = data.postal_code
			// template.transactions[0].item_list.shipping_address.phone = data.phone
			// template.transactions[0].item_list.shipping_address.state = data.state			
		}else {
			//delete template.transactions[0].item_list['shipping_address'];
		}


	return template;

}

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("Demo server listening at", addr.address + ":" + addr.port);
});
