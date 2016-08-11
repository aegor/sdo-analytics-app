(function() {

	// for convenience
	var loginButtonsSession = Accounts._loginButtonsSession;

	// events shared between loginButtonsLoggedOutDropdown and
	// loginButtonsLoggedInDropdown
	Template._loginButtons.events({
		'click input, click .radio, click .checkbox, click option, click select': function(event) {
			event.stopPropagation();
		},
		'click #login-name-link, click #login-sign-in-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.set('dropdownVisible', true);
			Meteor.flush();
		},
		'click .login-close': function() {
			loginButtonsSession.closeDropdown();
		}
	});

	Template._loginButtons.toggleDropdown = function() {
		toggleDropdown();
		focusInput();
	};

	//
	// loginButtonsLoggedInDropdown template and related
	//

	Template._loginButtonsLoggedInDropdown.events({
		'click #login-buttons-open-change-password': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();
			loginButtonsSession.set('inChangePasswordFlow', true);
			Meteor.flush();
		}
	});

	Template._loginButtonsLoggedInDropdown.helpers({
		displayName: function() {
			return Accounts._loginButtons.displayName();
		},

		inChangePasswordFlow: function() {
			return loginButtonsSession.get('inChangePasswordFlow');
		},

		inMessageOnlyFlow: function() {
			return loginButtonsSession.get('inMessageOnlyFlow');
		},

		dropdownVisible: function() {
			return loginButtonsSession.get('dropdownVisible');
		},

		user_profile_picture: function() {
			var user = Meteor.user();
			if (user && user.profile && user.profile.email) {
				var email = md5(user.profile.email.trim().toLowerCase());
        console.log(user.profile.email);
        return 'https://www.gravatar.com/avatar/' + email + '?s=50';
			}
			return "";
		}
	});


	Template._loginButtonsLoggedInDropdownActions.helpers({
		allowChangingPassword: function() {
			// it would be more correct to check whether the user has a password set,
			// but in order to do that we'd have to send more data down to the client,
			// and it'd be preferable not to send down the entire service.password document.
			//
			// instead we use the heuristic: if the user has a username or email set.
			var user = Meteor.user();
			return user.username || (user.emails && user.emails[0] && user.emails[0].address);
		},
		additionalLoggedInDropdownActions: function() {
			return Template._loginButtonsAdditionalLoggedInDropdownActions !== undefined;
		}
	});


	//
	// loginButtonsLoggedOutDropdown template and related
	//

	Template._loginButtonsLoggedOutAllServices.events({
		'click #login-buttons-password': function(event) {
			event.stopPropagation();
			loginOrSignup();
		},

		'keypress #forgot-password-email': function(event) {
			event.stopPropagation();
			if (event.keyCode === 13){
				forgotPassword();
			}
		},

		'click #login-buttons-forgot-password': function(event) {
			event.stopPropagation();
			forgotPassword();
		},

		'click #signup-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			//check to see if onCreate is populated with a function. If it is, call it
			var onCreateFn = Accounts.ui._options.onCreate;
			if (onCreateFn){
				loginButtonsSession.closeDropdown();
				onCreateFn.apply();

			} else {
				// store values of fields before swtiching to the signup form
				var username = trimmedElementValueById('login-username');
				var email = trimmedElementValueById('login-email');
				var usernameOrEmail = trimmedElementValueById('login-username-or-email');
				// notably not trimmed. a password could (?) start or end with a space
				var password = elementValueById('login-password');

				loginButtonsSession.set('inSignupFlow', true);
				loginButtonsSession.set('inForgotPasswordFlow', false);

				// force the ui to update so that we have the approprate fields to fill in
				Meteor.flush();

				// update new fields with appropriate defaults
				if (username !== null) {
					document.getElementById('login-username').value = username;
				} else if (email !== null) {
					document.getElementById('login-email').value = email;
				} else if (usernameOrEmail !== null) {
					if (usernameOrEmail.indexOf('@') === -1) {
						document.getElementById('login-username').value = usernameOrEmail;
					} else {
						document.getElementById('login-email').value = usernameOrEmail;
					}
				}
			}
		},
		'click #forgot-password-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			// store values of fields before swtiching to the signup form
			var email = trimmedElementValueById('login-email');
			var usernameOrEmail = trimmedElementValueById('login-username-or-email');

			loginButtonsSession.set('inSignupFlow', false);
			loginButtonsSession.set('inForgotPasswordFlow', true);

			// force the ui to update so that we have the approprate fields to fill in
			Meteor.flush();
			//toggleDropdown();

			// update new fields with appropriate defaults
			if (email !== null){
				document.getElementById('forgot-password-email').value = email;
			} else if (usernameOrEmail !== null){
				if (usernameOrEmail.indexOf('@') !== -1){
					document.getElementById('forgot-password-email').value = usernameOrEmail;
				}
			}
		},
		'click #back-to-login-link': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();

			var username = trimmedElementValueById('login-username');
			var email = trimmedElementValueById('login-email') || trimmedElementValueById('forgot-password-email'); // Ughh. Standardize on names?

			loginButtonsSession.set('inSignupFlow', false);
			loginButtonsSession.set('inForgotPasswordFlow', false);

			// force the ui to update so that we have the approprate fields to fill in
			Meteor.flush();

			if (document.getElementById('login-username')){
				document.getElementById('login-username').value = username;
			}
			if (document.getElementById('login-email')){
				document.getElementById('login-email').value = email;
			}
			// "login-password" is preserved thanks to the preserve-inputs package
			if (document.getElementById('login-username-or-email')){
				document.getElementById('login-username-or-email').value = email || username;
			}
		},
		'keypress #login-username, keypress #login-email, keypress #login-username-or-email, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13){
				loginOrSignup();
			}
		}
	});

	Template._loginButtonsLoggedOutDropdown.helpers({
		forbidClientAccountCreation: function() {
			return Accounts._options.forbidClientAccountCreation;
		}
	});

	Template._loginButtonsLoggedOutAllServices.helpers({
		// additional classes that can be helpful in styling the dropdown
		additionalClasses: function() {
			if (!Accounts.password) {
				return false;
			} else {
				if (loginButtonsSession.get('inSignupFlow')) {
					return 'login-form-create-account';
				} else if (loginButtonsSession.get('inForgotPasswordFlow')) {
					return 'login-form-forgot-password';
				} else {
					return 'login-form-sign-in';
				}
			}
		},

		dropdownVisible: function() {
			return loginButtonsSession.get('dropdownVisible');
		},

		services: function() {
			return Accounts._loginButtons.getLoginServices();
		},

		isPasswordService: function() {
			return this.name === 'password';
		},

		hasOtherServices: function() {
			return Accounts._loginButtons.getLoginServices().length > 1;
		},

		hasPasswordService: function() {
			return Accounts._loginButtons.hasPasswordService();
		}
	});


	Template._loginButtonsLoggedOutPasswordService.helpers({
		fields: function() {
			var loginFields = [{
				fieldName: 'username-or-email',
				fieldLabel: i18n('loginFields.usernameOrEmail'),
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'username',
				fieldLabel: i18n('loginFields.username'),
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "USERNAME_ONLY";
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('loginFields.email'),
				inputType: 'email',
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "EMAIL_ONLY";
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('loginFields.password'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}];

			var signupFields = [{
				fieldName: 'username',
				fieldLabel: i18n('signupFields.username'),
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('signupFields.email'),
				inputType: 'email',
				visible: function() {
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "EMAIL_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}, {
				fieldName: 'email',
				fieldLabel: i18n('signupFields.emailOpt'),
				inputType: 'email',
				visible: function() {
					return Accounts.ui._passwordSignupFields() === "USERNAME_AND_OPTIONAL_EMAIL";
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('signupFields.password'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password-again',
				fieldLabel: i18n('signupFields.passwordAgain'),
				inputType: 'password',
				visible: function() {
					// No need to make users double-enter their password if
					// they'll necessarily have an email set, since they can use
					// the "forgot password" flow.
					return _.contains(
						["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}];

			signupFields = signupFields.concat(Accounts.ui._options.extraSignupFields);

			return loginButtonsSession.get('inSignupFlow') ? signupFields : loginFields;
		},

		inForgotPasswordFlow: function() {
			return loginButtonsSession.get('inForgotPasswordFlow');
		},

		inLoginFlow: function() {
			return !loginButtonsSession.get('inSignupFlow') && !loginButtonsSession.get('inForgotPasswordFlow');
		},

		inSignupFlow: function() {
			return loginButtonsSession.get('inSignupFlow');
		},

		showForgotPasswordLink: function() {
			return _.contains(
				["USERNAME_AND_EMAIL_CONFIRM", "USERNAME_AND_EMAIL", "USERNAME_AND_OPTIONAL_EMAIL", "EMAIL_ONLY"],
				Accounts.ui._passwordSignupFields());
		},

		showCreateAccountLink: function() {
			return !Accounts._options.forbidClientAccountCreation;
		}
	});

	Template._loginButtonsFormField.helpers({
		equals: function(a, b) {
			return (a === b);
		},
		inputType: function() {
			return this.inputType || "text";
		},
		inputTextual: function() {
			return !_.contains(["radio", "checkbox", "select"], this.inputType);
		}
	});

	//
	// loginButtonsChangePassword template
	//
	Template._loginButtonsChangePassword.events({
		'keypress #login-old-password, keypress #login-password, keypress #login-password-again': function(event) {
			if (event.keyCode === 13){
				changePassword();
			}
		},
		'click #login-buttons-do-change-password': function(event) {
			event.stopPropagation();
			changePassword();
		},
		'click #login-buttons-cancel-change-password': function(event) {
			event.stopPropagation();
			loginButtonsSession.resetMessages();
			Accounts._loginButtonsSession.set('inChangePasswordFlow', false);
			Meteor.flush();
		}
	});

	Template._loginButtonsChangePassword.helpers({
		fields: function() {
			return [{
				fieldName: 'old-password',
				fieldLabel: i18n('changePasswordFields.currentPassword'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password',
				fieldLabel: i18n('changePasswordFields.newPassword'),
				inputType: 'password',
				visible: function() {
					return true;
				}
			}, {
				fieldName: 'password-again',
				fieldLabel: i18n('changePasswordFields.newPasswordAgain'),
				inputType: 'password',
				visible: function() {
					// No need to make users double-enter their password if
					// they'll necessarily have an email set, since they can use
					// the "forgot password" flow.
					return _.contains(
						["USERNAME_AND_OPTIONAL_EMAIL", "USERNAME_ONLY"],
						Accounts.ui._passwordSignupFields());
				}
			}];
		}
	});

	//
	// helpers
	//

	var elementValueById = function(id) {
		var element = document.getElementById(id);
		if (!element){
			return null;
		} else {
			return element.value;
		}
	};

	var elementValueByIdForRadio = function(fieldIdPrefix, radioOptions) {
		var value = null;
		for (i in radioOptions) {
			var element = document.getElementById(fieldIdPrefix + '-' + radioOptions[i].id);
			if (element && element.checked){
				value =  element.value;
			}
		}
		return value;
	};

	var elementValueByIdForCheckbox = function(id) {
		var element = document.getElementById(id);
		return element.checked;
	};

	var trimmedElementValueById = function(id) {
		var element = document.getElementById(id);
		if (!element){
			return null;
		} else {
			return element.value.replace(/^\s*|\s*$/g, ""); // trim;
		}
	};

	var loginOrSignup = function() {
		if (loginButtonsSession.get('inSignupFlow')){
			signup();
		} else {
			login();
		}
	};

	var login = function() {
		loginButtonsSession.resetMessages();

		var username = trimmedElementValueById('login-username');
		if (username && Accounts.ui._options.forceUsernameLowercase) {
			username = username.toLowerCase();
		}
		var email = trimmedElementValueById('login-email');
		if (email && Accounts.ui._options.forceEmailLowercase) {
			email = email.toLowerCase();
		}
		var usernameOrEmail = trimmedElementValueById('login-username-or-email');
		if (usernameOrEmail && Accounts.ui._options.forceEmailLowercase && Accounts.ui._options.forceUsernameLowercase) {
			usernameOrEmail = usernameOrEmail.toLowerCase();
		}

		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');
		if (password && Accounts.ui._options.forcePasswordLowercase) {
			password = password.toLowerCase();
		}

		var loginSelector;
		if (username !== null) {
			if (!Accounts._loginButtons.validateUsername(username)){
				return;
			} else {
				loginSelector = {
					username: username
				};
			}
		} else if (email !== null) {
			if (!Accounts._loginButtons.validateEmail(email)){
				return;
			} else {
				loginSelector = {
					email: email
				};
			}
		} else if (usernameOrEmail !== null) {
			// XXX not sure how we should validate this. but this seems good enough (for now),
			// since an email must have at least 3 characters anyways
			if (!Accounts._loginButtons.validateUsername(usernameOrEmail)){
				return;
			} else {
				loginSelector = usernameOrEmail;
			}
		} else {
			throw new Error("Unexpected -- no element to use as a login user selector");
		}

		Meteor.loginWithPassword(loginSelector, password, function(error, result) {
			if (error) {
				if (error.reason == 'User not found'){
					loginButtonsSession.errorMessage(i18n('errorMessages.userNotFound'))
				} else if (error.reason == 'Incorrect password'){
					loginButtonsSession.errorMessage(i18n('errorMessages.incorrectPassword'))
				} else {
					loginButtonsSession.errorMessage(error.reason || "Unknown error");
				}
			} else {
				loginButtonsSession.closeDropdown();
			}
		});
	};

	var toggleDropdown = function() {
		$("#login-dropdown-list").toggleClass("open");
	}

	var focusInput = function() {
		setTimeout(function() {
			$("#login-dropdown-list input").first().focus();
		}, 0);
	};

	var signup = function() {
		loginButtonsSession.resetMessages();

		// to be passed to Accounts.createUser
		var options = {};
		if(typeof accountsUIBootstrap3.setCustomSignupOptions === 'function') {
			options = accountsUIBootstrap3.setCustomSignupOptions();
			if (!(options instanceof Object)){ options = {}; }
		}

		var username = trimmedElementValueById('login-username');
		if (username && Accounts.ui._options.forceUsernameLowercase) {
			username = username.toLowerCase();
		}
		if (username !== null) {
			if (!Accounts._loginButtons.validateUsername(username)){
				return;
			} else {
				options.username = username;
			}
		}

		var email = trimmedElementValueById('login-email');
		if (email && Accounts.ui._options.forceEmailLowercase) {
			email = email.toLowerCase();
		}
		if (email !== null) {
			if (!Accounts._loginButtons.validateEmail(email)){
				return;
			} else {
				options.email = email;
			}
		}

		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');
		if (password && Accounts.ui._options.forcePasswordLowercase) {
			password = password.toLowerCase();
		}
		if (!Accounts._loginButtons.validatePassword(password)){
			return;
		} else {
			options.password = password;
		}

		if (!matchPasswordAgainIfPresent()){
			return;
		}

		// prepare the profile object
		// it could have already been set through setCustomSignupOptions
		if (!(options.profile instanceof Object)){
			options.profile = {};
		}

		// define a proxy function to allow extraSignupFields set error messages
		var errorFunction = function(errorMessage) {
			Accounts._loginButtonsSession.errorMessage(errorMessage);
		};

		var invalidExtraSignupFields = false;
		// parse extraSignupFields to populate account's profile data
		_.each(Accounts.ui._options.extraSignupFields, function(field, index) {
						var value = null;
						var elementIdPrefix = 'login-';

						if (field.inputType === 'radio') {
							value = elementValueByIdForRadio(elementIdPrefix + field.fieldName, field.data);
						} else if (field.inputType === 'checkbox') {
							value = elementValueByIdForCheckbox(elementIdPrefix + field.fieldName);
						} else {
							value = elementValueById(elementIdPrefix + field.fieldName);
						}

			if (typeof field.validate === 'function') {
				if (field.validate(value, errorFunction)) {
					if (typeof field.saveToProfile !== 'undefined' && !field.saveToProfile){
						options[field.fieldName] = value;
					} else {
						options.profile[field.fieldName] = value;
					}
				} else {
					invalidExtraSignupFields = true;
				}
			} else {
				options.profile[field.fieldName] = value;
			}
		});

		if (invalidExtraSignupFields){
			return;
		}

		Accounts.createUser(options, function(error) {
			if (error) {
				if (error.reason == 'Signups forbidden'){
					loginButtonsSession.errorMessage(i18n('errorMessages.signupsForbidden'))
				} else {
					loginButtonsSession.errorMessage(error.reason || "Unknown error");
				}
			} else {
				loginButtonsSession.closeDropdown();
			}
		});
	};

	var forgotPassword = function() {
		loginButtonsSession.resetMessages();

		var email = trimmedElementValueById("forgot-password-email");
		if (email.indexOf('@') !== -1) {
			Accounts.forgotPassword({
				email: email
			}, function(error) {
				if (error) {
					if (error.reason == 'User not found'){
						loginButtonsSession.errorMessage(i18n('errorMessages.userNotFound'))
					} else {
						loginButtonsSession.errorMessage(error.reason || "Unknown error");
					}
				} else {
					loginButtonsSession.infoMessage(i18n('infoMessages.emailSent'));
				}
			});
		} else {
			loginButtonsSession.errorMessage(i18n('forgotPasswordForm.invalidEmail'));
		}
	};
	var changePassword = function() {
		loginButtonsSession.resetMessages();
		// notably not trimmed. a password could (?) start or end with a space
		var oldPassword = elementValueById('login-old-password');
		// notably not trimmed. a password could (?) start or end with a space
		var password = elementValueById('login-password');

		if (password == oldPassword) {
			loginButtonsSession.errorMessage(i18n('errorMessages.newPasswordSameAsOld'));
			return;
		}

		if (!Accounts._loginButtons.validatePassword(password)){
			return;
		}

		if (!matchPasswordAgainIfPresent()){
			return;
		}

		Accounts.changePassword(oldPassword, password, function(error) {
			if (error) {
				if (error.reason == 'Incorrect password'){
					loginButtonsSession.errorMessage(i18n('errorMessages.incorrectPassword'))
				} else {
					loginButtonsSession.errorMessage(error.reason || "Unknown error");
				}
			} else {
				loginButtonsSession.infoMessage(i18n('infoMessages.passwordChanged'));

				// wait 3 seconds, then expire the msg
				Meteor.setTimeout(function() {
					loginButtonsSession.resetMessages();
				}, 3000);
			}
		});
	};

	var matchPasswordAgainIfPresent = function() {
		// notably not trimmed. a password could (?) start or end with a space
		var passwordAgain = elementValueById('login-password-again');
		if (passwordAgain !== null) {
			// notably not trimmed. a password could (?) start or end with a space
			var password = elementValueById('login-password');
			if (password !== passwordAgain) {
				loginButtonsSession.errorMessage(i18n('errorMessages.passwordsDontMatch'));
				return false;
			}
		}
		return true;
	};
  !function(t){"use strict";function r(t){if(t)c[0]=c[16]=c[1]=c[2]=c[3]=c[4]=c[5]=c[6]=c[7]=c[8]=c[9]=c[10]=c[11]=c[12]=c[13]=c[14]=c[15]=0,this.blocks=c,this.buffer8=i;else if(n){var r=new ArrayBuffer(68);this.buffer8=new Uint8Array(r),this.blocks=new Uint32Array(r)}else this.blocks=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];this.h0=this.h1=this.h2=this.h3=this.start=this.bytes=0,this.finalized=this.hashed=!1,this.first=!0}var e="object"==typeof process&&process.versions&&process.versions.node;e&&(t=global);var i,h=!t.JS_MD5_TEST&&"object"==typeof module&&module.exports,s="function"==typeof define&&define.amd,n=!t.JS_MD5_TEST&&"undefined"!=typeof ArrayBuffer,f="0123456789abcdef".split(""),a=[128,32768,8388608,-2147483648],o=[0,8,16,24],u=["hex","array","digest","buffer","arrayBuffer"],c=[];if(n){var p=new ArrayBuffer(68);i=new Uint8Array(p),c=new Uint32Array(p)}var y=function(t){return function(e){return new r(!0).update(e)[t]()}},d=function(){var t=y("hex");e&&(t=l(t)),t.create=function(){return new r},t.update=function(r){return t.create().update(r)};for(var i=0;i<u.length;++i){var h=u[i];t[h]=y(h)}return t},l=function(r){var e,i;try{if(t.JS_MD5_TEST)throw"JS_MD5_TEST";e=require("crypto"),i=require("buffer").Buffer}catch(h){return console.log(h),r}var s=function(t){if("string"==typeof t)return e.createHash("md5").update(t,"utf8").digest("hex");if(t.constructor==ArrayBuffer)t=new Uint8Array(t);else if(void 0===t.length)return r(t);return e.createHash("md5").update(new i(t)).digest("hex")};return s};r.prototype.update=function(r){if(!this.finalized){var e="string"!=typeof r;e&&r.constructor==t.ArrayBuffer&&(r=new Uint8Array(r));for(var i,h,s=0,f=r.length||0,a=this.blocks,u=this.buffer8;f>s;){if(this.hashed&&(this.hashed=!1,a[0]=a[16],a[16]=a[1]=a[2]=a[3]=a[4]=a[5]=a[6]=a[7]=a[8]=a[9]=a[10]=a[11]=a[12]=a[13]=a[14]=a[15]=0),e)if(n)for(h=this.start;f>s&&64>h;++s)u[h++]=r[s];else for(h=this.start;f>s&&64>h;++s)a[h>>2]|=r[s]<<o[3&h++];else if(n)for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?u[h++]=i:2048>i?(u[h++]=192|i>>6,u[h++]=128|63&i):55296>i||i>=57344?(u[h++]=224|i>>12,u[h++]=128|i>>6&63,u[h++]=128|63&i):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),u[h++]=240|i>>18,u[h++]=128|i>>12&63,u[h++]=128|i>>6&63,u[h++]=128|63&i);else for(h=this.start;f>s&&64>h;++s)i=r.charCodeAt(s),128>i?a[h>>2]|=i<<o[3&h++]:2048>i?(a[h>>2]|=(192|i>>6)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):55296>i||i>=57344?(a[h>>2]|=(224|i>>12)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]):(i=65536+((1023&i)<<10|1023&r.charCodeAt(++s)),a[h>>2]|=(240|i>>18)<<o[3&h++],a[h>>2]|=(128|i>>12&63)<<o[3&h++],a[h>>2]|=(128|i>>6&63)<<o[3&h++],a[h>>2]|=(128|63&i)<<o[3&h++]);this.lastByteIndex=h,this.bytes+=h-this.start,h>=64?(this.start=h-64,this.hash(),this.hashed=!0):this.start=h}return this}},r.prototype.finalize=function(){if(!this.finalized){this.finalized=!0;var t=this.blocks,r=this.lastByteIndex;t[r>>2]|=a[3&r],r>=56&&(this.hashed||this.hash(),t[0]=t[16],t[16]=t[1]=t[2]=t[3]=t[4]=t[5]=t[6]=t[7]=t[8]=t[9]=t[10]=t[11]=t[12]=t[13]=t[14]=t[15]=0),t[14]=this.bytes<<3,this.hash()}},r.prototype.hash=function(){var t,r,e,i,h,s,n=this.blocks;this.first?(t=n[0]-680876937,t=(t<<7|t>>>25)-271733879<<0,i=(-1732584194^2004318071&t)+n[1]-117830708,i=(i<<12|i>>>20)+t<<0,e=(-271733879^i&(-271733879^t))+n[2]-1126478375,e=(e<<17|e>>>15)+i<<0,r=(t^e&(i^t))+n[3]-1316259209,r=(r<<22|r>>>10)+e<<0):(t=this.h0,r=this.h1,e=this.h2,i=this.h3,t+=(i^r&(e^i))+n[0]-680876936,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[1]-389564586,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[2]+606105819,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[3]-1044525330,r=(r<<22|r>>>10)+e<<0),t+=(i^r&(e^i))+n[4]-176418897,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[5]+1200080426,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[6]-1473231341,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[7]-45705983,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[8]+1770035416,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[9]-1958414417,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[10]-42063,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[11]-1990404162,r=(r<<22|r>>>10)+e<<0,t+=(i^r&(e^i))+n[12]+1804603682,t=(t<<7|t>>>25)+r<<0,i+=(e^t&(r^e))+n[13]-40341101,i=(i<<12|i>>>20)+t<<0,e+=(r^i&(t^r))+n[14]-1502002290,e=(e<<17|e>>>15)+i<<0,r+=(t^e&(i^t))+n[15]+1236535329,r=(r<<22|r>>>10)+e<<0,t+=(e^i&(r^e))+n[1]-165796510,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[6]-1069501632,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[11]+643717713,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[0]-373897302,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[5]-701558691,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[10]+38016083,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[15]-660478335,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[4]-405537848,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[9]+568446438,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[14]-1019803690,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[3]-187363961,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[8]+1163531501,r=(r<<20|r>>>12)+e<<0,t+=(e^i&(r^e))+n[13]-1444681467,t=(t<<5|t>>>27)+r<<0,i+=(r^e&(t^r))+n[2]-51403784,i=(i<<9|i>>>23)+t<<0,e+=(t^r&(i^t))+n[7]+1735328473,e=(e<<14|e>>>18)+i<<0,r+=(i^t&(e^i))+n[12]-1926607734,r=(r<<20|r>>>12)+e<<0,h=r^e,t+=(h^i)+n[5]-378558,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[8]-2022574463,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[11]+1839030562,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[14]-35309556,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[1]-1530992060,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[4]+1272893353,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[7]-155497632,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[10]-1094730640,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[13]+681279174,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[0]-358537222,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[3]-722521979,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[6]+76029189,r=(r<<23|r>>>9)+e<<0,h=r^e,t+=(h^i)+n[9]-640364487,t=(t<<4|t>>>28)+r<<0,i+=(h^t)+n[12]-421815835,i=(i<<11|i>>>21)+t<<0,s=i^t,e+=(s^r)+n[15]+530742520,e=(e<<16|e>>>16)+i<<0,r+=(s^e)+n[2]-995338651,r=(r<<23|r>>>9)+e<<0,t+=(e^(r|~i))+n[0]-198630844,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[7]+1126891415,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[14]-1416354905,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[5]-57434055,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[12]+1700485571,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[3]-1894986606,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[10]-1051523,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[1]-2054922799,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[8]+1873313359,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[15]-30611744,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[6]-1560198380,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[13]+1309151649,r=(r<<21|r>>>11)+e<<0,t+=(e^(r|~i))+n[4]-145523070,t=(t<<6|t>>>26)+r<<0,i+=(r^(t|~e))+n[11]-1120210379,i=(i<<10|i>>>22)+t<<0,e+=(t^(i|~r))+n[2]+718787259,e=(e<<15|e>>>17)+i<<0,r+=(i^(e|~t))+n[9]-343485551,r=(r<<21|r>>>11)+e<<0,this.first?(this.h0=t+1732584193<<0,this.h1=r-271733879<<0,this.h2=e-1732584194<<0,this.h3=i+271733878<<0,this.first=!1):(this.h0=this.h0+t<<0,this.h1=this.h1+r<<0,this.h2=this.h2+e<<0,this.h3=this.h3+i<<0)},r.prototype.hex=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return f[t>>4&15]+f[15&t]+f[t>>12&15]+f[t>>8&15]+f[t>>20&15]+f[t>>16&15]+f[t>>28&15]+f[t>>24&15]+f[r>>4&15]+f[15&r]+f[r>>12&15]+f[r>>8&15]+f[r>>20&15]+f[r>>16&15]+f[r>>28&15]+f[r>>24&15]+f[e>>4&15]+f[15&e]+f[e>>12&15]+f[e>>8&15]+f[e>>20&15]+f[e>>16&15]+f[e>>28&15]+f[e>>24&15]+f[i>>4&15]+f[15&i]+f[i>>12&15]+f[i>>8&15]+f[i>>20&15]+f[i>>16&15]+f[i>>28&15]+f[i>>24&15]},r.prototype.toString=r.prototype.hex,r.prototype.digest=function(){this.finalize();var t=this.h0,r=this.h1,e=this.h2,i=this.h3;return[255&t,t>>8&255,t>>16&255,t>>24&255,255&r,r>>8&255,r>>16&255,r>>24&255,255&e,e>>8&255,e>>16&255,e>>24&255,255&i,i>>8&255,i>>16&255,i>>24&255]},r.prototype.array=r.prototype.digest,r.prototype.arrayBuffer=function(){this.finalize();var t=new ArrayBuffer(16),r=new Uint32Array(t);return r[0]=this.h0,r[1]=this.h1,r[2]=this.h2,r[3]=this.h3,t},r.prototype.buffer=r.prototype.arrayBuffer;var v=d();h?module.exports=v:(t.md5=v,s&&define(function(){return v}))}(this);
})();
